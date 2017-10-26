getDate('#time-of-appointment', 'date');
getDate('#specific-time', 'time');
function getDate(id, type) {
    /*选择预约日期*/
    var calendar = new datePicker();
    calendar.init({
        'trigger': id, /*按钮选择器，用于触发弹出插件*/
        'type': type, /*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate': '1900-1-1', /*最小日期*/
        'maxDate': '2100-12-31', /*最大日期*/
        'onSubmit': function () {/*确认时触发事件*/
            var theSelectData = calendar.value;
        },
        'onClose': function () {/*取消时触发事件*/
        }
    });
}
$(function () {
    /*会员编号*/
    $('.member input').on('change', function () {
        if ($(this).val() == 1) {
            $('.number').show();
        } else {
            $('.number').hide();
        }
    });
    $('.submitBtn').on('click', function () {
        var userName = $('#userName').val();        
        var phoneNumber = $('#phoneNumber').val();
        var person_num = $('input[name="person_num"]').val();
        var project = $('select[name="product_id"]').val();
        var store = $('select[name="store_id"]').val();
        var time = $('#time-of-appointment').val();
        var specificTime = $('#specific-time').val();
        var parr = /^(13[0-9]|15[0-9]|17[03678]|18[0-9]|14[57])[0-9]{8}$/;        
        if ( userName && parr.test(phoneNumber) && person_num  && project && store && time && specificTime ) {
            var url = $('#appointmentForm').attr('action');
            $.post(url, $('#appointmentForm').serialize(), function (data) {
                if (data.code === 200) {
                    layer('预约提交成功！');
                } else {
                    layer(data.message);
                }
            });
            return false;
        } else {
            if (userName == '' || userName == null) {
                layer('请填写您的姓名！')
                return false;
            } else {
                if (phoneNumber == '' || phoneNumber == null) {
                    layer('请填写您的电话号码！');
                    return false;
                } else if (!parr.test(phoneNumber)) {
                    layer("请输入格式正确的手机号！");
                    return false;
                } else if (!person_num) {
                    layer("请填写来店人数！");
                    return false;
                }else if (!project) {
                    layer("请选择服务项目！");
                    return false;
                }else if (!store) {
                    layer("请选择门店！");
                    return false;
                }else {
                    if (time == '' || time == null) {
                        layer("请选择预约日期！");
                        return false;
                    } else {
                        if ((specificTime == '' || specificTime == null)) {
                            layer("请选择到店时间！");
                            return false;
                        }
                    }
                }
            }
        }
    });

});
