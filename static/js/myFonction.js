// 设置cookie
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// 读取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}
function noticeOk(data,i){
	if (data.length<=i) {
		i = 0;
		noticeOk(data,i);
	}else{
		setTimeout(function(){
			$("#notice").html(data[i].content)
			i++;
			noticeOk(data,i);
		},5000)

	}
}