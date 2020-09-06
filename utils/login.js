const util = require('./util.js');
const config = require('./config.js')

// const db = wx.cloud.database();

let login = {

  /**
   * 检测是否登录
   */
  checkLogin: function () {
    const skey = wx.getStorageSync('skey');
    return skey ? true : false;
  },

  /**
   * 登录
   */
  login: function () {
    

    // return new Promise((resolve, reject) => {
    //   wx.login({
    //     success: res => {
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
    //             reject({ errMsg: '登录失败' });
    //           }
    //           wx.setStorageSync('skey', skey);
    //           resolve({ success: true });
    //         },
    //         fail: err => {
    //           reject(err);
    //         }
    //       })
    //     },
    //     fail: err => {
    //       reject(err);
    //     }
    //   });
    // })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    // db.collection('user').where({
    //   _openid: this.data.openid
    // }).get({
    //   success: res => {
    //     this.setData({
    //       queryResult: JSON.stringify(res.data, null, 2)
    //     })
    //     console.log('[数据库] [查询记录] 成功: ', res)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
    // return new Promise((resolve, reject) => {
    //   util.request({
    //     url: config.urlComponents.userUrl,
    //     success: res => {
    //       if (res.statusCode === 400) {
    //         reject({
    //           statusCode: 400,
    //           errMsg: '用户不存在'
    //         });
    //       } else if (res.statusCode === 401) {
    //         reject({
    //           statusCode: 401,
    //           errMsg: '未登录'
    //         });
    //       } else {
    //         resolve({ userInfo: res.data });
    //       }
    //     },
    //     fail: err => {
    //       reject(err);
    //     }
    //   });
    // })
  },

  /**
   * 注册用户信息
   */
  registerUser: function (userInfo) {
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
}

module.exports = login;