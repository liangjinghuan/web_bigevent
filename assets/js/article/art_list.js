$(function() {
   var layer= layui.layer
   
   
    // 定义一个查询的参数对象，当需要请求数据的时候，把请求的参数对象提交到服务器
    var q = {
        pagenum: 1 ,       //页码值，显示第几页的数据，默认显示第一页
        pagesize:2,        //每页显示多少条数据，默认每页显示两条
        cate_id	:''  ,   //文章的分类id
        state:''           //文章的发布状态     
    }

    // 函数在定义之后必须要调用才能生效
    initTable()

    // 初始化获取图书列表的数据
    function   initTable() {  
        $.ajax({
            method:'GET',
            url:'/my/article/list' ,
            data:q,       //由于是默认是显示第1页，而且默认是每页显示两条数据，故需要把设置好的数据参数对象提交给服务器，服务器返回对应的数据
            success:function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取图书列表数据失败')
                }
                // 说明获取图书列表数据成功
                // 使用模板引擎渲染数据
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

})