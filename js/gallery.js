function gallery(wrapper) {
	
	console.log("gallery.js: Called.");
	
    function settabledims(tw,th) {

		//if (!$("#wrapper").is(":visible")) {return}
		
	    // Adjust table dimensions based on large image height.
	    // TODO: Compute integers used in code below (e.g., 10, 25).
	    //       (So robust against changes in padding or border widths.)
	    console.log("gallery.settabledims(): Full img width = " + $(wrapper + " #fullframe img").eq(0).height());
	    
	    // Set heights of thumbframe and fullframe.
        if ($(wrapper + " #fullframe img").eq(0).height() > 0) {
            $(wrapper + " #gallerythumbframe").height($(wrapper + " #fullframe img").eq(0).height()+10);
            $(wrapper + " #fullframe").height($(wrapper + " #fullframe img").eq(0).height()+10);
        } else {
            if ($('#gallerythumbframe img').eq(0).height() > 0) {
            	$(wrapper + ' #gallerythumbframe').height(4*$('#gallerythumbframe img').eq(0).height()+10)
            } else {
            	var h = 300;
            	if (th) h = 4*th+10;
            	console.log("gallery.settabledims(): First thumb height null or zero and full image height null or zero.  Setting #gallerythumbframe height to be " + h);
            	$(wrapper + ' #gallerythumbframe').height(h);
            }
        }
	
		// Set widths of thumbframe and fullframe.
        $(wrapper + ' #gallerythumbframe').width($('#gallerythumbframe img').eq(0).width()+25);
        if ($(wrapper + " #fullframe img").eq(0).width() > 0) {
            var w = $(wrapper + " #fullframe img").eq(0).width()+25;
            console.log("settabledims(): Setting #fullframe width to be " + w);
            $(wrapper + " #fullframe").width(w);
        }

		if (!FIT_TO_WINDOW) {return};
	    	
		console.log("gallery.settabledims(): Window width: "+ $(window).width());
        console.log("gallery.settabledims(): Enclosing body width: " + $($(wrapper).parents().filter('body')[0]).width());

        // Fit full image to size of enclosure.
		var isInIframe = (window.location != window.parent.location) ? true : false;

        // Enclosure resize (Some browsers fire event continually, so use timeout.)
        enclosure = $(wrapper).parents().filter('body')[0];
        $(enclosure).resize(function(){
            $.doTimeout('resize', 250, function(){
                console.log('gallery.settabledims(): Enclosure resize event.');
                //settabledims();
            });
        });
        
        if (($(document).width() > $(enclosure).width()) && ($(document).height() <= $(enclosure).height())) {
            var wo = $(wrapper + " #fullframe img").width();
            var wf = -50+Math.round(wo*($(enclosure).width()/$(document).width()));
            $(wrapper + " #fullframe img").width(wf);
            if (wf > 0) {
                settabledims();
            }
        }
        
        if (($(document).height() > $(enclosure).height()) && ($(document).width() <= $(enclosure).width())) {
            var ho = $(wrapper + " #fullframe img").height();
            var hf = -10+Math.round(ho*($(enclosure).height()/$(document).height()));
            $(wrapper + " #fullframe img").height(hf);
            if (hf > 0) {
                settabledims();
            }
        }
        
        if (($(document).height() > $(enclosure).height()) && ($(document).width() > $(enclosure).width())) {
            var wo = $(wrapper + " #fullframe img").width();
            var wf = -50+Math.round(wo*($(enclosure).width()/$(document).width()));
            var ho = $(wrapper + " #fullframe img").height();
            var hf = -10+Math.round(ho*($(enclosure).height()/$(document).height()));
            var ar = Math.min(wf/wo,hf/ho);
            $(wrapper + " #fullframe img").height(Math.round(ho*ar));
            $(wrapper + " #fullframe img").width(Math.round(wo*ar));
            //settabledims();
        }
    }
    
	function loadfull(jq) {

		var id = $(jq).attr('id');
		
		var lastvisible = parseInt($(wrapper).attr('lastvisible'));
		$(wrapper + " #fullframe img[id=" + lastvisible + "]").hide();

		if ($(wrapper + " #fullframe img[id="+id+"]").length == 1) {
			console.log('gallery.loadfull(): Found hidden full image in DOM.  Showing.');
			$(wrapper + " #fullframe img[id=" + id + "]").show();
			settabledims();
			return;
		}
	
		//console.log('gallery.js: Placing new full image.');
        //console.log('gallery.js: Showing ' + wrapper + ' #workingfullframe spinner.');

        $(wrapper + ' #workingfullframe').css('visibility','visible');
               
        var lastwidth = $(wrapper + " #fullframe #1").width();
        var lastheight = $(wrapper + " #fullframe #1").height();
	    $(wrapper + " #fullframe").prepend('<img id="'+id+'" class="full"/>');
	    jq.src.replace(GALLERYINFO['thumbdir'],GALLERYINFO['fulldir']);
	    
        $(wrapper + " #fullframe img[id="+id+"]").unbind('load');
        $(wrapper + " #fullframe img[id="+id+"]")
	        	.error(function () {$(this).remove();$(wrapper + ' #workingfullframe').css('visibility','hidden');})
	        	.load(function(){
		        	//console.log('gallery.js: ' + wrapper + ' #'+id+' loaded.');
		        	if (id == 1) {
		        		console.log('gallery.loadfull(): First full image loaded with height = '+$(this).height()+'.  Setting table dimensions.');
		        		settabledims();
		        	}
		        	$(wrapper + " #fullframe img").eq(0).click();
				//console.log('gallery.js: Hiding ' + wrapper + ' #workingfullframe spinner.');
		        	$(wrapper + ' #workingfullframe').css('visibility','hidden');
		        	//settabledims();
				$(wrapper + " #fullframe img[id="+id+"]").unbind("click");
				$(wrapper + " #fullframe img[id="+id+"]").click(function() {$(wrapper + " #next").click()});
	        });
        
        $(wrapper + " #fullframe img[id="+id+"]")
        		.attr('src', $(jq).attr('src').replace(GALLERYINFO['thumbdir'],GALLERYINFO['fulldir']));

		
        $(wrapper + " #filename").html('');
        $(wrapper + " #filename").append("<a>");
        $(wrapper + " #filename a").
        		attr('href',jq.src.replace(GALLERYINFO['thumbdir'],GALLERYINFO['fulldir'])).
        		text(jq.src.replace(GALLERYINFO['thumbdir'],""));
        
        if (jq.title) {$(wrapper + ' #fullframe #'+id).attr("title",jq.title)}		
        		
	}
	
	function setthumbbindings() {
        // Actions to take when a thumbnail is clicked.
        
		settabledims();
        //console.log("gallery.js: clickthumb() called.");
        if (arguments.callee.caller.name) {
            //console.log("gallery.js: caller is " + arguments.callee.caller.name);		
        } else {
            //console.log("gallery.js: caller is " + arguments.callee.caller.toString().substring(0,80).replace(/\n/g,'').replace(/\s\s/g,''));
        }            

        var nowvisible  = parseInt($(wrapper).attr('nowvisible'));
        if (isNaN(nowvisible)) {
       	 	nowvisible = 1;
            $(wrapper).attr('nowvisible', '1');
        } else {
            nowvisible = $(this).attr('id');
            //console.log('Setting nowvisible to ' + nowvisible);
            $(wrapper).attr('nowvisible', nowvisible);
        }
        var lastvisible = parseInt($(wrapper).attr('lastvisible'));
        if (isNaN(lastvisible)) {
        	lastvisible = 1;
            $(wrapper).attr('lastvisible', '1');
        }
        
        //console.log("gallery.js: Thumbnail " + nowvisible + " clicked.");
        $(wrapper + " #gallerythumbframe #" + lastvisible).removeClass('active').addClass('inactive');

        //console.log("gallery.js: Last visible = " + lastvisible + "");
        $(wrapper + " #gallerythumbframe #" + nowvisible).removeClass('inactive').addClass('active');
        
        // TODO: Duplicate calls can be avoided by giving each stat string an id and then showing hidden
        // 		 stat string if it already exists in DOM.
        INFOjs = thumblist(wrapper); 

        var statstr = "Attributes for #" + (nowvisible) + "/" + (INFOjs.length) + " in subset: ";
        statstr = statstr + " | Image #" + (1+INFOjs[nowvisible-1].ImageNumber) + "/" + $(wrapper).attr('totalingallery') + " in gallery | ";
        
        for (var z = 1;z < GALLERYINFO['attributes']["Values"].length;z++) {
            statstr = statstr + GALLERYINFO['attributes']["Values"][z].Title + " = ";
            if (GALLERYINFO['attributes']["Values"][z].Format) {
                statstr = statstr + sprintf(GALLERYINFO['attributes']["Values"][z].Format,parseFloat(INFOjs[nowvisible-1][GALLERYINFO['attributes']["Values"][z].Value]));
            } else {
                statstr = statstr + INFOjs[nowvisible-1][GALLERYINFO['attributes']["Values"][z].Value];            		
            }
            if (GALLERYINFO['attributes']["Values"][z].Unit) {
                statstr = statstr + " [" + GALLERYINFO['attributes']["Values"][z].Unit + "] " +  " | ";
            } else {
                statstr = statstr + " | ";
            }
        }

        $(wrapper + ' #stats').html(statstr);

		// Load full image.
        loadfull(this); 
        
        $(wrapper).attr("lastvisible",nowvisible);

        // Scroll thumbnail list
        $(wrapper + " #gallerythumbframe").scrollTo(this, 0, {
           duration: 80, offset: 0
        });
    }

    function setthumb(INFOjs,i,allbad) {

        // Detect bad images:
        // https://github.com/desandro/imagesloaded
        // http://stackoverflow.com/questions/821516/browser-independent-way-to-detect-when-image-has-been-loaded
	    // http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached
    	
    	function setscrollbinding() {
    		//return;
			$('#gallerythumbframe').scroll(function(e){
				//console.log("Scroll event")
				var elem = $(this);
				//console.log(elem[0].scrollHeight - elem[0].scrollTop - elem[0].clientHeight)
				if (elem[0].scrollHeight - elem[0].scrollTop - elem[0].clientHeight <= 0) {
					var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
					var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
					if (shown < length) {
						var maxLength = length;
						if (length > (shown+LAZY_LOAD_MAX))
							maxLength = shown+LAZY_LOAD_MAX;
						
						//$(wrapper).attr('totalvisible', maxLength);
						elem.attr('data-thumb-displayed', maxLength);
						//console.log(shown)
						var tic = new Date().getTime();
						var slowwarn = false;
						for (j=shown; j < shown+maxLength; j++) {
							//console.log("j="+j)
							if (j > INFOjs.length-1) break;
							$('<img class="gallerythumbbrowse lazyload"/>')
								.appendTo($(wrapper + ' #gallerythumbframe'))
								.attr("id",j+1)
								.attr("src", GALLERYINFO['thumbdir'] + INFOjs[j].FileName)
								.bind('click',setthumbbindings)
								.attr("title",imgtitle(INFOjs[j]))
								//.error(function () {$(this).remove())
								.load(function () {
									//$(wrapper).attr('totalvisible', parseInt($(wrapper).attr('totalvisible'))+1);
									if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
										$('#connectionerror').html("Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.");
										slowwarn = true;	
										setTimeout(function () {$('#connectionerror').html('')},5000);
									}
		
									// The following will sometimes hide spinner before thumbnails are rendered on screen, because load
									// is triggered when image has been downloaded and before it is rendered.  This is the reason
									// for the 2*Nthumb ms delay (a guess).
									////console.log('Thumb '+parseInt($(this).attr('id'))+' loaded.');
																	
								});
						}
					}
				}
			});
    	}

    	//if (i == 0)
    	//	$('<img class="gallerythumbbrowse"/>').appendTo($(wrapper + ' #gallerythumbframe')).attr("id",i+1);

		if (i == 0) firstimage(i); 
			
        function imgtitle(obj) {
            //http://stackoverflow.com/questions/5612787/converting-javascript-object-to-string
	        var str = '';
            var k = 0;
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                	if (isNaN(parseInt(p)))
                		str += p + ':' + obj[p] + '\n';
                }
                k = k+1;
            }
            return str;
        }
        
        function firstimage(f) {

        	setcontrolbindings();
        	
        	$('<img class="gallerythumbbrowse firstimage"/>')
				.appendTo($(wrapper + ' #gallerythumbframe'))
				.attr("id",f+1)
				.error(function () {
			    	// Will get here if first image is bad.
			    	console.log("gallery.firstimage(): First image is bad");
			    	$(this).remove();
			    	findfirstimage(f+1,allbad)})
		    	.attr("src", GALLERYINFO['thumbdir'] + INFOjs[f].FileName)
				.load(function () {
					
					//console.log("check: " + (f+1) + "   " + $(wrapper + ' #'+(f+1)).length);
					// This will happen if findfirstimage had already placed element in DOM.
					//if ($(wrapper + ' #'+(f+1)).length == 1) {
					//	$(wrapper + ' #'+(f+1)).first().remove();
					//}
					
					if (f > 0) warning("Note - Possible gallery mis-configuration: The first image in this subset could not be loaded.")
					// This click triggers the load of the first image.
					//$(this).bind('click',setthumbbindings);
					//console.log("f = " + f)
					if (f == 0) $(this).bind('click',setthumbbindings).click();
					$(this).click();
					$(wrapper + " #gallerythumbframe").scrollTo(0);

					$(this).attr("title",imgtitle(INFOjs[f]));
					
					INFOjs[f].Width  = $(this).width();
					INFOjs[f].Height = $(this).height();
					console.log('gallery.firstimage(): First thumbnail loaded with width = '+$(this).width()+'. Setting table dimensions.');
					settabledims($(this).width(),$(this).height());
					
					
					// Lazy Load images
					$('#gallerythumbframe').attr('data-thumb-length', INFOjs.length);
					var maxLength = INFOjs.length;
					
					if (INFOjs.length > LAZY_LOAD_MAX)
						maxLength = LAZY_LOAD_MAX;
					
					//console.log(INFOjs.length)
					if (maxLength + f > INFOjs.length)
						maxLength = INFOjs.length-f;
					//$(wrapper).attr('totalvisible', maxLength);
					//$(wrapper).attr('totalvisible', parseInt($(wrapper).attr('totalvisible'))+1);
					$('#gallerythumbframe').attr('data-thumb-displayed', f);
					
					//console.log(f)
					setscrollbinding();
					
					//console.log(maxLength)
					var tic = new Date().getTime();
					var slowwarn = false;
					for (var j = f+1; j < f+maxLength; j++) {
						//console.log("setting j="+j)
						//console.log($(wrapper + " #"+(j+1)).length)
						// Set thumbnail images.
						if ($(wrapper + " #"+(j+1)).length == 0) { // Was not already loaded by findfirstimage
							$('<img class="gallerythumbbrowse firstimage"/>')
								.appendTo($(wrapper + ' #gallerythumbframe'))
								.attr("id",j+1)
								.attr("src", GALLERYINFO['thumbdir'] + INFOjs[j].FileName)
								.bind('click',setthumbbindings)
								.attr("title",imgtitle(INFOjs[j]))
								//.error(function () {$(this).remove())
								.load(function () {
									if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
										$('#connectionerror').html("Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.");
										slowwarn = true;	
										setTimeout(function () {$('#connectionerror').html('')},5000);
									}	
								});
						}
					}	
			});

        
        }

        function findfirstimage(J) {
    		console.log("Looking for first good image.");
    		if (!allbad) return;
//        	for (var j = J;j < J+LAZY_LOAD_MAX;j++) {
    		var lastgood = INFOjs.length;
    		var mingood = INFOjs.length;
        	for (var j = J;j < INFOjs.length;j++) {
    		//for (var j = J;j < J+10;j++) {
        		//if (j > INFOjs.length-1) break;
        		// Set blank thumbnail images.
				$('<img class="gallerythumbbrowse" src="css/transparent.gif"/>').appendTo($(wrapper + ' #gallerythumbframe')).attr("id",j+1);
				console.log(INFOjs[j].FileName);
				$(wrapper + " #" + (j+1))
	                .attr("class","gallerythumbbrowse findfirstimage")
	                .attr("src", GALLERYINFO['thumbdir'] + INFOjs[j].FileName)
					
					.attr("title",imgtitle(INFOjs[j]))
	                .attr("src", GALLERYINFO['thumbdir'] + INFOjs[j].FileName).bind({
		                    load: function() {
	                			
	                			console.log("Image #" + $(this).attr("id") + " is good.");
	                			//$(wrapper + " #gallerythumbframe").scrollTo(0);
	                			if (parseInt($(this).attr("id")) < mingood) {
	                				$(this).bind('click',setthumbbindings);
	                				var to = setTimeout(function () {console.log("Clicking first image");$(wrapper + " #gallerythumbframe img").first().click()},1000)
	                				$(wrapper + " #gallerythumbframe img").first().click();
	                				//$(this).click(); // This is needed. Why?
	                				var id = "#" + $(this).attr("id");
	                				// Needed for FF.  Why?
	                				setTimeout(function (id) {$(wrapper + " #gallerythumbframe img").first().click();},400);
	                				$(wrapper + " #gallerythumbframe").scrollTo(0);
	                			} else {
	                				$(this).bind('click',setthumbbindings);
	                			}
	                			if (parseInt($(this).attr("id")) < mingood) {mingood = parseInt($(this).attr("id"))} 
	                			//lastgood = parseInt($(this).attr("id"));
	                			//$(this).remove();
			                	if (allbad) {
			                		console.log("Calling firstimage with #"+parseInt($(this).attr("id")))
			                		allbad = false;
			                		firstimage(parseInt($(this).attr("id"))-1)
			                		//firstimage(J)
			                		} else {
			                			
			                		}
			                	},	                			                		
			                error: function() {
			                		$(this).remove();
			                		console.log("Image #" + $(this).attr("id") + " is bad.")}});
            }
        }        
    }   
    
    function setthumbs() {
    
		console.log('gallery.setthumbs(): Setting thumbs.');
		
		var thumbwidth = "";
		if (GALLERYINFO['fulldir'] == GALLERYINFO['thumbdir']) {
			console.log('gallery.setthumbs(): No thumbnails detected.  Shrinking full images by 50% to create thumbs.');
			var thumbwidth = "50%";
		}
        
		INFOjs = thumblist(wrapper);
		$(wrapper).attr('totalvisible', INFOjs.length);
       //$(wrapper).attr('totalvisible', 0);
        $(wrapper).attr('totalingallery',GALLERYINFO["totalingallery"]);
        //console.log(INFOjs)

        var thumbframe = $(wrapper + ' #gallerythumbframe');

        // Clear thumbframe
        thumbframe.html('');
        
        // Clear any previous scroll binding.  (Lazy load uses this.)
        thumbframe.unbind('scroll');
		
		s = setthumb(INFOjs,0,true);

	}
	
	function setcontrolbindings() {
	    
	    // Show/Hide thumb button
	    $(wrapper + " #showhidethumb").unbind();
	    $(wrapper + " #showhidethumb").toggle(function(){
	    	$(wrapper + " #gallerythumbframe").hide();
	        //console.log("Hide: " + wrapper + ' #showhidethumb');
	       	////console.log('gallery.js: Setting table dimensions.');
	        //settabledims(wrapper);
	        $(wrapper + ' #showhidethumb').text('+');
	    }, function(){
	        $(wrapper + " #gallerythumbframe").show();
	       	////console.log('gallery.js: Setting table dimensions.');
	        //settabledims(wrapper);
	    	//console.log("Show: " + wrapper + ' #gallerythumbframe');
	        $(wrapper + ' #showhidethumb').text('x');
	    });
	    
	    // Time step buttons
	    $(wrapper + " #next").unbind('click');
	    $(wrapper + ' #next').click(function(){
	        lastvisible = parseInt($(wrapper).attr('lastvisible'));
	        if (lastvisible == parseInt($(wrapper).attr('totalvisible'))) {
	            nowvisible = 1;
	        } else {
	            nowvisible = lastvisible + 1;        	
	        }
	        $(wrapper + " #" + nowvisible).click();
	    });
	    
	    $(wrapper + " #previous").unbind('click');
	    $(wrapper + ' #previous').click(function(){
	        lastvisible = parseInt($(wrapper).attr('lastvisible'));
	        if (lastvisible == 1) {
	            nowvisible = parseInt($(wrapper).attr('totalvisible'));
	        } else {
	            nowvisible = lastvisible - 1;
	        }
	        $(wrapper + " #" + nowvisible).click();
	    });
	    
	    $(wrapper + " #last").unbind('click');
	    $(wrapper + ' #last').click(function(){
	        nowvisible = parseInt($(wrapper + " #gallerythumbframe > img").last().attr("id"));
	        $(wrapper + " #" + nowvisible).click();
	    });

		$(wrapper + " #first").unbind('click');    
		$(wrapper + ' #first').click(function(){
			nowvisible = parseInt($(wrapper + " #gallerythumbframe > img").first().attr("id"));
			$(wrapper + " #" + nowvisible).click();
		});  
		

	}
	
	function setdropdowns() {

		dropdown("order", GALLERYINFO['orders'], wrapper + " #dropdowns");
		$(wrapper + ' #dropdowns #order').change(function(){
			setthumbs();
		});

	    dropdown("sortby", GALLERYINFO['attributes'], wrapper + " #dropdowns");
		$(wrapper + ' #dropdowns #sortby').change(function(){
			setregexps();
			setthumbs();
		});

	    setregexps();

		function setregexps() {
			var REGEXPS            = new Object();			
			var n                  = $(wrapper + " #dropdowns #sortby option:selected").val();
			REGEXPS["Title"]       = "View only images with an attribute that matches the selected constraint."
			REGEXPS["Titleshort"]  = "-Constraints-"
			REGEXPS["Values"]      = new Array();
			////console.log(GALLERYINFO['attributes'])
			for (i = 0; i < GALLERYINFO['attributes']["Values"][n]["Filters"].length; i++) {
				REGEXPS["Values"][i]          = new Object();
				REGEXPS["Values"][i]["Title"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Title"];
				REGEXPS["Values"][i]["Value"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Value"];
			}

			if (GALLERYINFO['attributes']["Values"][n]["Filters"].length > 0) {
				dropdown("regexp",REGEXPS,wrapper + " #dropdowns");
			} else {
				//$("#thumb1 #dropdowns #regexp").remove();				
			}

			$(wrapper + ' #dropdowns #regexp').change(function(){
		        $(wrapper + " #fullframe").empty();
				setthumbs();
			})

		}

	}
	
	function testconnection() {
		function tryconnection() {
			d = new Date();
			$("<img id='testconnection'>").
			load(function () {
				if (testconnection.connected === false)
					gallery(wrapper);

				//console.log('Connection OK.  Last state ' + testconnection.connected);
				testconnection.connected = true;
				$("#connectionerror").html("");
				//console.log('Connection OK.');
				$('#testconnection').empty();
			}).
			error(function(){
				//console.log('Connection bad.  Last state ' + testconnection.connected);
				testconnection.connected = false;
				$("#connectionerror").html("Check internet connection.")
				//console.log('Connection bad.');
			}).
			attr('src','http://viviz.org/gallery/css/transparent.gif?'+d.getTime()).
			appendTo('testconnection');
		}
		
		if (testconnection.connectioncheck)
			clearInterval(testconnection.connectioncheck);

		var connectioncheck = setInterval(function(){
			tryconnection();
		},2000);
	}

	//testconnection();
	
	$(wrapper + " #warning").html("");
	$(wrapper + " #error").html("");
	
	//$(window).unbind('hashchange');
	$(window).hashchange(function() {
		console.log('gallery.js: Hash has changed to ' + location.hash);
        $(wrapper).attr('nowvisible', '');
        $(wrapper).attr('lastvisible', '');
        $(wrapper).attr('totalvisible', '');
        $(wrapper).attr('totalingallery', '');
        $(wrapper + " #stats").html('');
        $(wrapper + " #error").html('');
        $(wrapper + " #connectionerror").html('');
        $(wrapper + " #fullframe img").remove('');
        $(wrapper + " #catalogxml").html('');
        gallery(wrapper);
	});

	if ( (typeof(dom) == "function") && ($(wrapper).text() == "") ) {
		//console.log('thumb.js: Inserting DOM from file.');
		$('body').append(dom());
	} else {
		//console.log('thumb.js: Using existing DOM in HTML file.')
	}

	var GALLERIES = cataloginfo();
	//console.log(GALLERIES)
	if (location.hash != "") {
		var hash = location.hash;
		console.log("--modifying hash")
		var galleryid = hash.replace(/^#/,'').replace(/^\//,"");
		cataloginfo(galleryid); // Updates catalog to include one auto-generated by URL.
		GALLERIES = cataloginfo();
	} else {
		var galleryid = GALLERIES["Values"][0]["Id"];
	}

    if (0) {
        $(wrapper + " #dropdowns2").empty();
        dropdown2("gallery2",GALLERIES, wrapper + " #dropdowns2");
        //$(wrapper + " #dropdowns2 #text").attr('value',galleryid);
        
        $(wrapper + ' #dropdowns2 #text').unbind('change');
        $(wrapper + ' #dropdowns2 #text').change(function (){
            //var galleryid = $(wrapper + " #dropdowns2 #gallery2").attr('value');
            //console.log('thumb.js: Gallery changed.  galleryid = ' + galleryid);
            //location.hash = "/" + galleryid;
        });
    }	
    
	$(wrapper + " #dropdowns").empty();
	dropdown("gallery", GALLERIES, wrapper + " #dropdowns");
	$(wrapper + " #gallery option[value='" + galleryid + "']").attr('selected','selected');
	
	$(wrapper + ' #dropdowns #gallery').unbind('change');
	$(wrapper + ' #dropdowns #gallery').change(function (){
		var galleryid = $(wrapper + " #gallery option:selected").val();
		$(wrapper + " #error").html("");
		//console.log('thumb.js: Gallery changed.  galleryid = ' + galleryid);
		console.log("gallery.js: Setting hash.")
		location.hash = "/" + galleryid;
	});

	var HEADER = cataloginfo(galleryid);
	$("head title").html(HEADER["title"]);
	$(wrapper + " #about").attr('title',HEADER["about"]);

	if ((HEADER["aboutlink"]) && (!HEADER["about"])) {
		$(wrapper + " #about").attr("onclick","window.location='" + HEADER["Aboutlink"]+"'");
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
				CodeMirror($(wrapper+' #catalogxml')[0], {lineNumbers:true,"mode":"xml", "value":HEADER["Xml"]});
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

	var GALLERYINFO = galleryinfo(galleryid);

	setdropdowns();
	setthumbs();
	
	// To fix problem in Chrome where onload event is not triggered for cached images and
	$(wrapper + ' #gallerythumbframe').css('overflow-y','hidden');
	setTimeout(function() {$(wrapper + ' #gallerythumbframe').css('overflow-y','auto');},200);
	
}
