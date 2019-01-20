//index.js
//获取应用实例
const app = getApp();
import util from '../../utils/util.js';
import login from '../../utils/login.js'

Page({
  data: {
    loginBackground: app.defaultImages.loginBackground,
    userInfo: {},
    isWeiChatUser: true,
    loginMsg: "手机号快速登录"
  },

  onLoad: function () {
    const _this = this;
    if (login.checkLogin()) {
      login.getUserInfo().then(res => {
        app.globalData.userInfo = res.userInfo;
        //跳转到主页面
        wx.switchTab({
          url: '../book/book'
        })
      })
    }
  },
  /**
   * 改变登录方式
   */
  changeLoginType: function() {
    this.setData({
      isWeiChatUser: !this.data.isWeiChatUser,
      loginMsg: this.data.isWeiChatUser ? "微信快速登录" : "手机号快速登录"
    })
  },
  /**
   * 微信登录
   */
  weichatLogin: function(e) {
    const _this = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      this.loginFail();
      return;
    }
    util.showLoading('正在登陆');
    login.login().then(res => {
      login.getUserInfo().then(res => {
        _this.loginSuccess(res.userInfo);
      }).catch(err => {
        if (err.statusCode === 400) {
          wx.getUserInfo({
            success: res => {
              let userInfo = res.userInfo;
              userInfo = {
                name: userInfo.nickName,
                avatar: userInfo.avatarUrl,
                gender: userInfo.gender,
                country: userInfo.country,
                province: userInfo.province,
                city: userInfo.city,
                language: userInfo.language
              };
              login.registerUser(userInfo).then(res => {
                if (res.success) {
                  _this.loginSuccess(userInfo);;
                }
              })
            },
            fail: () => {
              _this.loginFail();
            }
          })
        }
      })
    }).catch(err => {
      _this.loginFail();
    })
    // login.doLogin((obj) => {
    //   wx.hideLoading();
    //   if(obj.userInfo) {
    //     this.loginSuccess(obj.userInfo);
    //   } else {
    //     this.loginFail();
    //     util.showMessage('登录失败！');
    //   }
    // })
  },

  loginSuccess: (uesrInfo) => {
    app.globalData.userInfo = uesrInfo;
    //跳转到主页面
    wx.switchTab({
      url: '../book/book'
    })
  },

  loginFail: () => {
    util.showMessage('登录失败');
  },

  /**
   * 手机验证码登录
   */
  phoneCodeLogin: function() {

  }
})
