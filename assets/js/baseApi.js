$.ajaxPrefilter(function (options) {
  // 发起Ajax请求前，拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url

  // 给有权限的接口设置headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
   
  // 全局统一挂载 complete 回调函数
  options.complete = function (res) {
    // console.log('执行了')
    // console.log(res)
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1、强制清空 token 
      localStorage.removeItem('token')
      // 2、强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})