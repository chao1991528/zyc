$(document).ready(function () {
    var upload = layui.upload;
    dTable = $('#typeList').DataTable({
        "ajax": "/api/product/doPlist",
        "language": {
            url: '/api/product/localisation'
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
            {"data": "type_name", "sClass": "text-center"},
            {"data": "xilie_names", "sClass": "text-center"},
            {"data": "price_once", "sClass": "text-center"},
            {"data": "price_liaocheng", "sClass": "text-center"},
            { "data": "is_recommend", "sClass": "text-center","bSortable": false},
            {"data": "sort", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            { "sWidth": "5%", "aTargets": [0] },
            { "sWidth": "10%", "aTargets": [1] },
            {  
                "targets": 10,  
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
    
    $(".select2").uedSelect({
            width : 167
    });
       
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#productLogo',
        url: uploadUrl,
        data:{type:'productLogo'},//设置上传到的文件夹目录为proTyeLogo
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
        var rs = form_check();
        if(!rs){
            return;
        }
        var url;
        var message;
        if(isEdit){
            url = editUrl;
            message = '修改产品成功！';
        }else{
            url = addUrl;
            message = '添加产品成功！';            
        }
        var url = isEdit ? editUrl : addUrl;
        $.post(url, $('#form').serialize(), function (data) {
            if (data.code === 200) {
                layer.close(layer.index);
                $('#form').addClass('hidden');
                layer.msg(message, {time: 2000});
                isEdit ? dTable.ajax.reload(null, false) : dTable.ajax.reload();
                $('.forminfo select[name="type"]').siblings('.uew-select-value').children('em').eq(0).html('请选择产品类型');
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
                        $(".forminfo input[name='logo']").val(data.data['logo']);
                        var typeSelect = $(".forminfo select[name='type']");
                        typeSelect.val(data.data['type']);
                        typeSelect.siblings('.uew-select-value').children('em').eq(0).html(typeSelect.find("option:selected").text());
                        $.each(data.data['xilie_ids'],function(i, val) {
                            $.each($(".forminfo input[type=checkbox]"), function(){
                                if(val == $(this).val()){
                                    $(this).attr("checked", true);
                                }
                            });
                        });
                        $(".forminfo input[name='price_once']").val(data.data['price_once']);
                        $(".forminfo input[name='price_all']").val(data.data['price_all']);
                        $(".forminfo input[name='all_need_ci']").val(data.data['all_need_ci']);
                        $(".forminfo input[name='huli_time']").val(data.data['huli_time']);
                        $(".forminfo input[name='guocheng']").val(data.data['guocheng']);
                        $(".forminfo textarea[name='yuanli']").val(data.data['yuanli']);
                        $(".forminfo textarea[name='pifu_problem']").val(data.data['pifu_problem']);
                        $(".forminfo textarea[name='huli_gongxiao']").val(data.data['huli_gongxiao']);
                        $(".forminfo input[name='sort']").val(data.data['sort']);
                        $(".forminfo input[name='is_recommend'][value='"+ data.data['is_recommend'] +"']").attr("checked",true); 
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
    
      //表单验证
    function form_check(){
        var name = $.trim($(".forminfo input[name='name']").val());
        var logo = $.trim($(".forminfo input[name='logo']").val());
        var type = $.trim($(".forminfo select[name='type']").val());
        var guocheng = $.trim($(".forminfo input[name='guocheng']").val());
        var huli_time = $.trim($(".forminfo input[name='huli_time']").val());
        var price_once = $.trim($(".forminfo input[name='price_once']").val());
        var price_all = $.trim($(".forminfo input[name='price_all']").val());
        var all_need_ci = $.trim($(".forminfo input[name='all_need_ci']").val());
        var sort = $.trim($(".forminfo input[name='sort']").val());
        if ( name.length == 0 || name.length < 2 || name.length > 100 ) {
            layer.msg('产品名称必填,不能少于2个字符且不能超过100个字符', {time: 1500});
            return false;
        }
        if ( logo.length == 0 ) {
            layer.msg('产品图片必须上传', {time: 1500});
            return false;
        }
        if ( logo.length > 255 ) {
            layer.msg('产品图片最多不能超过255个字符', {time: 1500});
            return false;
        }
        if ( type == 0 || isNaN(type) ) {
            layer.msg('产品类型必须', {time: 1500});
            return false;
        }
        if ( $(".forminfo input[type=checkbox]:checked").length == 0 ) {
            layer.msg('产品系列必须', {time: 1500});
            return false;
        }
        if ( guocheng.length > 255 ) {
            layer.msg('治疗过程最多不能超过255个字符', {time: 1500});
            return false;
        }
        if ( huli_time.length > 20 ) {
            layer.msg('护理时间最多不能超过20个字符', {time: 1500});
            return false;
        }
        if ( price_once.length == 0 && isNaN(price_once) ) {
            layer.msg('单次价格必填且为数字', {time: 1500});
            return false;
        }
        if ( price_once.length == 0 && isNaN(price_once) ) {
            layer.msg('单次价格必须且为数字', {time: 1500});
            return false;
        }
        if ( price_all.length > 0 && isNaN(price_all) ) {
            layer.msg('疗程价格必须为数字', {time: 1500});
            return false;
        }
        if ( all_need_ci.length > 0 && isNaN(price_all) ) {
            layer.msg('疗程价格中的次数必须为数字', {time: 1500});
            return false;
        }
        if ( sort.length > 0 && isNaN(sort) ) {
            layer.msg('排序必须为数字', {time: 1500});
            return false;
        }
        return true;
    }
});