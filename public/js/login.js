let inputEle = document.getElementsByClassName('login-input')[0]
let btnEle = document.getElementsByClassName('login-button')[0]

// 马上登录按钮
btnEle.onclick = function(){

  let nickName = inputEle.value

  if(nickName){
    
    $.ajax({
      type:'post',
      url:'http://localhost:3000/chat/login',
      data:{
        nickName
      },
      success:(result)=>{
        if(result.status === 'success'){

          // 跳转到chat页面
          location.href = '/chat'
        }
      },
      error:()=>{

      }
    })
  }
}

