// pages/my/my.js
const config = require('../../utils/config.js');
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBackground: config.defaultImages.myBackground,
    userInfo: "",
    allDays: 0,
    allTimes: 0
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

  onShow: function() {
    this.getCountStatistics(false);
    this.setData({
      'userInfo.avatar': app.globalData.userInfo.avatar + '?t=' + new Date().getTime(),
      'userInfo.name': app.globalData.userInfo.name,
      'userInfo.signature': app.globalData.userInfo.signature
    })
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

  go2recommendUs: function() {
    util.showMessage('努力开发中...');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getCountStatistics(true);
    this.setData({
      'userInfo.avatar': app.globalData.userInfo.avatar + '?t=' + new Date().getTime(),
      'userInfo.name': app.globalData.userInfo.name,
      'userInfo.signature': app.globalData.userInfo.signature
    }, () => {
      wx.stopPullDownRefresh(false); //停止下拉刷新
    })
  },

  getCountStatistics: function (isPullDown) {
    const _this = this;
    isPullDown && util.showLoading('数据更新中...')
    wx.cloud.callFunction({
      name: 'calcBillCount'
    }).then(({result}) => {
      _this.setData({
        allDays: result.allDays,
        allTimes: result.allTimes
      })
      isPullDown && util.showMessage('数据更新成功');
    }).catch(err => {
      util.hideLoading();
      util.showMessage('信息获取失败');
    })
  }
})