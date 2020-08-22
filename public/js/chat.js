let inputEle = document.getElementsByClassName('chat-input')[0]
let newsEle = document.getElementsByClassName('chat-message-reminder')[0]
let newsBtn = document.getElementsByClassName('chat-confirmBtn')[0]
let timer
let originData

newMessage()

stopTimer()

longPolling()

scrollToBottom()

/* 
 * 当input中按回车，发送信息
*/
inputEle.onkeydown = function(e){
  var key = e.which

  // 13 代表 enter 按键
  if(key == 13){
    let value = inputEle.value

    if(value){
      $.ajax({
        type:'post',
        url:'http://localhost:3000/chat/addContent',
        data:{
          content:value
        },
        success:(result)=>{
          if(result.status === 'success'){

            renderChat(result.contents)

            inputEle.value = ''

            originData = result.contents

            scrollToBottom()
          } 
        }
      })
    }
  }
}


/* 
*重新渲染聊天内容
*/

function renderChat(contents){
  let html = ''
  contents.forEach((item) => {
    html+='<div class = \'chat-content-container\'>'+
          '<div class = \'chat-detail clearFix\'>'+
          '<div class = \'chat-detail-left\'>'+
          `<img src = '${item.avatar}' class = 'chat-avatar'/>`+
          `<div class = 'chat-name'>${item.nickName}</div>`+
          '</div>'+
          `<div class = 'chat-detail-right'>${item.content}`+
          '</div></div>'+
          `<div class = 'chat-time'>${moment(item.createdAt).locale('zh_cn').format('YYYYMMMMDo  aH:mm:ss ')}</div>`+
          '</div>'
  })

  //清空
  $('.chat-content').html('')

  //重新渲染
  $('.chat-content').html(html)


}

function scrollToBottom(){

  let ele = document.getElementsByClassName('chat-content')[0]
  ele.scrollTop = ele.scrollHeight
  // console.log('scrollTop',ele.scrollTop)
  // console.log('scrollHeight',ele.scrollHeight)

}

//长轮询 每隔2s向数据库查询
function longPolling(){
  timer = setInterval(()=>{

    $.ajax({
      type:'get',
      url:'http://localhost:3000/chat/getContent',
      data:{},
      success:(result)=>{

        renderChat(result.contents)

        result.contents.filter((item)=>{

          let flag = moment(originData[originData.length-1].createdAt).isBefore(moment(item.createdAt))
          // let nows = item.createdAt
          // let originDatas = originData[originData.length - 1].createdAt
          if(flag){

            // console.log('新消息')
            newsEle.style.display = 'block'
            
          }
      
      
        })

      }
    })
  },2000)
}

function stopTimer(){

  if(timer){
    
    clearInterval(timer)
  }
}

function newMessage(){

  $.ajax({
    type:'get',
    url:'http://localhost:3000/chat/getContent',
    data:{},
    success:(result)=>{
      originData = result.contents
    }
  })

}

newsBtn.onclick=function(){
  newsEle.style.display = 'none'
  newMessage()
}
