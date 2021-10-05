import * as OSS from 'ali-oss';
import { Inject, Injectable } from '@nestjs/common';
import ossConfig from './config';
import path from 'path';
const fs = require('fs');
 
@Injectable()
export class OssService {
  private client: any;
  public constructor() {
    this.client = new OSS({
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
      region: ossConfig.region,
      bucket: ossConfig.bucket
    })
  }
//   yarn add nestjs-ali-oss ali-oss
//   yarn add @types/ali-oss --dev
//   或者
//   yarn add --dev @types/ali-oss //可能需要ts支持，或许还需要yarn add nestjs-ali-oss 
  // 创建存储空间。
  private async putBucket() {
    try {
      const options = {
        storageClass: 'Archive', // 存储空间的默认存储类型为标准存储，即Standard。如果需要设置存储空间的存储类型为归档存储，请替换为Archive。
        acl: 'public-read', // 存储空间的默认读写权限为私有，即private。如果需要设置存储空间的读写权限为公共读，请替换为public-read。
        dataRedundancyType: 'ZRS' // 存储空间的默认数据容灾类型为本地冗余存储，即LRS。如果需要设置数据容灾类型为同城冗余存储，请替换为ZRS。
      }
      const result = await this.client.putBucket('test');
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  // 列举所有的存储空间
  private async listBuckets () {
    try {
      let result = await this.client.listBuckets();
      console.log(result)
    } catch(err) {
      console.log(err)
    }
  }
  // 同步函数 上传文件到oss 并返回  图片oss 地址
  public async putOssFileSync(ossPath: string, localPath: string): Promise<string> {
    let res: any;
    try {
      // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
      // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      res = await this.client.put(ossPath, path.normalize(localPath))
      // 将文件设置为公共可读
      await this.client.putACL(ossPath, "public-read")
    } catch (error) {
      console.log(error)
    }
    return res.url
  }
  // 异步函数 上传文件到oss 并返回  图片oss 地址
  public async putOssFileAsync(ossPath: string, localPath: string): Promise<string> {
    let res: any;
    return new Promise((resolve, reject) => {
      try {
        // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
        // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
        this.client.put(ossPath, path.normalize(localPath)).then(res => {
          resolve(res)
          // resolve(res.url)
          // 将文件设置为公共可读(默认继承，当无法访问时需设置权限)
          // this.client.putACL(ossPath, "public-read")
        })
      } catch (error) {
        reject(error)
      }
    })
    
  }
  public async putBufferSync (ossPath: string, buff: Buffer) {
    try {
      let result = await this.client.put(ossPath, buff);
      return result;
    } catch (e) {
      return e;
    }
  }
  public async putBufferAsync (ossPath: string, buff: Buffer) {

    try {
      return this.client.put(ossPath, buff);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  public async putStreamSync (filePath: string, useChunked: Boolean = false) {
    let result;
    try {
    // use 'chunked encoding'
    const stream = fs.createReadStream(filePath);
    if (useChunked) {
      // don't use 'chunked encoding'
      let size = fs.statSync('local-file').size;
      result = await this.client.putStream(
        'object-name', stream, {contentLength: size});
    } else {
      result = await this.client.putStream('object-name', stream);
      
    }
    return result;
    } catch (e) {
      console.error(e)
    }
  }
  /**
   * 分片上传。
   * @param ossPath 可以定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至Bucket根目录或Bucket下的指定目录。
   * @param localPath 
   * @param options 其中meta是用户自定义的元数据，通过head接口可以获取到Object的meta数据。
   * @param callback 
   * @returns 
   */
  public async multipartUpload(ossPath: string, localPath: string, options: Object, callback: Function) {
    try {
      // ossPath
      const result = await this.client.multipartUpload(ossPath, localPath, {
        callback,
        // 
        ...options
      });
      const head = await this.client.head(ossPath);
      return {
        result,
        head
      }
    } catch (e) {
      // 捕获超时异常。
      if (e.code === 'ConnectionTimeoutError') {
        console.log('TimeoutError');
        // do ConnectionTimeoutError operation
      }
      return e
    }
  }
  /**
   * 取消分片上传
   * @param ossPath Object所在Bucket的完整路径。
   * @param uploadId 分片上传uploadId。
   */
  public async abortMultipartUpload(ossPath: string,uploadId: string) {
    const result = await this.client.abortMultipartUpload(ossPath, uploadId);
    return result;
  }
  public async resumeUpload(ossPath: string, filePath: string, checkpoint, callback: Function) {
    // retry 5 times
    for (let i = 0; i < 5; i++) {
      try {
        const result = await this.client.multipartUpload(ossPath, filePath, {
          checkpoint,
          callback,//{checkpoint,percentage} = res
        });
        break; // break if success
      } catch (e) {
        console.error(e);
      }
    }
  }
  
  /**
   * 获取文件的url
   * @param filePath 
   */
  public async getFileSignatureUrl(filePath: string): Promise<string> {
    if (filePath == null) {
      console.log("get file signature failed: file name can not be empty");
      return null
    }
    let result = ""
    try {
      result = this.client.signatureUrl(filePath, { expires: 36000 })
    } catch (err) {
      console.log(err)
    }
    return result
  }
  /**
   * 校验文件大小并上传文件
   * @param localPath 
   * @param ossPath 
   * @param size 
   */
  public async validateFile(ossPath: string, localPath: string, size: number): Promise<string> {
    if (size > 5 * 1024 * 1024) {
      return
    } else {
      return await this.putOssFileSync(ossPath, localPath)
    }
  }
}