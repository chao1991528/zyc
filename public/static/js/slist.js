$(document).ready(function () {
    dTable = $('#typeList').DataTable({
        "ajax": "/api/Store/doSlist",
        "language": {
            url: '/api/Store/localisation'
        },
        "order": [[ 1, "desc" ]],
        paging: false,
        ordering: false,
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
            {"data": "sort", "sClass": "text-center"},
            {"data": "create_time", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            {  
                "targets": 5,  
                "searchable": false,
                "sClass": "text-center",               
                "sWidth": '6%',
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
        var res = form_check();
        if(!res){
            return;
        }
        var url;
        var message;
        if(isEdit){
            url = editUrl;
            message = '修改门店成功！';
        }else{
            url = addUrl;
            message = '添加门店成功！';            
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
                        $(".forminfo input[name='name']").val(data.data['name']);
                        $(".forminfo input[name='sort']").val(data.data['sort']);                      
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
    //表单验证
    function form_check(){
        var name = $.trim($(".forminfo input[name='name']").val());
        var conditions = $.trim($(".forminfo input[name='conditions']").val());      
        if ( name.length === 0 ) {
            layer.msg('门店名称必填', {time: 1500});
            return false;
        }
        if ( name.length < 2 ) {
            layer.msg('门店名称不能少于2个字符', {time: 1500});
            return false;
        }
        return true;
    }
    
});