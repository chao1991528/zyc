$(document).ready(function () {
    var upload = layui.upload;
    dTable = $('#typeList').DataTable({
        "ajax": "/admin/record/doRlist",
        "language": {
            url: '/admin/record/localisation'
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
            {
                "data": "face_img", 
                "sClass": "text-center",
                "render": function (data, type, full, meta) {
                    return '<img style="width:100px;"  src="' + data + '" />';
                }, 
                "bSortable": false
            },
            {"data": "skin_type", "sClass": "text-center"},
            {"data": "skin_color", "sClass": "text-center"},
            {"data": "is_guomin", "sClass": "text-center"},
            {"data": "skin_problem", "sClass": "text-center"},
            {"data": "want_solve_problem", "sClass": "text-center"},
            {"data": "is_huli", "sClass": "text-center"},
            {"data": "result_skin_type", "sClass": "text-center"},
            {"data": "result_skin_feature", "sClass": "text-center"},
            {"data": "result_protect_point", "sClass": "text-center"},
            {"data": "create_time", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            { "sWidth": "3%", "aTargets": [0] },
            { "sWidth": "7%", "aTargets": [6,7,8] },
            { "sWidth": "8%", "aTargets": [9] },
            { 
                "sWidth": "10%",
                "aTargets": [10], 
                "render":function(data, type, row){
                    var str = data.length>25?(data.substr(0, 25)+'...'):data.substr(0, 25);
                    return '<span title="'+ data +'"' + '>'+ str +'</span>';
                }                    
            },
            {
                "sWidth": "10%", 
                "aTargets": [11], 
                "render":function(data, type, row){
                    var str = data.length>25?(data.substr(0, 25)+'...'):data.substr(0, 25);
                    return '<span title="'+ data +'"' + '>'+ str +'</span>';
                }
            },
            {
                "sWidth": "6%", 
                "aTargets": [12]
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
    
    //导出excel
    $('.export').click(function(){
        layer.confirm(
            '确定导出数据吗？',
            {
                btn: ['确定', '取消'] //按钮
            },
            function () {
                var index = layer.open();
                layer.close(index);
//                layer.close();
                window.location.href = exportUrl;                
            }
        );
    });
});