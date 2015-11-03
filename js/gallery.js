function gallery(wrapper, galleryid) {
	
	// TODO: Code until setthumbs() is repeated in thumb.js	
	console.log("gallery.js: Called.")

	resetdom()
	
	$(window).unbind('hashchange.gallery');
	$(window).bind('hashchange.gallery',function() {
		console.log('gallery.js: Hash has changed to ' + location.hash);
		// Special case where ID is only key specified in gallery object.
		// This saves us from having to encode it.
		location.hash = location.hash.replace("id=fulldir","fulldir");
		qs = $.parseQueryString();
		gallery(wrapper, qs["id"]);
	});

	// Get list of galleries
	console.log("gallery.js: Getting list of galleries.");
	var GALLERIES = cataloginfo();

	if (GALLERIES === "") {
		console.log("gallery.js: Call to cataloginfo() failed.");
		$(wrapper + " #workingfullframe").hide();
		return;
	}

	qs = $.parseQueryString();

	// Default gallery to show is first in list.
	var galleryid = galleryid || qs["id"] || GALLERIES["Values"][0]["Id"]
	console.log("gallery.js: ID = " + galleryid)
	VIVIZ[galleryid] = {};

	console.log("gallery.js: ID = " + galleryid)
	var GALLERYINFO = galleryinfo(galleryid);

	// If call to GALLERYINFO fails, something went wrong.
	if (typeof(GALLERYINFO) === "boolean") {
		console.log("gallery.js: Call to galleryinfo() failed.");	
		$(wrapper + ' #workingfullframe').css('visibility','hidden');
		error(wrapper,"Problem with configuration for gallery with id = " + galleryid);
		setheader(wrapper, galleryid);
		$(wrapper + ' #catalogxmlopen').click();
		return;
	}

	setheader(wrapper, galleryid);
	setdropdowns(wrapper, galleryid);
	setthumbs();

	if (typeof(tooltip) === "function") {
	    $(wrapper + " button").each(function () {$(this).tooltip({content: $(this).attr('title')})});
	    $(wrapper + " select").each(function () {$(this).tooltip({content: $(this).attr('title')})});
	}

	function resetdom() {
		//$(wrapper + " #fullframe").html('').css('height','');
		$(wrapper).css('margin-top','0');
		$(wrapper + " #gallerythumbframe").html('');
		$(wrapper).attr('nowvisible', '').attr('lastvisible', '').attr('totalvisible', '').attr('totalingallery', '');
		$(wrapper + " #stats").html('').css('width','').css('height','');
		$(wrapper + " #error").html('').hide();
		$(wrapper + " #warning").html('').hide();
		$(wrapper + " #connectionerror").html('');
		$(wrapper + " #catalogxml").html('');
		//$(wrapper + " #gallerythumbframe").css('width','').css('height','');
	}

	function setthumbbindings() {

		// Actions to take when a thumbnail is clicked.
		
		console.log("gallery.setthumbbindings(): Called.")

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
		
		$(wrapper + " #gallerythumbframe #" + lastvisible).removeClass('active').addClass('inactive');

		$(wrapper + " #gallerythumbframe #" + nowvisible).removeClass('inactive').addClass('active');
		
		// TODO: Duplicate calls can be avoided by giving each stat string an id and then showing hidden
		// 		 stat string if it already exists in DOM.
		INFOjs = thumblist(wrapper); 

		var statstr = "#" + (nowvisible) + "/" + (INFOjs.length) + " in subset. Attributes: ";
		statstr = statstr + " | #" + (1+INFOjs[nowvisible-1].ImageNumber) + "/" + $(wrapper).attr('totalingallery') + " in gallery | ";
		
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

	function setthumbs() {
	
		console.log('gallery.setthumbs(): Called.');
		
		INFOjs = thumblist(wrapper);  // Global variable.

		// Set attributes used by lazy loader
		$(wrapper).attr('totalvisible', INFOjs.length);
		$(wrapper).attr('totalingallery',GALLERYINFO["totalingallery"]);

		var thumbframe = $(wrapper + ' #gallerythumbframe');

		$(wrapper + " #fullframe").html('')
		thumbframe.html(''); // Clear thumbframe
		
		// Clear any previous scroll binding.  (Lazy load uses this.)
		thumbframe.unbind('scroll');

		$(wrapper + ' #stats').html('');
		if (INFOjs.length == 0) {
			$(wrapper + ' #stats').html('No images in subset.');
			return;
		}
		
		s = setthumb(INFOjs,0,true);
	}
	
	function setthumb(INFOjs,i,allbad) {

		var firstclicked = false;
		if (i == 0) firstimage(i); 

		// TODO: Detect bad images:
		// https://github.com/desandro/imagesloaded
		// http://stackoverflow.com/questions/821516/browser-independent-way-to-detect-when-image-has-been-loaded
		// http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached

		function firstimage(f) {

			console.log("gallery.firstimage(): Called.  Setting thumb #" + f);
			if (f == 0) setcontrolbindings();
			
			$('<img class="gallerythumbbrowse firstimage"/>')
				.appendTo($(wrapper + ' #gallerythumbframe'))
				.attr("id",f+1)
				.error(function () {
					// First image is bad.
					console.log("gallery.firstimage(): Image " + f + " is bad.");
					//warning("Image " + f + " not found.",true);
					$(this).remove();

					if (f > 0) {
						if (f == 1) {
							warning(wrapper,"The first image could not be loaded.",true,Infinity);
						} else {
							warning(wrapper,"Image " + f + " could not be loaded.",true,Infinity);
						}
					}
					
					if (f == INFOjs.length-1) {
						warning(wrapper,"No images could be loaded.",true,Infinity);
						console.log("No images could be loaded.");
						$(wrapper + " #workingfullframe").css('visibility','hidden');
						return;
					}
					//findfirstimage(f+1,allbad);
					firstimage(f+1,allbad);
				})
				//.bind('click',setthumbbindings)
				.attr("src", INFOjs[f].ThumbFile)
				.load(function () {
					
					if (f > 0) {
						if (f == 1) {
							warning(wrapper,"The first image in this subset could not be loaded.",true);
						} else {
							warning(wrapper,"The first " + f + " images" + " in this subset could not be loaded.",true);
						}
					}
					
					// Trigger load of the first image.
					if (!firstclicked) {
						$(wrapper).attr('nowvisible',f+1)
						console.log("gallery.firstimage(): First thumbnail image loaded.");
						console.log("gallery.firstimage(): Applying click bindings and then clicking it to trigger load of full image.");
						$(this).bind('click',setthumbbindings).click();
					}
					firstclicked = true;

					// Scroll to top.
					$(wrapper + " #gallerythumbframe").scrollTo(0);

					// Set title attribute on thumbnail
					//$(this).attr("title",imgtitle(INFOjs[f]));
					console.log('gallery.firstimage(): First thumbnail has natural dimensions = '
						+this.naturalWidth+'x'+this.naturalHeight+'.');

					// Set height of thumbnail image - setWH() Modifies VIVIZ[galleryid]
					var tmp = setWH(this, galleryid, GALLERYINFO, 'thumb');
					$(this).css("height",VIVIZ[galleryid]["thumbHeight"]);
					$(this).css("width",VIVIZ[galleryid]["thumbWidth"]);

					console.log('gallery.firstimage(): First thumbnail set to have dimensions = '
						+VIVIZ[galleryid]["thumbWidth"]+'x'+VIVIZ[galleryid]["thumbHeight"]+'.');
					
					// Lazy Load images.
					$('#gallerythumbframe').attr('data-thumb-length', INFOjs.length);
					var maxLength = INFOjs.length;
					if (INFOjs.length > VIVIZ["lazyLoadMax"]) {
						maxLength = VIVIZ["lazyLoadMax"];
					}
					if (maxLength + f > INFOjs.length) {
						maxLength = INFOjs.length-f;
					}

					// Set attribute that indicates which thumbnail is active.
					$('#gallerythumbframe').attr('data-thumb-displayed', f);
					
					setscrollbinding();

					// Set next batch of thumbnails.
					var tic = new Date().getTime();
					var slowwarn = false;
					console.log("gallery.firstimage(): Setting thumbnails "+(f+1)+"-"+(f+maxLength-1));
					for (var j = f+1; j < f+maxLength; j++) {
						if ($(wrapper + " #"+(j+1)).length == 0) { // Was not already loaded by findfirstimage
							$('<img class="gallerythumbbrowse"/>')
								.appendTo($(wrapper + ' #gallerythumbframe'))
								.attr("id",j+1)
								.attr("src", INFOjs[j].ThumbFile)
								.bind('click',setthumbbindings)
								.attr("title",imgtitle(INFOjs[j]))
								.css("height",VIVIZ[galleryid]["thumbHeight"])
								.css("width",VIVIZ[galleryid]["thumbWidth"])
								.load(function () {
									if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
										warning(wrapper,"Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.");
										slowwarn = true;	
									}	
								})
						}
					}
			})   
		}
	}

	function settabledims(el,callback) {

		console.log("gallery.settabledims(): Called.")

		if (el) {
			// Don't get border-width by querying DOM for first thumbnail, because it may not be in 
			// DOM already.  Instead, get it from function parameter.
			var bw = 2*parseFloat($(el).css('border-width').replace("px",''));
			if (isNaN(bw)) {
				bw = $(wrapper + ' #gallerythumbframe img:first').outerWidth() - VIVIZ[galleryid]["thumbWidth"];
			}
			if  (isNaN(bw)) {
				bw = 2;
			}
			var w = VIVIZ[galleryid]["thumbWidth"] + $.scrollbarWidth() + bw + 8; // Why 8?
			console.log("gallery.settabledims(): Setting #gallerythumbframe width to = "+w);
			$(wrapper + ' #gallerythumbframe').width(w);
		}

		console.log("gallery.settabledims(): Full img natural dimensions = " 
			+ VIVIZ[galleryid]["fullNaturalWidth"] + "x" + VIVIZ[galleryid]["fullNaturalHeight"])
		console.log("gallery.settabledims(): Full img scaled dimensions  = " 
			+ VIVIZ[galleryid]["fullWidth"] + "x" + VIVIZ[galleryid]["fullHeight"])
		
		// Set heights of thumbframe and fullframe. When first image is loaded, fullNaturalHeight is set.
		if (VIVIZ[galleryid]["fullHeight"] > 0) {
			
			// Aspect ratio;
			var ar = VIVIZ[galleryid]["fullWidth"]/VIVIZ[galleryid]["fullHeight"];
			console.log("gallery.settabledims(): Full image aspect ratio = "+ar);

			// Force outer frame to stay the same size after image is removed and before new image is inserted.
			//$(wrapper + " #fullframe").width($(wrapper + " #fullframe").width())
			
			// Set height of thumb strip to be full height of image.
			$(wrapper + ' #gallerythumbframe').height(VIVIZ[galleryid]["fullHeight"]);

			// For iframe?
			//enclosure = $(wrapper).parents().filter('body')[0];
			enclosure = "body";

			console.log("gallery.settabledims(): Window dimensions: " 
				+ $(window).width() + "x" + $(window).height())
			console.log("gallery.settabledims(): Client dimensions: " 
				+ document.documentElement.clientWidth + "x" + document.documentElement.clientHeight)
			console.log("gallery.settabledims(): Document dimensions: "
				+  $(document).width() + "x" + $(document).height())
			console.log("gallery.settabledims(): Body element dimensions: " 
				+ $(enclosure).height() + "x" + $(enclosure).height())

			// Amount height needs to shrink so that no scrollbar appears.
			dh = $(enclosure).height() - $(window).height();

			if (dh > 0) {
				console.log("gallery.settabledims(): Amount full image height needs to decrease so that no scrollbar appears: dh = "+dh);
				console.log("gallery.settabledims(): Reducing height of #fullframe img.")
				$(wrapper + ' #fullframe img').height(VIVIZ[galleryid]["fullHeight"]-dh)
				console.log("gallery.settabledims(): Shrinking height of #gallerythumbframe to "+(VIVIZ[galleryid]["fullHeight"]-dh));
				$(wrapper + ' #gallerythumbframe').height(VIVIZ[galleryid]["fullHeight"]-dh);
				VIVIZ[galleryid]['fullHeight'] = VIVIZ[galleryid]["fullHeight"]-dh;
				VIVIZ[galleryid]['fullWidth']  = $(wrapper + ' #gallerythumbframe img:first').width()	        	
			} else {
				console.log("gallery.settabledims(): Full image does not need to be reduced in height to prevent vertical scrollbar from appearing.")
				console.log("gallery.settabledims(): Setting #gallerythumbframe height to be height of full image = " + VIVIZ[galleryid]["fullHeight"] + ".");
				$(wrapper + " #gallerythumbframe").height(VIVIZ[galleryid]["fullHeight"]);
			}

			console.log("gallery.settabledims(): Window dimensions: " 
				+ $(window).width() + "x" + $(window).height())
			console.log("gallery.settabledims(): Client dimensions: " 
				+ document.documentElement.clientWidth + "x" + document.documentElement.clientHeight)
			console.log("gallery.settabledims(): Document dimensions: "
				+  $(document).width() + "x" + $(document).height())
			console.log("gallery.settabledims(): Body element dimensions: " 
				+ $(enclosure).height() + "x" + $(enclosure).height())

			dw = $(document).width()-$(enclosure).width();

			if (dw > 0) {
				console.log("gallery.settabledims(): Document width is larger than body element width by dw = "+dw);
				if (dh > 0) {
					newh = VIVIZ[galleryid]["fullNaturalHeight"]-dh-dw/ar;
				} else {
					newh = VIVIZ[galleryid]["fullNaturalHeight"]-dw/ar;
				}
				newh = newh - 1;
				console.log("gallery.settabledims(): Shrinking height of #fullframe img and #gallerythumbframe because dw > 0.  New height: "+newh)
				$(wrapper + ' #fullframe img').height(newh)
				$(wrapper + ' #gallerythumbframe').height(newh);
				VIVIZ[galleryid]['fullHeight'] = newh;
	 			VIVIZ[galleryid]['fullWidth'] = $(wrapper + ' #fullframe img:first').width();
			} 


			dh = $(enclosure).height() - $(window).height();
			if (dh < 0) {
				console.log("gallery.settabledims(): Setting top margin to (Enclosing Body Height - Window Height)/2");
				$(wrapper).css('margin-top',-dh/2);
			}	
		} else {
			console.log("gallery.settabledims(): Full image height unknown but thumb height known.");
			var a = 4*VIVIZ[galleryid]["thumbHeight"];
			console.log("gallery.settabledims(): Setting thumb frame height to be 4*(first thumb outer height) = "+a);
			console.log("gallery.settabledims(): First thumbnail height = " + $('#gallerythumbframe img').eq(0).height());
			$(wrapper + ' #gallerythumbframe').height("" + a);
		}

		if (callback) {
			callback();
		}
	}
	
	function loadfull(jq) {

		console.log("gallery.loadfull(): Called.");

		var id = $(jq).attr('id');
		var lastvisible = parseInt($(wrapper).attr('lastvisible'));
		$(wrapper + " #fullframe img[id=" + lastvisible + "]").hide();
		//$(wrapper + " #fullframe img[id=" + lastvisible + "]").css('visibility','hidden');
		
		if (id > INFOjs.length) {return;}
		
		if ($(wrapper + " #fullframe img[id="+id+"]").length == 1) {
			console.log('gallery.loadfull(): Found hidden full image in DOM.  Showing.');
			$(wrapper + " #fullframe img[id=" + id + "]").show();
			prepnext();
			setfilename(id);
			return;
		}

		// Show loading indicator
		$(wrapper + ' #workingfullframe').css('visibility','visible');

		// Place empty image element in DOM.
		$(wrapper + " #fullframe").prepend('<img id="'+id+'" class="full"/>');

		// Does not work.
		//var title = $(jq).attr("title"); 
		//$(wrapper + " #fullframe img[id="+id+"]").attr("title",title)
		
		$(wrapper + " #fullframe img[id="+id+"]")
				.unbind('load')
				.error(function () {
					$(wrapper + ' #workingfullframe').css('visibility','hidden');
					//$(wrapper + ' #error').html('Could not load <a href="'+$(this).attr('src')+'">'+$(this).attr('src')+'</a>')
					console.log("Error loading ")
					$(this).width(VIVIZ[galleryid]["fullWidth"]);
					$(this).height(VIVIZ[galleryid]["fullHeight"]);
				})
				.load(function(){

					console.log("gallery.loadfull(): Load event.")

					// Hide loading indicator
					$(wrapper + ' #workingfullframe').css('visibility','hidden');

					if ($(jq).hasClass('firstimage')) {
						console.log('gallery.loadfull(): First full image loaded with dimensions '
							+this.naturalWidth+'x'+this.naturalHeight+'.  Setting table dimensions.');


						//Enlil code
						if (VIVIZ[galleryid]["alternativeFrame"]) {
							$("#" + VIVIZ[galleryid]["alternativeFrame"] + " img")
								.attr('src',$(wrapper + " #fullframe img[id=1]").attr('src'))
						}

						var tmp = setWH(this, galleryid, GALLERYINFO, 'full');

						// Set height of full image.
						console.log("gallery.loadfull(): Setting full image height")
						$(this).css("height",VIVIZ[galleryid]["fullHeight"]);
						//$(this).css("width",VIVIZ[galleryid]["fullWidth"]);

						// After this function sets VIVIZ[gallerid] dimensions, 
						// then call prepnext(), which uses these dimensions.
						console.log("gallery.loadfull(): Calling settabledims().")
						settabledims(this, function () {prepnext()});

					} else {
						prepnext();
					}

					setfilename($(this).attr('id'));

				})
				.attr('src', INFOjs[parseInt(id-1)]["FullFile"]);

		function setfilename(id) {
			var fname = INFOjs[parseInt(id-1)]["FullFile"]
			$(wrapper + " #filename").html('');
			var wo = $(wrapper).width()

			$(wrapper + " #filename").append("<a>");
			$(wrapper + " #filename a")
				.attr('href',INFOjs[parseInt(id-1)]["FullFile"])
				.text(INFOjs[parseInt(id-1)]["FullFile"]);
			var wx = $(wrapper + " #filename").width();


			if (wo < wx) {

				console.log("loadfull.setfilename(): " + wrapper + " width "+wo)
				console.log("loadfull.setfilename(): #filename div width "+wx)

				// Fraction to remove. 0.9 to account for nonuniformity of charater width.
				r = 0.9*wo/wx
				console.log("Reduction factor: 0.9*"+wo+"/"+wx)
				l = fname.length
				nr = l-r*l
				console.log("loadfull.setfilename(): Number of characters to remove:  "+nr)
				c = l/2
				console.log("loadfull.setfilename(): Center value: " + c)
				console.log("loadfull.setfilename(): Number of characters to keep : " + nr)
				fnamer = fname.substr(0,Math.floor(c-nr/2)) + " ... " + fname.substr(Math.ceil(c+nr/2),l)
				$(wrapper + " #filename a")
					.attr('href',INFOjs[parseInt(id-1)]["FullFile"])
					.text(fnamer);

			}

		}

		function prepnext() {
			
			// If next frame not in DOM, place it.
			var idn = parseInt(id) + 1;
			
			if (idn > INFOjs.length) {return;}

			if ($(wrapper + " #fullframe img[id="+idn+"]").length == 0) {
				$(wrapper + " #fullframe").prepend('<img id="'+idn+'" class="full" style="display:none"/>');
				$(wrapper + " #fullframe img[id="+idn+"]")
					.error(function () {
						$(wrapper + ' #workingfullframe').css('visibility','hidden');
						$(this).height(VIVIZ[galleryid]["fullHeight"]);
						$(this).width(VIVIZ[galleryid]["fullWidth"]);
					})
					.load (function () {
					})
					.css('height',VIVIZ[galleryid]['fullHeight'])
					.attr('src',INFOjs[idn-1]["FullFile"])
			}
		}
	}

	function loadmore() {

		var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
		var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
		if (shown < length) {
			var maxLength = length;
			if (length > (shown+VIVIZ["lazyLoadMax"]))
				maxLength = shown+VIVIZ["lazyLoadMax"];
			
			//$(wrapper).attr('totalvisible', maxLength);
			//elem.attr('data-thumb-displayed', maxLength);
			//console.log(shown)
			var tic = new Date().getTime();
			var slowwarn = false;
			for (j=shown; j < shown+maxLength; j++) {
				//console.log("j="+j)
				if (j > INFOjs.length-1) break;
				$('<img class="gallerythumbbrowse lazyload"/>')
					.appendTo($(wrapper + ' #gallerythumbframe'))
					.attr("id",j+1)
					.attr("src", INFOjs[j].ThumbFile)
					.bind('click',setthumbbindings)
					.attr("title",imgtitle(INFOjs[j]))
					//.css("height",thumbheight)
					.css("height",$("#gallerythumbframe > img").first().height())
					.css("width",$("#gallerythumbframe > img").first().width())
					//.error(function () {$(this).remove())
					.load(function () {
						//$(wrapper).attr('totalvisible', parseInt($(wrapper).attr('totalvisible'))+1);
						if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
							warning(wrapper,"Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.",true);
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
	
	function setcontrolbindings() {
		
		// Show/Hide thumb button
		$(wrapper + " #showhidethumb").unbind('toggle');
		$(wrapper + " #showhidethumb").toggle(function(){
				$(wrapper + " #gallerythumbframe").hide();
				//$(wrapper + " #gallerythumbframe").css('visibility','hidden');
				//$(wrapper + " #gallerythumbframe").css('width','0px');
				setcontrolbindings.marginleft = $("#fullframe").css('margin-left');
				$("#fullframe").css('margin-left','0');
				$(wrapper + ' #showhidethumb').text('+');
				$(wrapper + ' #showhidethumb').attr('title','Show thumbnails')
			}, function(){
				console.log("gallery.setcontrolbindings: Showing gallerythumbframe.");
				$(wrapper + " #gallerythumbframe").css('visibility','visible')
				$(wrapper + " #gallerythumbframe").show();
				console.log("gallery.setcontrolbindings: Setting margin-left to " + setcontrolbindings.marginleft);
				$("#fullframe").css('margin-left',setcontrolbindings.marginleft)
				$(wrapper + ' #showhidethumb').text('x');
				$(wrapper + ' #showhidethumb').attr('title','Hide thumbnails')
		});

		if (!VIVIZ["showThumbstrip"]) {$("#showhidethumb").click();}
		
		var si = false;
		$(wrapper + " #stop").unbind('click');
		$(wrapper + " #stop").click(
				function () {
					if (typeof(si) === "number") {
						clearInterval(si);
					}
				}
		)

		$(wrapper + " #play").unbind('click');
		$(wrapper + " #play").click(
				function () {
					$("#next").click();
					si = setInterval(
							function () {
								$("#next").click();
							},VIVIZ["frameRate"]);
				}
				
		)

		// Time step buttons
		$(wrapper + " #next").unbind('click');
		$(wrapper + ' #next').click(function(){
			lastvisible = parseInt($(wrapper).attr('lastvisible'));
			if (lastvisible == parseInt($(wrapper).attr('totalvisible'))) {				
				nowvisible = parseInt($(wrapper + " #gallerythumbframe img.firstimage").attr('id'));
			} else {
				nowvisible = lastvisible + 1;        	
			}
			console.log("gallery.setcontrolbindings: Next button clicked.  Clicking on thumbnail "+nowvisible)
			$(wrapper + " #gallerythumbframe #" + nowvisible).click();

			//Enlil code
			if (VIVIZ["alternativeFrame"]) {
				$("#" + VIVIZ["alternativeFrame"] + " img").attr('src',$(wrapper + " #fullframe img[id="+nowvisible+"]").attr('src'));
			}

			var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
			var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
			var f = Math.ceil(nowvisible/VIVIZ["lazyLoadMax"]) - nowvisible/VIVIZ["lazyLoadMax"];
			if (f < 0.5) loadmore();
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

			//Enlil code
			if (VIVIZ["alternativeFrame"]) {
				$("#" + VIVIZ["alternativeFrame"] + " img").attr('src',$(wrapper + " #fullframe img[id="+nowvisible+"]").attr('src'))
			}

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

	function setscrollbinding() {

		console.log("gallery.setscrollbinding(): Called.  Setting scroll event.");

		$('#gallerythumbframe').scroll(function(e){
			console.log("gallery.setscrollbinding(): Scroll event.")
			var elem = $(this);
			var dh = elem[0].scrollHeight - elem[0].scrollTop - elem[0].clientHeight
			console.log("gallery.setscrollbinding(): scrollHeight - scrollTop - clientHeight = " 
				+ elem[0].scrollHeight + "-" + elem[0].scrollTop + "-" + elem[0].clientHeight + " = " + dh);

			if (dh <= 0) {
				console.log("gallery.setscrollbinding(): Calling loadmore() because dh <= 0.")
				loadmore();
			} else {
				console.log("gallery.setscrollbinding(): Not calling loadmore() because dh > 0.")
			}
		})
	}
	
}
