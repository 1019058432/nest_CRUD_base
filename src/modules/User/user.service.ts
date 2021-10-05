import { Injectable } from '@nestjs/common';
import { ApiRecodService } from '../ApiRecod/apirecod.service';

export type User = any;
@Injectable()
export class UserService {
  private readonly users: User[];
  constructor(private readonly apirecodService: ApiRecodService) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(userinfo: User): Promise<User | undefined> {
    return this.users.find(user => user.username === userinfo.username);
  }
  async findApiRecod(): Promise<any> {
    return this.apirecodService.findOneRecod({id: 23});
  }
}