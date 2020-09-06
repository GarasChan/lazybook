//logs.js
const util = require('../../utils/util.js');
const login = require('../../utils/login.js');
const config = require('../../utils/config.js');
const app = getApp();

Page({
  data: {
    bookBackground: config.defaultImages.bookBackground,
    currentPage: 0,
    bills: [],
    scrollTop: 0,
    totalIncome: 0,
    totalExpense: 0
  },

  onLoad: function () {
    this.loadMoreBtn = this.selectComponent('#loadMore');
    this.init();
  },

  init: function () {
    this.setData({
      currentPage: 0,
      scroll2View: 'top'
    })
    this.loadMoreBtn && this.loadMoreBtn.init();
    this.loadData(true);
  },

  go2detail: function (e) {
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
          wx.cloud.callFunction({
            name: 'removeBill',
            data: {
              id
            }
          }).then(res => {
            util.showMessage('删除成功');
            bills[outerId].items.splice(innerId, 1);
            if (bills[outerId].items.length === 0) {
              bills.splice(outerId, 1);
            }
            this.setData({ bills });
          }).catch(res => {
            util.showMessage('删除失败');
          })
        }
      }
    })
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
    if (this.data.currentPage === -1) return;
    this.loadMoreBtn.showLoading();
    this.loadData(false, (success) => {
      this.loadMoreBtn.hideLoading();
      if (success) {
        if (this.data.currentPage === -1) {
          this.loadMoreBtn.showFinish(false);
        } else {
          this.loadMoreBtn.showFinish(true);
        }
      } else {
        this.loadMoreBtn.showError();
      }
    });
  },

  loadData: function (isReload, callBack) {
    let currentPage = isReload ? 1 : this.data.currentPage + 1;
    wx.cloud.callFunction({
      name: 'queryBill',
      data: {
        currentPage,
        pageSize: config.pageSize
      }
    }).then(res => {
      const datas = res.result.data;
      // 没有更多账单了
      if (datas.length < config.pageSize) {
        currentPage = -1;
      }
      let bills = [];
      if (isReload) {
        bills = util.changeBills2Lists(datas);
      } else {
        bills = util.addBills2Lists(this.data.bills, datas)
      }
      this.setData({
        currentPage,
        bills
      }, () => {
        this.getPriceStatistics();
        callBack && callBack(true);
      })
    }).catch(() => {
      callBack && callBack(false);
    })
  },

  getPriceStatistics: function () {
    let income = 0, expense = 0;
    this.data.bills.forEach(item => {
      income += item.income;
      expense += item.expense;
    })
    this.setData({
      totalIncome: income,
      totalExpense: expense
    })
  }

})
