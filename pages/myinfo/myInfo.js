// pages/myinfo/myInfo.js
const config = require('../../utils/config.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ibfR0MmeENEt6V3oaWjUWiaNZZy4Dy61icESNIAicJvPdEGTVQjU25EwpSUtqw3Ticn3kRSEUm632exqEAcPQbuqGgA/132',
    name: '',
    gender: 0,
    region: '',
    birthday: '',
    career: '',
    signature: '',
    phone: '',
    email: '',

    genderArr: ['男', '女', '保密'],
    careerArr: ['学生', '工人', '教师', '医生', '公务员', '学生', '学生']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inputModal = this.selectComponent('#inputModal');

    const userInfo = app.globalData.userInfo;
    let data = {};
    if (userInfo) {
      for(let key in userInfo) {
        const val = userInfo[key];
        data[key] = val;
        if (key === 'avatar' && val.indexOf('https://') < 0) {
          data.avatar = config.host + 'resources/images/avatar/' + val;
        } else if (key === 'gender') {
          data.gender = util.code2gender(val);
        }
      }
      this.setData(data);
    }
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
        wx.uploadFile({
          url: config.urlComponents.uploadUrl,
          filePath: tempFilePaths[0],
          header: {
            skey: wx.getStorageSync('skey')
          },
          name: 'avatar',
          success(res) {
            const data = res.data
            // do something
          },
          fail: err => {
            console.log(err);
          }
        })
        // uploadTask.onProgressUpdate((res) => {
        //   console.log('上传进度', res.progress)
        //   console.log('已经上传的数据长度', res.totalBytesSent)
        //   console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        // })

        // uploadTask.abort() // 取消上传任务
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  changeInfo: function(e) {
    const key = e.currentTarget.dataset.key,
      title = e.currentTarget.dataset.title,
      value = this.data[key];
    switch (key) {
      case 'name':
      case 'signature':
      case 'phone':
      case 'email':
        this.inputModal.show(value, key, title);
        break;
      case 'gender':

        break;
      case 'region':

        break;
      case 'birthday':

        break;
      case 'career':

        break;
    }
  },

  confirmEvent: function(e) {
    this.setData({
      [e.detail.key]: e.detail.value
    })
    this.inputModal.hide();
  }
})