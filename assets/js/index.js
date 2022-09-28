$(function(){
    //调用getUserInfo函数，获取用户的信息
    getUserInfo()


    var layer = layui.layer
    // 点击“退出”，实现退出功能
    $('#btnLogOut').on('click',function(){
        // console.log('ok');


        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something   当点确定退出时所执行的代码
            // console.log('ok22');

            //1、由于在登录的时候，把客户端携带的token存储了localStorage,现在退出时需要清空本地缓存
            localStorage.removeItem('token')
            //2、把页面跳转到登录页面
            location.href= './login.html'

            // 关闭confirm询问框
            layer.close(index);
          });
    })
})




// 获取用户的基本信息函数
function  getUserInfo() {
    $.ajax({
        method:'GET',
        // 此处是具体的URL地址，没有加上根路径，要检查是否引入了baseAPI.js文件，若没有引入则引入该js文件因为该文件，可以把根路径和具体的URL地址进行拼接,
        // 引入baseAPI.js文件时，需要在jquery.js之后并且在index.js文件之前导入
        url:'/my/userinfo',
        // 以/my开头的文件路径是有访问权限的，即需要通过请求头的Authorization字段来把token字符串提交给服务器
        // 当有多个访问权限的时候，在此处添加headers配置对象比较麻烦，故在发起请求前的ajaxPrefilter函数中携带headers配置对象
        // headers:{
        //     //headers表示请求头配置对象
        //     Authorization: localStorage.getItem  ('token')  || ''
        // },
        success: function(res){
            // console.log(res);

            // 只有当用户信息获取成功后，即用户从服务器拿到返回回来的数据，并且返回token字符串保存在用户的浏览器上
            //渲染 renderavatar用户头像
            if (res.status === 0  && res.message  ==='获取用户基本信息成功！'){
            renderavatar(res.data)
        }
        },
        // 在发起get post  ajax请求时，无论请求成功还是失败都会执行complete函数，在complete函数中的req.responseJSON可以拿到服务器响应回来的数据
        // complete: function(res) {
        //     // console.log('使用complete函数执行的回调函数');
        //     // console.log(res);

        //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //       //1、清空localStorage的token字符串
        //       localStorage.removeItem('token')
        //       //2、将网页跳转到登录页面
        //       location.href = './login.html'
        //   }
        // }
    })
}


// 渲染用户头像
function renderavatar(user) {
    // 1、获取用户的名称    
    // 获取用户的名称时，nickname的优先级高于username，即若nickname么有值才轮到username
    var name = user.nickname  || user.username   
    
    //2、把对应的名称渲染到页面上
    $('#welcome').html(`欢迎&nbsp;&nbsp${name}`)
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //如果说user_pic的值不为空，说明有图片图像，
        $('.layui-nav-img').attr('src', user.user_pic ).show()
        $('.text-avatar').hide()
    } else{
        //若user_pic的值为空，则说名没有图片头像，则需有文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}