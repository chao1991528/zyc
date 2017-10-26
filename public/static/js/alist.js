$(document).ready(function () {
    var upload = layui.upload;
    dTable = $('#typeList').DataTable({
        "ajax": "/api/appointment/doAlist",
        "language": {
            url: '/api/appointment/localisation'
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
            {"data": "phone", "sClass": "text-center"},
            {"data": "product_name", "sClass": "text-center"},
            {"data": "store_name", "sClass": "text-center"},
            {"data": "appoint_full_time", "sClass": "text-center"},
            {"data": "person_num", "sClass": "text-center"},
            {"data": "remark", "sClass": "text-center"},
            {"data": "status", "sClass": "text-center"},
            {"data": "member_code", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            { "sWidth": "3%", "aTargets": [0] },
            {  
                "targets": 11,
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
    
    //添加页面点击添加按钮
    $('.submitBtn').click(function(){
        var isEdit = $(".forminfo input[name='id']").val().length;
        var message;
        if(isEdit){
            url = editUrl;
            message = '修改预约成功！';
        }else{
            url = addUrl;
            message = '添加预约成功！';            
        }
        var url = isEdit ? editUrl : addUrl;
        $.post(url, $('#form').serialize(), function (data) {
            if (data.code === 200) {
                layer.close(layer.index);
                $('#form').addClass('hidden');
                layer.msg(message, {time: 2000});
                isEdit ? dTable.ajax.reload(null, false) : dTable.ajax.reload();
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
                        $("input:radio[name='status']").each(function (){
                            $(this).val()==data.data.status?$(this).attr("checked","checked"):null;
                        });
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