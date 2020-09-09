// pages/statistics.js
const config = require('../../utils/config.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlePieOpts: {
      lazyLoad: true // 延迟加载组件
    },
    datas: [],
    totalCount: 0,
    totalPrice: 0,
    bookType: 0 //默认支出
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getDatas();
  },

  onShow: function (options) {
    this.getDatas().then((datas) => {
      this.initPieChart(datas);
    }).catch(() => {});
  },

  initPieChart: function (datas) {
    if (!datas.length) return;
    const _this = this;
    _this.titlePieComponent = _this.selectComponent('#titlePie');
    _this.titlePieComponent.init((canvas, width, height, F2) => {
      let data = datas.map(data => {
        return {
          name: data.title,
          price: data.price,
          percent: Number((data.count / _this.data.totalCount).toFixed(2)),
          a: '1'
        }
      })
      let chart = new F2.Chart({
        el: canvas,
        width,
        height
      });
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            return val * 100 + '%';
          }
        }
      });
      chart.legend(false);
      chart.tooltip(false);
      chart.coord('polar', {
        transposed: true,
        radius: 1,
        innerRadius: 0.7
      });
      chart.pieLabel({
        skipOverlapLabels: true,
        sidePadding: 20,
        label1: function label1(data) {
          return {
            text: '￥' + data.price,
            fill: '#343434'
          };
        },
        label2: function label2(data) {
          return {
            text: data.name,
            fill: '#999',
            fontSize: 10
          };
        },
        onClick: function onClick(ev) {
          var data = ev.data;
        }
      })
      chart.axis(false);
      chart
        .interval()
        .position('a*percent')
        .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
        .adjust('stack')
        .style({
          lineWidth: 1,
          lineJoin: 'round',
          lineCap: 'round'
        });
      // // 价格显示文本
      // chart
      //   .guide()
      //   .text({
      //     position: ['50%', '50%'],
      //     top: true, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
      //     content: _this.data.bookType ? '总支出' : '总收入', // 显示的文本内容
      //     style: {
      //       fill: '#999', // 文本颜色
      //       fontSize: '10', // 文本大小
      //       textBaseline: 'top'
      //     },
      //     offsetY: 2
      //   });
      // // 总支出和中收入文本
      // chart
      //   .guide()
      //   .text({
      //     position: ['50%', '50%'],
      //     top: true, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
      //     content: totalPrice, // 显示的文本内容
      //     style: {
      //       fill: '#666', // 文本颜色
      //       fontSize: '12', // 文本大小
      //       fontWeight: 'bold', // 文本粗细
      //       textBaseline: 'bottom'
      //     }
      //   });

      chart.render();
      _this.chart = chart;
      return chart;
    });
  },

  getDatas: function (bookType = this.data.bookType) {
    return wx.cloud.callFunction({
      name: 'statistics',
      data: {
        bookType
      }
    }).then(({ result }) => {
      let datas = result.list,
        totalCount = 0,
        totalPrice = 0;
      if (datas.length > 1) {
        totalCount = datas.reduce((prev, curr) => {
          let total = prev.count != null ? prev.count : prev;
          return total + curr.count;
        });
        totalPrice = datas.reduce((prev, curr) => {
          let total = prev.price != null ? prev.price : prev;
          return total + curr.price;
        });
      } else {
        totalCount = datas[0].count;
        totalPrice = datas[0].price;
      }

       // 这里将总账单数和总价格保存一下
       this.setData({
        datas,
        totalCount,
        totalPrice,
        bookType
      })

      return datas;
    }).catch(err => {
      console.log(err);
    })
  },

  changeBookType: function () {
    let bookType = Number(!this.data.bookType);
    const _this = this;
    this.getDatas(bookType).then((datas) => {
      _this.updateChart(datas);
    });
  },

  updateChart: function (datas = []) {
    if (!datas.length) return;
    let data = datas.map(data => {
      return {
        name: data.title,
        price: data.price,
        percent: Number((data.count / this.data.totalCount).toFixed(2)),
        a: '1'
      }
    })
    this.chart.changeData(data);
  }
})