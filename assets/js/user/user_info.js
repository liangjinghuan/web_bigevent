$(function(){
    var form = layui.form
    var layer = layui.layer
    // 自定义验证表单规则
    form.verify({
        nickname: function(value){
            if(value.length > 6 ) {
                return '请输入1-6个字符'
            }
        }
    })

    // 函数定义后必须调用
    initUserInfo()
    
    // 初始化用户的信息
    function initUserInfo() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',//因为此处是具体的URL地址，而没有根路径则需要根路径和具体URL地址的拼接，则需要引入baseAPI.js文件
            success:function(res) {
                // 当status===0表示获取用户基本信息成功,反过来说当不等于0时获取用户信息失败
                if (res.status !==0) {
                    return layer.msg('获取用户基本信息失败')
                } 
                // 获取用户基本信息成功
                // console.log(res);
                //通过form.val('字符串', 数据对象)快速赋值
                form.val('formUserInfo', res.data)
            }
        })
    }


    // 重置表单的数据          ?????
    $('#btnReset').on('click',function(e){
        //阻止表单默认的重置行为
        e.preventDefault()
       
        // //因为重置是回到表单最原始数据的状态，也就是说重新渲染数据，这样人工修改数据后，但点击了就重新把原来数据重新渲染
        initUserInfo()
    })



    //监听表单提交事件
   $('.layui-form').on('submit',function(e){
    //阻止表单默认行为
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('修改用户信息失败')
            }
            layer.msg('修改用户信息成功')//提示用户修改信息成功
            // 把修改成功的数据重新渲染到Index(父页面)上
            window.parent.getUserInfo()
        }
    })
   })
    // })
})