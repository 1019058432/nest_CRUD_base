import { User, UserService } from '@/modules/User/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  /**
   * 自定义验证用户身份
   * @param user 用户信息
   * @returns 
   */
  async checkUser(username: string, password: string): Promise<any> {
    return this.userService.findOne({username,password})
  }

/**
 * 签发token
 * @param user 用户信息
 * @returns 
 */
  async sign(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
