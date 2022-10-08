$(function(){
    var layer = layui.layer
    var form = layui.form

    initCate()
    // 初始化富文本编辑器
    initEditor()

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败')
                }
                // 说明获取文章列表成功
                var hmtlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(hmtlStr)
                // 判断是否需要form.render()渲染，则看form表单里是否有通过模板引擎生成的select、option、input等表单项数据，若有则重新调用form.render()
                form.render()
            }
        })
    }


      // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)

//   为“选择封面”绑定点击事件，当点击“选择封面”后，会弹出文件选择框，而弹出文件选择框的功能效果显示，需要点击文件选择框，即触发文件选择框的点击事件
$('#btnChooseImage').on('click',function(){
    $('#coverFile').click()
})

// 通过change事件，判断用户是否选择了文件，若没有选择文件则提示用户选择文件，若选择了文件，把选择的文件获取到，并转化为URL地址，再最后把原来的裁剪区域删除，添加新的图片URL地址，再重新配置
$('#coverFile').on('change',function(e){
        // console.log(e);
        //e.target.files为一个数组，若长度为1表示选择了文件,若为0表示没有选择文件
       var files = e.target.files //获取到文件列表的数组
        if (files.length === 0) {
            return layer.msg('请选择文件！')
        }
        // 说明用户选择了文件，把选择的文件获取到,即把files数组中的第一个值拿到
        var file= e.target.files[0]
        // 把选择的文件转化为URL地址
        var newURL = URL.createObjectURL(file)
        // 把原来的图片裁剪区域删除，并换上新的URL地址，并重新配置
        $image.cropper('destroy').attr('src',newURL).cropper(options)
})  



    // 设置文章的状态
    var art_state = '已发布'
    // 为存为草稿按钮绑定点击事件，这样当点击存为草稿按钮后，把文章的状态改为草稿
    $('#btnSave2').on('click',function(){
        art_state='草稿'
    })

    // 为表单绑定提交事件
    $('#form_pub').on('submit',function(e) {
        //  1、阻止表单的默认行为
        e.preventDefault()
        //2、快速的创建一个ForData对象
        var fd = new FormData($(this)[0])

        // 3、将状态保存到到fd的DOM对象中
        fd.append('state',art_state)

        // 打印通过foreach遍历fd,拿到对应的值和键
        // fd.forEach(function(value,key) {
        //     console.log(key,value);
        // })

        //4、将裁剪过后的图片转化为文件对象
        $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    // blob表示文件对象
    // 5、把文件对象追加到fd这个DOM对象中
    fd.append('cover_img',blob)
    //6、发起ajax请求，把发布文章的数据提交到服务器
    publishArticle(fd)
  })
    })

    //定义一个把文章的数据发送到服务器的方法
    function publishArticle(fd) {
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data: fd,
              //若发送给服务器的数据是FormData格式的，则需要添加conetentType:false和processData:false这两个配置项
              contentType:false,
              processData:false,
            success:function(res) {
                // console.log(res);
                if (res.status !==0) {
                    return layer.msg('发布文章失败')
                } 
                // 说明发布文章成功
                layer.msg('发布文章成功')
                // 把文章数据发送到服务器之后，把页面跳转到文章列表页面
                location.href = '/article/art-list.html'
            }
        })
    }
})