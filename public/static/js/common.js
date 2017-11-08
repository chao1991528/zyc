$(function () {
    var layer = layui.layer;
    $('#logout').click(function () {
        layer.confirm('确定退出登录吗？',
                {
                    btn: ['确定', '取消'] //按钮
                },
                function () {
                    $.post("/doLogout", function (data) {
                        if (data.code === 200) {
                            window.location.href = "/aindex.html";
                        }
                    }
                    );
                });
    });

    //顶部导航切换
    $(".nav li a").click(function () {
        $(".nav li a.selected").removeClass("selected");
        $(this).addClass("selected");
    });

    //导航切换
    $(".menuson .header").click(function () {
        var $parent = $(this).parent();
        $(this).parent('li').siblings().removeClass("active open").find('.sub-menus').hide();

        $parent.addClass("active");
        if (!!$(this).next('.sub-menus').size()) {
            if ($parent.hasClass("open")) {
                $parent.removeClass("open").find('.sub-menus').hide();
            } else {
                $parent.addClass("open").find('.sub-menus').show();
            }
        }
    });

    // 三级菜单点击
    $('.sub-menus li').click(function (e) {
        $(".sub-menus li.active").removeClass("active");
        $(this).parents('li').addClass('open');
        $(this).parents('li').siblings('li .open').removeClass('open');
        $(this).addClass("active");
    });

    $('.title').click(function () {
        var $ul = $(this).next('ul');
        $('dd').find('.menuson').slideUp();
        if ($ul.is(':visible')) {
            $(this).next('.menuson').slideUp();
        } else {
            $(this).next('.menuson').slideDown();
        }
    });
    //数据列表页全选和全不选
    $('.checkall').click(function () {
        if ($(this).is(':checked')) {
            $('body tr td input[type="checkbox"]').prop("checked", true);
            $('body tr').addClass('selected');
        } else {
            $('body tr td input[type="checkbox"]').prop("checked", false);
            $('body tr').removeClass('selected');
        }
    });
    //如果有一行取消/选中，则取消/全选
    $('table').on('click', 'tbody tr input[type="checkbox"]', function () {
        if ($(this).is(':checked')) {
            $(this).parents('tr').addClass('selected');
            var checkboxNum = $('body tr td input[type="checkbox"]').length;
            var checkedNum = 0;
            $('body tr td input[type="checkbox"]').each(function () {
                if ($(this).is(':checked')) {
                    checkedNum++;
                }
            });
            if (checkboxNum === checkedNum) {
                $('.checkall').prop('checked', true);
            }

        } else {
            $(this).parents('tr').removeClass('selected');
            $('.checkall').prop('checked', false);
        }
    });

    //数据列表页删除按钮
    $('.toolbar').children('li').eq(1).click(function () {
        var ids = '';
        var num = 0;
        $('body tr td input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                ids += $(this).val() + ',';
                num++;
            }
        });
        if (ids.length > 0) {
            layer.confirm('确定删除这' + num + '项吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                ids = ids.substring(0, ids.length - 1);
                $.post(delUrl, {ids: ids},
                    function (data) {
                        if (data.code === 200) {
                            dTable.rows('.selected').remove().draw(false);
                            layer.msg('删除成功！', {time: 1500});
                        } else {
                            layer.msg(data.message, {time: 1500, icon: 5});
                        }
                    }
                );
            });
        } else {
            layer.open({title: '错误', icon: 5, content: '没有选中删除项目！'});
        }
    });
    
    //添加按钮点击
    $('.toolbar').children('li').eq(0).click(function () {
        $('#form').removeClass('hidden');
        $('#form .submitBtn').val('添加');
        $('#form .formtitle span').eq(0).html('添加');
        $("#form .forminfo input[name='id']").val('');
        layer.open({
            type: 1,
            area: '700px',
            shadeClose: false,
            content: $('#form'),
            cancel: function (index, layero) {
                $('#form').addClass('hidden');
                layer.close(index);
                return false;               
            }
        });
    });
        
    //重置表单
    $('.resetBtn').click(function(){
        $('#form')[0].reset();
    });
   
});