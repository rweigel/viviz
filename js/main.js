// TODO: $.gallery({"showdropdowns":true,"showfilmstrip":true,"showattributes":true,"showconfiguration":true,"showprint",true,"showgrid",true,"showabout":true,"compact","false"]})
// TODO:
//     If vector image, use imgconvert.org.
//     If raster image and thumbs not available, use imgconvert.org.

VIVIZ = {
			"CATALOGXML":"xml/enlil.xml",
			"defaultmode":"gallery",
			"showthumbstrip":false,
			"thumbheight":10.15,
			"thumbwidth":10.15,
			"fullwidth":550,
			"lazyLoadMax":12,
			"fullheight":880
		};

function updatehash() {
	var output = $(this).children('font').attr('id');
	location.hash = '/' + location.hash.split('/')[1] + '/' + output;
}


function replacetitle(which,mytext) {
  var myoutput = $('#sitetitle').text().split('Solar Wind Prediction');
  //console.log(elid);
  console.log(myoutput[0],myoutput[1]);
  if (which == "Model"){
    $('#sitetitle').text(mytext + ' \u2013 ' + 'Solar Wind Prediction' + myoutput[1]);
  }
  if (which == "Variable"){
    $('#sitetitle').text(myoutput[0] + 'Solar Wind Prediction' + ' \u2013 ' + mytext);
  }
}

$(document).ready(function(){

	// Code here executed when DOM is loaded and ready for manipulation.
	$('#enlil table a').on("click",updatehash)

	//$("#gallerycontrols").hide();
	//$("#stats").hide();
		
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
	
	$("#g-container").detach().appendTo("#ss_img_div");
	$("#enlil").show();

});