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
  },

  globalData: {
    openid: null,
    userInfo: null,
    systemInfo: null
  }
})