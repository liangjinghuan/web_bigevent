$(function(){
    var form = layui.form
    var layer= layui.layer

    // 自定义表单验证规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd: function(value){
            if (value === $('[name=oldPwd]').val())  {
                return '新旧密码不能相同'
            } 
        },
        rePwd:function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码输入不一致'
            }
        }
    })



    // 把修改的密码数据提交到服务器
    $('.layui-form').on('submit',function(e) {
        //阻止表单默认提交行为
        e.preventDefault()
        //发起请求，把密码数据提交到服务器
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data: $(this).serialize() ,
            success:function(res) {
                // rs.status为0表示更新密码成功,不为0表示更新密码失败
                if (res.status !== 0 )  {
                    return layer.msg('更新密码失败')
                }

                layer.msg('更新密码成功')
                // 重置表单元素，
                // $('选择器')[0]表示把jQuery对象转化为DOM对象
                $('.layui-form')[0].reset()
            }
        })
    })
})