import login from './utils/login.js';
import config from './utils/config.js';
//app.js
App({
  onLaunch: function () {
    // const _this = this;
    this.defaultImages = config.defaultImages;
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
    // userInfo: {
    //   age: null,
    //   avatar: "https://wx.qlogo.cn/mmopen/vi_32/ibfR0MmeENEt6V3oaWjUWiaNZZy4Dy61icESNIAicJvPdEGTVQjU25EwpSUtqw3Ticn3kRSEUm632exqEAcPQbuqGgA/132",
    //   city: "Chengdu",
    //   country: "China",
    //   email: null,
    //   gender: 1,
    //   language: "zh_CN",
    //   name: "GarasChan",
    //   open_id: "obcSP4kiIQ7nyQRHlst2oKalpsww",
    //   password: null,
    //   phone: null,
    //   province: "Sichuan",
    //   signature: null,
    //   user_name: null
    // }
  },

  defaultImages: {
    loginBackground: 'http://www.garaschan.online:4290/resources/images/background/login.jpg',
    bookBackground: 'http://www.garaschan.online:4290/resources/images/background/book.jpg',
    myBackground: 'http://www.garaschan.online:4290/resources/images/background/my.jpg'
  }
})