const { chatsModel } = require('./schema/chat')

/* 
*插入一条数据
*/
async function insertOne(data){
  const model = new chatsModel(data)

  await model.save()
}

/* 
*查找对应数据
*/
async function find(query){

  return chatsModel.find(query).lean()
}

module.exports = {
  insertOne,
  find
}