// components/textmodal/textmodal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    isShow: {
      type: Boolean,
      value: false
    },
    isFocus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bottom: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal: function (type = 'text', property , value = '') {
      this.setData({
        type,
        property,
        value,
        isShow: true
      }, () => {
        this.setData({
          isFocus: true
        })
      })
    },

    hideModal: function () {
      this.setData({
        isShow: false,
        isFocus: false,
        bottom: 0
      })
    },

    changeType: function(type) {
      this.setData({ type })
    },

    focusEvent: function(e) {
      const h = e.detail.height;
      if (h) {
        this.setData({
          bottom: e.detail.height
        })
      }
      
    },

    inputEvent: function (e) {
      this.setData({
        value: e.detail.value
      })
    },

    okEvent: function () {
      const data = {
        property: this.data.property,
        value: this.data.value
      };
      this.setData({
        value: ''
      })
      this.triggerEvent('okEvent', data);
    }
  }
})
