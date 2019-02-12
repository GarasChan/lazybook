// pages/system_setting/system-setting.js
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageSize: 0
  },

  exitLogin: function() {
    wx.showModal({
      title: '提示',
      content: '确定退出当前账号',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync('skey');
          wx.reLaunch({
            url: '../index/index'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const storageSize = wx.getStorageInfoSync().currentSize;
    this.setData({ storageSize });
  },

  clearStorage: function() {
    const _this = this;
    wx.showModal({
      title: '是否清除缓存',
      content: '清除后，同时也会清除登录信息',
      success(res) {
        if (res.confirm) {
          wx.clearStorage();
          _this.setData({
            storageSize: 0
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})