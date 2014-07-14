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
	var title = $(this).children('font').attr('id');
	var myoutput = $('#sitetitle').text().split('Solar Wind Prediction');
	$("#enlil td.output").attr('bgcolor','#4488cc');
	$(this).parent().attr("bgcolor","#224488");

	if(title.indexOf('/') === -1){ //NOT A MATCH ITS A MODEL
  		$('#sitetitle').text(title + ' \u2013 ' + 'Solar Wind Prediction' + myoutput[1]);
  	}
  	else { //ITS A MATCH ITS A VARIABLE
  		var newtitle = title.split('/');
  		$('#sitetitle').text(myoutput[0] + 'Solar Wind Prediction' + ' \u2013 ' + newtitle[0] + ' ' + newtitle[1]);
  	}

	location.hash = '/' + location.hash.split('/')[1] + '/' + output;
}

function getdownload() {
	//console.log("THIS: " + $( "#dl_select option:selected" ).text());
	var aa = $( "#dl_select option:selected" ).text();
	if(aa == "File List"){ window.location = "_blank"; }
	if(aa == "Animated GIF"){ window.location = "http://aurora.mesa.gmu.edu/cgi-bin/imgconvert.cgi?base=http://spaceweather.gmu.edu/projects/enlil/ipsbd/tim1evo4vel2b/&in=0240.gif,0249.gif&height=200&out=gif"; }
	if(aa == "MP4"){ window.location = "_blank"; }
	if(aa == "MOV"){ window.location = "http://aurora.mesa.gmu.edu/cgi-bin/imgconvert.cgi?base=http://spaceweather.gmu.edu/projects/enlil/ipsbd/tim1evo4vel2b/&in=0240.gif,0249.gif&height=200&out=gif"; }
	if(aa == "Zip File"){ window.location = "http://aurora.mesa.gmu.edu/cgi-bin/imgconvert.cgi?base=http://spaceweather.gmu.edu/projects/enlil/ipsbd/tim1evo4vel2b/&in=0240.gif,0249.gif&height=200&out=zip"; }
}


$(document).ready(function(){

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

	var si;
	$('#enlil #ss_stop').click(
			function () {
				clearInterval(si);
			}
	)
	$('#enlil #ss_start').click(
			function () {
				$("#next").click();
				si = setInterval(
						function () {
							console.log('Clicking next');
							$("#next").click();
						},'200');
			}
	)
	//$("#g-container").detach().appendTo("#ss_img_div");
	$('#g-container').hide();
	$("#enlil").show();
	$('#enlil td.input a').on("click",function () {	$("#enlil td.input").attr('bgcolor','#4488cc');$(this).parent().attr("bgcolor","#224488");});
	$('#enlil td.output a').on("click",updatehash);
	$('#enlil td.output a').css('cursor','pointer')
	$('#enlil select').css('font-size','12pt');

	//$("#gallerycontrols").hide();
	//$("#stats").hide();
		

});