// components/accordion/accordion.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '',
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeStatus: function() {
      this.setData({
        isShow: !this.data.isShow
      })
      this.triggerEvent('changeStatus');
    }
  }
})
