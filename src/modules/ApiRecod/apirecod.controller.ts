import { Controller } from '@nestjs/common';
import { ApiRecodService } from './apirecod.service';
import { ApiRecod } from './apirecod.entity';
import { Crud, CrudAuth, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { GetOneDto } from './apirecod.dto';

@Crud({
  model: {
    type: ApiRecod,
  },
  serialize:{
    get: GetOneDto
  }
  // validation: {}
})
@CrudAuth({
  // property: 'apirecod',
  persist: (req) =>{
    // const {url, method, header, query, body, httpVersion } = req
    const url = req.url
    const method = req.method
    const headers = req.headers
    const params = req.query
    const httpVersion = req.httpVersion
    const body = req.body

    const result = {}
    if (url == '/apirecods') {
      if (method == 'POST') {
        result['dec'] = "hhh"
      }
    }
    const config = {
      url,
      method,
      headers,
      params,
      httpVersion,
      body,
    }
    // 2
    
    return result
  },
  // filter: (apirecod: ApiRecod) => ({
  //   id: apirecod.id,
  //   isActive: true,
  // })
})
@Controller('apirecods')
export class ApiRecodController implements CrudController<ApiRecod> {
  constructor(public service: ApiRecodService) {}

  // get base(): CrudController<ApiRecod> {
  //   return this;
  // }

  // @Override()
  // createOne(
  //   @ParsedRequest() req: CrudRequest,
  //   @ParsedBody() dto: ApiRecod,
  // ) {
  //   return this.base.createOneBase(req, dto);
  // }
}