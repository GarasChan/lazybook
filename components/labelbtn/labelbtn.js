// components/lebelbtn/lebelbtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: '标签'
    },
    id: {
      type: Number,
      value: 0
    },
    isSelected: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeLabel: function(e) {
      const data = {
          id: e.currentTarget.dataset.id,
          value: this.data.value
        };
      // this.setData({
      //   isSelected: !this.data.isSelected
      // })
      this.triggerEvent('changeLabel', data);
    }
  }
})
