import login from './utils/login.js';
import config from './utils/config.js';
//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'garaschan',
        traceUser: true,
      })
    }
    let _this = this;
    // 获取设备信息
    try {
      const systemInfo = wx.getStorageSync('systemInfo');
      if (!systemInfo) {
        wx.getSystemInfo({
          success(res) {
            _this.globalData.systemInfo = Object.assign({}, res)
          }
        })
      }
    } catch (e) {
      wx.getSystemInfo({
        success(res) {
          _this.globalData.systemInfo = Object.assign({}, res)
        }
      })
    }

    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      _this.globalData.openid = res.result.openid;
    })

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.cloud.callFunction({
            name: 'queryUser'
          }).then(({result}) => {
            _this.globalData.userInfo = result.data[0];
          })
        }
      }
    })
  },

  globalData: {
    isLogin: false,
    openid: null,
    userInfo: null,
    systemInfo: null
  }
})