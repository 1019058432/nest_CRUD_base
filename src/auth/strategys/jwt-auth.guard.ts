import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
      // 在这里添加自定义的认证逻辑
      // 例如调用 super.logIn(request) 来建立一个session
      return super.canActivate(context);
    }
  /**
   * 
   * @param err 验证失败 过期token返回null
   * @param user 验证失败 过期token返回false
   * @param info 验证失败 过期token返回异常信息及UTC世界标准时间
   * @returns 
   */
    handleRequest(err, user, info) {
      // 可以抛出一个基于info或者err参数的异常
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      return user;
    }
  }
  
  