var clipboard = new ClipboardJS('.copy', {
        text: function (trigger) {
            return $(trigger).parent('li').text();
        }
    });

    clipboard.on('success', function (e) {
        app.msg(true, '复制成功');
    });

    clipboard.on('error', function (e) {
        app.msg(false, '复制失败');
    });

    $("#image").fileinput({
        uploadUrl: "https://image.kieng.cn/upload.html?type="+ApiUpload,
        language: "zh",
        uploadAsync: true,
        overwriteInitial: false,
        
        maxFileSize: "5120",
        maxFileCount: "20",
        showCaption: true,
        dropZoneEnabled: true,
        browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
        allowedFileExtensions: JSON.parse('["jpg","jpeg","gif","png","ico"]'),
        uploadExtraData: {
            "key":MykeySign,
            "apiSelect": "Local"
        }
    }).on("fileuploaded", function (event, data, previewId, index) {
        var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
        if (200 === response.code) {
            app.msg(true,response.data.name+"上传完成");
            $("#code-url ul").prepend("<li data-index=" + index + ">" + response.data.url + "<i class=\"copy iconfont icon-copy\"></i></li>");
            $("#code-html ul").prepend("<li data-index=" + index + ">&lt;img src=\"" + response.data.url + "\" alt=\"" + response.data.name + "\" title=\"" + response.data.name + "\" /&gt;<i class=\"copy iconfont icon-copy\"></i></li>");
            $("#code-bbcode ul").prepend("<li data-index=" + index + ">[img]" + response.data.url + "[/img]<i class=\"copy iconfont icon-copy\"></i></li>");
            $("#code-markdown ul").prepend("<li data-index=" + index + ">![" + response.data.name + "](" + response.data.url + ")<i class=\"copy iconfont icon-copy\"></i></li>");
            $("#code-markdown-with-link ul").prepend("<li data-index=" + index + ">[![" + response.data.name + "](" + response.data.url + ")](" + response.data.url + ")<i class=\"copy iconfont icon-copy\"></i></li>");
            $(".success-info").css("width", "inherit").css('display', 'block');;
            if (response.data.quota && response.data.use_quota) {
                $('.quota-container progress').attr('max', response.data.quota);
                $('.quota-container progress').val(response.data.use_quota);
                $('.quota-container span.quota').text(app.bytesToSize(response.data.quota));
                $('.quota-container span.use-quota').text(app.bytesToSize(response.data.use_quota));
            }
        } else if (500 === response.code) {
            mdui.alert(response.msg, '发生异常');
        } else {
            mdui.alert(response.msg);
        }
    }).on("filecleared", function (event, data, msg) {
    // 清空
        $('.success-info')
        .css('display', 'none')
        .find('#code-url, #code-html, #code-bbcode, #code-markdown, #code-markdown-with-link')
        .find('ul')
        .html('');
    });

    $('.success-info ul').on('mouseenter', "li", function() {
    $('.file-preview .file-drop-zone .file-preview-thumbnails > [data-template=image]').eq($(this).data('index')).addClass('hover');
    }).on('mouseout', 'li', function () {
    $('.file-preview .file-drop-zone .file-preview-thumbnails > [data-template=image]').eq($(this).data('index')).removeClass('hover');
  });
    $('#image').css("display", "block");