$(function () {
  getUserInfo()

  let layer = layui.layer

  // 点击按钮实现退出功能
  $('#btnLogout').click(function () {
    // 提示用户是否确认退出
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1、清空本地存储的token
      localStorage.removeItem('token')
      // 2、重新跳转到登录页面
      location.href = '/login.html'

      layer.close(index);
    });
  })
})

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }
      // 调用 renderAvatar 渲染用户头像
      renderAvatar(res.data)
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
  })
}

// 渲染用户头像
function renderAvatar(user) {
  // 1、设置用户名称
  let name = user.nickname || user.username
  // 2、设置欢迎文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3、渲染用户头像
  if (user.user_pic !== null) {
    // 3.1渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 3.2渲染文本头像
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}