// components/inputModal/modal.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    isFocus: false,
    key: '',
    title: '请输入',
    value: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: function(value, key, title) {
      this.setData({
        isShow: true,
        isFocus: true,
        key: key,
        title: title,
        value:value
      });
    },

    hide: function() {
      this.setData({
        isShow: false,
        isFocus: false,
        key: '',
        title: '请输入',
        value: ''
      })
    },

    inputEvent: function(e) {
      this.setData({
        value: e.detail.value
      })
    },

    okEvent: function() {
      const data = {
        value: this.data.value,
        key: this.data.key,
        title: this.data.title
      }
      this.triggerEvent('confirmEvent', data);
    }
  }
})
