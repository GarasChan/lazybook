// components/hmovable/hmovable.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    multiSelector: {
      type: Boolean,
      value: false
    },

    items: {
      type: Array,
      value: []
    },

    selectedItems: {
      type: Array,
      value: []
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
    changeStatus: function (e) {
      const item = this.data.items[e.currentTarget.dataset.id];
      let selectedItems = this.data.selectedItems;
      if(this.data.multiSelector) {
        const idx = selectedItems.indexOf(item);
        if(idx > -1) {
          selectedItems.splice(idx, 1);
        } else {
          selectedItems.push(item);
        }
      } else {
        selectedItems[0] = item;
      }
      this.setData({ selectedItems });
      this.triggerEvent('change', { selectedItems });
    }
  }
})
