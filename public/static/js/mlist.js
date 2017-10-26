$(document).ready(function () {
    dTable = $('#typeList').DataTable({
        "ajax": "/api/Memberlevel/doMlist",
        "language": {
            url: '/api/Memberlevel/localisation'
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
            {"data": "name", "sClass": "text-center"},
            {"data": "conditions", "sClass": "text-center"},
            {"data": "product_discount", "sClass": "text-center"},
            {"data": "meijia_discount", "sClass": "text-center"},
            {"data": "meijie_discount", "sClass": "text-center"},
            {"data": "customized_service", "sClass": "text-center"},
            {"data": "birthday_treat", "sClass": "text-center"},
            {"data": "zunxiang_service", "sClass": "text-center"},
            {"data": "special_service", "sClass": "text-center"}
        ],
        "aoColumnDefs": [
            { "sWidth": "3%", "aTargets": [0] },
            { "sWidth": "6%", "aTargets": [1] },
            {  
                "targets": 10,  
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
            message = '修改会员等级成功！';
        }else{
            url = addUrl;
            message = '添加会员等级成功！';            
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
                        $(".forminfo input[name='conditions']").val(data.data['conditions']);
                        $(".forminfo input[name='product_discount']").val(data.data['product_discount']);
                        $(".forminfo input[name='meijia_discount']").val(data.data['meijia_discount']);
                        $(".forminfo input[name='meijie_discount']").val(data.data['meijie_discount']);
                        $(".forminfo input[name='customized_service']").val(data.data['customized_service']);
                        $(".forminfo input[name='birthday_treat']").val(data.data['birthday_treat']);
                        $(".forminfo input[name='experience']").val(data.data['experience']);
                        $(".forminfo input[name='meal']").val(data.data['meal']);
                        $(".forminfo input[name='social_circle']").val(data.data['social_circle']);
                        $(".forminfo input[name='appoint_service']").val(data.data['appoint_service']);
                        $(".forminfo input[name='brand_discount']").val(data.data['brand_discount']);
                        $(".forminfo input[name='activity_privilege']").val(data.data['activity_privilege']);
                        $(".forminfo input[name='zunxiang_service']").val(data.data['zunxiang_service']);
                        $(".forminfo input[name='special_service']").val(data.data['special_service']);
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
        var product_discount = $.trim($(".forminfo input[name='product_discount']").val());
        var meijia_discount = $.trim($(".forminfo input[name='meijia_discount']").val());
        var meijie_discount = $.trim($(".forminfo input[name='meijie_discount']").val());
        var customized_service = $.trim($(".forminfo input[name='customized_service']").val());
        var birthday_treat = $.trim($(".forminfo input[name='birthday_treat']").val());
        var experience = $.trim($(".forminfo input[name='experience']").val());
        var meal = $.trim($(".forminfo input[name='meal']").val());
        var social_circle = $.trim($(".forminfo input[name='social_circle']").val());
        var appoint_service = $.trim($(".forminfo input[name='appoint_service']").val());
        var brand_discount = $.trim($(".forminfo input[name='brand_discount']").val());
        var activity_privilege = $.trim($(".forminfo input[name='activity_privilege']").val());
        var zunxiang_service = $.trim($(".forminfo input[name='zunxiang_service']").val());
        var special_service = $.trim($(".forminfo input[name='special_service']").val());
        if ( name.length == 0 ) {
            layer.msg('会员等级名称必填', {time: 1500});
            return false;
        }
        if ( name.length > 50 ) {
            layer.msg('会员等级名称不能超过50个字符', {time: 1500});
            return false;
        }
        if ( conditions.length == 0 ) {
            layer.msg('入会条件必填', {time: 1500});
            return false;
        }
        if ( conditions.length > 50 ) {
            layer.msg('入会条件最多不能超过50个字符', {time: 1500});
            return false;
        }
        if ( product_discount.length > 50 ) {
            layer.msg('产品优惠最多不能超过50个字符', {time: 1500});
            return false;
        }
        if ( meijia_discount.length > 50 ) {
            layer.msg('美甲优惠最多不能超过50个字符', {time: 1500});
            return false;
        }
        if ( meijie_discount.length > 50 ) {
            layer.msg('美睫优惠最多不能超过50个字符', {time: 1500});
            return false;
        }
        if ( customized_service.length > 200 ) {
            layer.msg('定制服务最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( birthday_treat.length > 200 ) {
            layer.msg('生日尊享最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( experience.length > 200 ) {
            layer.msg('超值体验最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( meal.length > 200 ) {
            layer.msg('营养餐最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( social_circle.length > 200 ) {
            layer.msg('社交圈最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( appoint_service.length > 200 ) {
            layer.msg('预约服务最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( brand_discount.length > 200 ) {
            layer.msg('品牌优惠最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( activity_privilege.length > 200 ) {
            layer.msg('参与活动最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( zunxiang_service.length > 200 ) {
            layer.msg('尊享服务最多不能超过200个字符', {time: 1500});
            return false;
        }
        if ( special_service.length > 200 ) {
            layer.msg('专属服务最多不能超过200个字符', {time: 1500});
            return false;
        }
        return true;
    }
    
});