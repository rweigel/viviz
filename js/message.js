function error (wrapper,msg,clear) {
	$(wrapper + ' #error').show();
	if (clear) {
		$(wrapper + ' #error').html(msg);
	} else {
		$(wrapper + ' #error').append(msg)
	};
}

function warning (wrapper,msg,clear,totime) {
	$(wrapper + ' #warning').show();
	if (clear) {
		$(wrapper + ' #warning').html(msg);
	} else {
		spacer="";
		if ($(wrapper + ' #warning').text().length > 0) {
			spacer=" | ";
		};
		$(wrapper + ' #warning').append(spacer + msg);
	}

	if (totime != Infinity)
		setTimeout(function () {$(wrapper + ' #warning').html('').hide();},totime || 3000);
}