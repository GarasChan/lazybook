// components/titlestasticsitem/titlestasticsjs
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: String,
    color: String,
    title: String,
    count: Number,
    price: Number,
    totalCount: Number,
    totalPrice: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    percent: 0
  },

  ready() {
    let percent = ((this.data.count / this.data.totalCount) * 100).toFixed(2);
    this.setData({ percent });
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
