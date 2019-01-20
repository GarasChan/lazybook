//logs.js
const util = require('../../utils/util.js');
const login = require('../../utils/login.js');
const config = require('../../utils/config.js');
const app = getApp();

Page({
  data: {
    bookBackground: app.defaultImages.bookBackground,
    page: 0,
    bills: []
    // bills: [
    //   {
    //     date: '2018-11-09',
    //     expense: 21,
    //     income: 0,
    //     items: [
    //       {
    //         id: 0,
    //         bookType: 0,
    //         iconType: 0,
    //         title: '吃喝',
    //         icon: 'shenghuo',
    //         color: '#ff8a65',
    //         price: 14.0,
    //         label: '早餐',
    //         time: '12:08',
    //         position: '成都理工大学',
    //         recorder: 'GarasChan',
    //         longitude: 104.07,
    //         latitude: 30.67
    //       },
    //       {
    //         id: 1,
    //         bookType: 0,
    //         iconType: 1,
    //         title: '吃喝',
    //         icon: 'dianying',
    //         color: '#D9E3F0',
    //         price: 7.0,
    //         label: '早餐,晚餐',
    //         time: '19:37',
    //         recorder: 'GarasChan',
    //         position: '西南科技大学',
    //         longitude: 104.07,
    //         latitude: 30.67, 
    //         description: '么么哒！'
    //       }
    //     ]
    //   },
    //   {
    //     date: '2018-11-10',
    //     expense: 48,
    //     income: 0,
    //     items: [
    //       {
    //         id: 2,
    //         bookType: 0,
    //         iconType: 0,
    //         title: '吃喝',
    //         icon: 'kafei',
    //         color: '#F47373',
    //         price: 14.0,
    //         label: '午餐,衣服',
    //         time: '12:08',
    //         recorder: 'GarasChan'
    //       },
    //       {
    //         id: 3,
    //         bookType: 0,
    //         iconType: 2,
    //         title: '吃喝',
    //         icon: 'youfei',
    //         color: '#697689',
    //         price: 7.0,
    //         label: '晚餐',
    //         time: '19:37',
    //         position: '成都理工大学',
    //         recorder: 'GarasChan',
    //         longitude: 104.07,
    //         latitude: 30.67
    //       },
    //       {
    //         id: 4,
    //         bookType: 0,
    //         iconType: 0,
    //         title: '吃喝',
    //         icon: 'shenghuo',
    //         color: '#37D67A',
    //         price: 6.0,
    //         label: '早餐',
    //         time: '08:08',
    //         recorder: 'GarasChan',
    //         position: '四川大学',
    //         longitude: 104.07,
    //         latitude: 30.67
    //       },
    //       {
    //         id: 5,
    //         bookType: 0,
    //         iconType: 1,
    //         title: '吃喝',
    //         icon: 'shenghuo',
    //         color: '#2CCCE4',
    //         price: 14.0,
    //         label: '午餐',
    //         time: '12:08',
    //         recorder: 'GarasChan',
    //         position: '重庆大学',
    //         longitude: 104.07,
    //         latitude: 30.67
    //       },
    //       {
    //         id: 6,
    //         bookType: 0,
    //         iconType: 0,
    //         title: '吃喝',
    //         icon: 'dianying',
    //         color: '#555555',
    //         price: 7.0,
    //         label: '晚餐',
    //         time: '19:37',
    //         recorder: 'GarasChan',
    //         position: '北京大学',
    //         longitude: 104.07,
    //         latitude: 30.67
    //       },
    //     ]
    //   },
    //   {
    //     date: '2018-09-24',
    //     expense: 6,
    //     income: 20,
    //     items: [
    //       {
    //         id: 7,
    //         bookType: 0,
    //         iconType: 1,
    //         title: '吃喝',
    //         icon: 'shenghuo',
    //         color: '#dce775',
    //         price: 6,
    //         label: '早餐',
    //         time: '08:08',
    //         recorder: 'GarasChan',
    //         position: '清华大学',
    //         longitude: 104.07,
    //         latitude: 30.67
    //       },
    //       {
    //         id: 8,
    //         bookType: 1,
    //         iconType: 1,
    //         title: '吃喝',
    //         icon: 'kafei',
    //         color: '#ba68c8',
    //         price: 20,
    //         label: '早餐',
    //         time: '08:08',
    //         recorder: 'GarasChan'
    //       }
    //     ]
    //   }
    // ]
  },

  onLoad: function () {
    this.loadMoreBtn = this.selectComponent('#loadMore');
    this.loadData(true);
  },

  go2detail: function(e) {
    const outerId = e.currentTarget.dataset.id,
          innerId = e.detail.id,
          date = this.data.bills[outerId].date;
    let data = Object.assign({}, this.data.bills[outerId].items[innerId], { date })
    wx.navigateTo({
      url: `../bookinfo/bookInfo?info=${JSON.stringify(data)}`,
    })
  },

  delBill: function (e) {
    const _this = this;
    const outerId = e.currentTarget.dataset.id,
      innerId = e.detail.id,
      date = this.data.bills[outerId].date;
    let bills = this.data.bills;
    wx.showModal({
      title: '确定删除账单？',
      content: '删除后，该账单不可恢复',
      success: res => {
        if (res.confirm) {
          const id = bills[outerId].items[innerId].id;
          util.request({
            url: `${config.urlComponents.billUrl}?id=${id}`,
            method: 'DELETE',
            success: res => {
              if (res.data.success) {
                util.showMessage('删除成功');
                bills[outerId].items.splice(innerId, 1);
                if (bills[outerId].items.length === 0) {
                  bills.splice(outerId, 1);
                }
                this.setData({ bills });
              }
            },
            fail: res => {
              util.showMessage('删除失败');
            }
          })
        }
      }
    })
    let data = Object.assign({}, this.data.bills[outerId].items[innerId], { date })
  },

  //下拉刷新事件
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad();
    //模拟加载
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  //上拉刷新事件
  loadMoreData: function (e) {
    this.loadMoreBtn.loadMore();
    this.loadData();
    setTimeout(() => {
      this.loadMoreBtn.loadMoreComplete();
    }, 3000);
    // setTimeout(() => {
    //   this.loadMoreBtn.loadMoreComplete(false);
    // }, 5000);
  },

  loadData: function (isReload) {
    const _this = this;
    let page = isReload ? 1 : this.data.page + 1;
    util.request({
      url: `${config.urlComponents.billUrl}?page=${page}&pageSize=${config.pageSize}`,
      method: 'GET',
      success: res => {
        // 没有更多账单了
        // if(res.data.length < config.pageSize) {
        //   page = -1;
        // }
        let bills = [];
        if(isReload) {
          bills = util.changeBills2Lists(res.data);
        } else {
          bills = util.addBills2Lists(this.data.bills, res.data)
        }
        _this.setData({
          page,
          bills
        })
      }
    })    
  },

})
