import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/database.config';
import { ApiRecodModule } from './modules/ApiRecod/apirecod.module';
import { UserModule } from './modules/User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ApiRecodModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}