// pages/system_setting/system-setting.js
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageSize: 0,
    version: config.programInfo.version,
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const storageSize = wx.getStorageInfoSync().currentSize;
    this.setData({ storageSize });
  },

  exitLogin: function () {
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

  checkUpdate: function() {
    util.showLoading('获取版本信息...');
    setTimeout(() => {
      util.hideLoading();
      util.showMessage('当前已是最新版本');
    }, 1500)
  }
})