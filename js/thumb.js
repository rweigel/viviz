function thumb(wrapper) {

	console.log("thumb.js: Called.")
	
	var GALLERIES = cataloginfo();
    if (GALLERIES === "") {
    	console.log("thumb.js: Aborting because of problem with gallery.");
    	$(wrapper).hide();
    	return;
    }

	$(window).hashchange(function() {
		console.log('thumb.js: Hash has changed to ' + location.hash);
        $(wrapper + " #thumbbrowseframe").html('');
        thumb(wrapper);
	})

	$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};
	var neww = $(window).width()-$.scrollbarWidth();
	$("#t-container").css('width',neww);

	// Thumb only
	$('#t-container').css('max-width', $(document).width()-$.scrollbarWidth());
	$(window).resize(function(){
		$('#t-container').css('max-width', $(document).width()-$.scrollbarWidth());
	});

	$(wrapper + " #error").html();
	$(wrapper + " #instructions").html("Scroll down to load more images");

	if (location.hash !== "") {
		var hash = location.hash;
		var galleryid = hash.replace(/^#/,'').replace(/^\//,"");
	} else {
		var galleryid = GALLERIES["Values"][0]["Id"];
	}


	var INFOG    = galleryinfo(galleryid);
  	var THUMBDIR = INFOG['thumbdir'];
	var FULLDIR  = INFOG['fulldir'];
	var SORTBYS  = INFOG['attributes'];
	var ORDERS   = INFOG['orders'];
    //console.log(INFOG);
    //return;
    var HEADER = cataloginfo(galleryid);   
    $(wrapper + " #about").attr('title',HEADER["about"]).show();

	if ((HEADER["aboutlink"]) && (!HEADER["about"])) {
		$(wrapper + " #about").attr("onclick","window.location='" + HEADER["aboutlink"]+"'");
	}	
	if ((!HEADER["aboutlink"]) && (HEADER["about"])) {
		//$(wrapper + " #about").attr("onclick","window.location='" + HEADER["Fulldir"]+"'");
		$(wrapper + " #about").show();
		if (HEADER["about"].match(/^http/)) {
			//$(wrapper + " #about").html('<a style="color:white"	>About this gallery</a>');
			$(wrapper + " #about").attr('onclick',"window.location='" + HEADER["about"] + "'");
		} else {
			$(wrapper + " #about").attr('title',HEADER["about"]);
		}
	}
	$(wrapper + ' #catalogxmlopen').show();
	$(wrapper + ' #catalogxmlclose').hide();
	$(wrapper + " #catalogxmlopen").unbind('click');
	$(wrapper + " #catalogxmlopen").click(
			function () {
				CodeMirror($('#thumb1 #catalogxml')[0], {lineNumbers:true,"mode":"xml", "value":HEADER["xml"]});
				$(wrapper + ' #catalogxmlopen').hide();
				$(wrapper + ' #catalogxmlclose').show();
				//$('#catalogxmltest').show();
				//$('#catalogxmlsave').show();
				$.scrollTo(this);
			});
	$(wrapper + " #catalogxmlclose").unbind('click');
	$(wrapper + " #catalogxmlclose").click(
			function () {
				$(wrapper + " #catalogxml").html('');
				$(wrapper + ' #catalogxmlopen').show();
				$(wrapper + ' #catalogxmlclose').hide();
				//$('#catalogxmltest').hide();
				//$('#catalogxmlsave').hide();
			}
		);
    	
	//$(wrapper + " #thumbbrowsemode").css('display', 'inline-block;');
	//console.log('thumb.js: galleryid = ' + galleryid);
	
	if ( (typeof(dom) == "function") && ($(wrapper).text() == "") ) {
		//console.log('thumb.js: Inserting DOM from file.');
		$('body').append(dom());
	} else {
		//console.log('thumb.js: Using existing DOM in HTML file.')
	}

	if (THUMBDIR == FULLDIR) {
		$('#pngdirs').html('Images: <a href="'+FULLDIR+'">Full-size</a>');
	} else {
		$('#pngdirs').html('Images: <a href="'+THUMBDIR+'">Thumbnails</a>, <a href="'+FULLDIR+'">Full-size</a>');		
	}
	
	$(wrapper + ' #thumbbrowsemode').unbind('change');
	$(wrapper + ' #thumbbrowsemode').change(function () {
		$(wrapper + " #instructions").html("Scroll down to load more images");
		var galleryid = $(wrapper + " #gallery option:selected").val();
		setthumbbindings(galleryid);
	});

	$(wrapper + " #dropdowns").empty();

	dropdown("gallery", GALLERIES, wrapper + " #dropdowns");
	$(wrapper + " #gallery option[value='" + galleryid + "']").attr('selected','selected');

	$(wrapper + ' #dropdowns #gallery').unbind('change');
	$(wrapper + ' #dropdowns #gallery').change(function (){
		var galleryid = $(wrapper + " #gallery option:selected").val();
		$(wrapper + " #instructions").html("Scroll down to load more images");
		
	    console.log('thumb.js: Gallery changed.  galleryid = ' + galleryid);
		$(wrapper + ' #thumbframe').html('');
		$(wrapper + ' #thumbframe').children().remove();
		console.log("thumb.js: Changing hash.")
		location.hash = "/" + galleryid;
	});
		

	setdropdowns();
	setthumbs();
	
	function setthumbbindings() {
		console.log('thumb.setthumbbindings(): Setting bindings.');
			
		if (!setthumbbindings.active) setthumbbindings.active = {};

		var mode = parseInt($(wrapper + " #thumbbrowsemode :selected").attr("value"));
		
		$(wrapper + ' .thumbbrowse').unbind('click');
		$(wrapper + ' .thumbbrowse').unbind('hover');
		$(wrapper + ' .thumbbrowseoverlay').unbind('click');
		$(wrapper + ' .thumbbrowseoverlay').unbind('hover');

		function setfilename(jq) {
	        $(wrapper + " #filename").html('');
	        $(wrapper + " #filename").append("<a>");
			$(wrapper + " #filename a").attr('href',jq.src.replace(THUMBDIR,FULLDIR)).text(jq.src.replace(THUMBDIR,""));
		}
		
		if (mode == 0) {
			// Needs work
			$(wrapper + ' .thumbbrowse').hover(function(){
				this.src = this.src.replace(THUMBDIR,FULLDIR);
				$(this).css('position', 'absolute');
				setfilename(this);
			}, function(){
				this.src = this.src.replace(FULLDIR,THUMBDIR);
				$(this).css('position', 'relative');
			});
		}
	
		if (mode == 1) {
			// Needs work.
			$(wrapper + ' .thumbbrowse').toggle(function(){
				this.src = this.src.replace(THUMBDIR,FULLDIR);
			}, function(){
				this.src = this.src.replace(FULLDIR,THUMBDIR);
			});
		}
	
		$(wrapper + ' .thumbbrowse').unbind('click');
		$(wrapper + ' .thumbbrowseoverlay').unbind('click');
		$(wrapper + ' .thumbbrowseoverlay').unbind('hover');
		if (mode == 2) {

			deltaleft = $("#thumbbrowseoverlay").position().left - $("#thumbbrowseframe").position().left;
			deltatop = $("#thumbbrowseoverlay").position().top;

			$(wrapper + ' .thumbbrowse').click(function(){
				if (FULLDIR === "") {
					var src = $(this).attr("srcfull");
				} else {
					var src = this.src.replace(THUMBDIR,FULLDIR);
				}
				//console.log(src);
				// Where does this 30 pixels come from?
				$(wrapper + ' #thumbbrowseoverlay')
					.show()
					.attr("src", src)
					.css("left", $(this).offset().left+30)
					.css("top", $(this).position().top+30)

				setthumbbindings.active = this;
				console.log("active.offset().left: " + $(setthumbbindings.active).offset().left);
				console.log("$('#thumbbrowseoverlay').width(): "+$('#thumbbrowseoverlay').width())
				console.log("$('#thumbbrowseoverlay').offset().left: "+$('#thumbbrowseoverlay').offset().left)
				console.log('$(window).width(): '+$(window).width());
				console.log("Flip image? ")
				console.log($(setthumbbindings.active).offset().left + $(wrapper + ' #thumbbrowseoverlay').width() > $(window).width());
				//$(this).css("border", "solid blue 3px");
				//return;
				
				
				$(wrapper + ' #thumbbrowseoverlay').unbind('load');
				$(wrapper + ' #thumbbrowseoverlay').load(function () {
					deltaleft = $("#thumbbrowseoverlay").position().left - $("#thumbbrowseframe").position().left;
					deltatop  = $("#thumbbrowseoverlay").position().top;
					if ($(setthumbbindings.active).offset().left + $(wrapper + ' #thumbbrowseoverlay').width() > $(window).width()) {
						console.log("Flipping.")
						$("#thumbbrowseoverlay").css("left", 
								$(setthumbbindings.active).offset().left+$(setthumbbindings.active).width()-$('#thumbbrowseoverlay').width()+30);
					}
				})
			});
	
			$(wrapper + ' #thumbbrowseoverlay').click(function(){
				$(wrapper + ' #thumbbrowseoverlay').hide();
				$(setthumbbindings.active).css("border", "solid white 3px");
			});
			
			$(wrapper + ' #thumbbrowseoverlay').hover(function(){
	
			}, function(){
				$(wrapper + ' #thumbbrowseoverlay').hide();
				$(setthumbbindings.active).css("border", "solid white 3px");
			});
		}
	
		$(wrapper + ' .thumbbrowseoverlay').unbind('hover');
		$(wrapper + ' .thumbbrowse').unbind('hover');
		if (mode == 3) {

			$(wrapper + ' .thumbbrowse').hover(function(){

				$(setthumbbindings.active).css("border", "solid white 3px");
				setthumbbindings.active = this;
				$(wrapper + ' .thumbbrowseoverlay').unbind('hover');
				$(wrapper + ' #thumbbrowseoverlay').hover(function(){
					// Should be hovered in by default.
				}, function(){
					$(wrapper + '#thumbbrowseoverlay').hide();
					$(setthumbbindings.active).css("border", "solid white 3px");
				});

				$(wrapper + ' #thumbbrowseoverlay').show().attr("src", this.src.replace(THUMBDIR,FULLDIR)).css("left", $(this).offset().left - deltaleft).css("top", deltatop+$(this).position().top);
				$(this).css("border", "solid blue 3px");
				
				$(wrapper + ' #thumbbrowseoverlay').load(function () {
					console.log($(setthumbbindings.active).offset().left + $(this).width() > $("#thumbbrowseframe").width());
					if ($(setthumbbindings.active).offset().left + $(this).width() > $("#thumbbrowseframe").width()) {
						$(this).css("left", $(setthumbbindings.active).offset().left+$(setthumbbindings.active).width()+6-$(this).width()-deltaleft);
					}
				})
			}, function(){});                        
	
		}
	}

	function setthumbs() {
		
		//console.log('thumbbrowse.js: setthumbs(): Setting thumbs.');		
		//$(wrapper + " #working").show();
		
		var THUMBDIR = INFOG['thumbdir'];
		var FULLDIR = INFOG['fulldir'];

		var thumbwidth = "";
		if (FULLDIR == THUMBDIR) {
			//console.log('thumbbrowse.js: No thumbnails detected.');
			var thumbwidth = "50%";
		}

   		$(window).resize(function () {
			$.doTimeout('resize', 250, function(){
				console.log('thumb.setthumbs(): Resize event.');
				setTimeout(loadmore,1000);
			})
		});

		window.onresize = function onresize() {console.log("thumb.setthumbs(): Zoom or resize event.");}

        thumb.Nloaded = 0;
		var newWidth = false;
		var newHeight = false;

		var seterrorheight = false;
		
		var th = 100;
		var tw = 100;
		var thset = false;

		INFOjs = thumblist(wrapper); 	
		$(wrapper + " #thumbbrowseframe").empty();
		
		var maxLength = Math.min(INFOjs.length,LAZY_LOAD_MAX);
		
		//for (var j = 0; j < maxLength; j++) {s = loadone(INFOjs,j)}

		setthumbbindings();        

        console.log("thumb.setthumbs(): maxLength = "+maxLength)
        console.log("thumb.setthumbs(): LAZY_LOAD_MAX = "+LAZY_LOAD_MAX)
	    //if (INFOjs.length > LAZY_LOAD_MAX) {
		loadmore();
	    //} else {
		//	$("#instructions").hide();
	    //}

		//http://stackoverflow.com/questions/5612787/converting-javascript-object-to-string
		function objToString (obj) {
			var str = '';
			var k = 0;
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {str += p + ':' + obj[p] + '\n'}
				k = k+1;
			}
			return str;
		}

		function setslider() {
			$( "#slider" ).slider({
				max: 4,
				min: 1,
				step: 1,
				value: 4,
				slide: function(event, ui) {
					console.log("thumb.setthumbs.setslider(): Slide event.")
					newWidth = tw*ui.value/4;
					newHeight = th*ui.value/4
					$('.thumbbrowse').css('width', newWidth);
					$('.thumbbrowse').css('height', newHeight);
					$(this).attr('data-curr-img-width', newWidth);
					loadmore();
				}
			});
		}

		function setpadding() {

			var bw = 0;
			if ($("#thumbbrowseframe img:first").css('borderLeftWidth')) {
				bw = parseFloat($("#thumbbrowseframe img:first").css('borderLeftWidth').replace("px",""));
			}
			console.log("thumb.setpadding(): First image border width = "+bw);
			x = $(wrapper + " #thumbbrowseframe img:first").outerWidth();
	
			console.log("thumb.setpadding(): First image outer width = " + x);
			a = $("#thumbbrowseframe").innerWidth()/x;				

       		$("#thumbbrowseframe").css('padding',0);	
       		console.log("thumb.setpadding(): Inner width of thumbframe = " + $("#thumbbrowseframe").width());		        		
			console.log("thumb.setpadding(): # images per row = " + a);
      		b = (a - Math.floor(a))*x;

      		// Only one row of images.
      		if (INFOjs.length < Math.floor(a)) {
      			b = $("#thumbbrowseframe").innerWidth() - x*INFOjs.length;
      		}

      		console.log("thumb.setpadding(): Fraction of image spacing left over = " + (a - Math.floor(a)));
      		console.log("thumb.setpadding(): Total extra space = " + b);
      		console.log("thumb.setpadding(): Setting left padding to " + b/2);
      		$("#thumbbrowseframe").css('padding-left',b/2);

		}
		
		function loadone(INFOjs,i) {

			var fixed = false;
			if (i > INFOjs.length-1) return;
			thumb.Nloaded = thumb.Nloaded+1;
			if (thumb.Nloaded == INFOjs.length-1) {
				$("#instructions").html("All images requested.");
				$("#instructions2").html("All images requested.");
			}

			if (INFOjs[i]['ThumbFile']) {
				var src = INFOjs[i]['ThumbFile'];
				var srcfull = INFOjs[i]['FullFile'];
			} else {
				var src = THUMBDIR + INFOjs[i].FileName;
			}

			$('<img class="thumbbrowse" "src=http://viviz.org/gallery/css/transparent.png"/>')
				.width(newWidth || tw || 100)
				.attr("src", src)
				.attr("srcfull", srcfull)
				.attr("id",i)
				.css("height",newHeight || th || 100)
				.attr("title",objToString(INFOjs[i]))
				.error(function () {
					$(this).addClass("loaderror");
					$(this).attr("src","http://viviz.org/gallery/css/transparent.png");
					$(this).css("border","3px solid red");
					$(this).width(newWidth || tw || 100);
					$(this).height(newHeight || th || 100);
					if (th) {
						$('.loaderror').css('height',th);
					}
					if (tw > 0 && !fixed) {fixed = true;$(".loaderror").width(tw)}
				})
				.load(function () {
					if (!loadone.first) {
						console.log("thumb.setthumbs.loadone(): First thumbnail loaded.")
						loadone.first = true;
						if (FULLDIR != THUMBDIR) {
							// If thumbnails exist.
							tw = this.naturalWidth;
							th = this.naturalHeight;
						}  else {
							th = tw*this.naturalHeight/this.naturalWidth;
						}

						$(this).width(newWidth || tw);
						$(this).height(newHeight || th);
						setpadding();
						fillrow();
						
					}

					if (!thset) {
						th = tw*this.naturalHeight/this.naturalWidth;
						$(wrapper+" #thumbbrowseframe img").css('height',th);
						thset = true;
					}

					$(this).width(newWidth || tw);
					$(this).height(newHeight || th);
					setslider();
				})
				.appendTo($(wrapper + ' #thumbbrowseframe'));			
		}
		
		function fillrow () {

				var delta = 0;
				if (loadone.first) {
					console.log("thumb.setthumbs.fillrow(): #thumbbrowseframe innerWidth:" + $("#thumbbrowseframe").innerWidth());
					console.log("thumb.setthumbs.fillrow(): #thumbbrowseframe img:first outerWidth:" + $(wrapper + " #thumbbrowseframe img:first").outerWidth());

					var a = Math.floor($("#thumbbrowseframe").innerWidth()/$(wrapper + " #thumbbrowseframe img:first").outerWidth());				

					console.log("thumb.setthumbs.fillrow(): Images per row = " + a);

					var delta = a - (thumb.Nloaded % a);
					console.log("----thumb.setthumbs.fillrow(): Modifying number to load based on row width.  Loading "+delta+" extra.")
				//var delta = 0;
				}	

				Nl = thumb.Nloaded;
				for (var j = Nl; j < Nl+delta; j++) {
					loadone(INFOjs,j);
				}

		}
		function loadmore () {

        	console.log("thumb.loadmore(): Called. Nloaded = "+thumb.Nloaded);


			if (($(wrapper).height() < $(window).height())) {
				console.log("thumb.loadmore(): Loading more images due to resize event or because more space is available.");
				Nl = thumb.Nloaded;
				for (var j = Nl; j < Nl+maxLength; j++) {
					loadone(INFOjs,j);
				}

				fillrow();
				setpadding();

				setthumbbindings();        
				if (j < INFOjs.length) {
					// Put this in a timeout to allow height to be set.
					setTimeout(function () {loadmore()},100);
				} else {
				    console.log("thumb.loadmore(): No more images to load: j = "+j+", Nl = "+Nl+" INFOjs.length = "+INFOjs.length);
				}
			} else {
				console.log("thumb.loadmore(): Setting scroll trigger.");
				setscrolltrigger();
			}

		}

        function setscrolltrigger() {
			$(window).unbind('scroll');
			$(window).scroll(function (e) {
				Nl = thumb.Nloaded;
				console.log("thumb.setthumbs.setscrolltrigger(): Nl+LAZY_LOAD_MAX="+Nl)
				maxLength = LAZY_LOAD_MAX;
				if (Nl + LAZY_LOAD_MAX > INFOjs.length-1) {
					maxLength = INFOjs.length-Nl;
					$(window).unbind('scroll');
				}
				console.log("thumb.setthumbs.setscrolltrigger(): maxLength="+maxLength+", th="+th)
				console.log("thumb.setthumbs.setscrolltrigger(): $(window).scrollTop() + $(window).height() + 2*th = "+(2*th+$(window).scrollTop() + $(window).height()))
				console.log("thumb.setthumbs.setscrolltrigger(): $(document).height() = " + ($(document).height()))
				if ($(window).scrollTop() + $(window).height() + 2*th >= $(document).height()) {
					for (var j = Nl; j < Nl+maxLength; j++) {
						loadone(INFOjs,j);
					}
					setthumbbindings();
				} else {
					console.log("thumb.setthumbs.setscrolltrigger(): Scroll triggered, but no more loading.");
				}
			})
        }
	
	}

	function setdropdowns() {

		dropdown("order", ORDERS, wrapper + " #dropdowns");
		
		// TODO: Set this based on available space.
		$(wrapper + " #gallery").css('width','15em');

		$(wrapper + ' #dropdowns #order').change(function(){
			setthumbs();
			setthumbbindings();
		});

		if (INFOG['attributes']["Values"] > 1) {
		    dropdown("sortby", INFOG['attributes'], wrapper + " #dropdowns");
			$(wrapper + ' #dropdowns #sortby').change(function(){
				setregexps();
				setthumbs();
			});
			setregexps();	
		} else {
			console.log("thumb.setdropdowns(): No sort attributes.  Not displaying drop-downs for attributes.")
		}

		return true;

		function setregexps() {
			var REGEXPS            = new Object();			
			var n                  = $(wrapper + " #dropdowns #sortby option:selected").val();
			REGEXPS["Title"]       = "Attribute constraints"
			REGEXPS["Titleshort"]  = "-Constraints-"
			REGEXPS["Values"]      = new Array();

			for (i = 0; i < SORTBYS["Values"][n]["Filters"].length; i++) {
				REGEXPS["Values"][i]          = new Object();
				REGEXPS["Values"][i]["Title"] = SORTBYS["Values"][n]["Filters"][i]["Title"];
				REGEXPS["Values"][i]["Value"] = SORTBYS["Values"][n]["Filters"][i]["Value"];
			}

			if (SORTBYS["Values"][n]["Filters"].length > 0) {
				dropdown("regexp",REGEXPS,wrapper + " #dropdowns");
			} else {
				$("#thumb1 #dropdowns #regexp").remove();				
			}

			$(wrapper + ' #dropdowns #regexp').change(function(){
				$(wrapper + " #instructions").html("Scroll down to load more images");
				setthumbs();
			    setthumbbindings();				
			})

		}
	}

}
