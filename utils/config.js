/**
 * 相关配置信息
 */
let config = {
  //根路径
  // host: 'https://www.garaschan.online:4290/',
  // host: 'http://118.25.214.118:4290/',
  // host: 'http://172.16.15.135:4290/',
  host: 'www.https://garaschan.online:4290/',

  //请求路径
  urlComponents: {
    // loginUrl: `http://172.16.15.135:4290/lazybook/wx/login`,
    // userUrl: `http://172.16.15.135:4290/lazybook/wx/user`,
    // billUrl: `http://172.16.15.135:4290/lazybook/wx/bill`,
    // uploadUrl: `http://172.16.15.135:4290/lazybook/wx/upload`,
    loginUrl: `https://www.garaschan.online:4290/lazybook/wx/login`,
    userUrl: `https://www.garaschan.online:4290/lazybook/wx/user`,
    billUrl: `https://www.garaschan.online:4290/lazybook/wx/bill`,
    uploadUrl: `https://garaschan.online:4290/lazybook/wx/upload`,
    // loginUrl: `http://118.25.214.118:4290/lazybook/wx/login`,
    // userUrl: `http://118.25.214.118:4290/lazybook/wx/user`,
    // billUrl: `http://118.25.214.118:4290/lazybook/wx/bill`,
    // uploadUrl: `http://118.25.214.118:4290/lazybook/wx/upload`
  },

  //默认图片路径
  defaultImages: {
    // loginBackground: `../../images/background/login.jpg`,
    // bookBackground: `../../images/background/book.jpg`,
    // myBackground: `../../images/background/my.jpg`
    // loginBackground: `http://127.0.0.1:4290/resources/images/background/login.jpg`,
    // bookBackground: `http://127.0.0.1:4290/resources/images/background/book.jpg`,
    // myBackground: `http://127.0.0.1:4290/resources/images/background/my.jpg`
    loginBackground: `https://www.garaschan.online:4290/resources/images/background/login.jpg`,
    bookBackground: `https://www.garaschan.online:4290/resources/images/background/book.jpg`,
    myBackground: `https://www.garaschan.online:4290/resources/images/background/my.jpg`,
    // loginBackground: `http://118.25.214.118:4290/resources/images/background/login.jpg`,
    // bookBackground: `http://118.25.214.118:4290/resources/images/background/book.jpg`,
    // myBackground: `http://118.25.214.118:4290/resources/images/background/my.jpg`
  },
  pageSize: 10, //单页账单数量
}
module.exports = config;