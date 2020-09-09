// pages/bookedit/bookEdit.js
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');
const iconsConfig = require('../../utils/iconsConfig.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNew: true,  //是否新增账单
    icon: {
      icon: iconsConfig.expense.shopping[0].icon,
      name: iconsConfig.expense.shopping[0].name
    },
    price: null,
    bookType: iconsConfig.bookTypes[0],
    iconType: iconsConfig.iconTypes[0][0],
    color: iconsConfig.iconColors[0],
    description: '',
    label: [],
    date: '',
    time: '',
    position: null,
    colors: iconsConfig.iconColors,
    icons: iconsConfig.expense.shopping,
    labels: [],
    // labels: ['早餐', '午餐', '晚餐', '衣服', '裤子', '蔬菜', '肉类', '零食', '饮料', '娱乐', '电影票'],
    multiArray: [iconsConfig.bookTypes, iconsConfig.iconTypes[0]],
    multiIndex: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.textModal = this.selectComponent('#textModal');
    this.calculator = this.selectComponent('#calculator');

    let data = null;
    if (options.type === 'edit') {
      //编辑账单
      wx.setNavigationBarTitle({
        title: '编辑账单',
      })
      let info = JSON.parse(options.info),
        bookIdx = info.bookType,
        iconIdx = info.iconType;
      info.isNew = false;
      info.bookType = iconsConfig.bookTypes[bookIdx];
      info.iconType = iconsConfig.iconTypes[bookIdx][iconIdx];
      info.multiIndex = [bookIdx, iconIdx];
      info.icons = iconsConfig[info.bookType.key][info.iconType.key];
      info.label = info.label ? info.label.split(/,|，/g) : [];
      // info.label = info.label && info.label.replace(',', '&ensp;');
      data = Object.assign({}, info);
    } else {
      //新增账单
      wx.setNavigationBarTitle({
        title: '新增账单',
      })
      const date = util.formatTime();
      data = {
        isNew: true,
        date: date.date,
        time: date.time
      }
    }
    data.labels = wx.getStorageSync('labels') || [];
    this.setData(data);
  },

  changePrice: function () {
    this.calculator.showCalculator(this.data.price);
  },

  confirmPrice: function (e) {
    const price = e.detail.result;
    this.setData({ price });
  },

  changeBookType: function (e) {
    const column = e.detail.column,
      idx = e.detail.value;
    let data = this.data.multiArray;
    if (column === 0) {
      data[1] = iconsConfig.iconTypes[idx];
      this.setData({
        bookType: iconsConfig.bookTypes[idx],
        multiArray: data
      });
    }
  },

  changeIconType: function (e) {
    const idx = e.detail.value,
      bookTypes = this.data.multiArray[0],
      iconTypes = this.data.multiArray[1],
      bookType = bookTypes[idx[0] || 0],
      iconType = iconTypes[idx[1] || 0];
    this.setData({
      bookType,
      iconType,
      multiIndex: idx,
      icons: iconsConfig[bookType.key][iconType.key]
    })
  },

  changeIcon: function (e) {
    const icon = this.data.icons[e.currentTarget.dataset.idx];
    this.setData({ icon });
  },

  changeColor: function (e) {
    const color = this.data.colors[e.target.dataset.idx];
    this.setData({ color });
  },

  showChangeDescriptionModal: function () {
    this.textModal.showModal('textarea', 'changeDescription', this.data.description);
  },

  changeDescription: function (value) {
    this.setData({
      description: value
    })
  },

  toggleLabel: function (e) {
    this.setData({
      label: e.detail.selectedItems
    });
    // let label = this.data.label ? this.data.label.split('&ensp;') : [],
    //   idx = label.indexOf(e.detail.value);
    // if (idx < 0) {
    //   label.push(e.detail.value);
    // } else {
    //   label.splice(idx, 1);
    // }
    // this.setData({
    //   label: label.join('&ensp;')
    // });
  },

  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  changeTime: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  changePosition: function () {
    const _this = this;
    wx.showActionSheet({
      itemList: ['删除位置信息', '更改位置信息'],
      success: res => {
        // 删除位置信息
        if (res.tapIndex === 0) {
          _this.setData({
            position: {
              address: null,
              latitude: null,
              longitude: null
            }
          })
        }
        // 更改位置信息
        if (res.tapIndex === 1) {
          wx.chooseLocation({
            success: res => {
              _this.setData({
                position: {
                  address: res.address,
                  latitude: res.latitude,
                  longitude: res.longitude
                }
              })
            },
            fail: (e) => {
              if (e.errMsg === 'chooseLocation:fail cancel') {
                return;
              }
              wx.showModal({
                title: '提示',
                content: '需要授权获取用户地理位置，是否跳转到设置页面开启授权？',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting();
                  } else if (res.cancel) {
                    util.showMessage('未授权获取用户地理位置');
                  }
                }
              })
            }
          });
        }
      }
    })
  },

  showLabelModal: function (e) {
    this.textModal.showModal('text', 'changeLabel');
  },

  // showAddLabelModal: function(e) {
  //   this.textModal.showModal('text', 'addLabel');
  // },  

  // showChangeLabelModal: function() {
  //   let label = this.data.label.split('&ensp;');
  //   label = label.map(item => {
  //     return `#${item}#`;
  //   }).join('');
  //   this.textModal.showModal('textarea', 'changeLabel', label);
  // },

  okEvent: function (e) {
    if (e.detail.property === 'changeLabel') {
      this.changeLabel(e.detail.value);
    } else if (e.detail.property === 'changeDescription') {
      this.changeDescription(e.detail.value);
    }
    // if (e.detail.property === 'addLabel') {
    //   this.addLabel(e.detail.value);
    // } else if (e.detail.property === 'changeLabel') {
    //   this.changeLabel(e.detail.value);
    // } else if (e.detail.property === 'changeDescription') {
    //   this.changeDescription(e.detail.value);
    // }
  },

  changeLabel: function (value) {
    if (!value) return;
    let val = value.split(/,|，/g),
      labels = this.data.labels,
      label = this.data.label;

    const idx = labels.indexOf(value);
    if (idx > -1) {
      if (label.indexOf(value)) {
        return;
      }
      label.push(value);
    } else {
      labels.unshift(value);
      label.push(value);
    }
    this.setData({
      labels,
      label
    })
    // if (!value) return;
    // let label = this.data.label.split('&ensp;');
    // if (label.indexOf(value) < 0) {
    //   label.push(value);
    // }
    // this.setData({
    //   label: label.join('&ensp;'),
    // });
  },

  // changeLabel: function (value) {
  //   let tempOri = value.match(/(#)([^#'",].+?)(#)/gi);
  //   let temp = tempOri.map((item, idx, arr) => {
  //     return util.trimAll(item.slice(1, -1));
  //     // 不晓得为啥报错
  //     // return item.match(/(?<=#)(.+?)(?=#)/g)[0];
  //   });
  //   // 标签去重
  //   let label = temp.filter((item, idx, arr) => {
  //     return arr.indexOf(item) === idx;
  //   })
  //   this.setData({
  //     label: label.join('&ensp;'),
  //   });
  // },

  saveBill: function () {
    if (this.data.price === 0) {
      util.showMessage('请输入正确的金额');
      return;
    }
    const data = {
      bookType: this.data.multiIndex[0],
      title: this.data.icon.name,
      icon: this.data.icon.icon,
      color: this.data.color,
      iconType: this.data.multiIndex[1],
      price: this.data.price || 0,
      recorder: app.globalData.userInfo ? app.globalData.userInfo.name : '神秘人士（未登录）',
      date: this.data.date,
      time: this.data.time,
      label: this.data.label.join(','),
      position: this.data.position && this.data.position.address,
      longitude: this.data.position && this.data.position.longitude,
      latitude: this.data.position && this.data.position.latitude,
      description: this.data.description || ''
    }
    if (this.data.isNew) {
      wx.cloud.callFunction({
        name: 'addBill',
        data
      }).then(() => {
        this.saveBillSucceed(data);
      })
    } else {
      data.id = this.data.id;
      wx.cloud.callFunction({
        name: 'updateBill',
        data
      }).then(() => {
        this.saveBillSucceed(data);
      })
    }
  },

  saveBillSucceed: function (data) {
    //保存常用标签到本地缓存
    wx.setStorage({
      key: 'labels',
      data: this.data.labels
    })
    const pages = getCurrentPages();
    const page = pages[pages.length - 2];
    if (page.route === 'pages/bookinfo/bookInfo') {
      // 更新bookInfo
      page.updateData(data);
      // 更新book
      const bookPage = pages.find(page => {
        return page.route === 'pages/book/book';
      })
      bookPage.loadData(true);
    }
    if (page.route === 'pages/book/book') {
      // 更新book
      // data.id = res.data.id;
      page.loadData(true);
    }
    wx.navigateBack({
      delta: 1
    })
  }
})