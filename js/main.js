// TODO: $.gallery({"showdropdowns":true,"showfilmstrip":true,"showattributes":true,"showconfiguration":true,"showprint",true,"showgrid",true,"showabout":true,"compact","false"]})
// TODO:
//       If vector image, use imgconvert.org.
//       If raster image and thumbs not available, use imgconvert.org.
// TODO: thumbWidth and fullWidth are ignored.

VIVIZ = {
			"CATALOGXML":"xml/enlil.xml",
			"defaultmode":"gallery",
			"showThumbstrip":true,
			"showFileName":true,
			"showCatalog":true,
			"showControls":true,
			"showAttributes":true,
			"showDropdowns":true,
			"lazyLoadMax":10,
			"useCachedImages":false
		};

$(document).ready(function(){
	return;
	// Code here executed when DOM is loaded and ready for manipulation.
	$("#thumbbrowsebutton").click(function () {
		$('#g-container').hide();
		$('#t-container').show();
		thumb("#thumb1");
	})
	
	$("#gallerybrowsebutton").click(function () {
		$('#t-container').hide();
		$('#g-container').show();
		gallery("#gallery1");
	})

	if (VIVIZ["defaultmode"] == "gallery") {
		$("#gallerybrowsebutton").click();
	} else {
		$("#thumbbrowsebutton").click();
	}

});