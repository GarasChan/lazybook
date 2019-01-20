// components/booklist/booklist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: String,
    income: Number,
    expense: Number,
    items: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() { 
    // let items = this.data.items;
    // items.forEach((item) => {
    //   item.label = item.label && item.label.replace(',', '&ensp;');
    // })
    // this.setData({ items });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetail: function(e) {
      let eventObj = {
        id: e.currentTarget.dataset.id
      }
      this.triggerEvent('go2detail', eventObj);
    },

    delBill: function(e) {
      let eventObj = {
        id: e.currentTarget.dataset.id
      }
      this.triggerEvent('delBill', eventObj);
    }
  }
})
