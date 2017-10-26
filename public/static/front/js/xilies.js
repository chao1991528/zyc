/**
 * 下拉刷新 （自定义实现此方法）
 */
function pullDownAction() {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        location.reload();
    }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction() {
    $.post(moreUrl, {pagesize:8, page:++generatedCount}, function (data) {
        if (data.code === 200) {
            var html = '';
            $.each(data.data, function(i,item){
                html +='<li><a href="' + item.url + '" class="clearBoth"><div class="series-picture"><img src="' + item.logo + '" alt=""></div><div class="series-title series-o">' + item.name + '</div><div class="series-in"><img src="/static/front/images/right.png" alt=""></div></a></li>';
            });
            $('#thelist').append(html);
        } else if(data.code === 201){ 
            layer('没有更多了！');
        }else{
            layer(data.message);
        }
    });
}