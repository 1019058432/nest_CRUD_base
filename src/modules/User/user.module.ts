import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ApiRecodModule } from '@/modules/ApiRecod/apirecod.module';

@Module({
  imports:[ApiRecodModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
