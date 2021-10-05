import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@/modules/User/user.service';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    ) {
    super({
      // usernameField: "acount", 
      // passwordField:"ss" 
    });//自定义接收验证的字段,默认username&&password
  }

  async validate(username: string, password: string): Promise<any> {
    const user = this.authService.checkUser(username,password)
    if (!user) {
      return new UnauthorizedException()
    }
    return user;
  }
}
