import { Module } from '@nestjs/common';
import { ApiRecodService } from './apirecod.service';
import { ApiRecodController } from './apirecod.controller';
import { ApiRecod } from "./apirecod.entity";
// 这里导入
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // 这里导入
  imports: [TypeOrmModule.forFeature([ApiRecod])],
  controllers: [ApiRecodController],
  providers: [ApiRecodService],
  exports: [ApiRecodService]
})
export class ApiRecodModule {}