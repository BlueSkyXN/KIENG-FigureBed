$(function () {
    var toTop = $("#to-top"), toTopHide = function () {
        if ($(window).scrollTop() > 50) {
            toTop.removeClass('mdui-fab-hide');
        } else {
            toTop.addClass('mdui-fab-hide');
        }
    };
    if ($(window).scrollTop() > 50) {
        toTopHide();
    }
    $(window).scroll(function () {
        toTopHide();
    });

    toTop.click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
    });

    $('.open-menu').click(function () {
        if ($(window).width() > 1024) {
            app.cookie.set('menu', $('body').hasClass('mdui-drawer-body-left') ? 'open' : 'close', 10, '/');
        }
    });
});

$(function(){
    $('.file-preview>.close>span').hide();
    var g_cookie = app.cookie.get('gonggao');
    if(g_cookie == 1){
        $('#gonggao').hide();
    }else{
        $('#gonggao').show();
    }
    $('#gonggaoClose').click(function(){
        app.cookie.set('gonggao',1,7,'/');
    })

    var isone = app.cookie.get('isone');

    if (isone != 'is') {
        // 如果他是第一次访问就弹出侧边栏
         $('.open-menu').click();
         app.cookie.set('isone','is',7,'/');
    }
    // 获取图床上传总数
    $.post('/getImgNum',{},function(data){
        $('#znumber').html(data.num);
    },'json')
})