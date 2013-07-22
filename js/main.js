LAZY_LOAD_MAX = 12;
FIT_TO_WINDOW = false; // Code needs work.			

$(document).ready(function(){
	$("#thumbbrowsebutton").click(function () {
		$('#g-container').hide();
		$('#t-container').show()
	})
	$("#gallerybrowsebutton").click(function () {
		$('#t-container').hide();
		$('#g-container').show();
		$("#gallery1 #gallerythumbframe img").first().click(); // To trigger resize of thumb div.
	})
	
	// TODO: $.gallery({"showdropdowns":true,"showfilmstrip":true,"showattributes":true,"showconfiguration":true,"showprint",true,"showgrid",true,"showabout":true,"compact","false"]})
	gallery("#gallery1");
	thumb("#thumb1");
	$("#thumbbrowsebutton").click();
	
	$("#skin").change(function() {
		var newTheme =  $(this).attr('value');
		$("#jQuery-style").attr("href",newTheme);
		setCookie('ViVizTheme',newTheme, 365);
		return false;
	});
	$('.button').mouseenter(function(){
		$(this).removeClass('ui-state-active');
		$(this).addClass('ui-state-hover');
	});	
	$('.button').mouseleave(function(){
		$(this).removeClass('ui-state-hover');
		$(this).addClass('ui-state-active');
	});
	var selectedTheme = getCookie('ViVizTheme');
	if(selectedTheme!=null)
	{
		$("#jQuery-style").attr("href",selectedTheme);
		$("#skin").val(selectedTheme);
	}

	// Thumb only
	$('body').css('max-width', $(document).width());
	$(window).resize(function(){
		$('body').css('max-width', $(document).width());
	});

});