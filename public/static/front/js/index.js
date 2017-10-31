/*********设置在不同屏幕下的手机字体显示大小不同*********/
(function (doc, win) {
    var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth)
                    return;
                if (clientWidth >= 640) {
                    docEl.style.fontSize = '100px';
                } else {
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                }
            };

    if (!doc.addEventListener)
        return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


/*****************layer弹框***********/
function layer(text) {
    $('#layer').remove();
    var layer = ('<div id="layer" class="layer">' + text + '</div>');
    $('body').append(layer);
    var time = setInterval(function () {
        $('#layer').fadeOut();
        clearInterval(time);
    }, 1500);//1.5s后自动隐藏
}

/*****************加载弹框***********/
function loadings(text) {
    $('#layer').remove();
    var layer = ('<div id="loadings" class="loadings">' + text + '</div>');
    $('body').append(layer);
    var time = setInterval(function () {
        $('#loadings').fadeOut();
        clearInterval(time);
    }, 1500);//1.5s后自动隐藏
}

$(function () {
    /**********上传封面**********/
    //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    var clipArea = new bjj.PhotoClip("#clipArea", {
        size: [300, 390], // 截取框的宽和高组成的数组。默认值为[260,260]
        outputSize: [300, 390], // 输出图像的宽和高组成的数组。默认值为[0,0]，表示输出图像原始大小
        //outputType: "jpg", // 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
        file: "#file", // 上传图片的<input type="file">控件的选择器或者DOM对象
        view: "#view", // 显示截取后图像的容器的选择器或者DOM对象
        ok: "#clipBtn", // 确认截图按钮的选择器或者DOM对象
        loadStart: function () {
            // 开始加载的回调函数。this指向 fileReader 对象，并将正在加载的 file 对象作为参数传入
            $('.cover-wrap').fadeIn();
//            console.log("照片读取中");
        },
        loadComplete: function () {
            // 加载完成的回调函数。this指向图片对象，并将图片地址作为参数传入
//            console.log("照片读取完成");
        },
        //loadError: function(event) {}, // 加载失败的回调函数。this指向 fileReader 对象，并将错误事件的 event 对象作为参数传入
        clipFinish: function (dataURL) {
            // 裁剪完成的回调函数。this指向图片对象，会将裁剪出的图像数据DataURL作为参数传入
            $('.cover-wrap').fadeOut();
            $('#view').css('background-size', '100% 100%');
            layer("图片上传成功！");
            setTimeout(function () {
                $(".indexPage").hide();
                $(".floor1").show();
            }, 2000);
        }
    });
    //clipArea.destroy();
    //点击取消关闭窗口
    $('#closeBtn').click(function () {
        $('.cover-wrap').hide();
    });


    /**********点击单选选择**********/
    $(".floor0").on('click', 'li', function () {
        var $this = $(this).attr("data-id");
        $(this).parent('ul').siblings('input').val($(this).attr('data-str'));
        $(this).addClass("green").siblings().removeClass("green");
    });

    /**********点击多选选择**********/
    // 将.ui-choose实例化
    $('.ui-choose').ui_choose();
    // uc_03 ul 多选
    var uc_03 = $('#uc_03').data('ui-choose');
    uc_03.click = function (index, item) {
        //console.log('click', item);
    };
    uc_03.change = function (index, item) {
        var str = '';
        $.each(index, function(i,v){
            str += $('.ui-choose li').eq(v).attr('data-str')+',';
        });
        str = str===''? '':str.substring(0,str.length-1);
        $('.ui-choose').siblings('input').val(str);
    };
    //判断没有selected弹出提示框
    $('.floor4').on('click', '.next', function () {
        var $class = $(".floor4 li").hasClass("selected");
        if (!$class) {
            layer("请选择皮肤问题");
        } else {
            $(".floor4").hide();
            $(".floor5").show();
        }
    });

    /*获取高度*/
    var $height = $('.floor7 .floorDeslast h5').text().length;   
    if($height<100){
        $(".floorFrame5").css('height','90px');
    }else if($height<130){
        $(".floorFrame5").css('height','30px');
    }

    /**********点击下一步**********/
    //第一页
    $(".floor1").on('click', '.next', function () {
        $(".floor1").hide();
        $(".floor2").show();
    });
    //第二页
    $(".floor2").on('click', '.next', function () {
        $(".floor2").hide();
        $(".floor3").show();
    });
    //第三页
    $(".floor3").on('click', '.next', function () {
        $(".floor3").hide();
        $(".floor4").show();
    });

    //第五页
    $(".floor5").on('click', '.next', function () {
        $(".floor5").hide();
        $(".floor6").show();
    });
    //第六页
    $(".floor6").on('click', '.next', function () {
        loadings('<img src="/static/front/images/loading.gif" alt="加载" />');       
        var formData = new FormData($('#form')[0]);
        $.ajax({
            type: 'POST',
            data: formData,
            url: subUrl, 
            processData: false,
            contentType: false,
            async: false,
            success: function (data) {
                if(data.code === 200){
                    $('.floor7 h3').html(data.data.result_skin_type);
                    $('.floor7 h4 span').html(data.data.result_skin_feature);
                    $('.floor7 h5').html(data.data.result_protect_point);
                    setTimeout(function () {
                        $(".floor6").hide();
                        $(".floor7").show();
                    }, 2000);
                }else{
                    layer(data.message);
                }
            }
        });
        
        
//        $("input[name='skin_type']").val($('.floorDes ul').eq(0).children('li .green').attr('data-str'));
    });
});


