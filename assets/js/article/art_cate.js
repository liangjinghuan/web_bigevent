$(function(){
    var layer = layui.layer
    var form = layui.form



    initArtCateList()


    //获取图书类别的信息
    function   initArtCateList() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',    //具体的URL地址需要根根路径进行拼接，拼接具体的代码在baseAPI.js文件中
            success:function(res) {
                // console.log(res);
                if (res.status !==0 ) {
                    return layer.msg('获取文章分类列表失败')
                }

                var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
            }
        })
    
    }


    var indexAdd = null 
    // 为添加类别按钮绑定点击事件
    // 由于html标签在js中编写会不方便操作，故需要html标签写在html文件中
    $('#btnAddCate').on('click',function(){
       indexAdd = layer.open({
            type:1,  //默认是0，即最下面有个确定按钮，若为1表示为页面框，最下面的确认框消失
            area:['500px', '250px'],  //设置弹出框的宽度                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })

    })




    // 通过代理的形式，为form-add绑定提交事件，为动态生成的form表单绑定提交事件
    $('body').on('submit', '#form-add', function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                // 添加类别到服务器成功，此时服务器拿到最新的分类信息，需要重新的把最新的类别信息添加到页面上
                initArtCateList()
                layer.msg('新增分类成功')
                layer.close(indexAdd) //关闭弹出层
            }
        })
    })


    var indexEdit = null
    // 通过代理的形式，把#btn-edit的点击事件委托给父级去处理
    $('tbody').on('click', '#btn-edit',function(){
    indexEdit = layer.open({
            type:1,
            area:['500px','250px'],
            title:'修改文章分类',
            content: $('#dialog-edit').html()
        })



    var id = $(this).attr('data-id')
    // console.log(id);
    // 向服务器获取对应的数据
    $.ajax({
        method:'GET',
        url:'/my/article/cates/' +id,
        success:function(res) {
            // console.log(res);
            if (res.status !== 0)  {
                return layer.msg('获取文章分类数据失败')
            }
            // 快速的填充表单数据用form.val('表单选择器',表单数据)
            form.val('form-edit', res.data)      
            // console.log(res.data);       
        }
    })
})


    // 由于修改分类的表单是通过动态生成的，故只能通过代理的形式，为修改的分类表单绑定submit事件
    $('body').on('submit', '#form-edit',function(e){
        e.preventDefault() //阻止表单默认提交行为
        console.log($(this).serialize());
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate' ,
            data:$(this).serialize() ,//快速的获取表单的所有数据
            success:function(res) {
               
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败！')
                }
                layer.msg('更新分类信息成功')
                layer.close(indexEdit)
                initArtCateList()
            }
         
        })
    })



    //通过代理的形式，为#btn-delete绑定点击事件
    $('tbody').on('click','#btn-delete',function(){
        //询问框，询问是否删除
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //确认删除所要执行的代码
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id  ,
                success:function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        layer.msg('删除分类数据失败')
                    }
                    // 说明删除分类数据成功
                    layer.msg('删除分类数据成功')
                    layer.close(index);
                    initArtCateList()   //当把id提交到服务器后，表示把对应id的数据在服务器中删除，即删除了该数据，服务器的数据即少了一条，而页面的数据还没跟服务器的数据同步，所以要重新的获取服务器的数据，这样次才能获取到服务器最新的消息
                }
            })
            
          
          });
    }) 
})