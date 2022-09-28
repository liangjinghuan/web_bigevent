// 在发起$.get  或 $.post 或$.ajax请求之前会先调用ajaxPrefilter函数，函数里有options配置对象,optios配置对象有url、send、open等属性，options.url可以拿到发起请求的url地址，若发起请求的地址是具体的URL地址(没有根路径)，则需要将该地址跟根路径地址进行拼接，这样当根路径发送变化的时候，只需要更改一次根路径就可以
$.ajaxPrefilter(function(options){
    // options表示发起请求的的配置对象,du
   
    options.url = 'http://api-breakingnews-web.itheima.net'  + options.url
    // console.log(options.url);


    // 只有当有访问权限的接口是才调用headers请求头
    if (options.url.indexOf('/my') !== -1) {
    options.headers = {
        Authorization: localStorage.getItem  ('token')  || ''
    }
}


//    全局统一挂载的complete函数
    options.complete = function(res) {
                // console.log('使用complete函数执行的回调函数');
            // console.log(res);

            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                //1、清空localStorage的token字符串
                localStorage.removeItem('token')
                //2、将网页跳转到登录页面
                location.href = './login.html'
            }
    }
})