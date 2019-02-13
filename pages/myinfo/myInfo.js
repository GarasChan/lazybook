// pages/myinfo/myInfo.js
const config = require('../../utils/config.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '../../images/avatar.jpg',
    name: '',
    gender: 0,
    region: '',
    birthday: '',
    career: '',
    signature: '',
    phone: '',
    email: '',

    genderArr: ['男', '女', '保密'],
    sourceType: ['camera', 'album']
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
        if (userInfo[key] !== undefined && userInfo[key] !== null) {
          const val = userInfo[key];
          data[key] = val;
          if (key === 'avatar' && val.indexOf('https://') < 0) {
            data.avatar = config.host + 'resources/images/avatar/' + val;
          } else if (key === 'gender') {
            data.gender = util.code2gender(val);
          }
        }
      }
      this.setData(data);
    }
  },

  avatarErr: function(e) {
    this.setData({
      avatar: '../../images/avatar.jpg'
    })
  },

  previewAvatar: function() {
    wx.previewImage({
      urls: [this.data.avatar]
    })
  },

  changeAvatar: function() {
    const _this = this;
    wx.showActionSheet({
      itemList: ['拍一张', '从相册选择'],
      success: res => {
        wx.chooseImage({
          count: 1,
          sourceType: [_this.data.sourceType[res.tapIndex]],
          success(res) {
            const tempFilePath = res.tempFilePaths[0];
            _this.setData({
              avatar: tempFilePath
            })
            util.uploadImage(tempFilePath, 'avatar').then(res => {
              app.globalData.userInfo.avatar = config.host + 'resources/images/avatar/' + res.name;
            })
            // const uploadTask = wx.uploadFile({
            //   url: config.urlComponents.uploadUrl,
            //   filePath: tempFilePath,
            //   header: {
            //     skey: wx.getStorageSync('skey')
            //   },
            //   name: 'avatar',
            //   success: res => {
            //     const resObj = JSON.parse(res.data);
            //     if (resObj.success) {
            //       util.showMessage('头像修改成功');
            //       app.globalData.userInfo.avatar = config.host + 'resources/images/avatar/' + resObj.avatar;
            //     }
            //   },
            //   fail: err => {
            //     util.showMessage('图片上传失败');
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
    })
    
  },

  uploadAvatar: function() {

  },

  changeGender: function(e) {
    const gender = util.code2gender(e.detail.value);
    this.setData({ gender });
    this.saveInfo(e.detail.value, 'gender', '性别');
  },

  changeRegion: function(e) {
    const region = e.detail.value.join(' ');
    this.setData({ region });
    this.saveInfo(region, 'region', '地区');
  },

  changeBirthday: function(e) {
    const birthday = e.detail.value;
    this.setData({ birthday });
    this.saveInfo(birthday, 'birthday', '生日');
  },


  changeInfo: function(e) {
    const key = e.currentTarget.dataset.key,
      title = e.currentTarget.dataset.title,
      value = this.data[key];
    switch (key) {
      case 'name':
      case 'career':
      case 'signature':
      case 'phone':
      case 'email':
        this.inputModal.show(value, key, title);
        break;
    }
  },

  confirmEvent: function(e) {
    const { value, key, title } = e.detail;
    this.setData({
      [key]: value
    })
    this.saveInfo(value, key, title);
    this.inputModal.hide();
  },

  saveInfo: function (value, key, title) {
    title = title || key;
    util.request({
      url: config.urlComponents.userUrl,
      method: 'PUT',
      data: {
        [key]: value
      },
      success: res => {
        if (res.data.success) {
          util.showMessage(`"${title}" 修改成功`)
        }
        app.globalData.userInfo[key] = value;
      },
      fail: err => {
        util.showMessage(`"${title}" 修改失败`)
      }
    })
  },

  // saveInfo: function() {
  //   // avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ibfR0MmeENEt6V3oaWjUWiaNZZy4Dy61icESNIAicJvPdEGTVQjU25EwpSUtqw3Ticn3kRSEUm632exqEAcPQbuqGgA/132',
  //   //   name: '',
  //   //     gender: 0,
  //   //       region: '',
  //   //         birthday: '',
  //   //           career: '',
  //   //             signature: '',
  //   //               phone: '',
  //   //                 email: '',
  //   let data = {
  //     name: this.data.name,
  //     gender: util.code2gender(this.data.gender),
  //     region: this.data.region,
  //     birthday: this.data.birthday,
  //     career: this.data.career,
  //     signature: this.data.signature,
  //     phone: this.data.phone,
  //     email:this.data.email
  //   }
  //   util.request({
  //     url: config.urlComponents.userUrl,
  //     method: 'PUT',
  //     data,
  //     success: res => {
  //       if (res.data.success) {

  //       }
  //     },
  //     fail: err => {

  //     }
  //   })
  // }
})