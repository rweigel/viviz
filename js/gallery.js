function viviz(mode) {

	console.log("viviz.js: Called.")

	$(window).unbind('hashchange.'+mode);
	$(window).bind('hashchange.'+mode,function() {
		console.log('viviz.js: Hash has changed to ' + location.hash);
		// Special case where id is only key specified in gallery object
		// and its value is a query string.
		var keys = ["dir","full","thumb","strftime","sprintf","script","list","start","stop"]
		var hash = location.hash
		for (var k in keys) {
			key = keys[k]
			hash = hash.replace("id="+key,key)
			hash = hash.replace("id=full"+key,"full"+key)
			hash = hash.replace("id=thumb"+key,"thumb"+key)
		}
		if (hash !== location.hash) {
			console.log('viviz.js: Hash is a query string.')
		}
		location.hash = hash
		viviz(mode)
	})

	var qs = $.parseQueryString()

	if (typeof(mode) !== "string") {

		if (qs["mode"] === "gallery") {
			mode = "gallery"
		}
		if (qs["mode"] === "thumb") {
			mode = "thumb"
		}
		if (!qs["mode"]) {
			if (VIVIZ["config"]["defaultMode"] === "gallery") {
				mode = "gallery"
			} else if (VIVIZ["config"]["defaultMode"] === "thumb") {
				mode = "thumb"
			} else {
				mode = "gallery"
			}
		}
	}

	wrapper = "#" + mode + "1"

	// Default configuration options
	var _VIVIZ = {}
	_VIVIZ["config"] = {
		"defaultMode": "gallery",
		"showThumbstrip": true,
		"showFileName": true,
		"showAboutText": true,
		"showCatalog": true,
		"showControls": true,
		"showAttributes": true,
		"showCatalog": true,
		"showDropdowns": true,
		"showDownloads": false,
		"useAutoAttributes": true,
		"thumbWidth": 0.25,
		"thumbHeight": 0.25,
		"fullWidth": 1.0,
		"fullHeight": 1.0,
		"lazyLoadMax": 6,
		"frameRate": 500,
		"play": false,
		"port": 8002,
		"proxyServer": "http://localhost:8002/proxy?url=",
		"useCachedImages": false
	}

	// If key does not exist in passed VIVIZ object, add it.
	for (key in _VIVIZ) {
		if (typeof(VIVIZ[key]) === "undefined") {
			VIVIZ[key] = _VIVIZ[key]
		}
	}

	// Get list of galleries
	console.log("viviz.js: Getting list of galleries.")
	var GALLERIES = cataloginfo()
	if (typeof(GALLERIES) === "string") {
		console.log("viviz.js: Call to cataloginfo() failed.");
		resetdom(galleryid)
		error(wrapper, GALLERIES)
		$('#g-container').show()
		$('#g-container .well').hide()
		$('#g-container #error').show()
		return
	}

	// Default gallery to show
	var keys = ["dir","full","thumb","strftime","sprintf","script","list","start","stop"]
	var hash = location.hash
	var hashisgallery = false
	for (var j in keys) {
		if (hash.indexOf(keys[j] + "=") > -1) {
			hashisgallery = true
		}
	}
	if (!hashisgallery) {
		var galleryid = qs["id"] || GALLERIES["Values"][0]["Id"]
	} else {
		var galleryid = hash.replace("#","")
	}
	console.log("viviz.js: ID = " + galleryid)

	var GALLERYINFO = galleryinfo(galleryid)

	// Call to galleryinfo sets VIVIZ["galleries"][galleryid]
	if (typeof(GALLERYINFO) === "string") {
		console.log("gallery.js: Call to galleryinfo() failed.")
		resetdom(wrapper)
		error(wrapper, "Problem with configuration for gallery with <code>id = "
						+ galleryid + "</code>:<br/>" + GALLERYINFO)
		$('#g-container').show()
		$('#g-container .well').hide()
		$('#g-container #error').show()
		if (GALLERYINFO[galleryid]) {
			setheader(wrapper, galleryid)
			setdropdowns(wrapper, galleryid)
		} else {
			// Gallery id is not valid.  Only show gallery list.
			setdropdowns(wrapper, "")
		}
		return
	}

	resetdom(wrapper)
	setheader(wrapper, galleryid)
	setdropdowns(wrapper, galleryid)

	$("#gallerybrowsebutton").unbind('click')
	$("#gallerybrowsebutton").click(function () {
		$('#t-container').hide()
		$(window).unbind('hashchange.thumb')
		$('#g-container').show()
		viviz('gallery')
	})

	$("#thumbbrowsebutton").unbind('click')
	$("#thumbbrowsebutton").click(function () {
		$('#g-container').hide()
		$(window).unbind('hashchange.gallery')
		$('#t-container').show()
		viviz('thumb')
	})
	

	if (mode === 'gallery') {
		$('#g-container').show()
		gallery(wrapper, galleryid)
	}
	if (mode === 'thumb') {
		$('#t-container').show()
		thumb(wrapper, galleryid)		
	}

	if (typeof(tooltip) === "function") {
		$(wrapper + " button").each(function () {$(this).tooltip({content: $(this).attr('title')})});
		$(wrapper + " select").each(function () {$(this).tooltip({content: $(this).attr('title')})});
	}

	// http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
	$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};

	function resetdom(galleryid) {

		//$(wrapper + " #fullframe").html('').css('height','');
		//$(wrapper).css('margin-top','0');
		$(wrapper + ' #workingfullframe').css('visibility','hidden');
		$(wrapper + " #gallerythumbframe").html('')

		if ($(wrapper + " #catalogopen:visible").length == 0) {
			$(wrapper + " #catalogclose").click()
		}
		// Keep full frame width and height what it was last.  When image is
		// loaded, proper dimensions will be set.
		if ($(wrapper + " #fullframe").width() > 0)
			$(wrapper + " #fullframe").width($(wrapper + " #fullframe").width());
		if ($(wrapper + " #fullframe").height() > 0)
			$(wrapper + " #fullframe").height($(wrapper + " #fullframe").height());

		$(wrapper + " #fullframe").html('')
		$(wrapper).attr('nowvisible', '').attr('lastvisible', '').attr('totalvisible', '').attr('totalingallery', '');
		$(wrapper + " #controls").html('&nbsp;');
		$(wrapper + " #attributes").html('&nbsp;');
		$(wrapper + " #error").html('').hide();
		$(wrapper + " #warning").html('').hide();
		$(wrapper + " #connectionerror").html('');
		$(wrapper + " #catalog").html('');
		$(wrapper + " #thumbbrowseframe").html('')
		//$(wrapper + " #gallerythumbframe").css('width','').css('height','');
	}

	function error(wrapper,msg,clear) {
		$(wrapper + ' #error').show()
		if (clear) {
			$(wrapper + ' #error').html(msg)
		} else {
			if ($(wrapper + ' #error').text() === "") {
				$(wrapper + ' #error').append(msg)
			} else {
				$(wrapper + ' #error').append("<br/>" + msg)
			}
		}
	}

	function warning(wrapper,msg,clear,totime) {
		$(wrapper + ' #warning').show()
		if (clear) {
			$(wrapper + ' #warning').html(msg);
		} else {
			spacer = ""
			if ($(wrapper + ' #warning').text().length > 0) {
				spacer=" | "
			}
			$(wrapper + ' #warning').append(spacer + msg)
		}

		if (totime != Infinity)
			setTimeout(function () {$(wrapper + ' #warning').html('').hide();},totime || 3000)
	}

	function setWH(el, galleryid, GALLERYINFO, type) {

		console.log("setWH(): Computing width and height of " 
			+ type + " images based on image size and options.")

		var ar = el.naturalWidth/el.naturalHeight

		if (type === "thumb") {
			if (!VIVIZ["galleries"][galleryid][type+"Width"] && !VIVIZ["galleries"][galleryid][type+"Height"]) {
				if ((GALLERYINFO["fulldir"] === GALLERYINFO["thumbdir"]) || (GALLERYINFO["thumbdir"] === "")) {
					if (!VIVIZ["galleries"][galleryid][type+"Width"]) {
						console.log("setWH(): " + type + "Width was not given.")
						console.log("setWH(): Setting thumbnail width ratio to be 25% of natural width because fulldir = thumbdir or thumbdir was not specified.")
						VIVIZ["galleries"][galleryid][type+"Width"] = 0.25
					}
					if (!VIVIZ["galleries"][galleryid][type+"Height"]) {
						console.log("setWH(): " + type + "Height was not given.")
						console.log("setWH(): Setting thumbnail height ratio to be 25% of natural width because fulldir = thumbdir or thumbdir was not specified.")
						VIVIZ["galleries"][galleryid][type+"Height"] = 0.25
					}
				} else {
					VIVIZ["galleries"][galleryid][type+"Width"] = 1.0
					VIVIZ["galleries"][galleryid][type+"Height"] = 1.0
				}
			}
		}

		// Compute pixels if given fractions.
		if (VIVIZ["galleries"][galleryid][type+"Width"]) {
			if (VIVIZ["galleries"][galleryid][type+"Width"] <= 1.0) {
				console.log('setWH(): Converting ' + type + 'Width to pixels')
				VIVIZ["galleries"][galleryid][type+"Width"] = 
					el.naturalWidth*VIVIZ["galleries"][galleryid][type+"Width"]
			}
		}
		if (VIVIZ["galleries"][galleryid][type+"Height"]) {
			if (VIVIZ["galleries"][galleryid][type+"Height"] <= 1.0) {
				console.log('setWH(): Converting ' + type + 'Height to pixels')
				VIVIZ["galleries"][galleryid][type+"Height"] = 
					el.naturalHeight*VIVIZ["galleries"][galleryid][type+"Height"]
			}
		}

		// Compute un-specified width or height.
		if (VIVIZ["galleries"][galleryid][type+"Width"] && !VIVIZ["galleries"][galleryid][type+"Height"]) {
			console.log('setWH(): ' + type + 'Width known but Height unknown.  Using aspect ratio to compute.')
			VIVIZ["galleries"][galleryid][type+"Height"] = VIVIZ["galleries"][galleryid][type+"Width"]/ar
		}
		if (VIVIZ["galleries"][galleryid][type+"Height"] && !VIVIZ["galleries"][galleryid][type+"Width"]) {
			console.log('setWH(): ' + type + 'Height known but Width unknown.  Using aspect ratio to compute.')
			VIVIZ["galleries"][galleryid][type+"Width"] = VIVIZ["galleries"][galleryid][type+"Height"]*ar
		}

		if (!VIVIZ["galleries"][galleryid][type+"Height"]) {
			console.log('setWH(): ' + type + 'Height unknown.  Using naturalHeight')
			VIVIZ["galleries"][galleryid][type+"Height"] = el.naturalHeight
		}
		if (!VIVIZ["galleries"][galleryid][type+"Width"]) {
			console.log('setWH(): ' + type + 'Width unknown.  Using naturalWidth')
			VIVIZ["galleries"][galleryid][type+"Width"] = el.naturalWidth
		}

		VIVIZ["galleries"][galleryid][type+"NaturalHeight"] = el.naturalHeight
		VIVIZ["galleries"][galleryid][type+"NaturalWidth"] = el.naturalWidth

		return true
	}

	function setheader(wrapper, galleryid) {

		console.log("setheader(): Setting header in " + wrapper 
			+ " based on gallery information for " + galleryid)

		for (key in VIVIZ["config"]) {
			// Key name starts with "show"
			if (key.indexOf("show") == 0) {
				if (VIVIZ["galleries"][galleryid][key] == false) {
					console.log("Hiding " + wrapper + " #" + key.replace("show",""))
					$(wrapper + " #" + key.replace("show","").toLowerCase() + "wrapper").hide()
				}
			}
		}

		if (typeof(GALLERYINFO) === "string") {
			$(wrapper + ' #workingfullframe').css('visibility','hidden')
			$(wrapper + " #catalogopen").hide()
			// TODO: Show catalog
			return;
		}

		if (GALLERYINFO["title"]) {
			$("head title").html(GALLERYINFO["title"])
		} else {
			$("head title").html(GALLERYINFO["id"])
		}

		if (GALLERYINFO["about"]) {
			if (GALLERYINFO["about"].match("auto-generated")) {
				$(wrapper + " #abouttext").html(GALLERYINFO["about"]
					.replace("URL",
						"<a style='text-decoration:underline' href='/#"
							+ GALLERYINFO["title"]+"'>URL</a>"))
			} else {
				$(wrapper + " #abouttext").html(GALLERYINFO["about"])
			}
		} else {
			if (GALLERYINFO["title"]) {
				$(wrapper + " #abouttext").html(GALLERYINFO["title"])
			}
		}

		if ((GALLERYINFO["aboutlink"])) {
			$(wrapper + " #aboutbuttonwrapper").attr("onclick",
				"window.open('" + GALLERYINFO["aboutlink"]+"','_blank')")
			$(wrapper + " #aboutbutton").attr("title",
				"Go to page with information about these images:\n"
					+ GALLERYINFO["aboutlink"])
			$(wrapper + " #aboutbuttonwrapper").show()
		}	

		$(wrapper + " #catalogopen").unbind('click')
		$(wrapper + " #catalogopen").click(
				function () {
					$(wrapper+' #catalog').width($(wrapper+' #catalog').width())
					if (GALLERYINFO["json"]["fullscript"]) {
						// Convert function declaration to string.
						GALLERYINFO["json"]["fullscript"] = 
							"" + GALLERYINFO["json"]["fullscript"]
					}
					if (GALLERYINFO["json"]["thumbscript"]) {
						// Convert function declaration to string.
						GALLERYINFO["json"]["thumbscript"] = 
							"" + GALLERYINFO["json"]["thumbscript"]
					}
					$(wrapper+' #catalog')
						.html(JSON.stringify(
							GALLERYINFO["json"], null, 4).replace(/\n/g,"<br/>"))
					$(wrapper + ' #catalogopen').hide()
					$(wrapper + ' #catalogclose').show()
				})

		$(wrapper + " #catalogclose").unbind('click')
		$(wrapper + " #catalogclose").click(
				function () {
					$(wrapper + " #catalog").html('')
					$(wrapper + ' #catalogopen').show()
					$(wrapper + ' #catalogclose').hide()
				})
	}

	function setdropdowns(wrapper, galleryid) {

		console.log("dropdowns(): Setting dropdowns in " 
			+ wrapper + " based on gallery information for " + galleryid)

		// Gallery drop-down
		dropdown("gallery", GALLERIES, wrapper + " #dropdowns")
		$(wrapper + ' #dropdowns #gallery').unbind('change')
		$(wrapper + ' #dropdowns #gallery').change(function () {
			var galleryid = $(wrapper + " #gallery option:selected").val()
			console.log('setdropdowns(): Gallery changed.  galleryid = ' + galleryid)
			$(wrapper + " #error").html("")
			if (galleryid !== "") {
				console.log('setdropdowns(): Setting location.hash')
				location.hash = "id=" + galleryid
			}
		})
		if (galleryid === "") {
			// Invalid gallery id.
			$(wrapper + " #dropdowns #gallery #def").attr('selected','selected')
			$(wrapper + ' #dropdownswrapper').show()
			$(wrapper + ' #dropdownswrapper select').hide()
			$(wrapper + ' #dropdownswrapper #dropdowns #gallery').show()
			return
		}

		// Select default gallery.
		if (typeof(GALLERYINFO) === "string") {
			// galleryid not found or error when genering file list.
			// Select gallery definition in gallery list drop-down and exit.
			$(wrapper + " #gallery #def").attr('selected','selected')
			return
		} else {
			$(wrapper + " #gallery option[value='" + galleryid + "']").attr('selected','selected')
		}

		// Order drop-down
		dropdown("order", GALLERYINFO['orders'], wrapper + " #dropdowns")
		$(wrapper + ' #dropdowns #order').unbind('change')
		$(wrapper + ' #dropdowns #order').change(function () {
			console.log('setdropdowns(): Order changed.')
			updatehash('order')
		})

		// Attributes drop-down.  Only set if attributes exist.
		if (GALLERYINFO['attributes']["Values"].length > 0) {
			dropdown("sortby", GALLERYINFO['attributes'], wrapper + " #dropdowns")
			setregexps()
			$(wrapper + ' #dropdowns #sortby').unbind('change')
			$(wrapper + ' #dropdowns #sortby').change(function () {
				console.log('setdropdowns(): Sortby changed.')
				setregexps()
				updatehash('sortby')
			})
		} else {
			console.log("setdropdowns(): No sort attributes.  Not displaying drop-downs for attributes.")
		}

		setdownloads()

		function dropdown(ID, list, after){

			$(after + " #" + ID).remove()
			$(after).append(
				'<select id="' + ID + '" title="' + list.Title + '" class="' + list.Class + '"></select>')
			for (var k = 0; k < list["Values"].length; k++) {
				VALUE = list["Values"][k]["Value"]
				TITLE = list["Values"][k]["Title"]
				if (k == 0) {
					$(after + ' #' + ID).append(
						'<option value="" class="def" id="def">' + list.Titleshort + '</option>')
					$(after + ' #' + ID).append(
						'<option value="' + VALUE + '" selected="true">' + TITLE + '</option>')
				}
				else {
					$(after + ' #' + ID).append(
						'<option value="' + VALUE + '">' + TITLE + '</option>')
				}
			}

			var qs = $.parseQueryString()
			if (qs[ID]) {
				console.log("setdropdowns.dropdown(): Setting selected value for " + ID + " to " + qs[ID])
				$(wrapper + " #" + ID + " option[value='" + qs[ID] + "']").attr('selected','selected')
			}
		}

		function updatehash(el) {

				var val = $(wrapper + " #" + el + " option:selected").val()
				if (val !== "") {
					var qs = $.parseQueryString()
					qs[el] = val
					var hash = ""
					for (var key in qs) {
						hash = hash + "&" + key + "=" + qs[key]
					}
					console.log('setdropdowns(): Setting location.hash')
					location.hash = hash.substr(1)
				}
		}

		function setdownloads() {
			var REGEXPS            = new Object();
			REGEXPS["Title"]       = "Download options"
			REGEXPS["Titleshort"]  = "-Download-"
			REGEXPS["Values"]      = new Array()

			REGEXPS["Values"][0]          = new Object()
			REGEXPS["Values"][0]["Title"] = "File list"
			REGEXPS["Values"][0]["Value"] = "filelist"

			if (0) {
				REGEXPS["Values"][1]          = new Object()
				REGEXPS["Values"][1]["Title"] = "Zip file"
				REGEXPS["Values"][1]["Value"] = "zip"

				REGEXPS["Values"][2]          = new Object()
				REGEXPS["Values"][2]["Title"] = "Animated GIF"
				REGEXPS["Values"][2]["Value"] = "gif"

				REGEXPS["Values"][3]          = new Object()
				REGEXPS["Values"][3]["Title"] = "MP4"
				REGEXPS["Values"][3]["Value"] = "mp4"
			}

			dropdown("downloads", REGEXPS, wrapper + " #dropdowns")
			$(wrapper + " #downloads #def").attr('selected','selected')

			$(wrapper + ' #dropdowns #downloads').change(function () {
				// TODO: If full app is running, send file from server
				// with proper content-type instead of opening a window.
				$(wrapper + " #downloadlink").remove()
				var val = $(wrapper + " #downloads option:selected").val()
				if (val === "filelist") {
					var list = ""
					for (var i in INFOjs) {
						list = list + INFOjs[i]["FullFile"] + "\n"
					}
					var popup = window.open('', 'fullframe')
					// Clear content from previous selections.
					popup.document.getElementsByTagName('body')[0].innerHTML = ''
					popup.document.write('<html><head><title>File list</title>')
					popup.document.write('<link rel="icon" type="image/ico" href="css/favicon.ico"/>')
					popup.document.write('</head><body>')
					popup.document.write('<pre>'+list+'</pre>')
					popup.document.write('</body></html>')
				} else if (val !== "") {
					console.log('Not implemented.')
					//http://stackoverflow.com/questions/3975648/how-to-set-content-disposition-attachment-via-javascript
					$(wrapper + " #dropdowns").append('&nbsp;<a id="downloadlink" download href="'+INFOjs[0]["FullFile"]+'">&#11015;</a>')
				} else {
				}
				$(wrapper + " #downloads #def").attr('selected','selected')
			})

		}

		function setregexps() {
			var REGEXPS            = new Object();		
			var n                  = $(wrapper + " #dropdowns #sortby option:selected").val()
			REGEXPS["Title"]       = "Attribute filters"
			REGEXPS["Titleshort"]  = "-Constraints-"
			REGEXPS["Values"]      = new Array()

			for (i = 0; i < GALLERYINFO['attributes']["Values"][n]["Filters"].length; i++) {
				REGEXPS["Values"][i]          = new Object()
				REGEXPS["Values"][i]["Title"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Title"]
				REGEXPS["Values"][i]["Value"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Value"]
			}

			if (GALLERYINFO['attributes']["Values"][n]["Filters"].length > 0) {
				dropdown("regexp", REGEXPS, wrapper + " #dropdowns")
			} else {
				console.log("setdropdowns(): No regexp filters.  Not displaying drop-down.")
			}

			$(wrapper + ' #dropdowns #regexp').change(function () {
				updatehash('regexp')
			})
		}
	}

	function thumblist(wrapper) {

		var galleryid = $(wrapper + " #gallery").val();
		var SORTBY    = $(wrapper + " #sortby").val();
		var ORDER     = $(wrapper + " #order").val();
		var regexp    = $(wrapper + " #regexp :selected").attr('value');

		var INFOG    = galleryinfo(galleryid);
		var SORTBYS  = INFOG['attributes'];
		var ORDERS   = INFOG['orders'];
		var THUMBDIR = INFOG['thumbdir'];
		var FULLDIR  = INFOG['fulldir'];

		// http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling
		function shuffle(array) { 
			var tmp, current, top = array.length;

			if(top) while(--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}

			return array;
		}

		// http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
		function clone(obj){       
			if (obj == null || typeof(obj) != 'object') 
				return obj;
			
			var temp = new obj.constructor(); // changed (twice)
			for (var key in obj) 
				temp[key] = clone(obj[key]);
			
			return temp;
		}

		var INFOjs = new Array();
		for (j = 0; j < INFOG["fullfiles"].length; j++) {
			INFOjs[j] = new Object();
			INFOjs[j]["FileName"] = INFOG["fullfiles"][j][0];
			INFOjs[j]["FullFile"] = INFOG["fullfiles"][j][0];
			if (INFOG["thumbfiles"].length > 0) {
				INFOjs[j]["ThumbFile"] = INFOG["thumbfiles"][j][0];
			} else {
				INFOjs[j]["ThumbFile"] = INFOG["fullfiles"][j][0];
			}
			
			if (Object.keys(SORTBYS).length > 0) {
				for (z = 0;z < SORTBYS["Values"].length;z++) {
					INFOjs[j][z] = INFOG["fullfiles"][j][z];
				}
			}
			INFOjs[j]["ImageNumber"] = j;
		}

			state = galleryid+SORTBY+ORDER+regexp;
		if (typeof(thumblist.cache) != 'object') {
			thumblist.cache = new Object();
		}
		if ( thumblist.cache[state] ) {
			//console.log('thumblist.js: Using cached thumblist.');
			return thumblist.cache[state];
		}  
		//console.log('thumblist.js: No cached thumblist for state = gallery + sortby + order + regexp = ' + state);
		////console.log(SORTBY);
			
		I = new Array();
		if (regexp) {
			var REGEXP = new RegExp(regexp);
			if (typeof(INFOjs[0][SORTBY]) == "string") {
				var k = 0;
				for (var i = 0; i < INFOjs.length; i++) {
					if (INFOjs[i][SORTBY].match(REGEXP)) {
						I[i] = k;
						k = k+1;
					}
				}
				console.log("thumblist(): Regexp " + REGEXP + " removed " + (INFOjs.length-k) + "/" + INFOjs.length + " images in subset.");
				//console.log('thumblist.js: First image is now ');
				//console.log(INFOjs[I[0]]);       	
			} else {
				if (!regexp.match(regexp,'true')) {
					regexp = regexp.replace('gt','>').replace('ge','<=').replace('lt','<').replace('le','<=');
					regexp = regexp.replace('and','&').replace('&amp;','&');
					regexp = regexp.replace('&lt;','<');
					regexp = regexp.replace('&gt;','>');
					var k = 0;
					for (var i = 0; i < INFOjs.length; i++) {
						var test = regexp.replace(/this/g,INFOjs[i][SORTBY]);
						//var test = regexp.replace('this',INFOjs[i][SORTBY]);
						//console.log('thumblist.js: Testing ' + test);
						if (eval(test)) {
							I[i] = k;
							k = k+1;
						}
					}
					//console.log("thumblist.js: Expression " + REGEXP + " removed " + (INFOjs.length-k) + "/" + INFOjs.length + " elements.");
					//console.log('thumblist.js: First image is now ');
					//console.log(INFOjs[I[0]]);
				} else {
					var INFOrs = clone(INFOjs);
					//console.log("thumblist.js: Expression true removed zero elements elements.");
					//console.log('thumblist.js: First image is now ');
					//console.log(INFOjs);
				}
			}
			if (I.length > 0) {
				var INFOr = new Array();
				for (i = 0; i < I.length; i++) {
					INFOr[I[i]] = INFOjs[i];
				}
				var INFOrs = clone(INFOr);
			} else {
				return [];
			}
		} else {
			var INFOrs = clone(INFOjs);
		}
		//console.log(INFOrs)

		if (ORDER.match("ascending")) {
			//console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in ascending order.");
			
			if (typeof(INFOrs[0][SORTBY]) == "string") {
				//console.log('thumblist.js: Sorting attribute ' + SORTBY + " as string.");
				INFOrs.sort(function(a,b) {
					return a[SORTBY].localeCompare(b[SORTBY]);
				});
			} else {
				//console.log('thumblist.js: Sorting attribute ' + SORTBY + " as number.");
				INFOrs.sort(function(a, b){
					return a[SORTBY] - b[SORTBY];
				});
			}
			//console.log('thumblist.js: First image is now ' + INFOrs[0].FileName);

		}

		if (ORDER.match("descending")){
			//console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in descending order.");
			if (typeof(INFOrs[0][SORTBY]) == "string") {
				//console.log('thumblist.js: Sorting attribute ' + SORTBY + " as string.");
				INFOrs.sort(function(a,b) {
					return b[SORTBY].localeCompare(a[SORTBY]);
				});
			} else {
				//console.log('thumblist.js: Sorting attribute ' + SORTBY + " as number.");
				INFOrs.sort(function(a, b){
					return b[SORTBY] - a[SORTBY];
				});
			}
			//console.log('thumblist.js: First image is now ' + INFOrs[0]);
		}
		if (ORDER.match("random")){
			//console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in random order.");
			var idx = new Array();
			for (i = 0;i<INFOr.length;i++) {
				idx[i] = i;
			}
			var idx2 = shuffle(idx);
			for (i = 0;i<INFOr.length;i++) {
				INFOrs[idx2[i]] = INFOr[i];
			}
			//console.log('thumblist.js: First image is now ' + INFOrs[0].FileName);
		}

		if ((!ORDER.match("random")) & (typeof(thumblist.cache[state]) != 'object')) {
			thumblist.cache[state] = new Object();
			thumblist.cache[state] = INFOrs;
		}

		return INFOrs;
	}

	function gallery(wrapper, galleryid) {

		setthumbs()
		//$(wrapper + " #fullframe").css('visibility','visible')

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

			var statstr = "| #" + (nowvisible) + "/" + (INFOjs.length) + " for filter";
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

			$(wrapper + ' #attributes').html(statstr);

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
			
			INFOjs = thumblist(wrapper)

			// Set attributes used by lazy loader
			$(wrapper).attr('totalvisible', INFOjs.length)
			$(wrapper).attr('totalingallery',GALLERYINFO["totalingallery"])

			var thumbframe = $(wrapper + ' #gallerythumbframe')
			
			// Clear any previous scroll binding.  (Lazy load uses this.)
			thumbframe.unbind('scroll')

			if (INFOjs.length == 0) {
				$(wrapper + ' #attributes').html('No images in subset.')
				return
			}
			
			setthumb(INFOjs,0,true);
		}

		function setthumb(INFOjs,i,allbad) {

			var firstclicked = false;
			if (i == 0) firstimage(i); 

			// TODO: Detect bad images:
			// https://github.com/desandro/imagesloaded
			// http://stackoverflow.com/questions/821516/browser-independent-way-to-detect-when-image-has-been-loaded
			// http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached

			function firstimage(f) {

				console.log("gallery.firstimage(): Called.  Setting thumb #" + f + " into DOM.");
				if (f == 0) setcontrolbindings();

				console.log(VIVIZ["galleries"][galleryid])
				$('<img class="gallerythumbbrowse firstimage"/>')
					.appendTo($(wrapper + ' #gallerythumbframe'))
					.attr("id",f+1)
					.attr("src", VIVIZ["galleries"][galleryid]["thumbdir"] + INFOjs[f].ThumbFile)
					.error(function () {
						// First image is bad.
						console.log("gallery.firstimage(): Image " + f + " is bad.");
						//warning("Image " + f + " not found.",true);
						$(this).remove();

						warning(wrapper,"Image " + (f+1) + " could not be loaded.",true,Infinity);
						
						if (f == INFOjs.length-1) {
							warning(wrapper,"No images could be loaded.",true,Infinity);
							console.log("No images could be loaded.");
							$(wrapper + " #workingfullframe").css('visibility','hidden');
							return;
						}
						//findfirstimage(f+1,allbad);
						firstimage(f+1,allbad);
					})
					.load(function () {
						
						if (f > 0) {
							if (f == 1) {
								warning(wrapper,"The first image in this subset could not be loaded.",true)
							} else {
								warning(wrapper,"The first " + f + " images" + " in this subset could not be loaded.",true)
							}
						}
						
						// Trigger load of the first image.
						if (!firstclicked) {
							$(wrapper).attr('nowvisible',f+1)
							console.log("gallery.firstimage(): First thumbnail image loaded.")
							console.log("gallery.firstimage(): Applying click bindings and then clicking it to trigger load of full image.")
							$(this).bind('click',setthumbbindings).click()
						}
						firstclicked = true;

						// Scroll to top.
						$(wrapper + " #gallerythumbframe").scrollTo(0);

						console.log('gallery.firstimage(): First thumbnail has natural dimensions = '
							+this.naturalWidth+'x'+this.naturalHeight+'.');

						// Set height of thumbnail image - setWH() Modifies VIVIZ["galleries"][galleryid]
						var tmp = setWH(this, galleryid, GALLERYINFO, 'thumb');
						$(this).css("height",VIVIZ["galleries"][galleryid]["thumbHeight"]);
						$(this).css("width",VIVIZ["galleries"][galleryid]["thumbWidth"]);

						console.log('gallery.firstimage(): First thumbnail set to have dimensions = '
							+VIVIZ["galleries"][galleryid]["thumbWidth"]+'x'+VIVIZ["galleries"][galleryid]["thumbHeight"]+'.');
						

						$('#gallerythumbframe').attr('data-thumb-length', INFOjs.length);

						// Set attribute that indicates which thumbnail is active.
						$('#gallerythumbframe').attr('data-thumb-displayed', f);
						
						setscrollbinding()

						// Lazy Load images.
						var maxLength = INFOjs.length;
						var max = VIVIZ["galleries"][galleryid]["lazyLoadMax"] || VIVIZ["config"]["lazyLoadMax"]
						if (INFOjs.length > max) {
							maxLength = max
						}
						if (maxLength + f > INFOjs.length) {
							maxLength = INFOjs.length-f;
						}

						loadmore()
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
					bw = $(wrapper + ' #gallerythumbframe img:first').outerWidth() - VIVIZ["galleries"][galleryid]["thumbWidth"];
				}
				if  (isNaN(bw)) {
					bw = 2;
				}
				var w = VIVIZ["galleries"][galleryid]["thumbWidth"] + $.scrollbarWidth() + bw + 8; // Why 8?
				console.log("gallery.settabledims(): Setting #gallerythumbframe width to = "+w);
				$(wrapper + ' #gallerythumbframe').width(w);
			}

			console.log("gallery.settabledims(): Full img natural dimensions = " 
				+ VIVIZ["galleries"][galleryid]["fullNaturalWidth"] + "x" + VIVIZ["galleries"][galleryid]["fullNaturalHeight"])
			console.log("gallery.settabledims(): Full img scaled dimensions  = " 
				+ VIVIZ["galleries"][galleryid]["fullWidth"] + "x" + VIVIZ["galleries"][galleryid]["fullHeight"])
			
			// Set heights of thumbframe and fullframe. When first image is loaded, fullNaturalHeight is set.
			if (VIVIZ["galleries"][galleryid]["fullHeight"] > 0) {
				
				// Aspect ratio;
				var ar = VIVIZ["galleries"][galleryid]["fullWidth"]/VIVIZ["galleries"][galleryid]["fullHeight"];
				console.log("gallery.settabledims(): Full image aspect ratio = "+ar);

				// Force outer frame to stay the same size after image is removed and before new image is inserted.
				//$(wrapper + " #fullframe").width($(wrapper + " #fullframe").width())
				
				// Set height of thumb strip to be full height of image.
				$(wrapper + ' #gallerythumbframe').height(VIVIZ["galleries"][galleryid]["fullHeight"]);

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
					+ $(enclosure).width() + "x" + $(enclosure).height())

				// Amount height needs to shrink so that no scrollbar appears.
				dh = $(enclosure).height() - $(window).height();

				if (dh > 0) {
					console.log("gallery.settabledims(): Amount full image height needs to decrease so that no scrollbar appears: dh = "+dh);
					console.log("gallery.settabledims(): Reducing height of #fullframe img.")
					$(wrapper + ' #fullframe img').height(VIVIZ["galleries"][galleryid]["fullHeight"]-dh)
					console.log("gallery.settabledims(): Shrinking height of #gallerythumbframe to "+(VIVIZ["galleries"][galleryid]["fullHeight"]-dh));
					$(wrapper + ' #gallerythumbframe').height(VIVIZ["galleries"][galleryid]["fullHeight"]-dh);
					VIVIZ["galleries"][galleryid]['fullHeight'] = VIVIZ["galleries"][galleryid]["fullHeight"]-dh;
					VIVIZ["galleries"][galleryid]['fullWidth']  = $(wrapper + ' #gallerythumbframe img:first').width()	        	
				} else {
					console.log("gallery.settabledims(): Full image does not need to be reduced in height to prevent vertical scrollbar from appearing.")
					console.log("gallery.settabledims(): Setting #gallerythumbframe height to be height of full image = " + VIVIZ["galleries"][galleryid]["fullHeight"] + ".");
					$(wrapper + " #gallerythumbframe").height(VIVIZ["galleries"][galleryid]["fullHeight"]);
				}

				console.log("gallery.settabledims(): Window dimensions: " 
					+ $(window).width() + "x" + $(window).height())
				console.log("gallery.settabledims(): Client dimensions: " 
					+ document.documentElement.clientWidth + "x" + document.documentElement.clientHeight)
				console.log("gallery.settabledims(): Document dimensions: "
					+  $(document).width() + "x" + $(document).height())
				console.log("gallery.settabledims(): Enclosing Body dimensions: " 
					+ $(enclosure).width() + "x" + $(enclosure).height())

				dw = $(document).width()-$(enclosure).width();

				if (dw > 0) {
					console.log("gallery.settabledims(): Document width is larger than body element width by dw = "+dw);
					if (dh > 0) {
						newh = VIVIZ["galleries"][galleryid]["fullNaturalHeight"]-dh-dw/ar;
					} else {
						newh = VIVIZ["galleries"][galleryid]["fullNaturalHeight"]-dw/ar;
					}
					newh = newh - 1;
					console.log("gallery.settabledims(): Shrinking height of #fullframe img and #gallerythumbframe because dw > 0.  New height: "+newh)
					$(wrapper + ' #fullframe img').height(newh)
					$(wrapper + ' #gallerythumbframe').height(newh);
					VIVIZ["galleries"][galleryid]['fullHeight'] = newh;
					VIVIZ["galleries"][galleryid]['fullWidth'] = $(wrapper + ' #fullframe img:first').width();
				} 


				dh = $(enclosure).height() - $(window).height() - parseInt($(wrapper).css('margin-top'))
				if (dh < 0) {
					console.log("gallery.settabledims(): Setting top margin to " + -dh/2);
					$(wrapper).css('margin-top',-dh/2);
				}	
			} else {
				console.log("gallery.settabledims(): Full image height unknown but thumb height known.");
				var a = 4*VIVIZ["galleries"][galleryid]["thumbHeight"];
				console.log("gallery.settabledims(): Setting thumb frame height to be 4*(first thumb outer height) = "+a);
				console.log("gallery.settabledims(): First thumbnail height = " + $('#gallerythumbframe img').eq(0).height());
				$(wrapper + ' #gallerythumbframe').height("" + a);
			}

			if (VIVIZ["galleries"][galleryid]["play"] || VIVIZ["play"]) {
				$(wrapper + " #play").click()
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
						$(this).width(VIVIZ["galleries"][galleryid]["fullWidth"]);
						$(this).height(VIVIZ["galleries"][galleryid]["fullHeight"]);
					})
					.attr('src', VIVIZ["galleries"][galleryid]["fulldir"] + INFOjs[parseInt(id-1)]["FullFile"])
					.load(function(){

						console.log("gallery.loadfull(): Load event.")

						// Hide loading indicator
						$(wrapper + ' #workingfullframe').css('visibility','hidden');

						if ($(jq).hasClass('firstimage')) {

							console.log('gallery.loadfull(): First full image loaded with dimensions '
								+this.naturalWidth+'x'+this.naturalHeight+'.  Setting table dimensions.');

							$(wrapper + " #fullframe").height('');
							var tmp = setWH(this, galleryid, GALLERYINFO, 'full');

							// Set height of full image.
							console.log("gallery.loadfull(): Setting full image height")
							$(this).css("height",VIVIZ["galleries"][galleryid]["fullHeight"]);
							//$(this).css("width",VIVIZ["galleries"][galleryid]["fullWidth"]);

							// After this function sets VIVIZ[gallerid] dimensions, 
							// then call prepnext(), which uses these dimensions.
							console.log("gallery.loadfull(): Calling settabledims().")
							settabledims(this, function () {prepnext()});

						} else {
							prepnext();
						}

						setfilename($(this).attr('id'));

					})

			function setfilename(id) {
				var fname = INFOjs[parseInt(id-1)]["FullFile"]
				$(wrapper + " #filename").html('');
				var wo = $(wrapper).width()

				$(wrapper + " #filename").append("<a>");
				$(wrapper + " #filename a")
					.attr('href',VIVIZ["galleries"][galleryid]["fulldir"] + INFOjs[parseInt(id-1)]["FullFile"])
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
						.css('height',VIVIZ["galleries"][galleryid]['fullHeight'])
						.attr('src',VIVIZ["galleries"][galleryid]["fulldir"] + INFOjs[idn-1]["FullFile"])
						.error(function () {
							$(wrapper + ' #workingfullframe').css('visibility','hidden');
							$(this).height(VIVIZ["galleries"][galleryid]["fullHeight"]);
							$(this).width(VIVIZ["galleries"][galleryid]["fullWidth"]);
						})
						.load (function () {
						})
				}
			}
		}

		function loadmore() {

			var Navail = parseInt($(wrapper + ' #gallerythumbframe').attr('data-thumb-length'));
			var Nshown = parseInt($(wrapper + " #gallerythumbframe > img").last().attr("id"));
			if (Nshown == Navail) {
				return
			}

			var Nlazy = VIVIZ["galleries"][galleryid]["lazyLoadMax"] || VIVIZ["config"]["lazyLoadMax"]
			
			// Number of blocks of Nlazy images to fill document height.
			Nfill = $(window).height()/(Math.max(Nlazy,Nshown)*VIVIZ["galleries"][galleryid]["thumbHeight"])

			// If Nfill > 1, we need to load more images initially to trigger appearance
			// of scroll bar.
			Nlazy = Math.ceil(Nfill*Nlazy)

			var tic = new Date().getTime()
			var slowwarn = false
			for (var j = Nshown; j < Nshown+Nlazy-1; j++) {
				if (j == INFOjs.length) break;
				$('<img class="gallerythumbbrowse lazyload"/>')
					.appendTo($(wrapper + ' #gallerythumbframe'))
					.attr("id",j+1)
					.attr("src", VIVIZ["galleries"][galleryid]["thumbdir"] + INFOjs[j].ThumbFile)
					.bind('click',setthumbbindings)
					.attr("title",imgtitle(INFOjs[j]))
					//.css("height",thumbheight)
					.css("height",$("#gallerythumbframe > img").first().height())
					.css("width",$("#gallerythumbframe > img").first().width())
					//.error(function () {$(this).remove())
					.load(function () {
						if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
							//warning(wrapper,"Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.",true);
							slowwarn = true;
							//setTimeout(function () {$('#connectionerror').html('')},5000);
						}														
					})
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
					$(wrapper + " #gallerythumbframe").hide()
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
			})

			console.log(VIVIZ["galleries"][galleryid]["showThumbstrip"])
			if (VIVIZ["config"]["showThumbstrip"] == false) {
 				if (typeof(VIVIZ["galleries"][galleryid]["showThumbstrip"]) !== "undefined") {
 					if (VIVIZ["galleries"][galleryid]["showThumbstrip"] == false) {					
						$("#showhidethumb").click()
					}
 				}
			}
			
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
								}, VIVIZ["galleries"][galleryid]["frameRate"] || VIVIZ["frameRate"]);
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


				var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
				var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
				var max = VIVIZ["galleries"][galleryid]["lazyLoadMax"] || VIVIZ["lazyLoadMax"]

				var f = Math.ceil(nowvisible/max) - nowvisible/max
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

			})
			
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
					+ elem[0].scrollHeight + "-" + elem[0].scrollTop + "-" + elem[0].clientHeight + " = " + dh)

				if (dh <= 0) {
					console.log("gallery.setscrollbinding(): Calling loadmore() because dh <= 0.")
					loadmore()
				} else {
					console.log("gallery.setscrollbinding(): Not calling loadmore() because dh > 0.")
				}
			})
		}
	}

	function thumb(wrapper, galleryid) {

		setthumbs()

		function setthumbbindings() {
			console.log('thumb.setthumbbindings(): Setting bindings on ' + wrapper);

			if (!setthumbbindings.active) setthumbbindings.active = {};

			var cmode = parseInt($(wrapper + " #thumbbrowsemode :selected").attr("value"))

			$(wrapper + ' .thumbbrowse').unbind('click');
			$(wrapper + ' .thumbbrowse').unbind('hover');
			$(wrapper + ' .thumbbrowseoverlay').unbind('click');
			$(wrapper + ' .thumbbrowseoverlay').unbind('hover');

			$(wrapper + ' #thumbbrowsemode').unbind('change')
			$(wrapper + ' #thumbbrowsemode').change(function () {
				console.log('setthumbbindings(): Interaction mode changed.')
				setthumbbindings()
			})

			function setfilename(jq) {
				$(wrapper + " #filename").html('');
				$(wrapper + " #filename").append("<a>");
				$(wrapper + " #filename a").attr('href',jq.src.replace(GALLERYINFO['thumbdir'],GALLERYINFO['fulldir'])).text(jq.src.replace(GALLERYINFO['thumbdir'],""));
			}
			
			if (cmode == 0) {
				// Needs work
				$(wrapper + ' .thumbbrowse').hover(function(){
					this.src = this.src.replace(GALLERYINFO['thumbdir'],GALLERYINFO['fulldir']);
					$(this).css('position', 'absolute');
					setfilename(this);
				}, function(){
					this.src = this.src.replace(GALLERYINFO['fulldir'],GALLERYINFO['thumbdir']);
					$(this).css('position', 'relative');
				});
			}

			if (cmode == 1) {
				// Needs work.
				$(wrapper + ' .thumbbrowse').toggle(function(){
					this.src = this.src.replace(GALLERYINFO['thumbdir'],GALLERYINFO['fulldir']);
				}, function(){
					this.src = this.src.replace(GALLERYINFO['fulldir'],GALLERYINFO['thumbdir']);
				});
			}

			if (cmode == 2) {
				deltaleft = $("#thumbbrowseoverlay").position().left 
							- $("#thumbbrowseframe").position().left;
				deltatop = $("#thumbbrowseoverlay").position().top;

				$(wrapper + ' .thumbbrowse').click(function () {

					var src = $(this).attr("srcfull")
					//console.log(src);
					// Where does this 30 pixels come from?
					$(wrapper + ' #thumbbrowseoverlay').unbind('load');
					$(wrapper + ' #thumbbrowseoverlay')
						.show()
						.attr("src", src)
						.css("left", $(this).offset().left+30)
						.css("top", $(this).position().top+30)
						.load(function () {
							setthumbbindings.active = this;

							console.log("active.offset().left: " + $(setthumbbindings.active).offset().left);
							console.log("$('#thumbbrowseoverlay').width(): "+$(wrapper + ' #thumbbrowseoverlay').width())
							console.log("$('#thumbbrowseoverlay').offset().left: "+$('#thumbbrowseoverlay').offset().left)
							console.log('$(window).width(): '+$(window).width());

							if ($(wrapper + ' #thumbbrowseoverlay').width() > $(window).width()) {
								$(wrapper + " #thumbbrowseoverlay").css("left", $(window).width()/2);
							}
							$(wrapper + " #thumbbrowseoverlay").css("left", $(window).width()/2 - $(wrapper + ' #thumbbrowseoverlay').width()/2)
							return;
							var expandright = $(setthumbbindings.active).offset().left + $(wrapper + ' #thumbbrowseoverlay').width() > $(window).width();
							console.log("Full image too wide to expand right? "+ expandright);

							var expandleft = $(setthumbbindings.active).offset().left - $(wrapper + ' #thumbbrowseoverlay').width() < 0;
							console.log("Full image too wide to expand left? "+ expandleft);


							if (!expandright && expandleft) {
								// Flip left
							}
							if (!expandright && !expandleft) {
								// See if it fits when centered.  If not, scale to fit width.
							}

							deltaleft = $(wrapper + " #thumbbrowseoverlay").position().left - $(wrapper + " #thumbbrowseframe").position().left;
							deltatop  = $(wrapper + " #thumbbrowseoverlay").position().top;
							if ($(setthumbbindings.active).offset().left + $(wrapper + ' #thumbbrowseoverlay').width() > $(window).width()) {
								console.log("Flipping to left")
								$(wrapper + " #thumbbrowseoverlay").css("left", 
										$(setthumbbindings.active).offset().left + $(setthumbbindings.active).width()-$(wrapper + ' #thumbbrowseoverlay').width()+30);
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

			if (cmode == 3) {

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

					$(wrapper + ' #thumbbrowseoverlay').show().attr("src", this.src.replace(GALLERYINFO['thumbdir'],GALLERYINFO['fulldir'])).css("left", $(this).offset().left - deltaleft).css("top", deltatop+$(this).position().top);
					$(this).css("border", "solid blue 3px");
					
					$(wrapper + ' #thumbbrowseoverlay').load(function () {
						console.log($(setthumbbindings.active).offset().left + $(this).width() > $("#thumbbrowseframe").width());
						if ($(setthumbbindings.active).offset().left + $(this).width() > $("#thumbbrowseframe").width()) {
							$(this).css("left", $(setthumbbindings.active).offset().left+$(setthumbbindings.active).width()+6-$(this).width()-deltaleft);
						}
					})
				}, function(){})                       
			}
		}

		function setthumbs() {

			window.onresize = function onresize() {console.log("thumb.setthumbs(): Zoom or resize event.")}
			
			thumb.Nset = 0; 	// # Set in DOM.
			thumb.Nloaded = 0;  // # For which load event triggered.
			// Note that we don't have a way of determining when image is
			// visible or when image size has changed.

			// This is set to a value by slider change.
			var newWidth = false;
			var newHeight = false;
			
			var th = 100; // Initial thumb height
			var tw = 100; // Initial thumb width

			// Get list of thumbnails in order determined by drop-downs.
			var INFOjs = thumblist(wrapper)
			
			// Maximum number of thumbnails to load.  Will change after we
			// know how many images fit per row.
			var maxLength = Math.min(INFOjs.length, 
								VIVIZ["galleries"][galleryid]["lazyLoadMax"] 
							 || VIVIZ["config"]["lazyLoadMax"])
			
			// Trigger setting of maxLength images in DOM.
			loadmore()
			setscrolltrigger()

			function loadmore() {

				// thumb.Nset may change, so get current value.
				var Nset = thumb.Nset

				if ($(wrapper).height() < $(window).height()) {
					console.log("thumb.loadmore(): Called. Nset = " + Nset)
					console.log("thumb.loadmore(): $(wrapper).height() = " + $(wrapper).height())
					console.log("thumb.loadmore(): $(window).height() = " + $(window).height())
					console.log("thumb.loadmore(): Loading more images because vertical space is available.")

					for (var j = Nset; j < Nset+maxLength; j++) {
						loadone(j)
					}
					
					// This sets bindings on everything.  May take a long
					// time when many are shown.
					setthumbbindings()
				}
			}

			function objToString (obj) {
				var str = ''
				for (var p in obj) {
					if (obj.hasOwnProperty(p)) {str += p + ':' + obj[p] + '\n'}
				}
				return str;
			}

			function setslider() {
				$( "#slider1" ).change(function () {
					console.log("thumb.setslider(): Slider value changed to " + this.value)
					newWidth = tw*this.value/4;
					newHeight = th*this.value/4
					$('.thumbbrowse').css('width', newWidth);
					$('.thumbbrowse').css('height', newHeight);
					setpadding()
					loadmore()
				})
			}

			function setpadding(el) {

				if (el) {
					// Use actual element instead of querying DOM.
					// (Element may be loaded, setpadding() called, but
					// element may not yet be in DOM.)
					x = $(el).outerWidth()
				} else {
					x = $(wrapper + " #thumbbrowseframe img:first").outerWidth()
				}
				var iw = $("#thumbbrowseframe").innerWidth()

				// Only modify padding of #thumbbrowseframe if first image
				// size has changed or innerWidth has changed.
				if (typeof(setpadding.lastx) !== 'undefined') {
					if (setpadding.lastx == x && setpadding.lastiw == iw) return
				}

				console.log("thumb.setpadding(): First image outer width = " + x)
				console.log("thumb.setpadding(): Inner width of thumbbrowseframe = " + iw)

				setpadding.lastx = x
				setpadding.lastiw = iw

				var pl = parseInt($("#thumbbrowseframe").css('padding-left').replace('px',""))
				var pr = parseInt($("#thumbbrowseframe").css('padding-right').replace('px',""))

				console.log("thumb.setpadding(): padding-left/right of thumbbrowseframe = " + pl + "/" + pr)

				a = (iw)/x
				console.log("thumb.setpadding(): # images per row = " + a);
				b = (a - Math.floor(a))*x


				if (INFOjs.length < Math.floor(a)) {
					// # of images is less than number of images possible per row.
					console.log('thumb.setpadding(): ' + INFOjs.length)
					b =  iw - x*INFOjs.length
				}

				console.log("thumb.setpadding(): Total extra space = " + b);
				console.log("thumb.setpadding(): Setting left padding to " +  Math.floor(b/2))
				$("#thumbbrowseframe").css('padding-left', Math.floor(b/2))

				if (el)
					fillrow(el)
			}
			
			function loadone(i) {

				var fixed = false;
				if (i > INFOjs.length-1) return;
				thumb.Nset = thumb.Nset+1;
				if (thumb.Nset == INFOjs.length-1) {
					$("#instructions").html("All images requested.");
					$("#instructions2").html("All images requested.");
				}

				var src = VIVIZ["galleries"][galleryid]["thumbdir"] + INFOjs[i]['ThumbFile'];
				var srcfull = VIVIZ["galleries"][galleryid]["fulldir"] + INFOjs[i]['FullFile'];

				$('<img class="thumbbrowse" "src=css/transparent.png"/>')
					.width(newWidth || tw || 100)
					.attr("src", src)
					.attr("srcfull", srcfull)
					.attr("id",i)
					.css("height",newHeight || th || 100)
					.attr("title",objToString(INFOjs[i]))
					.error(function () {
						$(this).addClass("loaderror");
						$(this).attr("src","css/transparent.png");
						$(this).css("border","3px solid red");
						$(this).width(newWidth || tw || 100);
						$(this).height(newHeight || th || 100);
						if (th) {
							$('.loaderror').css('height',th);
						}
						if (tw > 0 && !fixed) {fixed = true;$(".loaderror").width(tw)}
					})
					.load(function () {

						thumb.Nloaded = thumb.Nloaded + 1
						if (!loadone.first) {
							console.log("thumb.setthumbs.loadone(): First thumbnail loaded.")

							loadone.first = true

							// Set thumbWidth and Height in VIVIZ["galleries"][galleryid]
							var tmp = setWH(this, galleryid, GALLERYINFO, 'thumb')

							tw = VIVIZ["galleries"][galleryid]["thumbWidth"]
							th = VIVIZ["galleries"][galleryid]["thumbHeight"]

							setslider()
						} else {
							console.log("thumb.setthumbs.loadone(): Thumbnail loaded.")
						}

						$(this).width(newWidth || tw)
						$(this).height(newHeight || th)
						
						setpadding(this)
						loadmore()

					})
					.appendTo($(wrapper + ' #thumbbrowseframe'))		
			}
			
			function fillrow(el) {
				var delta = 0;
				if (!el) {
					//el = $(wrapper + " #thumbbrowseframe img:first")
				}

				if (loadone.first) {
					console.log("thumb.setthumbs.fillrow(): #thumbbrowseframe "
						+ "innerWidth:" + $("#thumbbrowseframe").innerWidth())
					console.log("thumb.setthumbs.fillrow(): #thumbbrowseframe "
						+ "img:first outerWidth:" + $(el).outerWidth())

					var a = Math.floor($("#thumbbrowseframe").innerWidth()/$(el).outerWidth())

					console.log("thumb.setthumbs.fillrow(): Images per row = " + a)
					if (maxLength < a) {
						console.log("thumb.setthumbs.fillrow(): Changing maxLength from " + maxLength + " to " + a)
						maxLength = a
					} else {
						var c = a*Math.ceil(maxLength/a)
						console.log("thumb.setthumbs.fillrow(): Changing maxLength from " + maxLength + " to " + c)
						maxLength = c
					}
					console.log("thumb.setthumbs.fillrow(): thumb.Nset = " + thumb.Nset)

					var delta = a - (thumb.Nset % a)
					if (delta == a) {
						// Last row is full
						delta = 0
					}
					console.log("thumb.setthumbs.fillrow(): Room for " + delta + " more images")
				}	

				if (!isFinite(delta)) {
					console.log("thumb.setthumbs.fillrow(): Delta is not finite")
					return
				}

				Nl = thumb.Nset;
				for (var j = Nl; j < Nl+delta; j++) {
					loadone(j)
				}
			}

			function setscrolltrigger() {
				$(window).unbind('scroll');
				$(window).scroll(function (e) {
					var Nset = thumb.Nset
					if (Nset + maxLength > INFOjs.length - 1) {
						console.log("thumb.setthumbs.setscrolltrigger(): Nset + maxLength > # images. Resetting maxLength.")
						maxLength = INFOjs.length-Nset
						for (var j = Nset; j < Nset+maxLength; j++) {
							loadone(j)
						}
						setthumbbindings()

						$(window).unbind('scroll')
					}
					th = $(".thumbbrowse").first().width()
					// Hidden space below is 
					// $(document).height() - ($(window).scrollTop() + $(window).height())
					// Want hidden space to be at least 2*th
					if (2*th + $(window).scrollTop() + $(window).height() >= $(document).height()) {
						console.log("thumb.setthumbs.setscrolltrigger(): Scroll triggered & criteria satisfied.")
						console.log("thumb.setthumbs.setscrolltrigger(): maxLength = "
							+ maxLength + ", first thumbheight = " + th)
						console.log("thumb.setthumbs.setscrolltrigger(): "
							+ "2*th + $(window).scrollTop() + $(window).height() = "
							+ (2*th + $(window).scrollTop() + $(window).height()))
						console.log("thumb.setthumbs.setscrolltrigger(): $(document).height() = " + ($(document).height()))

						// TODO: The following code is duplicated in loadmore().
						for (var j = Nset; j < Nset+maxLength; j++) {
							loadone(j)
						}
						setthumbbindings()
					} else {
						console.log("thumb.setthumbs.setscrolltrigger(): Scroll triggered, but criteria not satisfied.")
					}
				})
			}
		}
	}

}