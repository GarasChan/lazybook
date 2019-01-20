const iconsConfig = {
  // 账单类别
  bookTypes: [
    {
      key: 'expense',
      value: '支出'
    }, 
    {
      key: 'income',
      value: '收入'
    }],

  // 图标类别
  iconTypes: [
    [{
      key: 'entertainment',
      value: '休闲娱乐'
    }, 
    {
      key: 'life',
      value: '居家生活'
    },
    {
      key: 'investment',
      value: '投资储备'
    },
    {
      key: 'shopping',
      value: '购物消费'
    }], 
    [{
      key: 'income',
      value: '日常收入'
    }]
  ],

  // 收入
  income: {
    // 日常收入
    income: [
      { name: '收款', icon: 'shoukuan' },
      { name: '红包', icon: 'hongbao' },
      { name: '房租', icon: 'fangzu' }
    ]
  },

  // 支出
  expense: {
    // 休闲娱乐
    entertainment: [
      { name: '电影', icon: 'dianying' },
      { name: '游乐园', icon: 'youleyuan' },
      { name: '旅游', icon: 'lvyou' },
      { name: '酒店', icon: 'jiudian' },
      { name: '收款', icon: 'shoukuan' },
      { name: '门票', icon: 'menpiao' },
      { name: '聚会', icon: 'juhui' },
      { name: '卡拉OK', icon: 'ktv' },
      { name: '游戏', icon: 'youxi' },
      { name: '船票', icon: 'lunchuan' },
      { name: '机票', icon: 'feiji' },
      { name: '火车票', icon: 'huoche' },
      { name: '公共交通', icon: 'gongjiao' },
      { name: '酒店', icon: 'jiudian' },
    ],

    // 居家生活
    life: [
      { name: '生活', icon: 'shenghuo' },
      { name: '油费', icon: 'youfei' },
      { name: '电费', icon: 'dianfei' },
      { name: '燃气费', icon: 'ranqifei' },
      { name: '酒水', icon: 'jiushui' },
      { name: '房租', icon: 'shoukuan' },
      { name: '网费', icon: 'wangfei' },
      { name: '药品', icon: 'yaopin' },
      { name: '水费', icon: 'shuifei' },
      { name: '话费', icon: 'huafei' },
      { name: '看病', icon: 'kanbing' },
    ],
    // 投资储备
    investment: [
      { name: '礼物', icon: 'liwu' },
      { name: '培训', icon: 'peixun' },
      { name: '学习', icon: 'xuexi' },
      { name: '转账', icon: 'huankuan' },
    ],
    // 购物消费
    shopping: [
      { name: '购物', icon: 'gouwu' },
      { name: '日用品', icon: 'shoukuan' },
      { name: '护肤品', icon: 'hufupin' },
      { name: '家具', icon: 'jiaju' },
      { name: '汉堡', icon: 'hanbao' },
      { name: '饮食', icon: 'yinshi' },
      { name: '化妆品', icon: 'huazhuangpin' },
      { name: '汤', icon: 'tang' },
      { name: '裤子', icon: 'kuzi' },
      { name: '帽子', icon: 'maozi' },
      { name: '电脑', icon: 'diannao' },
      { name: '电器', icon: 'dianqi' },
      { name: '鞋', icon: 'xie' },
      { name: '衣服', icon: 'yifu' },
      { name: '酒店', icon: 'jiudian' },
      { name: '酒水', icon: 'jiushui' },
      { name: '女士鞋', icon: 'nvshixie' },
      { name: '数码', icon: 'shuma' },
    ]
  },

  iconColors: ['#ff8a65', '#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ba68c8']
}
module.exports = iconsConfig;