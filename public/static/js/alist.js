$(document).ready(function () {
    var laydate = layui.laydate;
    dTable = $('#typeList').DataTable({
        ordering: false,
        paging: false,
        searching: false,
        "ajax": "/admin/Admin/doAdminList",
        "language": {
            url: '/admin/Admin/localisation'
        },
        "columns": [
            {"data": "_name"},
            {"data": "username", "sClass": "text-center"},                        
            {"data": "last_login_ip", "sClass": "text-center"},
            {"data": "last_login_time", "sClass": "text-center"},
            {"data": "status", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            { "sWidth": "15%", "aTargets": [1,2,3,4,5] },
            { 
                "data":"id",
                "sClass": "text-center",
                "aTargets": [2], 
                "render":function(data, type, row){
                    return data ? data : '未登录';
                }                    
            },
            { 
                "data":"last_login_time",
                "sClass": "text-center",
                "aTargets": [3], 
                "render":function(data, type, row){
                    return data==='0000-00-00 00:00:00' ?  '未登录' : data;
                }                    
            },
            { 
                "data":"id",
                "sClass": "text-center",
                "aTargets": [5], 
                "render":function(data, type, row){
                   return "<a href='javascript:;' class='rowEdit' data-id='"+ data +"'>编辑</a> | <a href='javascript:;' class='rowDel'>删除</a>";
                }                    
            }
        ]  
    });   
    
    //每300秒重新加载表数据(分页留存) 
    setInterval( function () {
        dTable.ajax.reload( null, false ); // 刷新表格数据，分页信息不会重置
    }, 300000 );
    
    //组下拉列表初始化
    $(".select2").uedSelect({
        width: 167
    });
    //上级下拉列表初始化
    $(".select").uedSelect({
        width: 167
    });
    
    //添加页面点击添加按钮
    $('.submitBtn').click(function(){
        var isEdit = $(".forminfo input[name='id']").val().length;
        var message;
        if(isEdit){
            url = editUrl;
            message = '修改管理员成功！';
        }else{
            url = addUrl;
            message = '添加管理员成功！';            
        }
        var url = isEdit ? editUrl : addUrl;
        $.post(url, $('#form').serialize(), function (data) {
            if (data.code === 200) {                
                window.location.reload();
            } else {
                layer.msg(data.message, {time: 1500});
            }
        });
    });
    
    //添加子管理员按钮点击
    $('#typeList').on('click', '.rowAddSub', function(){
        var id = $(this).attr('data-id');
        $('#form').removeClass('hidden');
        $('.submitBtn').val('添加');
        $('.formtitle span').eq(0).html('添加');        
        layer.open({
            type: 1,
            area: '700px',
            shadeClose: false,
            content: $('#form'),
            success: function (layero, index) {
                $(".formbody input[name='pid']").val(id);
            },
            cancel: function (index, layero) {
                $('#form')[0].reset();
                $('#form').addClass('hidden');
                layer.close(index);
                return false;
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
                        $(".forminfo input[name='username']").val(data.data.username);
                        $(".forminfo input[name='realname']").val(data.data.realname);
                        $(".forminfo input[name='password']").siblings('label').find('b').html('');
                        $(".forminfo input[name='password']").attr('placeholder', '留空则不修改密码');
                        var pidSelect = $(".forminfo select[name='pid']");
                        pidSelect.val(data.data.pid);
                        pidSelect.siblings('.uew-select-value').children('em').eq(0).html(pidSelect.find("option:selected").text());
                        var groupSelect = $(".forminfo select[name='group_id']");
                        groupSelect.val(data.data.group_id);
                        groupSelect.siblings('.uew-select-value').children('em').eq(0).html(groupSelect.find("option:selected").text());
                    } else {
                        layer.msg(data.message, {time: 1500});
                    }
                });
            },
            cancel: function (index, layero) {
                $(".forminfo input[name='password']").siblings('label').find('b').html('*');
                $(".forminfo input[name='password']").attr('placeholder', '密码至少6个字符');
                var pidSelect = $(".forminfo select[name='pid']");
                pidSelect.val('');
                pidSelect.siblings('.uew-select-value').children('em').eq(0).html('请选择上级');
                var groupSelect = $(".forminfo select[name='group_id']");
                groupSelect.val('');
                groupSelect.siblings('.uew-select-value').children('em').eq(0).html('请选择所属组');
                $('#form')[0].reset();
                $('#form').addClass('hidden');
                layer.close(index);
                return false;
            }
        });
    });
    
    //点击删除按钮
    $('#typeList').on('click', '.rowDel', function(){
        var id = $(this).siblings('.rowEdit').attr('data-id');
        layer.confirm(
            '确定删除吗？',
            {
                btn: ['确定', '取消'] //按钮
            },
            function () {
                $.post(delUrl, {id:id}, function (data) {
                    if (data.code === 200) {
                        layer.closeAll();
                        $(".forminfo select[name='pid'] option[value='"+ id +"']").remove(); 
                        dTable.ajax.reload(null, false);
                    }else{
                        layer.msg(data.message, {time: 1500});
                    }
                });
            }
        );
    });
    
});