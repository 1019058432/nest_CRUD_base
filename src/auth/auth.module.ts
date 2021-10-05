import { ApiRecodModule } from '@/modules/ApiRecod/apirecod.module';
import { UserService } from '@/modules/User/user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './strategys/constants';
import { JwtStrategy } from './strategys/jwt.strategy';
import { LocalStrategy } from './strategys/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.livetime },
    }),
    ApiRecodModule,
  ],
  providers: [AuthService,LocalStrategy,UserService,JwtStrategy],
  exports: [AuthService,PassportModule] // 使用defaultStrategy时需要显式导出PassportModule
})
export class AuthModule {}
