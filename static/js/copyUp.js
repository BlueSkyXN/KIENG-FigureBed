document.addEventListener('paste', function (event) {
    var isChrome = false;
    if ( event.clipboardData || event.originalEvent ) {
      var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
      if ( clipboardData.items ) {
        // for chrome
        var  items = clipboardData.items,
          len = items.length,
          blob = null;
        isChrome = true;

        event.preventDefault();

        let images = [];
        for (var i = 0; i < len; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            blob = items[i].getAsFile();
            images.push(blob);
          }
        }
        if(images.length > 0) {
          uploadBlobFile(images);
        }
        if ( blob !== null ) {
          var reader = new FileReader();
          reader.onload = function (event) {
            var base64_str = event.target.result;
          }

        }
      } else {
        //for firefox
      }
    } else {
    }
  });

function uploadBlobFile(images) {
    var form = $("#image");
    mdui.confirm('检测到了您粘贴了图片是否上传?', '提示:',function() {
      $('.file-drop-zone-title').remove();
      form.fileinput('readFiles', images);
      setTimeout(function () {
        form.fileinput('upload');
      }, 400)
    }, function () {}, {
      confirmText: '确定',
      cancelText: '取消'
    });
  }