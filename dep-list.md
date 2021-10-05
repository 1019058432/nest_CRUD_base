1、性能

```bash
npm install --save @nestjs/platform-fastify
#yarn
yarn add @nestjs/platform-fastify
```

2、数据库

```bash
npm install --save @nestjs/typeorm typeorm mysql2
#yarn
yarn add @nestjs/typeorm typeorm mysql2
```

3、安全验证

```bash
#passport

    #npm
    npm install --save @nestjs/passport passport passport-local
    npm install --save-dev @types/passport-local
    #yarn
    yarn add @nestjs/passport passport passport-local
    yarn add -D @types/passport-local

    #基于passport的jwt

    #npm
    npm install @nestjs/jwt passport-jwt
    npm install --save-dev @types/passport-jwt
    #yarn
    yarn add @nestjs/jwt passport-jwt
    yarn add -D @types/passport-jwt
#http headers
	npm i --save fastify-helmet
	yarn add fastify-helmet
#csrf
	npm i --save fastify-csrf
	yarn add fastify-csrf
#ddos
	npm i --save fastify-rate-limit
	yarn add fastify-rate-limit

```



4、nestjsx/crud

```bash
npm install --save @nestjsx/crud class-transformer class-validator
npm install --save @nestjsx/crud-typeorm # @nestjs/typeorm typeorm 因为上面安装了
#yarn
yarn add @nestjsx/crud class-transformer class-validator
yarn add @nestjsx/crud-typeorm
```



5、ali-oss

```bash
npm install ali-oss --save
#yarn
yarn add ali-oss
```
