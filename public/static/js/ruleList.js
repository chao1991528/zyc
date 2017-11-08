$(document).ready(function () {
    var laydate = layui.laydate;
    dTable = $('#typeList').DataTable({
        ordering: false,
        "bPaginate": false,
        searching: false,
        "ajax": "/admin/AuthRule/doRuleList",
        "language": {
            url: '/admin/AuthRule/localisation'
        },
        "columns": [
            {"data": "_name"},
            {"data": "name", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            { "sWidth": "33%", "aTargets": [0,1] },
            { 
                "sWidth": "34%",
                "data":"id",
                "sClass": "text-center",
                "aTargets": [2], 
                "render":function(data, type, row){
                   return "<a href='javascript:;' class='rowAddSub' data-id='"+ data +"'>添加子规则</a> | <a href='javascript:;' class='rowEdit'>编辑</a> | <a href='javascript:;' class='rowDel'>删除</a>";
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
                $(".formbody input[name='id']").removeAttr('value');
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
                        $("#form input[name='pid']").val(data.data.pid);
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