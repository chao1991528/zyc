$(document).ready(function () {
    var upload = layui.upload;
    dTable = $('#typeList').DataTable({
        "ajax": "/api/type/doTlist",
        "language": {
            url: '/api/type/localisation'
        },
        "order": [[ 1, "desc" ]],
        "columns": [
            {
                "data": "id", 
                "sClass": "text-center", 
                "render": function (data, type, full, meta) {
                    return '<input type="checkbox"  class="checkchild"  value="' + data + '" />';
                }, 
                "bSortable": false
            },
            {"data": "id", "sClass": "text-center"},
            {"data": "name", "sClass": "text-center"},
            {
                "data": "logo", 
                "sClass": "text-center",
                "render": function (data, type, full, meta) {
                    return '<img style="width:100px;"  src="' + data + '" />';
                }, 
                "bSortable": false
            },
            {"data": "sort", "sClass": "text-center"},
            {"data": "create_time", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            { "sWidth": "5%", "aTargets": [0] },
            { "sWidth": "10%", "aTargets": [1] },
            {  
                "targets": 6,  
                "searchable": false,
                "sClass": "text-center",               
                "sWidth": '10%',
                "data":"id",
                "render": function(data, type, row) { // 返回自定义内容
                    return "<a href='javascript:;' class='rowEdit' data-id=" + data + ">编辑</a>";
                }
            }
        ]  
    });
    //每30秒重新加载表数据(分页留存) 
    setInterval( function () {
        dTable.ajax.reload( null, false ); // 刷新表格数据，分页信息不会重置
    }, 30000 );
    
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#typeLogo',
        url: uploadUrl,
        data:{type:'proTyeLogo'},//设置上传到的文件夹目录为proTyeLogo
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
            $(".forminfo input[name='logo']").val(res.data.src);
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
    
    //添加页面点击添加按钮
    $('.submitBtn').click(function(){
        var isEdit = $(".forminfo input[name='id']").val().length;
        var name = $.trim($(".forminfo input[name='name']").val());
        var logo = $(".forminfo input[name='logo']").val();
        if (name.length == 0 ) {
            layer.msg('分类名称必填', {time: 1500});
            return;
        }
        var url;
        var message;
        if(isEdit){
            url = editUrl;
            message = '修改产品类型成功！';
        }else{
            if ( logo.length == 0 ) {
                layer.msg('没有上传分类图片', {time: 1500});
                return;
            }
            url = addUrl;
            message = '添加产品类型成功！';            
        }
        var url = isEdit ? editUrl : addUrl;
        $.post(url, $('#form').serialize(), function (data) {
            if (data.code === 200) {
                layer.close(layer.index);
                $('#form').addClass('hidden');
                layer.msg(message, {time: 2000});
                isEdit ? dTable.ajax.reload(null, false) : dTable.ajax.reload();
                $('#uploaded').removeAttr('src');
                $('#form')[0].reset();
            } else {
                layer.msg(data.message, {time: 1500});
            }
        });
    });
    
    //点击编辑按钮
    $('#typeList').on('click', '.rowEdit', function(){
        var id = $(this).attr('data-id');
        $('#form').removeClass('hidden');
        $('.submitBtn').val('保存');
        $('.formtitle span').eq(0).html('编辑');        
        layer.open({
            type: 1,
            area: '700px',
            shadeClose: false,
            content: $('#form'),
            success: function (layero, index) {
                $(".forminfo input[name='id']").val(id);
                $.post(viewUrl, {id:id},function (data) {            
                    if (data.code === 200) { 
                        $(".forminfo input[name='name']").val(data.data['name']);
                        $(".forminfo input[name='sort']").val(data.data['sort']);
                        $('#uploaded').attr('src', data.data['logo']);
                    } else {
                        layer.msg(data.message, {time: 1500});
                    }
                });
            },
            cancel: function (index, layero) {
                $('#form')[0].reset();
                $('#uploaded').removeAttr('src');
                $('#form').addClass('hidden');
                layer.close(index);
                return false;
            }
        });
    });
    
});