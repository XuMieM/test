$(function () {
  // 点击'注册账号'链接
  $('#link_login').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })

  //点击'登录'链接
  $('#link_reg').on('click', function () {
    $('.login_box').show()
    $('.reg_box').hide()
  })

  // 从layui中获取form对象
  let form = layui.form
  // 通过 form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个pwd校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    // 验证两次密码是否一致
    repwd: function (value) {
      let pwd = $('.reg_box [name=password]').val()
      if (pwd !== value) {
        return '输入密码不一致'
      }
    }
  })

  // 获取layer
  let layer = layui.layer
  // 根路径
  // let way = 'http://big-event-api-t.itheima.net'
  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    let data = {
      username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
    }
    $.post(`/api/reguser`, data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录')
      // 模拟点击行为
      $('#link_reg').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: `/api/login`,
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // console.log(res.token)
        // 将登录成功得到的 token 字符串，保存到localstorage 中
        localStorage.setItem('token',res.token)
        // 跳转后台主页
        location.href= '/index.html'
      }
    })
  })
})
