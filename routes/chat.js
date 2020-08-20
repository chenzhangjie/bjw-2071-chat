const controller = require('../controller/chat')

module.exports =  (router) => {
  router.get('/',controller.login)

  router.post('/chat/login',controller.chatLogin)

  router.get('/chat',controller.chat)

  router.post('/chat/addContent',controller.addContent)

  router.get('/chat/getContent',controller.getContent)

}
  

