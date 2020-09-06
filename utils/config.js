/**
 * 相关配置信息
 */
let config = {
  //根路径
  host: 'https://www.garaschan.online:4290/',

  //请求路径
  urlComponents: {
    loginUrl: `https://www.garaschan.online:4290/lazybook/wx/login`,
    userUrl: `https://www.garaschan.online:4290/lazybook/wx/user`,
    billUrl: `https://www.garaschan.online:4290/lazybook/wx/bill`,
    uploadUrl: `https://www.garaschan.online:4290/lazybook/wx/upload`,
    countUrl: 'https://www.garaschan.online:4290/lazybook/wx/statistics/count',
    titleUrl: 'https://www.garaschan.online:4290/lazybook/wx/statistics/title'
  },

  //默认图片路径
  defaultImages: {
    loginBackground: `https://6761-garaschan-1257763678.tcb.qcloud.la/lazybook/images/background/login.jpg?sign=85d09d7a48ccd1abc3a3f1854305464e&t=1599363192`,
    bookBackground: `https://6761-garaschan-1257763678.tcb.qcloud.la/lazybook/images/background/book.jpg?sign=a3b0f79f6d2ebf5232e09fbdde8e8e49&t=1599132866`,
    myBackground: `https://6761-garaschan-1257763678.tcb.qcloud.la/lazybook/images/background/my.jpg?sign=0a615ba51e6fd4c3402e350d42adb5c3&t=1599132901`,
  },

  //单页账单数量
  pageSize: 15,

  // 小程序相关信息
  programInfo: {
    name: '懒人记账',
    label: '一个人的记账小程序',
    version: 'v1.0.0'
  }
}
module.exports = config;