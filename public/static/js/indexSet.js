$(document).ready(function () {
    $(".submitBtn").click(function(){
        var url = $.trim($(".forminfo input[name='comment_url']").val());
        if( url.length == 0 ){
            layer.msg('点评链接不能为空！', {time: 1500});
            return;
        }            
        
        var content = $.trim($('.textinput').val());
        if(content.length == 0){
            layer.msg('品牌理念内容不能为空！', {time: 1500});
            return;
        }
        
        var img = $(".forminfo input[name='bg_img']").val();
        if( img.length == 0 ){
            layer.msg('未上传新的背景图', {time: 1500});
            return;
        }
        
        var url = $('#indexSetForm').attr('action');
        $.post(url, $('#indexSetForm').serialize(),function (data) {            
            if (data.code === 200) {
                layer.msg('前台首页设置修改成功', {time: 2000});
            } else {
                layer.msg(data.message, {time: 1500});
            }
        });
    });
    
    //普通图片上传
    var upload = layui.upload;
    var uploadInst = upload.render({
        elem: '#bgImg',
        url: uploadUrl,
        data:{type:'indexBgImg'},//设置上传到的文件夹目录为indexBgImg
        size: 4*1024,
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#uploaded').attr('src', result); //图片链接（base64）
            });
        }, 
        done: function (res) {
            //如果上传失败
            if (res.code != 200) {
                return layer.msg('上传失败',{time: 1500});
            }
            //上传成功
            $(".forminfo input[name='bg_img']").val(res.data.src);
        }, 
        error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });
    
});