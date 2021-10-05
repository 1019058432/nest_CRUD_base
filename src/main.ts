import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// import * as helmet from 'fastify-helmet';
import { fastifyHelmet } from 'fastify-helmet';
// import fastifyCookie from 'fastify-cookie'; // csrf可能依赖于cookie,否则启动报错
import fastifyCsrf from 'fastify-csrf';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
// import * as fastifyRateLimit from 'fastify-rate-limit'; // npm i fastify-rate-limit 限制客户端在某一时间段内频繁访问

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  // 注册插件
  // app.register(helmet);
  app.register(fastifyHelmet); // 设置与安全相关的 HTTP 头
  // app.register(fastifyCookie); // 启用CSRF依赖
  // app.register(fastifyCsrf); // 启用CSRF(跨站点请求伪造)保护
  // app.register(fastifyRateLimit, {
  //   timeWindow: 15 * 60 * 1000, // 15 minutes
  //   max: 100 // limit each IP to 100 requests per windowMs
  // });// 启用防暴力(流量)攻击保护,如果客户端在指定时间内15*60*1000ms内达到 配置的上限100次则返回错误响应码429

  // 注册全局管道
  app.useGlobalPipes(new ValidationPipe()); // 开启全局验证，验证规则本项目在实体属性中采用管道修饰器进行类型校验声明
  // 允许跨域
  // app.enableCors();
  await app.listen(3000,"0.0.0.0");
}
bootstrap();
