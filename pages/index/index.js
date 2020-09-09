//index.js
//获取应用实例
const app = getApp();
const config = require('../../utils/config.js');
const util = require('../../utils/util.js');
const login = require('../../utils/login.js');

Page({
  data: {
    loginBackground: config.defaultImages.loginBackground,
    userInfo: {},
    isWeiChatUser: true,
    loginMsg: "手机号快速登录"
  },

  onLoad: function () {
    // const _this = this;
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.cloud.callFunction({
    //         name: 'queryUser'
    //       }).then(({result}) => {
    //         app.globalData.userInfo = result.data[0];
    //         //跳转到主页面
    //         wx.switchTab({
    //           url: '../book/book'
    //         })
    //       })
    //       // _this.getUserInfo(app.globalData.openid).then(res => {
    //       //   app.globalData.userInfo = res.userInfo;
    //       //   //跳转到主页面
    //       //   wx.switchTab({
    //       //     url: '../book/book'
    //       //   })
    //       // })
    //     }
    //   }
    // })

    // if (login.checkLogin()) {
    //   login.getUserInfo().then(res => {
    //     app.globalData.userInfo = res.userInfo;
    //     //跳转到主页面
    //     wx.switchTab({
    //       url: '../book/book'
    //     })
    //   })
    // }
  },

  /**
   * 改变登录方式
   */
  changeLoginType: function () {
    this.setData({
      isWeiChatUser: !this.data.isWeiChatUser,
      loginMsg: this.data.isWeiChatUser ? "微信快速登录" : "手机号快速登录"
    })
  },
  /**
   * 微信登录
   */
  weichatLogin: function (e) {
    const _this = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      this.loginFail();
      return;
    }
    util.showLoading('正在登陆...');
    wx.cloud.callFunction({
      name: 'queryUser'
    }).then(({ result }) => {
      if (result.data[0]) {
        _this.loginSuccess(result.data[0]);
      } else {
        wx.getUserInfo({
          success: ({ userInfo }) => {
            userInfo = {
              name: userInfo.nickName.toString(),
              avatar: userInfo.avatarUrl,
              gender: userInfo.gender,
              region: userInfo.province + ' ' + userInfo.city,
              language: userInfo.language
            };
            wx.cloud.callFunction({
              name: 'addUser',
              data: userInfo
            }).then(res => {
              _this.loginSuccess(userInfo);
            }).catch(err => {
              _this.loginFail();
            })
          },
          fail: () => {
            _this.loginFail();
          }
        })
      }
    }).catch(err => {
      _this.loginFail();
    })
  },

  loginSuccess: (uesrInfo) => {
    app.globalData.userInfo = uesrInfo;
    //跳转到主页面
    wx.reLaunch({
      url: '../book/book'
    })
  },

  loginFail: () => {
    util.hideLoading();
    util.showMessage('登录失败');
  },

  /**
   * 手机验证码登录
   */
  phoneCodeLogin: function () {
    util.showMessage('开发中...')
  }
})
