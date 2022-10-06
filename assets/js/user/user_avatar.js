$(function(){

    var layer = layui.layer

    // 1、获取图片的DOM元素
    const $image = $('#image')
    //2、配置指定项
    const options = {
        aspectRatio:1,    //纵横比
        preview: '.img-preview'   //指定预览区域，即选择器为.img-preview对应的选择器显示预览图片

    }
    $image.cropper(options)



    // 当点击上传后实现文件上传功能，也就是相当于当点击上传之后，出现文件上传功能(当点击文件选择框会实现)
    $('#btnImage').on('click',function(){
        $('#file').click()
    })


    // 为文件选择框绑定change事件
    $('#file').on('change',function(e){
        // console.log(e);       //e.target.files表示数组，数组的下标为0对应具体的值 e.target.files[0]可以拿到选中的文件
        var filelist = e.target.files
        if (filelist.length === 0 ) {
        return layer.msg('请选择图片')
        }

        //表示用户选择了图片，拿到图片的文件
        var file = e.target.files[0]
        //把文件转化为URL地址
        var imgURL = URL.createObjectURL(file)
        //把图片地址挂载在图片标签上
        $image.cropper('destroy').attr('src',imgURL).cropper(options)
    })


    //更换头像
    $('#btnUpload').on('click',function(){
        //1、获取到用户裁剪之后的头像区域
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
   
      //2、调用接口，把裁剪的头像上传到服务器
      $.ajax({
        method:'POST',
        url:'/my/update/avatar',   //有关根路径的拼接的代码，在baseAPI.js中
        data:{
            avatar: dataURL  //把裁剪的头像上传到服务器
        },
        success:function(res){
            if (res.status !==0) {
                return layer.msg('更新头像失败')
            }
            console.log(3);
            //说明裁剪的头像成功上传到服务器
            //在iframe界面，而iframe界面又是子页面，而又想把裁剪的头像更新到父页面index.html身上，则采用window.parent.父页面的方法
            window.parent.getUserInfo()
        }
      })
    })

})

