VIVIZ = {"CATALOGXML":"enlil.xml","lazyLoadMax":12,"alternativeFrame":"ss_img_div"};

$(document).ready(function(){

	gallery("#gallery1");  // Initiate the creation of the gallery.
	if (location.hash === "") {
		return;
	} else {
		enlil();
		$("#enlilmain").hide();
	}
})

function enlil() {

	var enlildiv = "#enlil";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		console.log("Mobile Device Detected.");
		var enlildiv = "enlilmobile";
	}

	// Mobile IDs always have trailing 0.
	if (location.hash.match(/0$/)) {
		var enlildiv = "#enlilmobile";
	}

	// Set controls.
	var si;
	$(enlildiv + ' #ss_next').click(function () {$("#next").click();})
	$(enlildiv + ' #ss_prev').click(function () {$("#previous").click();})
	$(enlildiv + ' #ss_start').click(
			function () {
				$("#next").click();
				si = setInterval(
						function () {
							$("#next").click();
						},'200');
						$(enlildiv + ' #ss_start').off
			}
			
	)
	$(enlildiv + ' #ss_stop').click(function () {clearInterval(si); $(enlildiv + ' #ss_start').on();})

	// If in mobile mode, this option is not available.
	$(window).hashchange(function() {
		if (location.hash.match(/\/IPSBD-ENLIL\//)) {
			$("#shock").hide();
		} else {
			$("#shock").show();
		}

		console.log("-- hash has changed.  location.hash = "+location.hash)
		//enlildiv = "#enlil";

		if (!location.hash.match(/Evolution|JMap/)) {
			$(enlildiv + ' #ss_controls').show();
			$(enlildiv + ' #ss_select').show();
			$(enlildiv + ' #dl_select').show();
			$(enlildiv + ' #evo_controls').hide();
			$(enlildiv + ' #jmap_controls').hide();
		} else {
			console.log("-- Hiding image controls.")

			$(enlildiv + ' #ss_controls').hide();
			$(enlildiv + ' #ss_select').hide();
			$(enlildiv + ' #dl_select').hide();
			if (location.hash.match(/Evolution/)) {
				console.log("-- Showing evolution drop-down.")
				$(enlildiv + ' #evo_controls').show();
				$(enlildiv + ' #jmap_controls').hide();										
			}
			if (location.hash.match(/JMap/)) {
				console.log("-- Showing JMap drop-down.")
				$(enlildiv + ' #jmap_controls').show();									
				$(enlildiv + ' #evo_controls').hide();									
			}
		}

		// When hash changes, update about link.
		var galleryid = location.hash.replace("#/",'');
		CATALOGINFO = cataloginfo(galleryid);
		$(enlildiv + " #infolink").attr('href',CATALOGINFO["aboutlink"])

	});

	// On first page load, set about link.
	var galleryid = location.hash.replace("#/",'');
	CATALOGINFO = cataloginfo(galleryid);
	$(enlildiv + " #infolink").attr('href',CATALOGINFO["aboutlink"])

	$(enlildiv).show();

	// Change colors on click.
	$(enlildiv + ' td.input a').on("click",function () {
		$(enlildiv + " td.input").attr('bgcolor','#4488cc');$(this).parent().attr("bgcolor","#224488");
	});
	$(enlildiv + ' td.output a').on("click",function () {
		$(enlildiv + " td.output").attr('bgcolor','#4488cc');$(this).parent().attr("bgcolor","#224488");
	});

	// When an output option is clicked, update the hash in the URL.
	$(enlildiv + ' td.output a').on("click",xupdatehash);
	$(enlildiv + ' td.input a').on("click",xupdatehash);
	$(enlildiv + ' #dl_select').on("change",getdownload);
	$(enlildiv + ' #jmap_controls').on("change",jmap_change)
	$(enlildiv + ' #evo_controls').on("change",evo_change)
}

function jmap_change() {
	console.log("jmap changed to "+$("#jmap_controls option:selected").val());
	location.hash = '/' + location.hash.split('/')[1] + '/JMap/' + $("#jmap_controls option:selected").val();
}

function evo_change() {
	console.log("evo changed to "+$("#evo_controls option:selected").val());
	location.hash = '/' + location.hash.split('/')[1] + '/Evolution/' + $("#evo_controls option:selected").val();
}

function xupdatehash() {

	console.log("--- xupdatehash called.")
	var output = $(this).children('font').attr('id');
	var title = $(this).children('font').attr('id');
	var myoutput = $('#sitetitle').text().split('Solar Wind Prediction');

	if(title.indexOf('/') === -1){ //NOT A MATCH ITS A MODEL
		$('#sitetitle').text(title + ' \u2013 ' + 'Solar Wind Prediction' + myoutput[1]);
	}
	else { //IT IS A MATCH ITS A VARIABLE
		var newtitle = title.split('/');
		$('#sitetitle').text(myoutput[0] + 'Solar Wind Prediction' + ' \u2013 ' + newtitle[0] + ' ' + newtitle[1]);
	}

	location.hash = '/' + location.hash.split('/')[1] + '/' + output;
}