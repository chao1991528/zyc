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
        tijiaoBtn();
        var self = $(this);
        self.attr('disabled', true);
//        loadings('<img src="/static/front/images/loading.gif" alt="加载" />');       
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
                    self.attr('disabled', false);
                }else{
                    layer(data.message);
                }
            }
        });
    });
});

function tijiaoBtn(){
    //点击选择
    var dataStr= $('.floor1').find('.green').attr('data-str');
    var dataStr1= $('.floor3').find('.green').attr('data-str');
    //console.log(dataStr, dataStr1);
    if(dataStr1 == '易过敏') {
        writeText('敏感性皮肤', '皮肤较敏感，皮脂膜薄，皮肤自身保护能力较弱，皮肤易出现红、肿、刺、痒、痛和脱皮、脱水现象。', '经常对皮肤进行保养；洗脸时水不可以过热过冷，要使用温和的洗面奶洗脸。早晨，可选用防晒霜，以避免日光伤害皮肤；晚上，可用营养型化妆水增加皮肤的水份。在饮食方面要少吃易引起过敏的食物。皮肤出现过敏后，要立即停止使用任何化妆品，对皮肤进行观察和保养护理。护肤品选择：应先进行适应性试验，在无反应的情况下方可使用。切忌使用劣质化妆品或同时使用多重化妆品，并注意不要频繁更换化妆品。');
    } else {
        switch(dataStr) {
            case '不干也不油': 
                writeText('中性皮肤', '水份、油份适中，皮肤酸碱度适中，皮肤光滑细嫩柔软，富于弹性，红润而有光泽，毛孔细小，纹路排列整齐，皮沟纵横走向，这种皮肤一般炎夏易偏油，冬季易偏干。', '注意清洁、爽肤、润肤以及按摩的周护理。注意日补水、调节水油平衡的护理。护肤品选择：依皮肤年龄、季节选择，夏天亲水性，冬天选滋润性，选择范围较广。');
                break;
            case '干燥，毛孔细': 
                writeText('干性皮肤', '皮肤水份油份不正常，干燥、粗糙，缺乏弹性，皮肤的PH值不正常，毛孔细小，脸部皮肤较薄，易敏感。面部肌肤暗沉、没有光泽，易破裂、起皮屑、长斑，不易上妆。', '多做按摩护理，促进血液循环，注意使用滋润、美白、活性的修护霜和营养霜。注意补充肌肤的水份与营养成份、调节水油平衡的护理。护肤品选择：多喝水、多吃水果、蔬菜，不要过于频繁的沐浴及过度使用洁面乳，注意周护理及使用保持营养型的产品，选择非泡沫型、碱性度较低的清洁产品、带保湿的化妆水。');
                break;
            case 'T区油，U区干': 
                writeText('油性皮肤', '油脂分泌旺盛、T部位油光明显、毛孔粗大、常有黑头、外观暗黄，弹性较佳，对外界刺激不敏感。皮肤易吸收紫外线容易变黑、易脱妆、易产生粉刺、暗疮。', '随时保持皮肤洁净清爽， 少吃糖、咖啡、刺激性食物， 多吃维生素B2/B6以增加肌肤抵抗力，注意补水及皮肤的深层清洁，控制油份的过度分泌。护肤品选择：使用油份较少、清爽性、抑制皮脂分泌、收敛作用较强的护肤品。白天用温水洗面，选用适合油性皮肤的洗面奶，保持毛孔的畅通和皮肤清洁。暗疮处不可以化妆，不可使用油性护肤品，化妆用具应该经常清洗或更换。更要注意适度的保湿。');
                break;
            case '全脸泛油，易长痘': 
                writeText('混合性皮肤', '同时具有油性和干性皮肤的特征。多见为面孔T区部位易出油，其余部分则干燥，并时有粉刺发生，80%的女性都是混合性皮肤。混合性皮肤多发生于20岁～39岁之间。', '按偏油性、偏干性、偏中性皮肤分别侧重处理，在使用护肤品时，先滋润较干的部位，再在其它部位用剩余量擦拭。注意适时补水、补营养成份、调节皮肤的平衡。护肤品选择：夏天参考第三项油性皮肤的选择，冬天参考第一项干性皮肤的选择。');
                break;
            default:
                break;
        }
    }
}
function writeText(h3write, swrite, h5write) {
    $('.floor7').find('.floorDes h3').text(h3write);
    $('.floor7').find('.floorDes h4 span').text(swrite);
    $('.floor7').find('.floorDeslast h5').text(h5write);
    /*获取高度*/
    var $height = $('.floor7 .floorDeslast h5').text().length;
    if($height<100){
        $(".floorFrame5").css('height','90px');
    }else if($height<130){
        $(".floorFrame5").css('height','30px');
    }
    // loadings('<img src="/static/front/images/loading.gif" alt="加载" />');
    setTimeout(function(){          
        $(".floor6").hide();
        $(".floor7").show();
    },1500) ;   
}
