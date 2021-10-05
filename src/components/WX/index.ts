import { Injectable } from '@nestjs/common';
import { OssService } from '../Oss/index'
 
@Injectable()
export class DemoService {
  constructor(private readonly ossService:OssService) {}
  // 上传照片至Oss
  public async getOpenId(params): Promise<any> {
    let code = params.code;//获取小程序传来的code
    let encryptedData = params.encryptedData;//获取小程序传来的encryptedData
    let iv = params.iv;//获取小程序传来的iv
    let appid = "xxxxxxx";//自己小程序后台管理的appid，可登录小程序后台查看
    let secret = "xxxxxxx";//小程序后台管理的secret，可登录小程序后台查看
    let grant_type = "authorization_code";// 授权（必填）默认值
    
    //请求获取openid
    let url = "https://api.weixin.qq.com/sns/jscode2session?grant_type="+grant_type+"&appid="+appid+"&secret="+secret+"&js_code="+code;
    
    let openid,sessionKey;
    
    let https = require("https");
    
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.on('data', (jsonData) => {
                const data = JSON.parse(jsonData);
                // openid = data.openid;//得到openid
                // sessionKey = data.session_key;//得到session_key
                resolve(data)
            }).on('error', (error) => {
                reject(error)
            });
        });
    })
  }
  public async parseUserProfile(appId: string, sessionKey: string, encryptedData: string, iv: string): Promise<any> {
      //下面这部分是解密	

      var crypto = require('crypto');
      function WXBizDataCrypt(appId, sessionKey) {
          this.appId = appId
          this.sessionKey = sessionKey
      }

      WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
          // base64 decode
          var sessionKey = new Buffer(this.sessionKey, 'base64')
          encryptedData = new Buffer(encryptedData, 'base64')
          iv = new Buffer(iv, 'base64')

          try {
              // 解密
              var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
              // 设置自动 padding 为 true，删除填充补位
              decipher.setAutoPadding(true)
              var decoded = decipher.update(encryptedData, 'binary', 'utf8')
              decoded += decipher.final('utf8')
              decoded = JSON.parse(decoded)
          } catch (err) {
              throw new Error('Illegal Buffer')
          }

          if (decoded.watermark.appid !== this.appId) {
              throw new Error('Illegal Buffer')
          }
          return decoded
      }

      //解密
      var pc = new WXBizDataCrypt(appId, sessionKey);//这里的sessionKey 是上面获取到的
      var decodeData = pc.decryptData(encryptedData, iv);//encryptedData 是从小程序获取到的
      console.log('解密后 data: ', decodeData);


  }
}

// wx  app.js
function wxLoginExample() {
    const wx = {
        login: (options) =>{},
        getSetting: (options) =>{},
        getUserInfo: (options) =>{},
    }
    const axios = {
        request: (url,method,paload) =>{return Promise.resolve()},
    }
    const app = {
        globalData: {
            userInfo: {}
        }
    }
    wx.login({
        success: res => {
          let code = res.code; //获取登录的临时凭证
          if (code) {
            //获取授权信息
            wx.getSetting({
              success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                  //获取用户信息：getUserInfo必须是在用户已经授权的情况下调用
                  wx.getUserInfo({
                    withCredentials: true,
                    success: res => {
                      app.globalData.userInfo = res.userInfo //非敏感用户信息
                      // 发送请求，获取openid
                      let url = " xxxxx";//后台请求地址
                      let params = {
                          "code": code,
                          "encryptedData": res.encryptedData,
                          "iv": res.iv
                        }
                      axios.request(url, "POST", params ).then(loginInfo => {
                        console.log("loginInfo:", loginInfo);
                      })
                    }
                  })
                }
              }
            });
          }
        }})
}
