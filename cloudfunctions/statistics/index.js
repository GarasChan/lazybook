// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const db = cloud.database();

    const { bookType } = event;
    const $ = db.command.aggregate;
    return db.collection('bill').aggregate().match({
        openid: wxContext.OPENID,
        bookType
      }).group({
        _id: '$title',
        count: $.sum(1),
        price: $.sum('$price'),
        title: $.first('$title'),
        icon: $.first('$icon'),
        color: $.first('$color'),
    }).sort({
        count: -1
    }).end()
}