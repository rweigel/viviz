// TODO: $.gallery({"showdropdowns":true,"showfilmstrip":true,"showattributes":true,"showconfiguration":true,"showprint",true,"showgrid",true,"showabout":true,"compact","false"]})
// TODO:
//     If vector image, use imgconvert.org.
//     If raster image and thumbs not available, use imgconvert.org.

LAZY_LOAD_MAX  = 12;
FIT_TO_WINDOW  = false; // Code needs work.			
VIVIZ = {"CATALOGXML":"xml/enlil.xml"};

$(document).ready(function(){
	$("#thumbbrowsebutton").click(function () {
		$('#g-container').hide();
		$('#t-container').show()
	})
	$("#gallerybrowsebutton").click(function () {
		$('#t-container').hide();
		$('#g-container').show();
		gallery("#gallery1");
		$("#gallery1 #gallerythumbframe img").first().click(); // To trigger resize of thumb div.
	})
	
	thumb("#thumb1");
	//gallery("#gallery1"); // Causes interference with hashchange

	$(window).hashchange(function(){
		console.log('main.js: Hash has changed to ' + location.hash);
		thumb("#thumb1");
	});

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