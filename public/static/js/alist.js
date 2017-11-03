$(document).ready(function () {
    var laydate = layui.laydate;
    dTable = $('#typeList').DataTable({
        ordering: false,
        "ajax": "/admin/Admin/doAdminList",
        "language": {
            url: '/admin/Admin/localisation'
        },
        "columns": [
            {"data": "username", "sClass": "text-center"},
            {"data": "realname", "sClass": "text-center"},
            {"data": "status", "sClass": "text-center"},
            {"data": "last_login_ip", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            { "sWidth": "20%", "aTargets": [0,1,2,3] },
            { 
                "sWidth": "20%",
                "data":"id",
                "sClass": "text-center",
                "aTargets": [4], 
                "render":function(data, type, row){
                   return "<a href='javascript:;' class='rowEdit' data-id='"+ data +"'>编辑</a>";
                }                    
            }
        ]  
    });   
    
    //每300秒重新加载表数据(分页留存) 
    setInterval( function () {
        dTable.ajax.reload( null, false ); // 刷新表格数据，分页信息不会重置
    }, 300000 );
    
    //添加页面点击添加按钮
    $('.submitBtn').click(function(){
        var isEdit = $(".forminfo input[name='id']").val().length;
        var message;
        if(isEdit){
            url = editUrl;
            message = '修改规则成功！';
        }else{
            url = addUrl;
            message = '添加规则成功！';            
        }
        var url = isEdit ? editUrl : addUrl;
        $.post(url, $('#form').serialize(), function (data) {
            if (data.code === 200) {
                layer.closeAll();
                $('#form').addClass('hidden');
                layer.msg(message, {time: 2000});
                isEdit ? dTable.ajax.reload(null, false) : dTable.ajax.reload();
                $(".formbody input[name='pid']").val(0);
                $('#form')[0].reset();
            } else {
                layer.msg(data.message, {time: 1500});
            }
        });
    });
    
    //添加子规则按钮点击
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
        var id = $(this).siblings('.rowAddSub').attr('data-id');
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
                        $("input[name='title']").val(data.data.title);
                        $("input[name='name']").val(data.data.name);
                    } else {
                        layer.msg(data.message, {time: 1500});
                    }
                });
            },
            cancel: function (index, layero) {
                $('#form')[0].reset();
                $('#form').addClass('hidden');
                layer.close(index);
                return false;
            }
        });
    });
    
    //点击删除按钮
    $('#typeList').on('click', '.rowDel', function(){
        var id = $(this).siblings('.rowAddSub').attr('data-id');
        layer.confirm(
            '确定删除吗？',
            {
                btn: ['确定', '取消'] //按钮
            },
            function () {
                $.post(delUrl, {id:id}, function (data) {
                    if (data.code === 200) {
                        layer.closeAll();
                        dTable.ajax.reload(null, false);
                    }else{
                        layer.msg(data.message, {time: 1500});
                    }
                });
            }
        );
    });
    
});