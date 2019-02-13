// pages/my/my.js
const config = require('../../utils/config.js');
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBackground: config.defaultImages.myBackground,
    userInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo;
    if (userInfo) {
      if (userInfo.avatar && userInfo.avatar.indexOf('https://') < 0) {
        userInfo.avatar = config.host + 'resources/images/avatar/' + userInfo.avatar;
      }
      this.setData({ userInfo })
    }
  },

  avatarErr: function (e) {
    this.setData({
      'userInfo.avatar': '../../images/avatar.jpg'
    })
  },

  go2userInfo: function () {
    wx.navigateTo({
      url: '../myinfo/myInfo',
    })
  },

  openSetting: function() {
    wx.openSetting();
  },

  go2systemSetting: function() {
    wx.navigateTo({
      url: '../systemsetting/systemSetting',
    })
  }, 

  go2aboutUs: function() {
    wx.navigateTo({
      url: '../aboutus/aboutUs',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      'userInfo.avatar': app.globalData.userInfo.avatar + '?t=' + new Date().getTime(),
      'userInfo.name': app.globalData.userInfo.name,
      'userInfo.signature': app.globalData.userInfo.signature
    }, () => {
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
})