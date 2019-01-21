// components/loadmore/loadmore.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // hasMore: {
    //   type: Boolean,
    //   value: false
    // },
    // 加载中的显示文本
    loadingText: {
      type: String,
      value: '加载中...'
    },
    // 加载失败的显示文本
    failText: {
      type: String,
      value: '加载失败, 请点击重试!'
    },
    // 没有更多后的显示文本, 默认没有则隐藏加载更多控件
    noMoreText: {
      type: String,
      value: '没有更多啦'
    },
    // 列表渲染延时, 默认为 500 ms, 我在开发工具中测试列表渲染速度时快时慢, 可根据实际使用中界面复杂度自行调整
    // ps 如果能监听setData() 渲染结束的话则可以不需要延时 
    listRenderingDelay: {
      type: Number,
      value: 500
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showThis: false,
    text: '',
    showIcon: false,
    isLoading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化
    init: function() {
      this.setData({
        showThis: false,
        showIcon: false,
        isLoading: false,
        text: ''
      })
    },
    //加载更多的入口方法
    showLoading: function () {
      if (this.data.isLoading) {
        return
      }
      this.setData({
        showThis: true,
        showIcon:true,
        isLoading: true,
        text: this.properties.loadingText
      })
      // this.triggerEvent('loadMore')
    },
    //加载完成
    showFinish: function (hasMore) {
      if (hasMore) {
        this.setData({
          showThis: false,
          showIcon: false
        })
      } else {
        this.setData({
          showThis: true,
          showIcon: false,
          text: this.properties.noMoreText
        })
      }
    },
    // 隐藏loading状态
    hideLoading: function() {
      this.setData({
        isLoading: false
      })
    },
    // 加载失败
    showError: function () {
      this.setData({
        showThis: true,
        showIcon: false,
        text: this.properties.failText
      })
    },
    //点击 loadmore 控件时触发, 只有加载失败时才会进入页面回调方法
    loadMoreClick: function () {
      if (this.data.text != this.properties.failText) return
      this.setData({
        showIcon: true,
        text: this.properties.loadingText,
        isLoading: true
      })
      this.triggerEvent('loadMore')
    }
  }
})
