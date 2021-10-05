import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ApiRecod } from "./apirecod.entity";

@Injectable()
export class ApiRecodService extends TypeOrmCrudService<ApiRecod> {
  constructor(@InjectRepository(ApiRecod) repo) {
    super(repo)
  }
  async findOneRecod(optons: Object): Promise<any> {
    return this.repo.findOne(optons)
  }
}