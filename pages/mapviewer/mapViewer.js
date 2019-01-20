// pages/mapviewer/mapViewer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapInfo: {},
    markers: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mapInfo = JSON.parse(options.info);
    let markers = [{
      iconPath: '/images/coordinate.png',
      id: mapInfo.id,
      longitude: mapInfo.longitude,
      latitude: mapInfo.latitude,
      width: 28,
      height: 28,
      anchor: { x: .5, y: .5 },
      name: mapInfo.name || ''
    }];
    if (mapInfo.name) {
      markers[0].callout = {
        content: mapInfo.name,
        fontSize: 14,
        color: '#000',
        bgColor: '#fff',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd'
      }
    }
    this.setData({
      mapInfo,
      markers
    })
  },

  viewMyLocation: function() {
    this.mapCtx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap');
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