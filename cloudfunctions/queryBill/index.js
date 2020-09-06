// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database();
    const { currentPage, pageSize } = event;

    return db.collection('bill').where({
        openid: wxContext.OPENID
    }).orderBy('date', 'desc')
        .orderBy('time', 'desc').orderBy('id', 'desc').limit(pageSize).skip(pageSize * (currentPage - 1)).get();
}