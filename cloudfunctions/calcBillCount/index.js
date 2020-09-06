// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database();

    const $ = db.command.aggregate;
    const allDays = await db.collection('bill').aggregate().group({
        _id: {
            openid: '$openid',
            date: '$date'
        }
    }).end();

    const allTimes = await db.collection('bill').where({
        openid: wxContext.OPENID
    }).count();

    return {
        allDays: allDays.list.length,
        allTimes: allTimes.total
    }
}