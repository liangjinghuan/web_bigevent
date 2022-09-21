// 在发起$.get  或 $.post 或$.ajax请求之前会先调用ajaxPrefilter函数，函数里有options配置对象,optios配置对象有url、send、open等属性，options.url可以拿到发起请求的url地址，若发起请求的地址是具体的URL地址(没有根路径)，则需要将该地址跟根路径地址进行拼接，这样当根路径发送变化的时候，只需要更改一次根路径就可以
$.ajaxPrefilter(function(options){
    // options表示发起请求的的配置对象,du
   
    options.url = 'http://api-breakingnews-web.itheima.net'  + options.url
    console.log(options.url);
})