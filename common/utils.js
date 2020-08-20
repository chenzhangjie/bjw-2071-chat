const _ = require('lodash')
const moment = require('moment')

/* 
*获取随机头像
*/
function getRandomAvatar(){

  // 放在网络图床中的图片
  const avatars = [
    'https://wx2.sbimg.cn/2020/08/19/3WnGh.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3WvZk.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3Wadj.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3WWxD.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3Www7.jpg'
  ]

  // 获取随机数组下标
  let index = _.random(0,4)
  return avatars[index]
}

/* 
 * 格式化时间
*/
function formatTime(time){
  return moment(time).locale('zh_cn').format('YYYYMMMMDo  aH:mm:ss ')
}

module.exports = {
  getRandomAvatar,
  formatTime
}