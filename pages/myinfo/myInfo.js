// pages/myinfo/myInfo.js
const config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ibfR0MmeENEt6V3oaWjUWiaNZZy4Dy61icESNIAicJvPdEGTVQjU25EwpSUtqw3Ticn3kRSEUm632exqEAcPQbuqGgA/132',
    baseInfos: [
      {
        title: '昵称',
        key: 'name',
        value: 'GarasChan'
      },
      {
        title: '性别',
        key: 'gender',
        value: '男'
      },
      {
        title: '地区',
        key: 'region',
        value: '四川 成都'
      },
      {
        title: '生日',
        key: 'birthday',
        value: 'GarasChan'
      },
      {
        title: '职业',
        key: 'career',
        value: '学生'
      },
      {
        title: '个性签名',
        key: 'signature',
        value: '赵钟倩，我爱你，一万年！'
      }
    ],
    socialInfos: [
      {
        title: '手机号',
        key: 'phone',
        value: '15281698286'
      },
      {
        title: '电子邮箱',
        key: 'email',
        value: 'diyad7299@qq.com'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  changeAvatar: function() {
    const _this = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        _this.setData({
          avatar: tempFilePaths[0]
        })
        // const uploadTask = wx.uploadFile({
        //   url: config.urlComponents.uploadUrl,
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     user: 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     // do something
        //   }
        // })
        // uploadTask.onProgressUpdate((res) => {
        //   console.log('上传进度', res.progress)
        //   console.log('已经上传的数据长度', res.totalBytesSent)
        //   console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        // })

        // uploadTask.abort() // 取消上传任务
      }
    })
  },

  changeInfo: function(e) {
    const key = e.currentTarget.dataset.key;
    switch(key) {
      case 'name':

        break;
      case 'gender':

        break;
      case 'region':

        break;
      case 'birthday':

        break;
      case 'career':

        break;
      case 'signature':

        break;
      case 'phone':

        break;
      case 'email':

        break;
    }
  }
})