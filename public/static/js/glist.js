$(document).ready(function () {
    var laydate = layui.laydate;
    dTable = $('#typeList').DataTable({
        ordering: false,
        paging: false,
        searching: false,
        "ajax": "/admin/AdminGroup/doAdminGroupList",
        "language": {
            url: '/admin/AdminGroup/localisation'
        },
        "columns": [
            {"data": "_name"}
        ],
        "aoColumnDefs": [
            { "sWidth": "50%", "aTargets": [0] },
            { 
                "data":"id",
                "sClass": "text-center",
                "aTargets": [1], 
                "render":function(data, type, row){
                   return "<a href='javascript:;' class='rowEdit' data-id='"+ data +"'>编辑</a> | <a href='javascript:;' class='rowDel'>删除</a> | <a href='javascript:;' class='distribute'>分配权限</a>";
                }                    
            }
        ]  
    });   
    
    //每300秒重新加载表数据(分页留存) 
    setInterval( function () {
        dTable.ajax.reload( null, false ); // 刷新表格数据，分页信息不会重置
    }, 300000 );
    
    $(".select2").uedSelect({
        width: 167
    });
    
    //添加/保存页面点击添加按钮
    $('.submitBtn').click(function(){
        var isEdit = $(".forminfo input[name='id']").val().length;
        var message;
        if(isEdit){
            url = editUrl;
            message = '修改管理员组成功！';
        }else{
            url = addUrl;
            message = '添加管理员组成功！';            
        }
        var url = isEdit ? editUrl : addUrl;
        $.post(url, $('#form').serialize(), function (data) {
            if (data.code === 200) {
                $('#form')[0].reset();
                window.location.reload();
            } else {
                layer.msg(data.message, {time: 1500});
            }
        });
    });
    
    //权限分配按钮点击
    $('#typeList').on('click', '.distribute', function(){
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
                        $("input[name='title']").val(data.data.title);
                        var pidSelect = $(".forminfo select[name='pid']");
                        pidSelect.val(data.data['pid']);
                        pidSelect.siblings('.uew-select-value').children('em').eq(0).html(pidSelect.find("option:selected").text());
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
        var id = $(this).siblings('.rowEdit').attr('data-id');
        layer.confirm(
            '确定删除吗？',
            {
                btn: ['确定', '取消'] //按钮
            },
            function () {
                $.post(delUrl, {id:id}, function (data) {
                    if (data.code === 200) {
                        window.location.reload();
                    }else{
                        layer.msg(data.message, {time: 1500});
                    }
                });
            }
        );
    });
    
});