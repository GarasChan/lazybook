import login from './utils/login.js';
import config from './utils/config.js';
//app.js
App({
  onLaunch: function () {
    
    // if (!login.checkLogin()) {
    //   wx.redirectTo({
    //     url: './pages/index/index'
    //   })
    //   return;
    // }
    // login.getUserInfo().then(res => {
    //   _this.globalData.userInfo = res.userInfo;
    //   //跳转到主页面
    //   wx.switchTab({
    //     url: './pages/book/book'
    //   })
    // }).catch(err => {
    //   wx.redirectTo({
    //     url: './pages/index/index'
    //   })
    // })
  },

  globalData: {
    userInfo: null
  }
})