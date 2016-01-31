function viviz(VIVIZ, mode) {

	// Uncomment to turn of debugging.
	// var console = {}; console.log = function(){};

	console.log("viviz.js: Called.")

	if (location.protocol.indexOf("file") === 0) {
		if ($("#favicon").length == 0) {
			// Set favicon for offline mode.  See also
			//http://stackoverflow.com/questions/5199902/isnt-it-silly-that-a-tiny-favicon-requires-yet-another-http-request-how-to-mak
			$('<link id="favicon" rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAADQcAALonPQANAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERAREBEQERASEBIQEhASEBEQERAREBEQAAAAAAAAAAAREBEQEhAREBIQEhASEBIQERAREBEQERAAAAAAAAAAABEQERAREBEQEhASEBIQEhAREBEQERAREAAAAAAAAAAAMzAzMDMwMzAyMDIwMjAyMDMwMzAzMDMwAAAAAAAAAAAREQAAEREAABERAAD//wAAEREAABERAAAREQAA//8AABERAAAREQAAEREAAP//AAAREQAAEREAABERAAD//wAA" />')
				.appendTo('head')
		}
	}

	// Default configuration options
	_VIVIZ = {
		"defaultMode": "gallery",
		"defaultFirstImage": 1,
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

	// If key does not exist in global or passed VIVIZ object, add it.
	for (key in _VIVIZ) {
		if (typeof(VIVIZ["config"][key]) === "undefined") {
			VIVIZ["config"][key] = _VIVIZ[key]
		}
	}

	// Read and parse query string
	var qs = $.parseQueryString()
	if (typeof(mode) === "undefined") {
		if (qs["mode"]) {
			if (qs["mode"] === "gallery") {
				mode = "gallery"
			} else if (qs["mode"] === "thumb") {
				mode = "thumb"
			} else {
				console.log("viviz.js: mode = " + qs["mode"] + " not recognized."
					+ " Should be 'thumb' or 'gallery'.")
				mode = VIVIZ["config"]["defaultMode"]
			}
		} else {
			mode = VIVIZ["config"]["defaultMode"]
		}
	}

	var gallerynumber = "1"
	var wrapper = "#" + mode + gallerynumber

	location.hash = location.hash.replace("id=dir","dir");

	$(window).unbind('hashchange.' + mode)
	$(window).bind('hashchange.' + mode, function() {
		console.log('viviz.js: Hash has changed to ' + location.hash + ".");

		// Special case where id is only key specified in gallery object in VIVIZ
		// and its value is a query string. (Allowed in order to simplify testing
		// of query strings.)
		var keys = ["catalog","dir","full","thumb","strftime",
					"sprintf","script","list","start","stop"]
		var hash = location.hash
		for (var k in keys) {
			key  = keys[k]
			hash = hash.replace("id=" + key, key)
			hash = hash.replace("id=full" + key, "full" + key)
			hash = hash.replace("id=thumb" + key, "thumb" + key)
		}
		if (hash !== location.hash) {
			console.log('viviz.js: Hash is a query string.')
		}
		location.hash = hash

		if (viviz.triggerhashchange == false) {
			console.log('viviz.js: viviz.triggerhashchange = false.  Not resetting application.');
			viviz.triggerhashchange = true;
		} else {
			console.log('viviz.js: viviz.triggerhashchange = true. Resetting application.');
			viviz(VIVIZ)
		}
	})

	// Get list of galleries
	console.log("viviz.js: Getting list of galleries.")
	var GALLERIES = cataloginfo()

	if (typeof(GALLERIES) === "string") {
		console.log("viviz.js: Call to cataloginfo() failed.")
		resetdom()
		error(GALLERIES)
		return
	}

	if (location.hash.indexOf("dir") == -1) {
		var galleryid = qs["id"] || GALLERIES["Values"][0]["Id"]
	} else {
		var galleryid = location.hash.replace("#","")
		console.log("viviz.js: galleryid = " + galleryid)
	}

	var GALLERYINFO = galleryinfo(galleryid)

	if (typeof(GALLERYINFO) === "string") {
		console.log("viviz.js: Call to galleryinfo() failed.")
		resetdom()
		error("Problem with configuration for gallery with <code>id = " 
				+ galleryid + "</code>:<br/>" + GALLERYINFO)
		if (!VIVIZ["galleries"]) {
			// Call to galleryinfo sets this object based on VIVIZ["catalog"].
			// If object was not generated, ID was not found in catalog so there
			// will be no header information for gallery.
			setdropdowns(false)
		} else if (VIVIZ["galleries"][galleryid]) {
			// Gallery ID is valid but an error occured.
			// Show gallery configuration.
			setheader()
			setdropdowns(false)
		} else {
			setdropdowns(false)
		}
		return
	}

	if (qs["number"]) {
		console.log("viviz.js: Initial query string had a number.  Using that as defaultFirstImage.")
		VIVIZ["galleries"][galleryid]["defaultFirstImage"] = parseInt(qs["number"])
	}

	// TODO: Do this for all optional parameters.
	if (!VIVIZ["galleries"][galleryid]["defaultFirstImage"]) {
		console.log("viviz.js: defaultFirstImage not set in gallery configuration.  Using default.");
		VIVIZ["galleries"][galleryid]["defaultFirstImage"] = parseInt(VIVIZ["config"]["defaultFirstImage"]);
	} else {
		VIVIZ["galleries"][galleryid]["defaultFirstImage"] = parseInt(VIVIZ["galleries"][galleryid]["defaultFirstImage"])
	}

	resetdom()
	setheader()
	setdropdowns()

	// Button to switch between gallery and thumb view
	$("#gallerybrowsebutton").unbind('click')
	$("#gallerybrowsebutton").click(function () {
		if (VIVIZ["config"]["defaultMode"] === "gallery") {
			location.hash = location.hash.replace("&mode=thumb","")
		} else {
			// Remove any existing mode=gallery and append mode=thumb
			location.hash = location.hash.replace("&mode=thumb","") + "&mode=gallery"
		}
	})
	$("#thumbbrowsebutton").unbind('click')
	$("#thumbbrowsebutton").click(function () {
		viviz.triggerhashchange = true;
		if (VIVIZ["config"]["defaultMode"] === "thumb") {			
			location.hash = location.hash.replace("&mode=gallery","")
		} else {
			// Remove any existing mode=gallery and append mode=thumb
			location.hash = location.hash.replace("&mode=gallery","") + "&mode=thumb"
		}
	})

	// TODO: These should be in callback for setdropdowns.
	// Use https://github.com/caolan/async
	// aync.series([resetdom,setheader,setdropdowns,gallery])
	// aync.series([resetdom,setheader,setdropdowns,thumb])
	if (mode === 'gallery') gallery()
	if (mode === 'thumb') thumb()		

	function cataloginfo(galleryid) {

		var qs = location.hash.replace(/^#/,'')
		var qo = $.parseQueryString()

		var hashisgallery = false
		if (location.hash.indexOf("dir=") != -1){
			if (location.hash.length > 1) {
				hashisgallery = true
			}
		}

		var selected = qo["catalog"] || VIVIZ["config"]["defaultCatalog"];
		if (hashisgallery) {
			// Hash is query string with gallery information
			console.log("cataloginfo(): Hash is a query string with gallery information: ")
			delete qo["catalog"]
			console.log(qo)
			qo["id"] = location.hash.replace("#","")
			qo["title"] = location.hash.replace("#","")
			var url = "";
			var found = false;
			for (var i = 0; i < VIVIZ["catalogs"][selected].length; i++) {
				console.log(VIVIZ["catalogs"][selected][i]["id"])
				console.log(qo["id"])
				if (VIVIZ["catalogs"][selected][i]["id"] == qo["id"]) {
					found = true
					break
				}
			}
			if (found) {
				console.log("cataloginfo(): Hash found in gallery list of " + selected + ".")
			} else {
				console.log("cataloginfo(): Hash not found in gallery list of " + selected + ".")
				console.log("cataloginfo(): Prepending gallery to gallery list of " + selected + ".")
				VIVIZ["catalogs"][selected].unshift(qo)
			}
		} else {
			var url = VIVIZ["config"]["catalogs"][selected]["URL"]
		}

		console.log(selected)
		var errmsg = ""

		if (url !== "" && !VIVIZ["catalogs"][selected] && !hashisgallery) {
			if (location.href.match(/^file/)) {
				console.log("cataloginfo(): Application cannot read " 
						+ url 
						+ " because it is not available from a server.")
				if (hashisgallery == false) {
					console.log("cataloginfo(): Problem with query string.")
					errmsg =  "In this mode, ViViz is not allowed to read "
							+ "external configuration file " + url 
							+ " <a style='text-decoration:underline' href='" 
							+ url + "'>" 
							+ url + "</a>).<br/>"
							+ "Contents of this file must be copied into ViViz['catalogs']['" + selected + "']"
							+ " in index.htm or index.htm must be viewed from a server."
				} else {
					VIVIZ["catalog"] = []
				}
			} else {
				console.log("cataloginfo(): Configuraton for " 
								+ selected
								+ " is from a URL (" + url + ") that returns JSON. Requesting it.")
				try {
					$.ajax({
							type: "GET",
							url: url,
							async: false,
							dataType: "json",
							success: 
								function (data, textStatus, jqXHR) {
									console.log("cataloginfo(): Finished reading " + url)
									console.log(data)
									if (!data) {
										errmsg = "Problem with data returned from "
												+ "<a style='text-decoration:underline' href='" 
												+ url
												+ "'>" 
												+ url
												+ "</a>."
										console.log("cataloginfo(): Problem with data returned from " + url)
									}
									VIVIZ["catalogs"][selected] = data
								},
							error: 
								function (xhr, textStatus, errorThrown) {
									errmsg = "Could not read <a style='text-decoration:underline' href='" + VIVIZ['config']["catalog"] + "'>" + VIVIZ['config']["catalog"] + "</a>. Error: " + errorThrown.message.split(":")[0]
									console.log("cataloginfo(): Could not read " + VIVIZ['config']["catalog"] + ". Error: " + errorThrown.message.split(":")[0])
								}
						})
				} catch (err) {
					// If URL returns a 404, error above is not triggered if
					// there is text in the message body.  Instead, there is
					// an interal error "Cannot read property split of undefined."
					// that must be caught.
					errmsg = "Could not read "
							+ "<a style='text-decoration:underline' href='" 
							+ url
							+ "'>" 
							+ url
							+ "</a>."
					console.log("cataloginfo(): Could not read " + url + ".")
				}
			}
		}

		if (errmsg !== "") {
			console.log(errmsg)
			return errmsg
		}

		// If no arguments, return list of galleries.
		if (arguments.length == 0) {

			if (!VIVIZ["catalogs"][selected]) {
				var msg = "No catalog object found for " + selected + ".";
				console.log("cataloginfo(): " + msg)
				return msg
			}

			var GALLERIES           = new Object()
			GALLERIES["Title"]      = "Galleries"
			GALLERIES["Titleshort"] = "-Galleries-"
			GALLERIES["Class"]      = "updatelglobal"
			GALLERIES["Values"]     = new Array()

			VIVIZ["catalogs"][selected]
				.forEach(
					function (el,i) {
						GALLERIES["Values"][i] = new Object()
						if (el.title) {
							GALLERIES["Values"][i]["Title"] = el.id + ": " + el.title
						} else {
							GALLERIES["Values"][i]["Title"] = el.id
						}
						if (el.isqs) {
							GALLERIES["Values"][i]["Title"] = el.id 
										+ ": Gallery defined by query string."
						}
						GALLERIES["Values"][i]["Value"] = el.id
						GALLERIES["Values"][i]["Id"]    = el.id
					})
					
			if (GALLERIES.Values.length == 0) {
				console.log("cataloginfo(): Could not generate a gallery menu based on VIVIZ['catalog'].")
				return " Could not generate a gallery menu based on VIVIZ['catalog']."
			}

			console.log("cataloginfo(): Returning list of "
						+ GALLERIES.Values.length + " galleries in catalog " + selected)
			return GALLERIES
		}

		// If galleryid given, return gallery information.
		if (arguments.length == 1) {

			console.log("cataloginfo(): Looking for info for gallery with id = " + galleryid + " in catalog = " + selected)
			var _CATALOGINFO = new Object()

			console.log(VIVIZ["catalogs"][selected])
			// Find gallery with matching id in json array.
			var found = true
			for (i = 0;i < VIVIZ["catalogs"][selected].length; i++) {
				if (VIVIZ["catalogs"][selected][i]["id"] === galleryid) {
					found = false
					break
				}
			}

			if (found) {
		 		var msg = "Gallery with <code>id = "+ galleryid + "</code> "
		 			+ "not found in catalog:<br/>"
		 			+ "<textarea style='width:40em;height:20em'>"
		 			+ JSON.stringify(VIVIZ["catalog"], null, 4)
		 			+ "</textarea>"
		 		console.log("cataloginfo(): Gallery with "
		 			+ "<code>id = "+ galleryid + "</code>"
		 			+ " not found in catalog.")
		 		return msg
		 	}
			
			// Gallery nodes will be stored in this object so they can
			// be referenced by id.
			if (!VIVIZ["galleries"]) VIVIZ["galleries"] = {}
			VIVIZ["galleries"][galleryid] = {}

			// Replace gallery information with values in query string.
			for (key in qo) {
				if (qo[key]) {
					if (qo[key] === 'true') {qo[key] = true}
					if (qo[key] === 'false') {qo[key] = false}
					if ($.isNumeric(qo[key])) {qo[key] = parseFloat(qo[key])}
					console.log("cataloginfo(): Setting " + key + " from " 
									+ VIVIZ["galleries"][galleryid][key] + " to " + qo[key])
					VIVIZ["catalogs"][selected][i][key] = qo[key]
				}
			}

			if (VIVIZ["catalogs"][selected][i]["dir"] || VIVIZ["catalogs"][selected][i]["fulldir"] !== VIVIZ["catalogs"][selected][i]["thumbdir"]) {
				// If thumbdir != fulldir in gallery configuration, set scaling of thumbs to 1.0
				if (!VIVIZ["catalogs"][selected][i]["thumbWidth"] && !VIVIZ["catalogs"][selected][i]["thumbHeight"]) {
					if (VIVIZ["catalogs"][selected][i]["thumbdir"]) {
						VIVIZ["galleries"][galleryid]["thumbWidth"] = 1.0
						VIVIZ["galleries"][galleryid]["thumbHeight"] = 1.0
					}
				}
				// If only one was specified, assume other is same if fraction given
				if (VIVIZ["catalogs"][selected][i]["thumbWidth"] && !VIVIZ["catalogs"][selected][i]["thumbHeight"]) {
					if (VIVIZ["catalogs"][selected][i]["thumbWidth"] <= 1.0) {
						VIVIZ["galleries"][galleryid]["thumbHeight"] = VIVIZ["catalogs"][selected][i]["thumbWidth"]
					} else {
						VIVIZ["galleries"][galleryid]["thumbHeight"] = ""
					}
				}
				if (VIVIZ["catalogs"][selected][i]["thumbHeight"] && !VIVIZ["catalogs"][selected][i]["thumbWidth"]) {
					if (VIVIZ["catalog"][i]["thumbHeight"] <= 1.0) {
						VIVIZ["galleries"][galleryid]["thumbWidth"] = VIVIZ["catalogs"][selected][i]["thumbHeight"]
					} else {
						VIVIZ["galleries"][galleryid]["thumbWidth"] = ""
					}
				}
			}

			// Copy gallery information
			for (key in VIVIZ["catalogs"][selected][i]) {
				if (typeof(VIVIZ["catalogs"][selected][i]) === 'string') {
					// If a URL to a catalog was given, remove leading and trailing spaces.
					VIVIZ["galleries"][galleryid][key] = VIVIZ["catalogs"][selected][i][key].replace(/^\s+|\s+$/g,'')
				} else {
					VIVIZ["galleries"][galleryid][key] = VIVIZ["catalogs"][selected][i][key]
				}
			}

			// Copy configuration information found in VIVIZ["config"] and
			// not found in gallery configuration.
			for (key in VIVIZ["config"]) {
				if (typeof(VIVIZ["galleries"][galleryid][key]) === 'undefined') {
					VIVIZ["galleries"][galleryid][key] = VIVIZ["config"][key]
				}
			}

			// Copy configution information for display in header.
			VIVIZ["galleries"][galleryid]["json"] = VIVIZ["catalogs"][selected][i]
			
			// Delete elements with no value.
			for (var key in VIVIZ["galleries"][galleryid]) {
				if (VIVIZ["galleries"][galleryid][key] === "") {
					delete VIVIZ["galleries"][galleryid][key]
				}
			}
			console.log("cataloginfo(): Returning")
			console.log(VIVIZ["galleries"][galleryid])
			return VIVIZ["galleries"][galleryid]
		}
	}

	function galleryinfo(galleryid) {

		var usecache = true

		if (usecache) {
			if (typeof(galleryinfo.GALLERYINFO) !== 'object') {
				galleryinfo.GALLERYINFO = new Object()
			}
			
			if (galleryinfo.GALLERYINFO[galleryid]) {
				console.log("gallerinfo(): Cache hit.")
				return galleryinfo.GALLERYINFO[galleryid]
			}
		}

		var CATALOGINFO = cataloginfo(galleryid)

		// Catches case where galleryid is not found.
		if (typeof(CATALOGINFO) === "string") {return CATALOGINFO}

		var types = ["full", "thumb"]

		for (var j in types) {

			var type = types[j]
			var files = []

			if (CATALOGINFO["dir"] && !CATALOGINFO[type+"dir"]) {
				CATALOGINFO[type+"dir"] = CATALOGINFO["dir"]
			}

			if (CATALOGINFO["script"] && !CATALOGINFO[type+"script"]) {
				CATALOGINFO[type+"script"] = CATALOGINFO["script"]
			}
			if (typeof(CATALOGINFO[type+"script"]) === 'string') {
				files = eval("(" + CATALOGINFO[type+"script"] + ")()")
			}
			if (typeof(CATALOGINFO[type+"script"]) === 'function') {
				files = eval(CATALOGINFO[type+"script"]())
			}

			if (CATALOGINFO["files"] && !CATALOGINFO[type+"files"]) {
				CATALOGINFO[type+"files"] = CATALOGINFO["files"]
			}

			if (typeof(CATALOGINFO[type+"files"]) !== 'undefined') {
				files = extractfiles(CATALOGINFO[type+"files"])
				if (typeof(files) === 'string') {
					return files // Response is an error message.
				}
			}
			
			var options = {}

			if (CATALOGINFO["start"] && !CATALOGINFO[type+"start"]) {
				CATALOGINFO[type+"start"] = CATALOGINFO["start"]
			}	
			if (CATALOGINFO["stop"] && !CATALOGINFO[type+"stop"]) {
				CATALOGINFO[type+"stop"] = CATALOGINFO["stop"]
			}

			if (CATALOGINFO["strftime"] && !CATALOGINFO[type+"strftime"]) {
				CATALOGINFO[type+"strftime"] = CATALOGINFO["strftime"]
			}	
			if (CATALOGINFO[type+"strftime"]) {
				options.type = "strftime";
				// TODO: Need to document why this try/catch is needed.
				try {
					options.template = decodeURIComponent(CATALOGINFO[type+"strftime"])
				} catch(err) {
					options.template = CATALOGINFO[type+"strftime"]
				}
				options.timeRange = CATALOGINFO[type+"start"] + "/" + CATALOGINFO[type+"stop"]
			}

			if (CATALOGINFO["sprintf"] && !CATALOGINFO[type+"sprintf"]) {
				CATALOGINFO[type+"sprintf"] = CATALOGINFO["sprintf"]
			}	
			if (CATALOGINFO[type+"sprintf"]) {
				options.type = "sprintf";
				try {
					options.template = decodeURIComponent(CATALOGINFO[type+"sprintf"])
				} catch(err) {
					options.template = CATALOGINFO[type+"sprintf"]
				}
				if (CATALOGINFO["delta"] && !CATALOGINFO[type+"delta"]) {
					CATALOGINFO[type+"delta"] = CATALOGINFO["delta"]
				}	
				var step = parseInt(CATALOGINFO[type+"delta"])
				if (isNaN(step)) {
					var step = 1
					console.log("galleryinfo.js: delta is not defined " + " or is NaN.  Using value of 1.")
				}
				options.indexRange = CATALOGINFO[type+"start"] + "/" + CATALOGINFO[type+"stop"] + "/" + step
			}

			if (CATALOGINFO[type+"sprintf"] || CATALOGINFO[type+"strftime"]) {
				options.debug = false
				//console.log(options)
				var xfiles = expandtemplate(options)
				for (var i = 0; i < xfiles.length; i++) {
					files[i] = [xfiles[i]]
				}
			}

			VIVIZ["galleries"][galleryid][type+"files"] = files
		}

		// If no full dir given, files are in same directory as index.htm 
		if (!CATALOGINFO["fulldir"]) {
			CATALOGINFO["fulldir"] = ""
		}

		if (CATALOGINFO["thumbdir"]) {
			if (CATALOGINFO["thumbdir"].indexOf("http") != 0 && CATALOGINFO["fulldir"].indexOf("http") == 0) {
				// If thumbdir does not start with http and fulldir does,
				// thumbdir path is relative to fulldir
				CATALOGINFO["thumbdir"] = CATALOGINFO["fulldir"] + CATALOGINFO["thumbdir"]
			}
		}

		if (!CATALOGINFO["thumbdir"]) {
			CATALOGINFO["thumbdir"] = CATALOGINFO["fulldir"]
		}

		if (VIVIZ["galleries"][galleryid]["fullfiles"].length == 0) {
			console.log("No full file list was generated.")
			return "No full file list was generated."
		}
		if (VIVIZ["galleries"][galleryid]["thumbfiles"].length == 0) {
			VIVIZ["galleries"][galleryid]["thumbfiles"] = VIVIZ["galleries"][galleryid]["fullfiles"]
		}
		if (VIVIZ["galleries"][galleryid]["thumbfiles"].length != VIVIZ["galleries"][galleryid]["fullfiles"].length) {
			console.log("Thumb file list length does not match full file length.")
			return "Thumb file list length does not match full file list length."
		}

		if (VIVIZ["galleries"][galleryid]["fullfiles"][0][0].indexOf("file:") == 0) {
			if (location.href.indexOf("file:") != 0) {
				var msg = "Full file URLs cannot start with file:/ if running in web server mode."
				console.log(msg)
				return msg
			}
		}

		VIVIZ["galleries"][galleryid]["orders"] = extractorders()
		VIVIZ["galleries"][galleryid]["attributes"] = extractattributes()
		VIVIZ["galleries"][galleryid]["totalingallery"] = VIVIZ["galleries"][galleryid]["fullfiles"].length 

		if (VIVIZ["config"]["useAutoAttributes"] || VIVIZ["galleries"][galleryid]["useAutoAttributes"]) {

			// When useAutoAttributes is true, ignores attributes specified in file.
			// TODO: Add options useAutoAttributesOnly (current meaning of useAutoAttributes) 
			// and useAutoAttributesAlso (Append auto attributes to existing)?	

			na = 0

			// Create regexps based on time information
			if (CATALOGINFO["fullstrftime"]) {

				var msg = testdecode(CATALOGINFO["fullstrftime"])
				if (msg !== "") return msg;

				VIVIZ["galleries"][galleryid]["autoattributes"] = 
					filterlist(CATALOGINFO["fullstart"], CATALOGINFO["fullstop"], decodeURIComponent(CATALOGINFO["fullstrftime"]))
			
				VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"] = 
					VIVIZ["galleries"][galleryid]["autoattributes"]

				// Add an All attribute at the end.
				na = VIVIZ["galleries"][galleryid]["autoattributes"].length || 0
			}

			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na] = {}
			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na].Title = "All"
			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na].Value = ".*"	
		}

		var msg = testdecode(VIVIZ["galleries"][galleryid]["fulldir"])
		if (msg !== "") return msg;
		var msg = testdecode(VIVIZ["galleries"][galleryid]["thumbdir"])
		if (msg !== "") return msg;

		VIVIZ["galleries"][galleryid]["fulldirdecoded"] = decodeURIComponent(VIVIZ["galleries"][galleryid]["fulldir"]);
		VIVIZ["galleries"][galleryid]["thumbdirdecoded"] = decodeURIComponent(VIVIZ["galleries"][galleryid]["thumbdir"]);
		// Decoding of files takes place in thumblist()

		if (usecache) {
			galleryinfo.GALLERYINFO[galleryid] = VIVIZ["galleries"][galleryid]
		}

		console.log("galleryinfo.js: Returing"); console.log(VIVIZ["galleries"][galleryid])
		return VIVIZ["galleries"][galleryid]

		function extractorders() {

			var ORDERS = {
				    "Title": "Sort images by attribute",
				    "Titleshort": "-Sort by-",
				    "Class": "updatelocal",
				    "Values": [
				    			{"Title": "No sort", "Value": "none"},
								{"Title": "Ascending", "Value": "ascending"},
				               	{"Title": "Descending","Value": "descending"},
				               	{"Title": "Random","Value": "random"}
				              ]
			}
			return ORDERS
		}

		function extractattributes() {

			var files = VIVIZ["galleries"][galleryid]["fullfiles"];
			if (VIVIZ["galleries"][galleryid]["attributes"]) {
				console.log("galleryinfo.extractattributes(): First array element contains attribute names.")
				var AttributeNames = VIVIZ["galleries"][galleryid]["attributes"]
			}

			ATTRIBUTES = new Object();
			
			ATTRIBUTES["Title"]      = "Image attributes"
			ATTRIBUTES["Titleshort"] = "-Attribute-"
			ATTRIBUTES["Class"]      = "updatelocal"

			ATTRIBUTES["Values"]             = new Array()
			ATTRIBUTES["Values"][0]          = new Object()
			ATTRIBUTES["Values"][0]["Title"] = "Filename"
			ATTRIBUTES["Values"][0]["Value"] = "Filename"

			// If file list has attributes.
			for (var k = 1;k < files[0].length;k++) {
				ATTRIBUTES["Values"][k] = new Object()
				if (AttributeNames) {
					ATTRIBUTES["Values"][k]["Title"] = AttributeNames[k]
					ATTRIBUTES["Values"][k]["Value"] = AttributeNames[k]

				} else {
					ATTRIBUTES["Values"][k]["Title"] = "Attribute " + (k)
					ATTRIBUTES["Values"][k]["Value"] = "Attribute" + (k)
				}
			}

			if (!VIVIZ["galleries"][galleryid]["filters"]) {
				ATTRIBUTES["Values"][0]["Filters"]    = new Array()
				ATTRIBUTES["Values"][0]["Filters"][0] = new Object()
				ATTRIBUTES["Values"][0]["Filters"][0]["Title"] = "All"
				ATTRIBUTES["Values"][0]["Filters"][0]["Value"] = ".*"
				return ATTRIBUTES
			}

			var filters = VIVIZ["galleries"][galleryid]["filters"]
			console.log(filters)
			for (var i = 0; i < filters.length; i++) {
				ATTRIBUTES["Values"][i] = new Object();
				ATTRIBUTES["Values"][i]["Title"] = AttributeNames[i];
				ATTRIBUTES["Values"][i]["Value"] = AttributeNames[i];
				ATTRIBUTES["Values"][i]["Filters"] = new Array();
				for (var j = 0; j < filters[i].length; j++) {
					console.log(filters[i][j])
					ATTRIBUTES["Values"][i]["Filters"][j] = new Object();
					ATTRIBUTES["Values"][i]["Filters"][j]["Title"] = filters[i][j]["name"];
					ATTRIBUTES["Values"][i]["Filters"][j]["Value"] = filters[i][j]["value"];
				}
			}

			return ATTRIBUTES;
		}

		function extractfiles(URLFiles) {
			
			if (typeof(URLFiles) === 'object') {
				return URLFiles
			}

			var msg = ""
			if (location.href.indexOf("file") == 0) {
				msg = "Configuration variable <code>fullfiles</code> cannot be an external file (local or remote) unless this page is loaded from a web server."
				console.log(msg)
				return msg
			}

			// fullfiles is a string with newlines
			if (URLFiles.indexOf("\n") != -1) {
				fullfiles = CSVToArray(URLFiles.replace(/\n$/,''))			
				return fullfiles
			}
			
			// fullfiles is a URL, check if proxy is needed.
			if (URLFiles.indexOf("http") != -1) {
				var tmparr = URLFiles.split("/");
				var tmparrp = VIVIZ["config"]["proxyServer"].split("/");

				var proxy = tmparrp[2]
				var files = tmparr[2]
				var host = location.hostname+(location.port ? ':'+location.port: '')

				if (VIVIZ["config"]["proxyServer"]) {
					if (host !== files) {
						console.log("Proxy server is required.");
						if (proxy !== host) {
							var msg = "proxyServer address (" + proxy + ") specified in configuation must match application address (" + host + ")"
							console.log(msg)
						} else {
							// TODO: Check that proxy actually works.
							URLFiles = VIVIZ["config"]["proxyServer"] + URLFiles;
						}
					}
				} else {
					if (host === files) {

					} else {
						console.log("Request is for file list from a http address, but no proxyServer specified in configuration and server address for file is not same as address of application.")
						console.log("Request will fail because of Same Origin policy.")
						msg = "proxyServer must be specified in configuration or filelist URL must start with http://" + location.hostname+(location.port ? ':'+location.port: '')
						console.log(msg)
					}

				}
			}

			var FILES = new Array()
			$("#status").text("Retrieving list of files.")
			console.log("galleryinfo.extractfiles(): Getting file list from " + URLFiles)
			if (URLFiles.match(/\.txt$/)) {
				$.ajax({
					type: "GET",
					url: URLFiles,
					async: false,
					dataType: "text",
					error: geterror,
					success: function (data) {
								if (data.indexOf("<html") >= 0) {
									msg = "Error parsing <a style='text-decoration:underline' href='" + URLFiles + "'>" + URLFiles + "</a>.  File contains html tag."
									console.log(msg)	
								} else {
									console.log('galleryinfo.extractfiles(): Extracting files from ' + URLFiles)
									FILES = CSVToArray(data.replace(/\n$/,''))
									//FILES = data.split(/\n/); Use this instead?
								}
							}
				});
				$("#status").text("")
			} else {
				// A service request that returns a JSON array of files.
				$.ajax({
					type: "GET",
					url: URLFiles,
					async: false,
					dataType: "json",
					error: geterror,
					success: function (data) {
								console.log('Extracting files from ' + URLFiles)
								if (typeof(data[0]) === "string") {
									for (var k=0;k<data.length;k++) {
										FILES[k] = []
										FILES[k][0] = data[k]
									}
								} else {
									FILES = data
								}	
							}
				})
			}

			function geterror(err, textStatus, errorThrown) {
				console.log(err)
				msg = "Error getting <a style='text-decoration:underline' target='_blank' href='" + URLFiles + "'>" + URLFiles + "</a>."
				if (textStatus && textStatus !== 'error') {
					if (errorThrown) {
						msg = msg + "<br/>Error: " + textStatus + ", " + errorThrown
					} else {
						msg = msg + "<br/>Error: " + textStatus + "."
					}
				}
				if (err.status != 200) {
					msg = msg + "<br/>Error: " + err.statusText + "; " + $(err.responseText).text();
				}
				console.log(msg)
			}
			$("#status").text("")

			if (msg !== "") return msg
			return FILES
		}

		function filterlist(Start,Stop,TEMPLATE) {

			TEMPLATE = TEMPLATE.replace(/%/g,"$")
			if (TEMPLATE.indexOf("$Y-$m-$d") == -1 && TEMPLATE.indexOf("$Y$m$d") == -1) {
				return []			
			}

			if (typeof(Start) !== 'string') {
				return []
			}

			var startstop = expandISO8601Duration(Start + "/" + Stop)
			StartYear = parseInt(startstop.split("/")[0].substring(0,4))
			StopYear  = parseInt(startstop.split("/")[1].substring(0,4))

			FILTERS = new Array();

			for (var j=0;j<(StopYear-StartYear+1);j++) {
				var patt = new RegExp(TEMPLATE);
				year = ""+(j+StartYear);
				var PATTERN = TEMPLATE.replace(TEMPLATE,year);
				FILTERS[j] = {"Title":year,"Value":PATTERN};
			}
			return FILTERS;
		}
	}

	function resetdom() {
		console.log("resetdom(): Called.")

		// Make copy of catalogwrapper and place in thumb container.
		if ($("#thumb" + gallerynumber + " #catalogwrapper").length == 0) {
			$("#gallery" + gallerynumber + " #catalogwrapper").clone().insertAfter("#thumb" + gallerynumber + " #error")
		}

		// Toggle state set when call to cataloginfo() failed.
		// No - causes size of app to change when gallery changed.	
		//$("#thumb" + gallerynumber).parent().hide()
		//$("#gallery" + gallerynumber).parent().hide()

		$("#thumb" + gallerynumber + " .well").show()
		$("#gallery" + gallerynumber + " .well").show()

		$(wrapper + ' #workingfullframe').css('visibility','hidden')
		$(wrapper + " #gallerythumbframe").html('')

		if ($(wrapper + " #catalogopen:visible").length == 0) {
			$(wrapper + " #catalogclose").click()
		}

		// Keep full frame width and height what it was last.  When image is
		// loaded, proper dimensions will be set.
		if (1) {
		if ($(wrapper + " #fullframe").width() > 0)
			$(wrapper + " #fullframe").width($(wrapper + " #fullframe").width())
		if ($(wrapper + " #fullframe").height() > 0)
			$(wrapper + " #fullframe").height($(wrapper + " #fullframe").height())
		}

		$(wrapper + " #fullframe").html('')
		$(wrapper).attr('nowvisible', '').attr('lastvisible', '').attr('totalvisible', '').attr('totalingallery', '')
		$(wrapper + " #controls").html('&nbsp;')
		$(wrapper + " #dropdowns").html('')
		$(wrapper + " #attributes").html('&nbsp;')
		$(wrapper + " #filename").html('&nbsp;')
		$(wrapper + " #error").html('').hide()
		$(wrapper + " #warning").html('').hide()

		$(wrapper + " #connectionerror").html('')
		$(wrapper + " #catalog").html('')
		$(wrapper + " #thumbbrowseframe").html('')
	}

	function testdecode(component) {
		try {
			var tmp = decodeURIComponent(component)
			return ""
		} catch (err) {
			var msg = "Error when evaluating decodeURIComponent('" + component + "').";
			if (component.indexOf("%") != -1) {
				msg = msg + "<br/>Consider using $ instead of % in strftime and sprintf."
			}
			console.log(msg)
			return msg					
		}
	}

	function error(msg, clear) {
		$(wrapper).parent().show()
		$(wrapper + " .well").hide()
		$(wrapper + " #error").show()
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

	function warning(msg, clear, totime) {
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

		if (isFinite(totime)) {
			setTimeout(function () {$(wrapper + ' #warning').html('').hide();}, totime)
		}
	}

	function setheader() {

		console.log("setheader(): Setting header in " + wrapper 
			+ " based on gallery information for " + galleryid)

		// Select items to hide based on configuration.
		for (key in VIVIZ["config"]) {
			// Key name starts with "show"
			if (key.indexOf("show") == 0) {
				if (VIVIZ["galleries"][galleryid][key] == false) {
					console.log("Hiding " + wrapper + " #" + key.replace("show",""))
					$(wrapper + " #" + key.replace("show","").toLowerCase() + "wrapper").hide()
				}
			}
		}

		// If call to galleryinfo() failed, show gallery configuration and return.
		if (typeof(GALLERYINFO) === "string") {
			$(wrapper + ' #workingfullframe').css('visibility','hidden')
			$(wrapper+' #catalog')
				.html(JSON.stringify(
					VIVIZ["galleries"][galleryid]["json"], null, 4).replace(/\n/g,"<br/>"))
			$(wrapper + ' #catalogwrapper').show()
			return
		}
		
		// Set window title.
		if (GALLERYINFO["title"]) {
			$("head title").html(GALLERYINFO["title"])
		} else {
			$("head title").html(GALLERYINFO["id"])
		}

		// Set link and title for ? button.  Compute tlink for later use.
		if (GALLERYINFO["aboutlink"]) {
			var title = "Go to page with information about these images:\n" + GALLERYINFO["aboutlink"]
			var onclick = 'window.open("' + GALLERYINFO["aboutlink"] + '","_blank")'
			var tlink = "<span style='text-decoration:underline;cursor:pointer' title='"+title+"' onclick='"+onclick+"'>"
			if (GALLERYINFO["title"]) {
				tlink = tlink+GALLERYINFO["title"]+"</span>"
			} else {
				tlink = tlink+GALLERYINFO["id"]+"</span>"
			}
			$(wrapper + " #aboutbuttonwrapper").attr("onclick",onclick)
			$(wrapper + " #aboutbutton").attr("title",title)
			$(wrapper + " #aboutbuttonwrapper").show()
		} else {
			if (GALLERYINFO["title"]) {
				var tlink = GALLERYINFO["title"]
			} else {
				var tlink = GALLERYINFO["id"]
			}			
		}

		// Set about text.
		if (GALLERYINFO["about"]) {
			$(wrapper + " #abouttext").html(tlink + ": " + GALLERYINFO["about"])
		} else {
			if (GALLERYINFO["title"]) {
				$(wrapper + " #abouttext").html(tlink)
			} else {
				if (location.hash.indexOf("id=") == -1) {
					$(wrapper + " #abouttext").html("Gallery generated based on URL.")	
				} else {
					$(wrapper + " #abouttext").html(galleryid)	
				}
			}
		}

		// Gallery configuration area
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

	function updatehash(el, val) {

		var qs = $.parseQueryString()

		console.log('updatehash(): Called initial hash = ' + location.hash)
		if (!val) {
			var val = $(wrapper + " #" + el + " option:selected").val()
			console.log('updatehash(): Updating based on selected value of element ' + el + ' which is ' + val + '.');
			viviz.triggerhashchange = true
		} else {
			val = "" + val;
			console.log("updatehash(): Updating based on passed parameter for element '" 
							+ el + "' to " + val);
			viviz.triggerhashchange = false
		}

		if (val !== "") {
			if (el === 'regexp') {
				var def = VIVIZ["galleries"][galleryid]["defaultRegExp"]
			}
			if (el !== 'id') {
				console.log("updatehash(): Setting query string object element " + el + " to " + val);
				qs[el] = val
				if (def) {
					if (def === val) {
						console.log("updatehash(): Selected is equal to default " + el + ". Deleting from query object.")
						delete qs[el]	
					}
				} else {
					if ($($("#" + el + " option")[1]).val() === val) {
						console.log("updatehash(): No default " + el + " and select = second option.  Deleting from query object.")
						// If selected is not gallery id and is second option,
						// it is default.  Remove from hash.
						delete qs[el]
					}
				}
			}
			if (el === 'number') {
				if (VIVIZ["galleries"][galleryid]["defaultFirstImage"] === VIVIZ["config"]["defaultFirstImage"]) {
					if (parseInt(val) === VIVIZ["galleries"][galleryid]["defaultFirstImage"]) {
						delete qs[el]
					}
				}
			}

			var hash = ""
			if (el === 'id') {
				// Remove everything except for id and catalog
				if (qs["catalog"]) {
					hash = "catalog=" + qs["catalog"] + "&id=" + val
				} else {
					hash = "id=" + val
				}
			} else {
				for (var key in qs) {
					hash = hash + "&" + key + "=" + qs[key]
				}
				hash = hash.substr(1)
			}
			console.log('updatehash(): Setting location.hash = ' + hash)
			location.hash = hash
		}
	}

	function setdropdowns(all) {

		console.log("dropdowns(): Setting dropdowns in " + wrapper + ".")

		var CATALOGS           = new Object()
		CATALOGS["Title"]      = "Catalogs"
		CATALOGS["Titleshort"] = "-Catalogs-"
		CATALOGS["Class"]      = "updatelglobal"
		CATALOGS["Values"]     = new Array()

		var k = 0;
		for (var key in VIVIZ["config"]["catalogs"]) {
			CATALOGS["Values"][k] = new Object()
			CATALOGS["Values"][k]["Title"] = key
			CATALOGS["Values"][k]["Value"] = key
			k = k + 1;
		}

		// Catalogs drop-down
		dropdown("catalog", CATALOGS, wrapper + " #catalogdropdown")
		$(wrapper + ' #catalogdropdown #catalog').unbind('change')
		$(wrapper + ' #catalogdropdown #catalog').change(function () {
			var catalogid = $(wrapper + " #catalog option:selected").val()
			console.log('setdropdowns(): Catalog id changed to ' + catalogid)
			viviz.triggerhashchange = true
			location.hash = "catalog=" + catalogid;
		})

		// Galleries drop-down
		dropdown("id", GALLERIES, wrapper + " #dropdowns")
		// Gallery drop-down bindings
		$(wrapper + ' #dropdowns #id').unbind('change')
		$(wrapper + ' #dropdowns #id').change(function () {
			var galleryid = $(wrapper + " #id option:selected").val()
			console.log('setdropdowns(): Gallery id changed to id = ' + galleryid)
			$(wrapper + " #error").html("")
			if (galleryid !== "") {
				console.log('setdropdowns(): Gallery changed.')
				updatehash('id')
			}
		})

		if (all == false) {
			// galleryid not found or error when generating file list.
			// Select gallery definition in gallery list drop-down and exit.
			console.log("setdropdowns(): Only setting gallery dropdown because of error.")
			console.log("setdropdowns(): Selecting defintion in gallery dropdown.")
			$(wrapper + " #dropdowns #id #def").attr('selected','selected')
			$(wrapper + ' #dropdownswrapper').show()
			$(wrapper + ' #dropdownswrapper select').hide()
			$(wrapper + ' #dropdownswrapper #dropdowns #id').show()
			return
		}

		// Select default gallery.
		$(wrapper + " #id option[value='" + galleryid + "']").attr('selected','selected')

		// Attributes drop-down
		console.log('setting attributes drop-down.')

		dropdown("sortby", GALLERYINFO['attributes'], wrapper + " #dropdowns")
		$(wrapper + ' #dropdowns #sortby').unbind('change')
		$(wrapper + ' #dropdowns #sortby').change(function () {
			console.log('setdropdowns(): Sortby changed.')
			setregexps()
			updatehash('sortby')
		})

		// Order drop-down
		dropdown("order", GALLERYINFO['orders'], wrapper + " #dropdowns")
		$(wrapper + ' #dropdowns #order').unbind('change')
		$(wrapper + ' #dropdowns #order').change(function () {
			console.log('setdropdowns(): Order changed.')
			//viviz.triggerhashchange = false
			//resetdom()
			//gallery()
			updatehash('order')
		})

		setregexps()
		//setdownloads()

		function dropdown(ID, list, after){

			$(after + " #" + ID).remove()
			$(after).append(
				'<select id="' + ID + '" title="' + list.Title + '" class="' + (list.Class || "updatelocal") + '"></select>')
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
			var n                  = $(wrapper + " #dropdowns #sortby option:selected").index() || 1
			REGEXPS["Title"]       = "Attribute filters"
			REGEXPS["Titleshort"]  = "-Filters-"
			REGEXPS["Values"]      = new Array()

			n = n-1
			if (GALLERYINFO['attributes']["Values"][n]) {
				if (GALLERYINFO['attributes']["Values"][n]["Filters"]) {
					if (!(n == 0 && GALLERYINFO['attributes']["Values"][n]["Filters"].length == 1)) {
						for (i = 0; i < GALLERYINFO['attributes']["Values"][n]["Filters"].length; i++) {
							REGEXPS["Values"][i]          = new Object()
							REGEXPS["Values"][i]["Title"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Title"]
							REGEXPS["Values"][i]["Value"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Value"]
						}
						console.log("setdropdowns.setregexps(): Setting regexp filter dropdown.")
						dropdown("regexp", REGEXPS, wrapper + " #dropdowns")
					}
				} else {
					console.log("setdropdowns.setregexps(): No regexp filters.  Not displaying drop-down.")
					$(wrapper + " #regexp").remove()
				}
			}

			var qs = $.parseQueryString();
 			if (VIVIZ["galleries"][galleryid]["defaultRegExp"] && !qs["regexp"]) {
				console.log("setdropdowns(): Setting regexp filter value based on gallery configuration.")
 				$(wrapper + " #regexp").val(VIVIZ["galleries"][galleryid]["defaultRegExp"])
			}

			$(wrapper + ' #dropdowns #regexp').unbind('change')
			$(wrapper + ' #dropdowns #regexp').change(function () {
				//alert('here')
				//viviz.triggerhashchange = false;
				updatehash('regexp')
			})
		}
	}

	function setWH(el, type) {

		console.log("setWH(): Computing width and height of " 
			+ type + " images based on image size and options.")

		var ar = el.naturalWidth/el.naturalHeight

		// Compute pixels if given fractions.
		if (VIVIZ["galleries"][galleryid][type+"Width"]) {
			if (VIVIZ["galleries"][galleryid][type+"Width"] <= 1.0) {
				console.log('setWH(): Converting ' + type + 'Width to pixels.')
				VIVIZ["galleries"][galleryid][type+"Width"] = 
					el.naturalWidth*VIVIZ["galleries"][galleryid][type+"Width"]
			}
		}
		if (VIVIZ["galleries"][galleryid][type+"Height"]) {
			if (VIVIZ["galleries"][galleryid][type+"Height"] <= 1.0) {
				console.log('setWH(): Converting ' + type + 'Height to pixels.')
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
			console.log('setWH(): ' + type + 'Height unknown.  Using naturalHeight.')
			VIVIZ["galleries"][galleryid][type+"Height"] = el.naturalHeight
		}
		if (!VIVIZ["galleries"][galleryid][type+"Width"]) {
			console.log('setWH(): ' + type + 'Width unknown.  Using naturalWidth.')
			VIVIZ["galleries"][galleryid][type+"Width"] = el.naturalWidth
		}

		VIVIZ["galleries"][galleryid][type+"NaturalHeight"] = el.naturalHeight
		VIVIZ["galleries"][galleryid][type+"NaturalWidth"] = el.naturalWidth

		return true
	}

	function thumblist() {

		console.log("thumblist(): Called.")

		var galleryid = $(wrapper + " #id").val()
		var SORTBY    = $(wrapper + " #sortby").val()
		var ORDER     = $(wrapper + " #order").val()
		var regexp    = $(wrapper + " #regexp :selected").attr('value')

		var SORTBYS  = GALLERYINFO['attributes']
		var ORDERS   = GALLERYINFO['orders']

		//http://stackoverflow.com/a/2450976
		function shuffle(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
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

		// Test decoding of of first file only.
		var msg = testdecode(GALLERYINFO["fullfiles"][0][0])
		if (msg !== "") {error(msg, true); return;}
		var msg = testdecode(GALLERYINFO["thumbfiles"][0][0])
		if (msg !== "") {error(msg, true); return;}

		var INFOjs = new Array();
		for (j = 0; j < GALLERYINFO["fullfiles"].length; j++) {
			INFOjs[j] = new Object();
			INFOjs[j]["FullFile"]  = decodeURIComponent(GALLERYINFO["fullfiles"][j][0]);
			INFOjs[j]["ThumbFile"] = decodeURIComponent(GALLERYINFO["thumbfiles"][j][0]);

			// This is a confusing way to do things.
			if (Object.keys(SORTBYS).length > 0) {
				for (z = 0;z < SORTBYS["Values"].length;z++) {
					INFOjs[j][SORTBYS["Values"][z]["Value"]] = GALLERYINFO["fullfiles"][j][z];
				}
			}
			INFOjs[j]["ImageNumber"] = j;
		}

		state = galleryid+SORTBY+ORDER+regexp;
		if (typeof(thumblist.cache) != 'object') {
			thumblist.cache = new Object();
		}
		if ( thumblist.cache[state] ) {
			console.log('thumblist(): Using cached thumblist.');
			return thumblist.cache[state];
		} 			

		I = new Array();
		if (regexp) {
			var REGEXP = new RegExp(regexp);
			console.log(regexp)
			if (typeof(INFOjs[0][SORTBY]) == "string") {
				var k = 0;
				for (var i = 0; i < INFOjs.length; i++) {
					if (INFOjs[i][SORTBY].match(REGEXP)) {
						I[i] = k;
						k = k+1;
					}
				}
				console.log("thumblist(): Regexp " + REGEXP + " removed " + (INFOjs.length-k) + "/" + INFOjs.length + " images in subset.");
			} else {
				regexp = regexp.replace('gt','>').replace('ge','<=').replace('lt','<').replace('le','<=');
				regexp = regexp.replace('and','&').replace('&amp;','&');
				regexp = regexp.replace('&lt;','<');
				regexp = regexp.replace('&gt;','>');
				var k = 0;
				for (var i = 0; i < INFOjs.length; i++) {
					var test = regexp.replace(/this/g, INFOjs[i][SORTBY]);
					if (eval(test)) {
						I[i] = k;
						k = k+1;
					}
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
			var INFOrs = clone(INFOjs)
		}

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
		}

		if (ORDER.match("descending")){
			//console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in descending order.")
			if (typeof(INFOrs[0][SORTBY]) == "string") {
				//console.log('thumblist.js: Sorting attribute ' + SORTBY + " as string.")
				INFOrs.sort(function(a,b) {
					return b[SORTBY].localeCompare(a[SORTBY])
				});
			} else {
				//console.log('thumblist.js: Sorting attribute ' + SORTBY + " as number.")
				INFOrs.sort(function(a,b){
					return b[SORTBY] - a[SORTBY]
				})
			}
			//console.log('thumblist.js: First image is now ' + INFOrs[0])
		}
		if (ORDER.match("random")) {
			//console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in random order.")
			INFOrs = shuffle(INFOrs);
		}

		if ((!ORDER.match("random")) & (typeof(thumblist.cache[state]) != 'object')) {
			thumblist.cache[state] = new Object();
			thumblist.cache[state] = INFOrs;
		}

		var qs = $.parseQueryString();
		if (parseInt(qs["number"]) > INFOrs.length) {
			warning("Number of images in subset < number in query string.  Resetting number to 1.", true, Infinity);
			VIVIZ["galleries"][galleryid]["defaultFirstImage"] = 1;
			updatehash("number",1)
		}
		return INFOrs
	}

	function gallery() {

		$("#thumb" + gallerynumber).parent().hide()
		$("#gallery" + gallerynumber).parent().show()

		setthumbs()

		// Actions to take when a thumbnail is clicked.
		function setthumbbindings() {

			console.log("gallery.setthumbbindings(): Called.")

			var nowvisible = parseInt($(wrapper).attr('nowvisible'));
			var lastvisible = parseInt($(wrapper).attr('lastvisible'));

			if (isNaN(nowvisible)) {
				console.log("gallery.setthumbbindings(): nowvisible is NaN. Setting nowvisible attribute on " + wrapper + " to 1.");
				nowvisible = 1;
				$(wrapper).attr('nowvisible', '1');
			} else {
				nowvisible = $(this).attr('id');
				console.log("gallery.setthumbbindings(): Setting nowvisible attribute on " + wrapper + " to " + nowvisible + ".");
				$(wrapper).attr('nowvisible', nowvisible);
			}
			if (isNaN(lastvisible)) {
				console.log("gallery.setthumbbindings(): lastvisible is NaN. Setting nowvisible attribute on " + wrapper + " to 1.");
				lastvisible = 1;
				$(wrapper).attr('lastvisible', '1');
			}

			console.log("gallery.setthumbbindings():"
				+ " Setting class on thumb #" + lastvisible + " to inactive.");
			$(wrapper + " #gallerythumbframe #" + lastvisible)
					.removeClass('active').addClass('inactive');

			console.log("gallery.setthumbbindings():"
				+ " Setting class on thumb #" + nowvisible + " to active.");
			$(wrapper + " #gallerythumbframe #" + nowvisible)
					.removeClass('inactive').addClass('active');
			
			console.log("gallery.setthumbbindings(): Setting stat string.");
			INFOjs = thumblist(); 
			var statstr = "| #" + (nowvisible) 
								+ "/" + (INFOjs.length) + " for filter";
			statstr = statstr + " | #" 
							  + (1+INFOjs[nowvisible-1].ImageNumber)
							  + "/" + $(wrapper).attr('totalingallery')
							  + " in gallery | ";
			
			for (var z = 1;z < GALLERYINFO['attributes']["Values"].length;z++) {
				statstr = statstr 
							+ GALLERYINFO['attributes']["Values"][z].Title 
							+ " = ";

				var key = GALLERYINFO['attributes']["Values"][z].Value
				if (GALLERYINFO['attributes']["Values"][z].Format) {
					statstr = statstr + sprintf(GALLERYINFO['attributes']["Values"][z].Format, parseFloat(INFOjs[nowvisible-1][GALLERYINFO['attributes']["Values"][z].Value]));
				} else {
					statstr = statstr + INFOjs[nowvisible-1][key];
				}
				if (GALLERYINFO['attributes']["Values"][z].Unit) {
					statstr = statstr 
								+ " [" 
								+ GALLERYINFO['attributes']["Values"][z].Unit 
								+ "] " 
								+  " | ";
				} else {
					statstr = statstr + " | ";
				}
			}
			$(wrapper + ' #attributes').html(statstr);

			var qs = $.parseQueryString()
			console.log("gallery.sethumbbindings(): Calling updatehash('number',"+ nowvisible + ").")
			updatehash('number', nowvisible);

			//$(wrapper + " #fullframe img[id=" + lastvisible + "]").css("opacity","0.4");
			console.log("gallery.sethumbbindings(): Hiding full image #" + lastvisible + ".");
			$(wrapper + " #fullframe img[id=" + lastvisible + "]").hide();

			// Load full image.
			console.log("gallery.sethumbbindings(): Calling loadfull.");
			loadfull($(this).attr('id')); 

			// Update lastvisible attribute on wrapper.
			console.log("gallery.sethumbbindings(): Setting lastvisible attribute on " + wrapper + " to " + nowvisible + ".");
			$(wrapper).attr("lastvisible", nowvisible);

			// Scroll thumbnail list
			console.log("gallery.sethumbbindings(): Scrolling #gallerythumbframe to #" + nowvisible + ".");
			$(wrapper + " #gallerythumbframe").scrollTo(this, 0, {
			   duration: 0, offset: 0
			});
		}

		function setthumbs() {

			console.log('gallery.setthumbs(): Called.');
			
			var INFOjs = thumblist()

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
		
			firstimage(VIVIZ["galleries"][galleryid]["defaultFirstImage"]);

			// TODO: (?) Detect bad images:
			// https://github.com/desandro/imagesloaded
			// http://stackoverflow.com/questions/821516/browser-independent-way-to-detect-when-image-has-been-loaded
			// http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached

			// Find first valid thumbnail
			function firstimage(f) {

				console.log("gallery.firstimage(): Called."
								+ " Setting thumb #" + (f) + " into DOM.");

				if (f == VIVIZ["galleries"][galleryid]["defaultFirstImage"]) {
					setcontrolbindings();
				}

				$('<img class="gallerythumbbrowse firstimage"/>')
					.appendTo($(wrapper + ' #gallerythumbframe'))
					.attr("id",f)
					.attr("src", VIVIZ["galleries"][galleryid]["thumbdirdecoded"] 
									+ INFOjs[f-1].ThumbFile)
					.error(function () {
						// First image is bad.
						console.log("gallery.firstimage.error(): Error event when setting thumb image " + (f) + " is bad.");
						$(this).addClass("error")
						warning("Thumbnail image " + (f) + " could not be loaded.", true, 1000);

						// This triggers .load
						$(this).attr("src","css/transparent.png");

						// Need to do this here and in .load in case error
						// event is triggered after .load event of first non-
						// error image.
						console.log("gallery.firstimage.error(): Setting dimensions on image to " + VIVIZ["galleries"][galleryid]["thumbWidth"] + "x" + VIVIZ["galleries"][galleryid]["thumbHeight"] + ".");
						$(this).css("height", VIVIZ["galleries"][galleryid]["thumbHeight"]);
						$(this).css("width", VIVIZ["galleries"][galleryid]["thumbWidth"]);

						//$(this).remove();
						if (f == INFOjs.length) {
							warning("No images could be loaded.", true, Infinity)
							console.log("No images could be loaded.")
							$(wrapper + " #workingfullframe").css('visibility','hidden')
							return
						}
						firstimage(f+1)
					})
					.load(function () {
						
						if ($(this).hasClass('error')) return;
						//if (f > VIVIZ["config"]["defaultFirstImage"]) {
							if (f == VIVIZ["galleries"][galleryid]["defaultFirstImage"]+1) {
								if (VIVIZ["galleries"][galleryid]["defaultFirstImage"] > 1) {
									warning("The selected thumbnail image in this subset could not be loaded.", true, 10000)
								} else {
									warning("The first thumbnail image in this subset could not be loaded.", true, 10000)
								}
							} else {
								//warning("The first " + (VIVIZ["config"]["defaultFirstImage"]-f+1) + " images" + " in this subset could not be loaded.",true)
							}
						//}
						
						// Trigger load of the first full image.
						$(wrapper).attr('nowvisible', f)
						console.log("gallery.firstimage.load(): First successful thumbnail image load.")
						console.log("gallery.firstimage.load(): Applying click bindings and then clicking it to trigger load of full image.")
						$(this).bind('click', setthumbbindings).click()

						// Scroll to top.
						$(wrapper + " #gallerythumbframe").scrollTo(0);

						console.log('gallery.firstimage.load(): First thumbnail has natural dimensions = '
							+this.naturalWidth+'x'+this.naturalHeight+'.');

						// Set height of thumbnail image - setWH()
						// Modifies VIVIZ["galleries"][galleryid]
						var tmp = setWH(this, 'thumb');
						$(this).css("height",VIVIZ["galleries"][galleryid]["thumbHeight"]);
						$(this).css("width",VIVIZ["galleries"][galleryid]["thumbWidth"]);

						//setTimeout(function () {
							var l = $(wrapper + ' #gallerythumbframe img.error').length;
							console.log("gallery.firstimage.load(): Setting dimensions on " + (l) + " images with class error to " + VIVIZ["galleries"][galleryid]["thumbWidth"] + "x" + VIVIZ["galleries"][galleryid]["thumbHeight"] + ".");
							$(wrapper + ' #gallerythumbframe img.error').css("height",VIVIZ["galleries"][galleryid]["thumbHeight"]);
							$(wrapper + ' #gallerythumbframe img.error').css("width",VIVIZ["galleries"][galleryid]["thumbWidth"]);
						//}, 0);

						if (VIVIZ["galleries"][galleryid]["defaultFirstImage"] > 1) {
							console.log("gallery.firstimage.load(): First image to show > 1.  Inserting spacers before first image.");

							for (var i = 1; i < VIVIZ["galleries"][galleryid]["defaultFirstImage"]; i++) {
								$('<img class="spacer"/>')
									.prependTo($(wrapper + ' #gallerythumbframe'))
									.attr("src", "css/transparent.png")
									.css("height",VIVIZ["galleries"][galleryid]["thumbHeight"])
									.css("width",VIVIZ["galleries"][galleryid]["thumbWidth"])
							}
						}

						console.log('gallery.firstimage.load(): First thumbnail set to '
								+ 'have dimensions = '
								+ VIVIZ["galleries"][galleryid]["thumbWidth"]
								+ 'x'
								+ VIVIZ["galleries"][galleryid]["thumbHeight"]
								+ '.');

						$(wrapper + ' #gallerythumbframe').attr('data-thumb-length', INFOjs.length);

						// Set attribute that indicates which thumbnail is active.
						$(wrapper + ' #gallerythumbframe').attr('data-thumb-displayed', f);
						
						setscrollbinding();

						// Lazy Load images.
						var maxLength = INFOjs.length;
						var max = VIVIZ["galleries"][galleryid]["lazyLoadMax"]
								 || VIVIZ["config"]["lazyLoadMax"]
						if (INFOjs.length > max) {
							maxLength = max;
						}
						if (maxLength + f > INFOjs.length) {
							maxLength = INFOjs.length-f;
						}

						loadmore("both");
					})   
			}
		}

		function settabledims(el,callback) {

			console.log("gallery.settabledims(): Called.")

			// http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
			$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};

			if (el) {
				// Don't get border-width by querying DOM for first thumbnail, because it may not be in 
				// DOM already.  Instead, get it from function parameter.
				var bw = 2*parseFloat($(el).css('border-width').replace("px",''));
				if (isNaN(bw)) {
					bw = $(wrapper + ' #gallerythumbframe img:first')
							.outerWidth() - VIVIZ["galleries"][galleryid]["thumbWidth"];
				}
				if  (isNaN(bw)) {
					bw = 2;
				}
				var w = VIVIZ["galleries"][galleryid]["thumbWidth"] 
							+ $.scrollbarWidth() + bw + 8; // Why 8?
				console.log("gallery.settabledims(): Setting #gallerythumbframe "
					+ "width to = " + w + ".");
				$(wrapper + ' #gallerythumbframe').width(w);
			}

			console.log("gallery.settabledims(): Full img natural dimensions = " 
				+ VIVIZ["galleries"][galleryid]["fullNaturalWidth"] 
				+ "x" 
				+ VIVIZ["galleries"][galleryid]["fullNaturalHeight"])
			console.log("gallery.settabledims(): Full img scaled dimensions  = " 
				+ VIVIZ["galleries"][galleryid]["fullWidth"] 
				+ "x" 
				+ VIVIZ["galleries"][galleryid]["fullHeight"])
			
			// Set heights of thumbframe and fullframe. When first image is loaded, fullNaturalHeight is set.
			if (VIVIZ["galleries"][galleryid]["fullHeight"] > 0) {
				
				// Aspect ratio;
				var ar = VIVIZ["galleries"][galleryid]["fullWidth"]/VIVIZ["galleries"][galleryid]["fullHeight"];
				console.log("gallery.settabledims(): Full image aspect ratio = " + ar + ".");

				// Force outer frame to stay the same size after image is
				// removed and before new image is inserted.
				//$(wrapper + " #fullframe").width($(wrapper + " #fullframe").width())
				
				// Set height of thumb strip to be full height of image.
				$(wrapper + ' #gallerythumbframe')
					.height(VIVIZ["galleries"][galleryid]["fullHeight"]);

				// For iframe?
				//enclosure = $(wrapper).parents().filter('body')[0];
				enclosure = "body";

				console.log("gallery.settabledims(): Window dimensions: " 
					+ $(window).width() + "x" + $(window).height())
				console.log("gallery.settabledims(): Client dimensions: " 
					+ document.documentElement.clientWidth 
					+ "x"
					+ document.documentElement.clientHeight + ".");
				console.log("gallery.settabledims(): Document dimensions: "
					+  $(document).width() + "x" + $(document).height())
				console.log("gallery.settabledims(): Body element dimensions: " 
					+ $(enclosure).width() + "x" + $(enclosure).height() + ".")

				// Amount height needs to shrink so that no scrollbar appears.
				dh = $(enclosure).height() - $(window).height();

				if (dh > 0) {
					console.log("gallery.settabledims(): Amount full image "
						+ "height needs to decrease so that no scrollbar appears: dh = "+dh);
					console.log("gallery.settabledims(): Reducing height "
						+ "and width of #fullframe img.")
					var newh = VIVIZ["galleries"][galleryid]["fullHeight"]-dh
					$(wrapper + ' #fullframe img').height(newh)
					$(wrapper + ' #fullframe img').width(newh*ar)
					console.log("gallery.settabledims(): Shrinking height "
						+ "of #gallerythumbframe to "+(VIVIZ["galleries"][galleryid]["fullHeight"]-dh + "."));
					$(wrapper + ' #gallerythumbframe').height(newh);
					VIVIZ["galleries"][galleryid]['fullHeight'] = newh;
					VIVIZ["galleries"][galleryid]['fullWidth']  = newh*ar
				} else {
					console.log("gallery.settabledims(): Full image does not "
						+ " need to be reduced in height to prevent vertical scrollbar.")
					console.log("gallery.settabledims(): Setting " 
						+ "#gallerythumbframe height to be height of full "
						+ "image = " + VIVIZ["galleries"][galleryid]["fullHeight"] + ".");
					$(wrapper + " #gallerythumbframe")
						.height(VIVIZ["galleries"][galleryid]["fullHeight"]);
				}

				console.log("gallery.settabledims(): Window dimensions: " 
					+ $(window).width() + "x" + $(window).height())
				console.log("gallery.settabledims(): Client dimensions: " 
					+ document.documentElement.clientWidth 
					+ "x" 
					+ document.documentElement.clientHeight)
				console.log("gallery.settabledims(): Document dimensions: "
					+  $(document).width() + "x" + $(document).height())
				console.log("gallery.settabledims(): Enclosing Body dimensions: " 
					+ $(enclosure).width() + "x" + $(enclosure).height())

				dw = $(document).width()-$(enclosure).width();

				if (dw > 0) {
					console.log("gallery.settabledims(): Document width is larger than body element width by dw = " + dw + ".");
					if (dh > 0) {
						newh = VIVIZ["galleries"][galleryid]["fullNaturalHeight"] - dh - dw/ar;
					} else {
						newh = VIVIZ["galleries"][galleryid]["fullNaturalHeight"]- dw/ar;
					}
					newh = newh - 1;
					console.log("gallery.settabledims(): Shrinking height of #fullframe img and #gallerythumbframe because dw > 0.  New height: " + newh + ".");
					$(wrapper + ' #fullframe img').height(newh)
					$(wrapper + ' #gallerythumbframe').height(newh);
					$(wrapper + ' #fullframe img').width(newh*ar)
					VIVIZ["galleries"][galleryid]['fullHeight'] = newh;
					VIVIZ["galleries"][galleryid]['fullWidth'] = newh*ar;
				} 


				dh = $(enclosure).height() - $(window).height() - parseInt($(wrapper).css('margin-top'))
				if (dh < 0) {
					console.log("gallery.settabledims(): Setting top margin to "
									+ (-dh/2) + ".");
					$(wrapper).css('margin-top', -dh/2);
				}	
			} else {
				console.log("gallery.settabledims(): Full image height unknown "
					+ " but thumb height known.");
				var a = 4*VIVIZ["galleries"][galleryid]["thumbHeight"];
				console.log("gallery.settabledims(): Setting thumb frame height "
					+ " to be 4*(first thumb outer height) = " + a + ".");
				console.log("gallery.settabledims(): First thumbnail height = " 
					+ $('#gallerythumbframe img').eq(0).height());
				$(wrapper + ' #gallerythumbframe').height("" + a);
			}

			if (VIVIZ["galleries"][galleryid]["play"] || VIVIZ["play"]) {
				$(wrapper + " #play").click()
			}

			if (callback) {
				callback();
			}
		}

		function loadfull(id) {

			id = parseInt(id);
			console.log("gallery.loadfull(): Called with image object with id = "
							 + id + ".");

			if (id > INFOjs.length) {return}
			
			if ($(wrapper + " #fullframe img[id="+id+"]").length == 1) {
				console.log("gallery.loadfull(): "
							+ "Found hidden full image in DOM.  Showing.");
				$(wrapper + " #fullframe img[id=" + id + "]").show();
				prepnext(id)
				setfilename(id)
				return;
			}

			// Show loading indicator
			console.log("gallery.loadfull(): Showing loading indicator.")
			$(wrapper + ' #workingfullframe').css('visibility','visible');

			// Place empty image element in DOM.
			console.log("gallery.loadfull(): Placing empty img element with id = "
						+ id + " in DOM.");
			$(wrapper + " #fullframe").prepend('<img id="' +id +'" class="full"/>');

			console.log("gallery.loadfull(): Setting attributes and binding"
							+ " load event on # " + id + ".");			
			$(wrapper + " #fullframe img[id="+id+"]")
					.unbind('load')
					.error(function () {
						$(wrapper + ' #workingfullframe').css('visibility','hidden');
						console.log("-- gallery.loadfull(): Error "
							+ "loading full image #" + id + ".");
						$(this).attr("src","css/transparent.png")
						$(this).addClass("class","error")
						warning("The full image for this thumbnail could "
							+ "not be loaded.", true)
						// Above set will trigger load event so following not needed.
						//$(this).trigger('load')
					})
					.css("height", VIVIZ["galleries"][galleryid]["fullHeight"] || 400)
					.css('width', VIVIZ["galleries"][galleryid]['fullWidth'] || 400)
					.attr('src', VIVIZ["galleries"][galleryid]["fulldirdecoded"] 
								+ INFOjs[parseInt(id)-1]["FullFile"])
					.load(function() {

						console.log("gallery.loadfull(): Load event for full image #" + id + ".");
						
						// Hide loading indicator
						console.log("gallery.loadfull(): Hiding loading indicator.");
						$(wrapper + ' #workingfullframe').css('visibility', 'hidden');

						// Undo width and height set when dom is reset.
						if ($(wrapper + " #fullframe").width() > 0)
							$(wrapper + " #fullframe").width('')
						if ($(wrapper + " #fullframe").height() > 0)
							$(wrapper + " #fullframe").height('')

						if ($("#"+id).hasClass('firstimage')) {

							console.log("gallery.loadfull(): "
								+ "First full image load event. Full image has dimensions "
								+ this.naturalWidth 
								+ "x" 
								+ this.naturalHeight
								+ ".  Setting table dimensions.");

							$(wrapper + " #fullframe").height('');

							var tmp = setWH(this, 'full');

							// Set height of full image.
							console.log("gallery.loadfull(): "
									+ "Setting full image height on #" + id + ".");
							$(this).css("height",
									VIVIZ["galleries"][galleryid]["fullHeight"]);
							$(this).css('width',
									VIVIZ["galleries"][galleryid]['fullWidth'])

							// After this function sets VIVIZ[galleryid] dimensions, 
							// then call prepnext(), which uses these dimensions.
							console.log("gallery.loadfull(): Calling "
								+ "settabledims() with callback prepnext(" + id + ").");
							settabledims(this, function () {prepnext(id)})
						} else {
							prepnext(id)
						}

						console.log("gallery.loadfull(): Calling setfilename(" + id + ").");
						setfilename(id)

					})

			function prepnext(id) {

				// If next few images not in DOM, load them.
				
				console.log("gallery.loadfull.prepnext(): Called with id = " + id + ".")

				var idn = parseInt(id) + 1
				
				if (idn > INFOjs.length) {return}

				var ido = idn
				// Always have next 3 images set in DOM.
				// TODO: If play button hit, start loading more.
				while (idn < ido + 3) {
					if (idn > INFOjs.length) {break}					
					if ($(wrapper + " #fullframe img[id="+idn+"]").length == 0) {
						console.log("gallery.loadfull.prepnext(): Setting full image with id = " + idn + ".");
						$(wrapper + " #fullframe").prepend('<img id="'+idn+'" class="full" style="display:none"/>');
						$(wrapper + " #fullframe img[id="+idn+"]")
							.css('height',VIVIZ["galleries"][galleryid]['fullHeight'])
							.css('width',VIVIZ["galleries"][galleryid]['fullWidth'])
							.attr('src',VIVIZ["galleries"][galleryid]["fulldirdecoded"] + INFOjs[idn-1]["FullFile"])
							.error(function () {
								$(this).attr("src", "css/transparent.png")
								$(this).attr("class","error")
								$(this).height(VIVIZ["galleries"][galleryid]["fullHeight"]);
								$(this).width(VIVIZ["galleries"][galleryid]["fullWidth"]);
							})
							.load(function () {
								console.log("gallery.loadfull.prepnext(): Full image #" + $(this).attr('id') + " load event.")
								if ($(wrapper + " #fullframe img[id="+(parseInt($(this).attr('id'))-1)+"]").hasClass("error")) {
									console.log("gallery.loadfull.prepnext(): Previous full image did not load.  Setting full image dimensions and setting table dimensions.")
									var tmp = setWH(this, 'full');

									// Set height of full image.
									console.log("gallery.loadfull.prepnext(): Setting full image height on #" + id + ".");
									$(this).css("height",VIVIZ["galleries"][galleryid]["fullHeight"]);
									$(this).css('width',VIVIZ["galleries"][galleryid]['fullWidth'])

									// After this function sets VIVIZ[galleryid] dimensions, 
									// then call prepnext(), which uses these dimensions.
									console.log("gallery.loadfull(): Calling settabledims() with callback prepnext(" + id + ").");
									settabledims(this, function () {
										console.log("gallery.loadfull(): Calling setfilename(" + id + ").");
										setfilename(id)
									});

								}
							})
					}
					idn = idn+1
				}
			}

			function setfilename(id) {
				console.log("gallery.loadfull.setfilename(): Called.");
				$(wrapper + " #filename").html('');
				var wo = $(wrapper).width()

				$(wrapper + " #filename").append("<a>");
				var href = VIVIZ["galleries"][galleryid]["fulldirdecoded"] 
							+ INFOjs[parseInt(id-1)]["FullFile"];
				var fname = INFOjs[parseInt(id-1)]["FullFile"];
				if (fname.match("&")) {
					// URL is not a file but a URL with query parameters.
					fname = href;
				}
				
				$(wrapper + " #filename a")
					.attr('href', href)
					.css("white-space", "nowrap")
					.html(fname);

				var wx = $(wrapper + " #filename").width();

				while (wx > wo) {

					console.log("gallery.loadfull.setfilename(): "
									+ wrapper + " width "+wo)
					console.log("gallery.loadfull.setfilename(): "
									+ "#filename div width "+wx)

					// Fraction to remove. 0.9 is to account for nonuniformity
					// of charcter width.
					r = 0.9*wo/wx
					console.log("gallery.loadfull.setfilename(): " 
								+ "Reduction factor: 0.9*" + wo + "/" + wx)
					l = fname.length
					nr = l-r*l
					console.log("gallery.loadfull.setfilename(): "
								+ "Number of characters to remove: " + nr)
					c = l/2
					console.log("gallery.loadfull.setfilename(): Center value: " + c)
					console.log("gallery.loadfull.setfilename(): "
							+ "Number of characters to keep: " + nr)
					fnamer = fname.substr(0,Math.floor(c-nr/2)) 
								+ " ... " 
								+ fname.substr(Math.ceil(c+nr/2),l)
					$(wrapper + " #filename a").text(fnamer);
					wx = $(wrapper + " #filename").width();
				}
			}
		}

		function loadmore(direction, Nshown, scrollEvent) {

			var Navail = parseInt($(wrapper + ' #gallerythumbframe').attr('data-thumb-length'));
			Nshown = Nshown || parseInt($(wrapper + " #gallerythumbframe > img.active").attr("id"));

			var Nlazy = VIVIZ["galleries"][galleryid]["lazyLoadMax"]
						|| VIVIZ["config"]["lazyLoadMax"]
			
			var firstidx = parseInt(VIVIZ["galleries"][galleryid]["defaultFirstImage"])-1;
			Nbefore = 0;
			if (firstidx > 0) {
				Nbefore = Nlazy;
			}

			// Number of blocks of Nlazy images to fill document height.
			var d = Math.max(Nlazy, Nshown)*VIVIZ["galleries"][galleryid]["thumbHeight"];
			var Nfill = $(window).height()/(d)

			// If Nfill > 1, we need to load more images initially
			// to trigger appearance of scroll bar.
			if (Nfill > 1) {
				Nlazy = Math.ceil(Nfill*Nlazy)
			}

			var tic = new Date().getTime()
			var slowwarn = false
			var imgstr = '<img class="gallerythumbbrowse lazyload"/>';

			if (direction === "both" || direction === "forward") {
				for (var j = Nshown + 1; j < Nshown + Nlazy; j++) {
					if ($("#gallerythumbframe img[id='" + (j) + "']").length > 0) {
						console.log("gallery.loadmore(): Found thumb with id = " 
										+ (j) + " in DOM.  Not appending.");
						continue;
					}
					if (j == INFOjs.length + 1) break;
					var last = $("#gallerythumbframe img").last();
					var bottom = parseInt(last.attr('id'));
					console.log("gallery.loadmore(): Bottom image is #" 
									+ bottom 
									+ ". Inserting thumb #" 
									+ bottom 
									+ " after #" + (j) + ".");
					var el = $(imgstr)
								.css("height",
									$("#gallerythumbframe > img.active").height())
								.css("width",
									$("#gallerythumbframe > img.active").width())
								.css("background-image", "url(css/ajax-loader-slow.gif")
								.css("background-repeat", "no-repeat")
								.css("background-size","100%")
								.css("background-position","center")
								.insertAfter(last);
					setel(el,j);
				}
			}

			if (direction === "both" || direction === "backward") {
				for (var j = Nshown-1; j > Nshown-Nlazy-2; j--) {
					if (j < 1) continue;
					if ($("#gallerythumbframe img[id='" + (j) + "']").length > 0) {
						console.log("gallery.loadmore(): Found thumb with id = " 
										+ (j) + " in DOM.  Not prepending.");
						continue;
					}
					var first = $("#gallerythumbframe img").not(".spacer").first();
					var top = parseInt(first.attr('id'));
					console.log("gallery.loadmore(): Top non-spacer image is #" + top 
						+ ". Inserting thumb #" + (j) + " before #" + top + ".");
					var lastspacer = $("#gallerythumbframe .spacer").last();
					//var el = $(imgstr)
					var el = $(lastspacer)
								.removeClass("spacer")
								.css("height",
									$("#gallerythumbframe > img.active").height())
								.css("width",
									$("#gallerythumbframe > img.active").width())
								.css("background-image", "url(css/ajax-loader-slow.gif")
								.css("background-repeat", "no-repeat")
								.css("background-size","100%")
								.css("background-position","center")
					setel(el,j);
				}
			}

			function setel(el,j) {
				$(el)
					.attr("id",j)
					.addClass("gallerythumbbrowse")
					.addClass("lazyload")
					.attr("src", VIVIZ["galleries"][galleryid]["thumbdirdecoded"] 
									+ INFOjs[j-1].ThumbFile)
					.bind('click',setthumbbindings)
					.attr("title",imgtitle(INFOjs[j-1]))
					.error(function () {
						$(this).addClass("error")
						$(this).attr("src","css/transparent.png")
						$(this).css("background-image", "")
					})
					.load(function () {
						var active = $(wrapper + " #gallerythumbframe img.active");
						$(this).css("background-image", "")
						if (!scrollEvent) {
							$(wrapper + " #gallerythumbframe")
								.scrollTo(active, 0, {
									duration: 80, offset: 0
								});
						}
						if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
							slowwarn = true;
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

				var lastvisible = parseInt($(wrapper).attr('lastvisible'));
				if (lastvisible == parseInt($(wrapper).attr('totalvisible'))) {				
					var nowvisible = parseInt($(wrapper + " #gallerythumbframe img.firstimage").attr('id'));
				} else {
					var nowvisible = lastvisible + 1;        	
				}
				console.log("gallery.setcontrolbindings: Next button clicked."
								+ " Clicking on  #" + nowvisible + ".")
				$(wrapper + " #gallerythumbframe #" + nowvisible).click();

				var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
				var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
				var max = VIVIZ["galleries"][galleryid]["lazyLoadMax"] || VIVIZ["lazyLoadMax"]

				var f = Math.ceil(nowvisible/max) - nowvisible/max
				if (f < 0.5) loadmore("forward");
			});
			
			$(wrapper + " #previous").unbind('click');
			$(wrapper + ' #previous').click(function(){

				var lastvisible = parseInt($(wrapper).attr('lastvisible'));
				if (lastvisible == 1) {
					var nowvisible = parseInt($(wrapper).attr('totalvisible'));
				} else {
					var nowvisible = lastvisible - 1;
				}
				$(wrapper + " #" + nowvisible).click();
				
				var max = VIVIZ["galleries"][galleryid]["lazyLoadMax"] || VIVIZ["lazyLoadMax"]
				var first = parseInt($(wrapper + " #gallerythumbframe > img").first().attr("id"));
				if (nowvisible-first < max) {
					loadmore("backward");
				}
			})
			
			$(wrapper + " #last").unbind('click');
			$(wrapper + ' #last').click(function(){
				var nowvisible = parseInt($(wrapper + " #gallerythumbframe > img").last().attr("id"));
				$(wrapper + " #" + nowvisible).click();
			});

			$(wrapper + " #first").unbind('click');    
			$(wrapper + ' #first').click(function(){
				var nowvisible = parseInt($(wrapper + " #gallerythumbframe > img").first().attr("id"));
				$(wrapper + " #" + nowvisible).click();
			});  
		}

		function setscrollbinding() {

			if (typeof(setscrollbinding.lastoffset) === "undefined") {
				setscrollbinding.lastoffset = $(wrapper + " #gallerythumbframe").scrollTop().valueOf();
			}
			var debugscroll = false;

			$(wrapper + ' #gallerythumbframe').scroll(function(e){
				if (debugscroll) console.log("gallery.setscrollbinding(): Scroll event.")

				var currentoffset = $(wrapper + " #gallerythumbframe").scrollTop().valueOf();
				var rel = setscrollbinding.lastoffset - currentoffset;
				setscrollbinding.lastoffset = currentoffset;

				if (debugscroll) {
					if (rel > 0) {
						console.log("gallery.setscrollbinding(): Scroll put lower image #s in view.");
					} else {
						console.log("gallery.setscrollbinding(): Scroll put higher image #s in view.");
					}
				}	
				var elem = $(this);

				var Nlazy = VIVIZ["galleries"][galleryid]["lazyLoadMax"]
							|| VIVIZ["config"]["lazyLoadMax"]


				var Nshown = parseInt($(wrapper + " #gallerythumbframe > img.active").attr("id"));
	
				// Determine number of thumbnails above active one that exist in view.
				var activetop = $(wrapper + " #gallerythumbframe > img.active").offset().top;
				var frametop  = $(wrapper + " #gallerythumbframe").offset().top;
				var frameouterHeight = $(wrapper + " #gallerythumbframe").outerHeight();
				var frameinnerHeight = $(wrapper + " #gallerythumbframe").innerHeight();
				var framedel  = frameouterHeight - frameinnerHeight;
				var rel2       = activetop - frametop;

				var Nshown2 = Math.floor(rel2/VIVIZ["galleries"][galleryid]["thumbHeight"]);
				if (debugscroll) {
					console.log("gallery.setscrollbinding(): Position of active relative to top of document = " + activetop);
					console.log("gallery.setscrollbinding(): Position of active gallerythumbframe to top of document = " + frametop);
					console.log("gallery.setscrollbinding(): outerHeight - innerHeight of gallerythumbframe = " + frameinnerHeight + " - " + frameouterHeight + " = " + framedel);
					console.log("gallery.setscrollbinding(): Offset of active relative to top of gallerythumbframe = " + rel);
					console.log("gallery.setscrollbinding(): Scroll distance to top of active thumb  = " + rel);
					console.log("gallery.setscrollbinding(): Scroll distance in units of thumbHeight = " + Nshown2);
					}
				if (rel < 0) {
					if (debugscroll) console.log("gallery.setscrollbinding(): Scroll put higher image #s in view.");
					direction = "forward"; // Need to append
					Nshown = Nshown - Nshown2;
					if (debugscroll) console.log("gallery.setscrollbinding(): Last image fully visible in #gallerythumbframe is #" + Nshown + ".");
					Nlast = parseInt($("#gallerythumbframe img").not(".spacer").last().attr("id"));
					if (debugscroll) console.log("gallery.setscrollbinding(): Last image in DOM in #gallerythumbframe is #" + Nlast + ".");
					if ((Nlast-Nshown) < Nlazy) {
						if (debugscroll) console.log("gallery.setscrollbinding(): Number of images below last fully visible image < Nlazy. Calling loadmore('forward', true)");
						loadmore(direction, Nshown, true);
					} else {
						if (debugscroll) console.log("gallery.setscrollbinding(): Number of images below last fully visible image >= Nlazy. Not calling loadmore('forward', true)");
					}
				} else {
					if (debugscroll) console.log("gallery.setscrollbinding(): Scroll put lower image #s in view.");
					direction = "backward"; // Scroll down. Need to prepend.
					Nshown = Nshown - Nshown2 - 1;
					if (debugscroll) console.log("gallery.setscrollbinding(): First image fully visible in #gallerythumbframe is #" + Nshown + ".");
					Nfirst = parseInt($("#gallerythumbframe img").not(".spacer").first().attr("id"));
					if (debugscroll) console.log("gallery.setscrollbinding(): First image in DOM in #gallerythumbframe is #" + Nfirst + ".");
					if (debugscroll) console.log("gallery.setscrollbinding(): Number of images in DOM above it = " + (Nshown-Nfirst) + ".");
					if ((Nshown-Nfirst) < Nlazy) {
						if (debugscroll) console.log("gallery.setscrollbinding(): Number of hidden images above it < Nlazy. Calling loadmore('forwward, true')");
						loadmore(direction, Nshown, true);
					}
				}
			})
		}

	}

	function thumb() {

		$("#gallery" + gallerynumber).parent().hide()
		$("#thumb" + gallerynumber).parent().show()

		setthumbs()

		function setthumbbindings() {
			console.log('thumb.setthumbbindings(): Setting bindings on ' + wrapper);

			if (!setthumbbindings.active) setthumbbindings.active = {};

			$(wrapper + ' .thumbbrowse').unbind('click');
			$(wrapper + ' .thumbbrowse').unbind('hover');
			$(wrapper + ' .thumbbrowseoverlay').unbind('click');
			$(wrapper + ' .thumbbrowseoverlay').unbind('hover');

			function setfilename(jq) {
				$(wrapper + " #filename").html('');
				$(wrapper + " #filename").append("<a>");
				$(wrapper + " #filename a").attr('href',jq.src.replace(GALLERYINFO['thumbdir'],GALLERYINFO['fulldir'])).text(jq.src.replace(GALLERYINFO['thumbdir'],""));
			}

			function positionoverlay(el) {

				// Where does this 30 pixels come from?
				// 30 is $(wrapper + ' #thumbbrowseoverlay').position().{left,right}
				// Align upper left corners
				var lt = [$(el).offset().left,$(el).position().top]

				if (setthumbbindings.overlayDimensions) {
					// If overlay dimensions known (first overlay loaded)
					console.log("-- Overlay dimensions known.")
					// Offset is relative to document.
					// Position is relative to the offset of the parent.
					var elo = wrapper + ' #thumbbrowseoverlay'
					console.log("Overlay offset left:   " + $(elo).offset().left)
					console.log("Overlay offset top:    " + $(elo).offset().top)
					console.log("Overlay position left: " + $(elo).position().left)
					console.log("Overlay position top:  " + $(elo).position().top)
					console.log("Overlay width:  " + $(elo).width())
					console.log("Overlay height: " + $(elo).height())

					console.log("Element offset left:   " + $(el).offset().left)
					console.log("Element offset top:    " + $(el).offset().top)
					console.log("Element position left: " + $(el).position().left)
					console.log("Element position top:  " + $(el).position().top)
					console.log("Element width:  " + $(el).width())
					console.log("Element height: " + $(el).height())

					console.log('Window width:  ' + $(window).width())
					console.log('Window height: ' + $(window).height())
					if ($(el).offset().left > $(window).width()/2) {
						var lt = [$(el).offset().left-setthumbbindings.overlayDimensions[0]+$(el).outerWidth(),$(el).position().top]						
					}

				}

				return lt
			}

			// Overlay on click.
			$(wrapper + ' .thumbbrowse').click(function () {
				console.log("Thumb click event.")

				if ($(setthumbbindings.active).hasClass("loaderror")) {					
					$(setthumbbindings.active).css("border", "solid red 3px")
				} else {
					$(setthumbbindings.active).css("border", "solid white 3px")
				}
				setthumbbindings.active = this
				$(this).css("border", "solid blue 3px")

				lt = positionoverlay(this)
				console.log(lt)
				$(wrapper + ' #thumbbrowseoverlay').parent().prepend('<img style="position:absolute; z-index:2; display:none" id="thumboverlayloading" src="css/ajax-loader.gif"/>')
				$(wrapper + ' #thumboverlayloading').css("left", lt[0]).css("top", lt[1]).fadeIn(2000)

				// http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached
				$(wrapper + ' #thumbbrowseoverlay').unbind('load')
				$(wrapper + ' #thumbbrowseoverlay')
					.show()
					.attr("src", $(this).attr("srcfull"))
					.css("left", lt[0])
					.css("top", lt[1])
					.error(function () {$(wrapper + ' #thumboverlayloading').remove()})
					.one("load",function () {
						setthumbbindings.overlayOffset   = [$(wrapper + ' #thumbbrowseoverlay').offset().left, $(wrapper + ' #thumbbrowseoverlay').offset().top]
						setthumbbindings.overlayPosition = [$(wrapper + ' #thumbbrowseoverlay').position().left, $(wrapper + ' #thumbbrowseoverlay').position().top]
						setthumbbindings.overlayDimensions = [$(wrapper + ' #thumbbrowseoverlay').outerWidth(), $(wrapper + ' #thumbbrowseoverlay').height()]
						lt = positionoverlay(setthumbbindings.active)
						console.log(lt)
						$(this).css("left", lt[0])
						$(this).css("top", lt[1])
						$(wrapper + ' #thumboverlayloading').remove()
					}).each(function() {
  						if(this.complete) $(this).load();
					})
			})

			// If image is clicked on, close.
			$(wrapper + ' #thumbbrowseoverlay').click(function(){
				console.log("Overlay clicked.")
				$(wrapper + ' #thumbbrowseoverlay').hide()
				console.log($(setthumbbindings.active).hasClass("loaderror"))
				$(setthumbbindings.active).css("border", "solid white 3px")
			})
			
			// If image is hovered on and then a hover-out event occurs, close.
			$(wrapper + ' #thumbbrowseoverlay').hover(
				function(event){
					// Hover in event.
					console.log("Overlay hover in event.")
				},
				function(){
					// Hover out event
					console.log("Overlay hover out event.")
					$(wrapper + ' #thumbbrowseoverlay').hide()
					$(setthumbbindings.active).css("border", "solid white 3px")
				})
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
			var INFOjs = thumblist()
			
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

				// Set left padding so that block of images is centered.
				// Could avoid this call if text-alignment:center was used,
				// except that if there is an un-filled last row
				// the images will be centered instead of left-justified.
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
					// Only modify padding if iw has changed.
					if (setpadding.lastiw == iw)  {
						return
					}
				}

				console.log("thumb.setpadding(): First image outer width = " + x)
				console.log("thumb.setpadding(): Inner width of thumbbrowseframe = " + iw)

				setpadding.lastx = x
				setpadding.lastiw = iw

				var pl = parseInt($("#thumbbrowseframe").css('padding-left').replace('px',""))
				var pr = parseInt($("#thumbbrowseframe").css('padding-right').replace('px',""))

				console.log("thumb.setpadding(): padding-left/right of thumbbrowseframe = " + pl + "/" + pr)

				a = (iw)/x
				console.log("thumb.setpadding(): Max # images per row = " + a);
				b = (a - Math.floor(a))*x


				if (INFOjs.length < Math.floor(a)) {
					// # of images is less than number of images possible per row.
					console.log('thumb.setpadding(): Total # images in row ' + INFOjs.length)
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

				var src = VIVIZ["galleries"][galleryid]["thumbdirdecoded"] + INFOjs[i]['ThumbFile'];
				var srcfull = VIVIZ["galleries"][galleryid]["fulldirdecoded"] + INFOjs[i]['FullFile'];

				$('<img class="thumbbrowse"/>')
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


						// See caveats at https://api.jquery.com/load-event/
						// This checks if load event was fired after error event
						// (and after class was set, hopefully.)
						var err = $(this).hasClass('loaderror')

						thumb.Nloaded = thumb.Nloaded + 1
						if (!loadone.first && !err) {
							console.log("thumb.setthumbs.loadone(): First thumbnail loaded.")

							loadone.first = true

							// Set thumbWidth and Height in VIVIZ["galleries"][galleryid]
							var tmp = setWH(this, 'thumb')

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