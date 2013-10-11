function thumb(wrapper) {

	console.log("thumb.js: Called.")
	$(wrapper + " #error").html();
	$(wrapper + " #instructions").html("Scroll down to load more images");
	
	var GALLERIES = cataloginfo();

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
		if (INFOG["thumbpreprocess"]) {
			THUMBDIR = INFOG["thumbpreprocess"] + INFOG['thumbdir'];
		}	

		var FULLDIR = INFOG['fulldir'];
		if (INFOG["fullpreprocess"]) {
			FULLDIR = INFOG["fullpreprocess"] + INFOG['fulldir'];
		}

		var thumbwidth = "";
		if (FULLDIR == THUMBDIR) {
			//console.log('thumbbrowse.js: No thumbnails detected.');
			var thumbwidth = "50%";
		}

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
        
        thumb.Nloaded = 0;
		var newWidth = false;

		var seterrorheight = false;
		
		var th = false;
		var tw = false;

		function setslider() {
			$( "#slider" ).slider({
				max: 4,
				min: 1,
				step: 1,
				value: 4,
				slide: function(event, ui) { 
					console.log(ui.value);
					newWidth = tnw*ui.value/4;
					$('.thumbbrowse').css('width', newWidth);
					$(this).attr('data-curr-img-width', newWidth);
				}
			});
		}
		
        function loadone(INFOjs,i) {
	        var fixed = false;
	        if (i > INFOjs.length-1) return;
	        thumb.Nloaded = thumb.Nloaded+1;
			if (thumb.Nloaded == INFOjs.length-1) $("#instructions").html("All images loaded");
			//console.log(i)
			if (INFOjs[i]['ThumbFile']) {
				var src = INFOjs[i]['ThumbFile'];
				var srcfull = INFOjs[i]['FullFile'];
			} else {
				var src = THUMBDIR + INFOjs[i].FileName;
			}
			
	    	    $('<img class="thumbbrowse" "src=http://viviz.org/gallery/css/transparent.png"/>')
				.attr("src", src)
				.attr("srcfull", srcfull)
				.attr("id",i)
				//.css("height",th || 100)
				.attr("title",objToString(INFOjs[i]))
				.width(newWidth || tw || 100)
				.error(function () {
					$(this).addClass("loaderror");
					$(this).attr("src","http://viviz.org/gallery/css/transparent.png");
					$(this).css("border","3px solid red");
					$(this).width(newWidth || tw || 100);
					//$(this).height(th || 100);
					if (th) {
						$('.loaderror').css('height',th);
					}
					if (tw > 0 && !fixed) {fixed = true;$(".loaderror").width(tw)}})
				.load(function () {
					if (FULLDIR != THUMBDIR) {
						tnw = this.naturalWidth;
						tw = $(this).width();
						tnw = this.naturalWidth;
						th = $(this).height();
					} else {
						tnw = 100;
						tw = 100;
						th = $(this).height();
					}
					$(this).width(newWidth || tw);
					setslider()})
				.appendTo($(wrapper + ' #thumbbrowseframe'));			
        		}

		INFOjs = thumblist(wrapper); 	
		$(wrapper + " #thumbbrowseframe").empty();
		
		var maxLength = INFOjs.length;
		if (maxLength > LAZY_LOAD_MAX) maxLength = LAZY_LOAD_MAX;
		
		for (var j = 0; j < maxLength; j++) {s = loadone(INFOjs,j)}
		setthumbbindings();        
		
		$(window).resize(function () {$.doTimeout('resize', 250, function(){console.log('thumb.loadmore(): Resize event');setTimeout(loadmore,1000)})});

        console.log("thumb.setthumbs(): maxLength = "+maxLength)
        console.log("thumb.setthumbs(): LAZY_LOAD_MAX = "+LAZY_LOAD_MAX)
	    if (INFOjs.length > LAZY_LOAD_MAX) {
			loadmore();
	    } else {
			$("#instructions").hide();
	    }
        
	function loadmore () {
        	console.log("thumb.loadmore() called. Nloaded="+thumb.Nloaded)
			//var Npr = Math.floor($(wrapper + ' #thumbbrowseframe').width()/$(wrapper + ' #thumbbrowseframe img').first().width())-1;
        	//console.log("thumb.loadmore(): " + Math.floor($(wrapper + ' #thumbbrowseframe').width()/$(wrapper + ' #thumbbrowseframe img').first().width())-1);
			if (($(wrapper).height() < $(window).height())) {
				//if ($(wrapper).height() > 0) {
					console.log("thumb.loadmore(): Loading more images due to resize event or because more space is available.");
					Nl = thumb.Nloaded;
					for (var j = Nl; j < Nl+maxLength; j++) {loadone(INFOjs,j)}
					setthumbbindings();        
					if (j < INFOjs.length) {
						// Put this in a timeout to allow height to be set.
						setTimeout(function () {loadmore()},100);
					} else {
					    console.log("thumb.loadmore(): No more images to load: j="+j+", Nl="+Nl+" INFOjs.length="+INFOjs.length);
					}
				//}
			} else {
				console.log("thumb.loadmore(): Setting scroll trigger.")
				setscrolltrigger();
			}
		}

        function setscrolltrigger() {
			$(window).unbind('scroll');
			$(window).scroll(function (e) {
				var bdy = $('body');
				Nl = thumb.Nloaded;
				console.log("Nl+LAZY_LOAD_MAX="+Nl)
				maxLength = LAZY_LOAD_MAX;
				if (Nl + LAZY_LOAD_MAX > INFOjs.length-1) {maxLength = INFOjs.length-Nl;$(window).unbind('scroll');}
				console.log("thumb.loadmore: maxLength="+maxLength+", th="+th)
				console.log("thumb.loadmore: $(window).scrollTop() + $(window).height() + 2*th = "+(2*th+$(window).scrollTop() + $(window).height()))
				console.log("thumb.loadmore: $(document).height() = " + ($(document).height()))
				if ($(window).scrollTop() + $(window).height() + 2*th >= $(document).height()) {
					for (var j = Nl; j < Nl+maxLength; j++) {loadone(INFOjs,j)}
					setthumbbindings();
				} else {
					console.log("thumb.loadmore: Scroll triggered, but no more loading");
				}
			})
        }
	}

	function setdropdowns() {

		dropdown("order", ORDERS, wrapper + " #dropdowns");
		$(wrapper + ' #dropdowns #order').change(function(){
		    setthumbs();
		    setthumbbindings();
		});

	    dropdown("sortby", SORTBYS, wrapper + " #dropdowns");
		$(wrapper + ' #dropdowns #sortby').change(function(){
			setregexps();
			setthumbs();
		    setthumbbindings();
		});

	    setregexps();

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

	function clonedropdowns(wrapperfrom,wrapperto) {
    		var tmpstr = $(wrapperfrom + ' #dropdowns').html();
		$(wrapperto + ' #dropdowns').html(tmpstr);
		$(wrapperto + ' #collection').attr("selectedIndex",$(wrapperfrom + ' #collection').attr('selectedIndex'));
		$(wrapperto + ' #gallery').attr("selectedIndex",   $(wrapperfrom + ' #gallery').attr('selectedIndex'));
		$(wrapperto + ' #sortby').attr("selectedIndex",    $(wrapperfrom + ' #sortby').attr('selectedIndex'));
		$(wrapperto + ' #order').attr("selectedIndex",     $(wrapperfrom + ' #order').attr('selectedIndex'));
		$(wrapperto + ' #regexp').attr("selectedIndex",    $(wrapperfrom + ' #regexp').attr('selectedIndex'));

	}

	window.onresize = function onresize() {
		  console.log("Zoom or resize");	  
	}
	

}
