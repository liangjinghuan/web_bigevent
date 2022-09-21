$(function(){
    //点击“去注册账号”的连接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击“去登录”的链接
    $('#link_login').on('click', function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })


//从layui中获取form对象
var form = layui.form
//从layui中获取layer对象
var layer = layui.layer




// 调用form.verify()
form.verify({
    // 自定义 pwd检验规则，若满足密码6-12位且不是空格则满足检验，若不满足检验则报错“密码必须是6”
    pwd:[ /^[\S]{6,12}$/  ,'密码必须6到12位，且不能出现空格' ]


    //校验两次密码是否输入一致的规则
    ,repwd: function(value){
        // value表示repwd放在那个标签对应的值,此处代表的是确认密码框的值
        // 原理：判断两次密码输入框的值是否一致
        
        // 获取密码确认框的值
        var pwd =$('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次输入的密码不一致'
        }
    }
})



// 监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
    // 1、阻止表单的默认提交行为
    e.preventDefault()
    var data ={username:$('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
    $.post('/api/reguser', data , function(res){
        if(res.status !== 0) {
                // 若status状态不为0，表示注册失败
                // return console.log(res.message)
                return layer.msg(res.message)
        }
        // 若status状态为0，表示注册成功
    //   console.log('注册成功');
    layer.msg('注册成功，请登录!');
    // 当用户注册成功后，页面自动的跳转到登录页面，即“点击去登录”，调用“去登录事件”
    $('#link_login').click()
})

})




//监听登录表单的提交事件
$('#form_login').submit(function(e){
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 向服务器提交数据
    $.ajax({
        method:'POST',
        url:'/api/login' ,
        // 快速的获取表单的所有数据，使用serialize()   但必须为每个表单元素添加name属性   
        data:  $(this).serialize(),
        success:function(res) {
            if (res.status !== 0) {
                // 若状态不为0表示登录失败
                return layer.msg('登录失败')
            }
            // 代码执行到这里表示登录成功
            layer.msg('登录成功')
            // console.log(res); 
            // token是服务端返回给客户端的加密字符串，当客户端再次向服务器发起请求时，需要在请求头中携带Authoriaztion，取值为token字符串(Bearer  一串字母),这样服务器解析还原成JSON对象，再通过身份验证，就可以把用户对应的信息返回给客户端
            // 把服务端返回给客户端的token通过localStorage.setItem()保存到本地缓存中
            // localStorage.setItem('token', res.token)
            // 当登录成功后，跳转到后台的首页
            location.href = './index.html'
        }
    })
})
})