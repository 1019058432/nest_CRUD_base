import { Controller, Get } from '@nestjs/common';
import { ApiRecodService } from '../ApiRecod/apirecod.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly apiService: ApiRecodService
        ){}
    
    @Get("/ss")
    async getre() : Promise<any>{
        // return this.userService.findApiRecod()
        return this.apiService.findOneRecod({id: 23})
    }
    @Get("/one")
    async getred() : Promise<any>{
        return this.userService.findOne({username: 'john'})
    }
    @Get("/s23")
    async getred3() : Promise<any>{
        return this.userService.findApiRecod()
    }
}
