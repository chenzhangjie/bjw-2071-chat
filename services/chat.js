const moment = require('moment')
const { insertOne,find } = require('../models/chat')
/* 
*插入聊天内容 
*/
async function addContent(data){
  await insertOne(data)
}

/* 
*获取聊天信息
*/
async function getContent(){

  // 查找从现在开始，1天内的数据
  return await find({
    createdAt:{
      $gt:moment().subtract(1,'day').toDate(),
      $lt:moment().toDate()
    }
  })
}


module.exports = {
  addContent,
  getContent,
}