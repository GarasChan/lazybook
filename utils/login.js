const util = require('./util.js');
const config = require('./config.js')

let login = {

  /**
   * 检测是否登录
   */
  checkLogin: function() {
    const skey = wx.getStorageSync('skey');
    return skey ? true : false;
  },

  /**
   * 登录
   */
  login: function() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 登录请求
          wx.request({
            url: config.urlComponents.loginUrl,
            data: {
              code: res.code
            },
            success: (res) => {
              const skey = res.data.skey;
              //如果获取不到skey，则登录失败
              if (!skey) {
                reject({ errMsg: '登录失败' });
              }
              wx.setStorageSync('skey', skey);
              resolve({ success: true });
            },
            fail: err => {
              reject(err);
            }
          })
        },
        fail: err => {
          reject(err);
        }
      });
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function() {
    return new Promise((resolve, reject) => {
      util.request({
        url: config.urlComponents.userUrl,
        success: res => {
          if (res.statusCode === 400) {
            reject({ 
              statusCode: 400,
              errMsg: '用户不存在'
            });
          } else if (res.statusCode === 401) {
            reject({
              statusCode: 401,
              errMsg: '未登录'
            });
          } else {
            resolve({ userInfo: res.data });
          }
        },
        fail: err => {
          reject(err);
        }
      });
    })
  },

  /**
   * 注册用户信息
   */
  registerUser: function(userInfo) {
    return new Promise((resolve, reject) => {
      util.request({
        url: config.urlComponents.userUrl,
        method: 'post',
        data: userInfo,
        success: (res) => {
          resolve({ success: true });
        },
        fail: (err) => {
          reject(err);
        }
      });
    })
  }



  /**
   * 登录或获取用户信息
   * 1、登录则获取用户信息
   * 2、未登录则进行登录，然后获取用户信息
   */
  // doLogin: function(callBack) {
  //   const skey = wx.getStorageSync('skey');
  //   if (skey) {
  //     login.getUserInfo(callBack);
  //   } else {
  //     login.login(callBack);
  //   }
  // },

  /**
   * 登录
   * step1，调用wx.login获取code
   * step2，发送code到服务器，并且返回第三方skey，存储到本地
   * step3，获取用户信息
   */
  // login: function(callBack) {
  //   wx.login({
  //     success: (res) => {
  //       // 登录请求
  //       wx.request({
  //         url: config.urlComponents.loginUrl,
  //         data: {
  //           code: res.code
  //         },
  //         success: (res) => {
  //           const skey = res.data.skey;
  //           //如果获取不到skey，则登录失败
  //           if (!skey) {
  //             callBack({userInfo: null });
  //             // login.login(callBack);
  //             return;
  //           }
  //           wx.setStorageSync('skey', skey);
  //           login.getUserInfo(callBack);
  //         }
  //       })
  //     }
  //   });
  // },

  /**
   * 获取用户信息
   * 对于未登录用户，重新登录
   * 对于未注册用户，注册新用户
   * 对于已注册用户，全局写入用户信息
   */
  // getUserInfo: (callBack) => {
  //   util.request({
  //     url: config.urlComponents.userUrl,
  //     method: 'GET',
  //     success: (res) => {
  //       // 未登录
  //       if (res.statusCode === 401) {
  //         login.login(callBack);
  //       }
  //       else {
  //         // 未注册用户
  //         if (res.statusCode === 400) {
  //           login.registerUser(callBack);
  //         }
  //         else {
  //           // _this.globalData.userInfo = res.data;
  //           // 在callBack中设置app全局变量
  //           callBack({ userInfo: res.data });
  //         }
  //       }
  //     },
  //     fail: (err) => {
  //       console.log(err);
  //     }
  //   });
  // },

  /**
   * 注册用户
   * 在User表中添加记录
   * 授权失败写入默认用户信息，否则写入通过wx.getUserInfo获取的用户信息
   */
  // registerUser: (callBack) => {
  //   wx.getUserInfo({
  //     success: (res) => {
  //       let userInfo = res.userInfo;
  //       userInfo = {
  //         name: userInfo.nickName,
  //         avatar: userInfo.avatarUrl,
  //         gender: userInfo.gender,
  //         country: userInfo.country,
  //         province: userInfo.province,
  //         city: userInfo.city,
  //         language: userInfo.language
  //       };
  //       util.request({
  //         url: config.urlComponents.userUrl,
  //         method: 'post',
  //         data: userInfo,
  //         success: (res) => {
  //           // _this.globalData.userInfo = userInfo;
  //           // 在callBack中设置app全局变量
  //           callBack({ userInfo });
  //         },
  //         fail: (err) => {
  //           // _this.globalData.userInfo = userInfo;
  //           // 在callBack中设置app全局变量
  //           callBack({ userInfo: null });
  //         }
  //       });
  //     },
  //     //授权失败，用默认值注册
  //     fail: () => {
  //       // Util.showMessage('登录失败！');
  //       callBack({ userInfo: null });
  //       // _this.request({
  //       //   url: '/user',
  //       //   method: 'post',
  //       //   data: _this.globalData.userInfo,
  //       //   success: function () {
  //       //     callBack();
  //       //     wx.hideLoading();
  //       //   }
  //       // });
  //     }
  //   })
  // }
}

module.exports = login;