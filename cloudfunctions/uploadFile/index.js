// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const db = cloud.database();

    const { saveField, file, cloudPath } = event;
    const { fileID } = await cloud.uploadFile({
        cloudPath,
        fileContent: new Buffer(file, 'base64'),
    })

    const data = await cloud.getTempFileURL({
        fileList: [fileID]
    })

    const url = data.fileList[0].tempFileURL;
    await db.collection('user').where({
        openid: wxContext.OPENID
    }).update({
        data: {
            [saveField]: url
        }
    })

    return url;
}