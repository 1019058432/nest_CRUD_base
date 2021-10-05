import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/strategys/jwt-auth.guard';
import { LocalAuthGuard } from './auth/strategys/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    ) {}
  
  @UseGuards(LocalAuthGuard)
  @Get("user/login")
  async login(@Req() req): Promise<any> {
    return this.authService.sign(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get("user/profile")
  async profile(@Req() req): Promise<any> {
    const {username,password} = req.user
    return this.authService.checkUser(username,password);
  }
  @Get('/test')
  async ss(): Promise<any> {
    return "Hello World!"
  }
}
