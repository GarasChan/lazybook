// pages/aboutus/aboutus.js
const config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: '../../images/lazybook.png',
    name: config.programInfo.name,
    label: config.programInfo.label,
    version: config.programInfo.version,
    isShowDetail: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  previewLogo: function() {
    wx.previewImage({
      urls: [this.data.logo]
    })
  },

  showDetail: function() {
    this.setData({
      isShowDetail: !this.data.isShowDetail
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})