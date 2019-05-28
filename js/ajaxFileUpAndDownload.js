jQuery.extend({
fileUpAndDownLoad:function(s){
    let defaultS = {
        url:'',//url
        param:{},//其他参数
        fileId:'file',//文件input的ID
        acceptName:'file',//后台接收文件的变量名
        async:true,
        success:null,
        failure:null,
        failureMsg:'系统繁忙，请稍候重试！',
        checkMsg:'导入数据未能验证通过，请查看错误信息文件！'
    };

    let config = $.extend(defaultS,s);

    let formData = new FormData();
    $.each(config.param,function(key,value){
        formData.append(key,value);
    });

    if(config.fileId){
        $.File = $('#'+config.fileId);
        formData.append(config.acceptName,$.File[0].files[0]);
    }

    let ajax = new XMLHttpRequest();
    ajax.open("post",config.url,config.async);
    ajax.responseType = 'blob';
    ajax.send(formData);

    let doDownload = function(fileName,data){
        let fileReader = new FileReader();
        fileReader.readAsDataURL(data);
        fileReader.onload = function(){
            let a = document.createElement("a");
            a.style.display = 'none';
            a.download = fileName;
            a.href =this.result + '';
            document.body.appendChild(a);

            a.click();
            setTimeout(function(){
                document.body.removeChild(a);
            }, 1000);
        };
    };

    ajax.onload = function(){
        if(ajax.status != 200 && ajax.status != 304){
            if(config.failure) config.failure(config.failureMsg);
            return;
        }

        let fileName = ajax.getResponseHeader("fileName");
        if(!fileName){
            let reader = new FileReader();
            reader.readAsText(ajax.response);
            reader.onload = function(){
                let obj = JSON.parse(reader.result + '');
                config.success(obj);
            };
        }else{
            doDownload(decodeURIComponent(fileName),ajax.response);
            let result = {};
            result.status = "failure";
            result.errorMsg = config.checkMsg;
            config.success(result);
        }
    };
}
});

