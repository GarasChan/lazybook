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
      for (let key in userInfo) {
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

  avatarErr: function (e) {
    this.setData({
      avatar: '../../images/avatar.jpg'
    })
  },

  previewAvatar: function () {
    wx.previewImage({
      urls: [`${this.data.avatar}?t=${new Date().getTime()}`]
    })
  },

  changeAvatar: function () {
    const _this = this;
    wx.showActionSheet({
      itemList: ['拍一张', '从相册选择'],
      success: res => {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: [_this.data.sourceType[res.tapIndex]],
          success(res) {
            const tempFilePath = res.tempFilePaths[0],
            suffix = tempFilePath.match(/(.+)\.(.+)$/)[2];
            util.uploadFile(tempFilePath, `lazybook/images/avatar/${app.globalData.userInfo.openid}.${suffix}`).then(({result}) => {
              app.globalData.userInfo.avatar = result;
              _this.setData({
                avatar: `${result}?t=${new Date().getTime()}`
              })
            }).catch(err => {
              console.log(err);
            })
          }
        })
      },
    })

  },

  changeGender: function (e) {
    const gender = util.code2gender(e.detail.value);
    this.setData({ gender });
    this.saveInfo(e.detail.value, 'gender', '性别');
  },

  changeRegion: function (e) {
    const region = e.detail.value.join(' ');
    this.setData({ region });
    this.saveInfo(region, 'region', '地区');
  },

  changeBirthday: function (e) {
    const birthday = e.detail.value;
    this.setData({ birthday });
    this.saveInfo(birthday, 'birthday', '生日');
  },


  changeInfo: function (e) {
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

  confirmEvent: function (e) {
    const { value, key, title } = e.detail;
    this.setData({
      [key]: value
    })
    this.saveInfo(value, key, title);
    this.inputModal.hide();
  },

  saveInfo: function (value, key, title) {
    title = title || key;
    wx.cloud.callFunction({
      name: 'updateUser',
      data: {
        [key]: value
      }
    }).then(res => {
      util.showMessage(`"${title}" 修改成功`)
      app.globalData.userInfo[key] = value;
    }).catch(err => {
      util.showMessage(`"${title}" 修改失败`)
    })
  },
})