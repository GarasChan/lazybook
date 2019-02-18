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
    countUrl: 'http://127.0.0.1:4290/lazybook/wx/statistics/count'
  },

  //默认图片路径
  defaultImages: {
    loginBackground: `https://www.garaschan.online:4290/resources/images/background/login.jpg`,
    bookBackground: `https://www.garaschan.online:4290/resources/images/background/book.jpg`,
    myBackground: `https://www.garaschan.online:4290/resources/images/background/my.jpg`,
  },

  //单页账单数量
  pageSize: 10,

  // 小程序相关信息
  programInfo: {
    name: '懒人记账',
    label: '一个人的记账小程序',
    version: 'v1.0.0'
  }
}
module.exports = config;