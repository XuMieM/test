$.ajaxPrefilter(function (options) {
    // 发起Ajax请求前，拼接请求的根路径
    options.url = 'http://big-event-api-t.itheima.net'+options.url
    console.log(options.url)
})