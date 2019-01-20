// pages/bookinfo/bookInfo.js
const util = require('../../utils/util.js');
const iconsConfig = require('../../utils/iconsConfig.js');
const config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    mapInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const info = JSON.parse(options.info);
    // 将','隔开的标签替换成'&ensp;'空格符
    // info.label = info.label && info.label.replace(',', '&ensp;');
    wx.setNavigationBarTitle({
      title: iconsConfig.bookTypes[info.bookType].value,
    })
    let mapInfo = this.createMapInfo(info.longitude, info.latitude, info.position);
    // if (info.longitude && info.latitude) {
    //   mapInfo = {
    //     longitude: info.longitude,
    //     latitude: info.latitude,
    //     name: info.position || '',
    //     markers: [{
    //       iconPath: '/images/coordinate.png',
    //       id: info.id,
    //       longitude: info.longitude,
    //       latitude: info.latitude,
    //       width: 28,
    //       height: 28,
    //       anchor: { x: .5, y: 1 }
    //     }]
    //   }
    //   if (info.position) {
    //     mapInfo.markers[0].callout = {
    //       content: info.position || '未知区域',
    //       fontSize: 14,
    //       color: '#000',
    //       bgColor: '#fff',
    //       padding: 8,
    //       borderRadius: 4,
    //       borderWidth: 1,
    //       borderColor: '#ddd'
    //     }
    //   }
    // }
    this.setData({ 
      info,
      mapInfo
    })
  },

  createMapInfo: function (lon, lat, name) {
    if (!lon || !lat) return null;
    let mapInfo = {
      longitude: lon,
      latitude: lat,
      name: name || '',
      markers: [{
        iconPath: '/images/coordinate.png',
        // id: info.id,
        longitude: lon,
        latitude: lat,
        width: 28,
        height: 28,
        anchor: { x: .5, y: 1 }
      }]
    }
    if (name) {
      mapInfo.markers[0].callout = {
        content: name,
        fontSize: 14,
        color: '#000',
        bgColor: '#fff',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd'
      }
    }
    return mapInfo;
  },

  go2viewer: function() {
    const option = {
      id: this.data.info.id,
      longitude: this.data.info.longitude,
      latitude: this.data.info.latitude,
      name: this.data.info.position
    }
    wx.navigateTo({
      url: `../mapviewer/mapViewer?info=${JSON.stringify(option)}`,
    })
  },

  delBill: function() {
    const id = this.data.info.id;
    wx.showModal({
      title: '确定删除账单？',
      content: '删除后，该账单不可恢复',
      success: res => {
        if (res.confirm) {
          //获取book页面实例
          const bookInstance = getCurrentPages()[0];
          util.request({
            url: `${config.urlComponents.billUrl}?id=${id}`,
            method: 'DELETE',
            success: res => {
              if (res.data.success) {
                util.showMessage('删除成功');
                bookInstance.loadData(true);
                wx.navigateBack({
                  delta: 1
                })
              }
            },
            fail: res => {
              util.showMessage('删除失败');
            }
          })
        }
      }
    })
    
  },

  go2edit: function() {
    let data = {
      id: this.data.info.id,
      icon: {
        icon: this.data.info.icon,
        name: this.data.info.title
      },
      price: this.data.info.price,
      bookType: this.data.info.bookType,
      iconType: this.data.info.iconType,
      color: this.data.info.color,
      label: this.data.info.label,
      date: this.data.info.date,
      time: this.data.info.time,
      description: this.data.info.description,
      position: {
        address: this.data.info.position,
        longitude: this.data.info.longitude,
        latitude: this.data.info.latitude
      }
    }
    wx.navigateTo({
      url: `../billedit/billEdit?type=edit&info=${JSON.stringify(data)}`
    })
  },

  updateData: function (data) {
    let info = this.data.info;
    info.bookType = data.bookType;
    info.iconType = data.iconType;
    info.title = data.title;
    info.icon = data.icon;
    info.color = data.color;
    info.price = data.price;
    info.label = data.label;
    info.time = data.time;
    info.recorder = data.recorder;
    info.date = data.date;

    const mapInfo = this.createMapInfo(data.longitude, data.latitude, data.position);

    this.setData({
      info,
      mapInfo
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