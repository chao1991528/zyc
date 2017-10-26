$(document).ready(function() {
    $(".submitBtn").click(function() {
        var username = $.trim($(".forminfo input[name='username']").val());
        var password = $.trim($(".forminfo input[name='password']").val());
        if (username.length < 2) {
            layer.msg('用户名至少2个字符！', {time: 1500});
            return;
        }
        if (password.length > 0 && password.length < 6) {
            layer.msg('新密码至少6个字符！', {time: 1500});
            return;
        }
        var url = $('#userForm').attr('action');
        $.post(url, {username: username, password: password}, function(data) {
            if (data.code === 200) {
                layer.msg('账号信息修改成功', {time: 2000});
            } else {
                layer.msg(data.message, {time: 1500});
            }
        });
    });
});