const mongoose = require('mongoose')
const {Schema} = mongoose

const chatsSchema = new Schema({
  nickName:String,
  avatar:String,
  content:String,
  createdAt:{ type: Date, default: Date.now }

})
const chatsModel = mongoose.model('chats',chatsSchema)

module.exports = {
  chatsModel
}