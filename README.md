# mytools
some tools for my java develop...

##(Ajax文件上传与下载)Tools Ajax Fileupload Based JQUERY

工作中，有这么一个需求：前能上传EXCEL，到后台作验证，如果验证不通过则把错误信息标注到EXCEL中返回的客户端，在原来一家也有类似需求，都是前台使用ajaxFileUpload插件，后台返回一个下载链接，前台收到下载链接后到手动触发下下载（这块有点需要注意的是不能直接在项目中建立临时文件夹除非你是单机运行），但此工具是个人的一次尝试：直接下载错误文件或者直接接收返回信息。

<br>

实现原理：使用XMLHttpRequest的blob作为responseType接收后台返回的数据，如果后台服务中在响应头中添加有fileName请求台，则按文件解析，反之，则按正常情况解析。

<br>
[地址]()
