function viviz(VIVIZ, mode) {

	// Turn off console logging.
	//var console = {}; console.log = function(){};

	console.log("viviz.js: Called.")

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

	// If key does not exist in global or passed VIVIZ object, add it.
	for (key in _VIVIZ) {
		if (typeof(VIVIZ[key]) === "undefined") {
			VIVIZ[key] = _VIVIZ[key]
		}
	}

	var qs = $.parseQueryString()

	if (!mode) {
		if (qs["mode"] === "gallery") {
			var mode = "gallery"
		}
		if (qs["mode"] === "thumb") {
			var mode = "thumb"
		}
		if (!qs["mode"]) {
			if (VIVIZ["config"]["defaultMode"] === "gallery") {
				var mode = "gallery"
			} else if (VIVIZ["config"]["defaultMode"] === "thumb") {
				var mode = "thumb"
			} else {
				var mode = "gallery"
			}
		}
	}

	var gallerynumber = "1"
	var wrapper = "#" + mode + gallerynumber

	$(window).unbind('hashchange.' + mode)
	$(window).bind('hashchange.' + mode, function() {
		console.log('viviz.js: Hash has changed to ' + location.hash + ".")
		// Special case where id is only key specified in gallery object
		// and its value is a query string.
		var keys = ["dir","full","thumb","strftime",
					"sprintf","script","list","start","stop"]
		var hash = location.hash
		for (var k in keys) {
			key = keys[k]
			hash = hash.replace("id=" + key, key)
			hash = hash.replace("id=full" + key, "full" + key)
			hash = hash.replace("id=thumb" + key, "thumb" + key)
		}
		if (hash !== location.hash) {
			console.log('viviz.js: Hash is a query string.')
		}
		location.hash = hash
		viviz(VIVIZ)
	})

	// Get list of galleries
	console.log("viviz.js: Getting list of galleries.")
	var GALLERIES = cataloginfo()
	if (typeof(GALLERIES) === "string") {
		console.log("viviz.js: Call to cataloginfo() failed.")
		resetdom()
		error(GALLERIES)
		$('#g-container').show()
		$('#g-container .well').hide()
		$('#g-container #error').show()
		return
	}

	// Default gallery to show
	if (location.hash.indexOf("id=") == -1) {
		// Hash may be gallery configuration
		var galleryid = location.hash.replace("#","")
		if (galleryid.length == 0) {
			 // Nothing following #
			galleryid = GALLERIES["Values"][0]["Id"]
			location.hash = "id=" + galleryid
		}
	} else {
		var galleryid = qs["id"] || GALLERIES["Values"][0]["Id"]
	}
	console.log("viviz.js: galleryid = " + galleryid)

	var GALLERYINFO = galleryinfo(galleryid)

	// Call to galleryinfo sets VIVIZ["galleries"][galleryid]
	if (typeof(GALLERYINFO) === "string") {
		console.log("gallery.js: Call to galleryinfo() failed.")
		resetdom()
		error("Problem with configuration for gallery with <code>id = " 
				+ galleryid + "</code>:<br/>" + GALLERYINFO)
		$('#g-container').show()
		$('#g-container .well').hide()
		$('#g-container #error').show()
		if (VIVIZ["galleries"][galleryid]) {
			// Gallery is is valid.  Show header and only gallery list.
			setheader()
			setdropdowns(false)
		} else {
			// Gallery id is not valid.  Only show gallery list.
			setdropdowns(false)
		}
		return
	}

	resetdom()
	setheader()
	setdropdowns()

	// Button to switch between gallery and thumb view
	$("#gallerybrowsebutton").unbind('click')
	$("#gallerybrowsebutton").click(function () {
		$('#t-container').hide()
		$('#g-container').show()
		if (VIVIZ["config"]["defaultMode"] === "gallery") {
			location.hash = location.hash.replace("&mode=thumb","")
		} else {
			location.hash = location.hash.replace("&mode=thumb","") + "&mode=gallery"
		}
		viviz(VIVIZ, 'gallery')
	})
	$("#thumbbrowsebutton").unbind('click')
	$("#thumbbrowsebutton").click(function () {
		$('#g-container').hide()
		$('#t-container').show()
		if (VIVIZ["config"]["defaultMode"] === "thumb") {
			location.hash = location.hash.replace("&mode=gallery","")
		} else {
			location.hash = location.hash.replace("&mode=gallery","") + "&mode=thumb"
		}
		viviz(VIVIZ, 'thumb')
	})

	if (mode === 'gallery') {
		$('#t-container').hide()
		$('#g-container').show()
		gallery()
	}
	if (mode === 'thumb') {
		$('#g-container').hide()
		$('#t-container').show()
		thumb()		
	}

	function cataloginfo(galleryid) {

		//console.log("cataloginfo.js: Called.")

		qs = $.parseQueryString()

		var hashisgallery = false
		if (location.hash.indexOf("id=") == -1) {
			if (location.hash.length > 1)
				hashisgallery = true
		}

		if (typeof(VIVIZ["catalog"]) === 'string') {
			if (location.href.match(/^file/)) {
				console.log("cataloginfo.js: Application cannot read " + VIVIZ.catalog + " because it is not available from a server.")
				warning("#gallery1", "Application cannot read <a style='text-decoration:underline' href='" + VIVIZ.catalog + "'>" + VIVIZ.catalog + "</a> because it is not available from a server.")
				if (hashisgallery == false) {
					console.log("cataloginfo.js: Problem with query string.")
					error("#gallery1", "Problem with query string and cannot read catalog.")
					return ""
				} else {
					VIVIZ["catalog"] = []
				}
			} else {
				console.log("cataloginfo.js: VIVIZ['catalog'] is a URL that returns JSON. Requesting it.")
				$.ajax({
							type: "GET",
							url: VIVIZ["catalog"],
							async: false,
							dataType: "json",
							success: 
								function (data, textStatus, jqXHR) {
									//cataloginfo.jqXHR = jqXHR;
									console.log("cataloginfo.js: Finished reading " + VIVIZ["catalog"])
									VIVIZ["catalog"] = data;
								},
							error: 
								function (xhr, textStatus, errorThrown) {
									error("#gallery1", "Could not read <a style='text-decoration:underline' href='" + VIVIZ.catalog + "'>" + VIVIZ.catalog + "</a>. Error: " + errorThrown.message.split(":")[0])
									console.log("cataloginfo.js: Could not read " + VIVIZ["catalog"] + ". Error: " + errorThrown.message.split(":")[0])
									VIVIZ["catalog"] = []
								}
						})
			}
		}

		// If no arguments, return list of galleries.
		if (arguments.length == 0) {

			if (!hashisgallery && !VIVIZ["catalog"]) {
				return "No catalog object found in configuration variable."
			}
			if (hashisgallery) {
				// Hash is query string with gallery information
				console.log("cataloginfo.js: Hash is a query string with gallery information:")
				console.log(qs)
				if (!VIVIZ["catalog"]) {
					// No catalog, only query string
					VIVIZ["catalog"] = []
					VIVIZ["catalog"][0] = qs
					if (!qs["id"]) {
						VIVIZ["catalog"][0]["id"] = location.hash.replace(/^#/,'')
					}
				} else {
					// Place gallery specified by query string at front of list
					console.log("cataloginfo.js: Prepending gallery specified by query string to gallery list.")
					//console.log(VIVIZ["catalog"])
					//console.log(VIVIZ["catalog"].length)
					VIVIZ["catalog"].unshift(qs)
					//console.log(VIVIZ["catalog"])
					//console.log(VIVIZ["catalog"].length)
					if (!qs["id"]) {
						VIVIZ["catalog"][0]["id"] = location.hash.replace(/^#/,'')
					}

					VIVIZ["catalog"]
						.forEach(
							function (el,i) {
								//console.log("Element number: " + i)
								//console.log(el)
								if (i != 0 && el.id === location.hash.replace(/^#/,'')) {
									console.log("cataloginfo.js: Removing existing gallery from catalog.")
									VIVIZ["catalog"].splice(i,1)
								}
							})
				}
			}

			var GALLERIES           = new Object();
			GALLERIES["Title"]      = "Galleries";
			GALLERIES["Titleshort"] = "-Galleries-";
			GALLERIES["Class"]      = "updatelglobal";
			GALLERIES["Values"]     = new Array();
					
			VIVIZ["catalog"]
				.forEach(
					function (el,i) {
						GALLERIES["Values"][i] = new Object();
						if (el.title) {
							GALLERIES["Values"][i]["Title"] = el.id + ": " + el.title
						} else {
							GALLERIES["Values"][i]["Title"] = el.id;
						}
						if (el.id.indexOf("fulldir") == 0) {
							// Save list of these.  Create new list where each element is
							// string that is shorter but unique from others.
							// ID = hash of query string
							//  and
							// title = "Gallery defined by query string: " + short unique string.
						}
						GALLERIES["Values"][i]["Value"] = el.id;
						GALLERIES["Values"][i]["Id"]    = el.id;					
					})
					
			if (GALLERIES.Values.length == 0) {
				$("#connectionerror").html("Problem reading gallery information.");
				console.log("cataloginfo.js: Problem reading gallery information.");
				return ""
			}
			console.log("cataloginfo.js: Returning list of " + GALLERIES.Values.length + " galleries.");

			return GALLERIES;
		}

		// If galleryid given, return gallery information.
		if (arguments.length == 1) {

			console.log("cataloginfo.js: Returning gallery information found in catalog for galleryid = " + galleryid)
			var _CATALOGINFO = new Object();

			// Find gallery with matching id in json array.
			var found = true
			for (i = 0;i < VIVIZ["catalog"].length; i++) {
				if (VIVIZ["catalog"][i]["id"] === galleryid) {
					found = false
					break
				}
			}

			if (found) {
		 		var msg = "Gallery with <code>id = "+ galleryid + "</code> not found in catalog:<br/><textarea style='width:40em;height:20em'>"+JSON.stringify(VIVIZ["catalog"], null, 4)+"</textarea>"
		 		console.log(msg)
		 		return msg
		 	}
			
			// Gallery nodes will be stored in this object and be referenced by id.
			if (!VIVIZ["galleries"]) VIVIZ["galleries"] = {}
			VIVIZ["galleries"][galleryid] = {}

			if (VIVIZ["catalog"][i]["dir"] || VIVIZ["catalog"][i]["fulldir"] !== VIVIZ["catalog"][i]["thumbdir"]) {
				// If thumbdir != fulldir in gallery configuration, set scaling of thumbs to 1.0
				if (!VIVIZ["catalog"][i]["thumbWidth"] && !VIVIZ["catalog"][i]["thumbHeight"]) {
					if (VIVIZ["catalog"][i]["thumbdir"]) {
						VIVIZ["galleries"][galleryid]["thumbWidth"] = 1.0
						VIVIZ["galleries"][galleryid]["thumbHeight"] = 1.0
					}
				}
				// If only one was specified, assume other is same if fraction given
				if (VIVIZ["catalog"][i]["thumbWidth"] && !VIVIZ["catalog"][i]["thumbHeight"]) {
					if (VIVIZ["catalog"][i]["thumbWidth"] <= 1.0) {
						VIVIZ["galleries"][galleryid]["thumbHeight"] = VIVIZ["catalog"][i]["thumbWidth"]
					} else {
						VIVIZ["galleries"][galleryid]["thumbHeight"] = ""
					}
				}
				if (VIVIZ["catalog"][i]["thumbHeight"] && !VIVIZ["catalog"][i]["thumbWidth"]) {
					if (VIVIZ["catalog"][i]["thumbHeight"] <= 1.0) {
						VIVIZ["galleries"][galleryid]["thumbWidth"] = VIVIZ["catalog"][i]["thumbHeight"]
					} else {
						VIVIZ["galleries"][galleryid]["thumbWidth"] = ""
					}
				}
			}

			// Copy gallery information
			for (key in VIVIZ["catalog"][i]) {
				if (typeof(VIVIZ["catalog"][i]) === 'string') {
					VIVIZ["galleries"][galleryid][key] = VIVIZ["catalog"][i][key].replace(/^\s+|\s+$/g,'')
				} else {
					VIVIZ["galleries"][galleryid][key] = VIVIZ["catalog"][i][key]
				}
			}

			// Copy configuration information found in global configuration and not found in gallery configuration.
			for (key in VIVIZ["config"]) {
				if (typeof(VIVIZ["galleries"][galleryid][key]) === 'undefined') {
					VIVIZ["galleries"][galleryid][key] = VIVIZ["config"][key]
				}
			}

			// Replace gallery information with values in query string
			for (key in qs) {
				if (qs[key]) {
					if (qs[key] === 'true') {qs[key] = true}
					if (qs[key] === 'false') {qs[key] = false}
					if ($.isNumeric(qs[key])) {qs[key] = parseFloat(qs[key])}
					console.log("cataloginfo.js: Setting " + key + " from " + VIVIZ["galleries"][galleryid][key] + " to " + qs[key]);
					VIVIZ["galleries"][galleryid][key] = qs[key]
				}
			}

			VIVIZ["galleries"][galleryid]["json"] = VIVIZ["catalog"][i]
			
			console.log("cataloginfo.js: Returning")
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
			if (typeof(CATALOGINFO[type+"files"]) === 'object') {
				files = CATALOGINFO[type+"files"]
			}
			if (typeof(CATALOGINFO[type+"files"]) === 'string') {
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
				options.template = CATALOGINFO[type+"strftime"]
				options.timeRange = CATALOGINFO[type+"start"] + "/" + CATALOGINFO[type+"stop"]
			}

			if (CATALOGINFO["sprintf"] && !CATALOGINFO[type+"sprintf"]) {
				CATALOGINFO[type+"sprintf"] = CATALOGINFO["sprintf"]
			}	
			if (CATALOGINFO[type+"sprintf"]) {
				if (CATALOGINFO["delta"] && !CATALOGINFO[type+"delta"]) {
					CATALOGINFO[type+"delta"] = CATALOGINFO["delta"]
				}	
				var step = parseInt(CATALOGINFO[type+"delta"])
				if (isNaN(step)) {
					var step = 1
					console.log("galleryinfo.js: delta is not defined " + " or is NaN.  Using value of 1.")
				}
				options.type = "sprintf";
				options.template = CATALOGINFO[type+"sprintf"]
				options.indexRange = CATALOGINFO[type+"start"] + "/" + CATALOGINFO[type+"stop"] + "/" + step
			}

			if (CATALOGINFO[type+"sprintf"] || CATALOGINFO[type+"strftime"]) {
				options.debug = false
				var xfiles = expandtemplate(options)
				for (var i = 0; i < xfiles.length; i++) {
					files[i] = [xfiles[i]]
				}
			}

			VIVIZ["galleries"][galleryid][type+"files"] = files
		}

		// If not full dir given, files are in same directory as index.htm 
		if (!CATALOGINFO["fulldir"]) {
			CATALOGINFO["fulldir"] = ""
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

		VIVIZ["galleries"][galleryid]["totalingallery"] = VIVIZ["galleries"][galleryid]["fullfiles"].length 
		VIVIZ["galleries"][galleryid]["orders"] = extractorders()
		VIVIZ["galleries"][galleryid]["attributes"] = extractattributes()

		if (VIVIZ["config"]["useAutoAttributes"] || VIVIZ["galleries"][galleryid]["useAutoAttributes"]) {

			// When useAutoAttributes is true, ignores attributes specified in file.
			// TODO: Add options useAutoAttributesOnly (current meaning of useAutoAttributes) 
			// and useAutoAttributesAlso (Append auto attributes to existing)?	

			na = 0

			// Create regexps based on time information
			if (CATALOGINFO["fullstrftime"]) {
				VIVIZ["galleries"][galleryid]["autoattributes"] = 
					filterlist(CATALOGINFO["fullstart"],CATALOGINFO["fullstop"],CATALOGINFO["fullstrftime"])
			
				VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"] = 
					VIVIZ["galleries"][galleryid]["autoattributes"]

				// Add an All attribute at the end.
				na = VIVIZ["galleries"][galleryid]["autoattributes"].length || 0
			}

			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na] = {}
			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na].Title = "All"
			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na].Value = ".*"	
		}

		if (usecache) {
			galleryinfo.GALLERYINFO[galleryid] = VIVIZ["galleries"][galleryid]
		}

		console.log("galleryinfo.js: Returing"); console.log(VIVIZ["galleries"][galleryid])
		return VIVIZ["galleries"][galleryid]

		function extractorders() {

			var ORDERS = {
				    "Title": "Sort order",
				    "Titleshort": "-Sort order-",
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

		function extractattributes(galleryid) {

			ATTRIBUTES = new Object();
			
			ATTRIBUTES["Title"]      = "Sort attributes"
			ATTRIBUTES["Titleshort"] = "-Sort by-"
			ATTRIBUTES["Class"]      = "updatelocal"

			ATTRIBUTES["Values"]             = new Array()
			ATTRIBUTES["Values"][0]          = new Object()
			ATTRIBUTES["Values"][0]["Title"] = "Filename"
			ATTRIBUTES["Values"][0]["Value"] = "0"

			ATTRIBUTES["Values"][0]["Filters"]    = new Array()
			ATTRIBUTES["Values"][0]["Filters"][0] = new Object()
			ATTRIBUTES["Values"][0]["Filters"][0]["Title"] = "All"
			ATTRIBUTES["Values"][0]["Filters"][0]["Value"] = ".*"

			return ATTRIBUTES

			xml = cataloginfo.xml;

			var j = 0;
			$(xml).find("catalog gallery[id='" + galleryid + "'] attributes attribute").each(
					function (i) {
							ATTRIBUTES["Values"][i] = new Object();
							ATTRIBUTES["Values"][i]["Title"] = $(this).find('name').text();
							ATTRIBUTES["Values"][i]["Value"] = i;
							ATTRIBUTES["Values"][i]["Filters"] = new Array();
							j = j+1;
							$(this).find('filters filter').each(
									function(j) {
										ATTRIBUTES["Values"][i]["Filters"][j] = new Object();
										ATTRIBUTES["Values"][i]["Filters"][j]["Title"] = $(this).find('title').text();
										ATTRIBUTES["Values"][i]["Filters"][j]["Value"] = $(this).find('value').text();
										//console.log($(this).text());
									})
				});


			for (i = 0;i<cataloginfo.json.length;i++) {
				if (cataloginfo.json[i]["id"] === galleryid) break;
			}

			if (i < cataloginfo.json.length) {
				if (typeof(cataloginfo.json[i]["attributes"]) !== "undefined") {
					cataloginfo.json[i]["attributes"].forEach(
							function (el,i) {
								ATTRIBUTES["Values"][i] = new Object();
								ATTRIBUTES["Values"][i]["Title"] = el.name;
								ATTRIBUTES["Values"][i]["Value"] = i;
								ATTRIBUTES["Values"][i]["Filters"] = new Array();
				
								el.filters.forEach(
									function (el,j) {
										ATTRIBUTES["Values"][i]["Filters"][j] = new Object();
										ATTRIBUTES["Values"][i]["Filters"][j]["Title"] = el.title;
										ATTRIBUTES["Values"][i]["Filters"][j]["Value"] = el.value;
									});				
							});
				}
			}
			//console.log(ATTRIBUTES)
			if (ATTRIBUTES["Values"].length > 1) {
				//console.log("galleryinfo.js: Attributes found in " + URLCommon);
				//console.log(ATTRIBUTES);
			} else {
				//console.log("galleryinfo.js: No attributes found in " + URLCommon);
			}

			return ATTRIBUTES;
		}

		function extractfiles(URLFiles) {
			
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
			$("#status").text("Retrieving list of files")
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

			function geterror(err,textStatus,errorThrown) {
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
							msg = msg + "<br/>Error: " + err.statusText + "."
						}
						console.log(msg)

			}
			$("#status").text("")

			if (msg !== "") return msg
			return FILES
		}

		function filterlist(StartYear,StopYear,TEMPLATE_YEAR) {

			if (arguments.length == 2) {

				TEMPLATEp = TEMPLATE.replace('%Y','([0-9][0-9][0-9][0-9])');
				TEMPLATEp = TEMPLATEp.replace('%m','([0-9][0-9])');
				TEMPLATEp = TEMPLATEp.replace('%d','([0-9][0-9])');

				var patt = new RegExp(TEMPLATEp);
				StartYear  = files[0][3].replace(patt,'$1');
				//StartMonth = files[0][3].replace(patt,'$2');
				//StartDay   = files[0][3].replace(patt,'$3');
				StopYear   = files[files.length-1][3].replace(patt,'$1');
				//StopMonth  = files[1][3].replace(patt,'$2');
				//StopDay    = files[1][3].replace(patt,'$3');

				TEMPLATEp = TEMPLATE.replace('%Y','[0-9][0-9][0-9][0-9]');
				TEMPLATEp = TEMPLATEp.replace(/\./gi,'');
				TEMPLATEp = TEMPLATEp.replace(/%[a-z]/gi,'.*');
				
				return filterlist(StartYear,StopYear,TEMPLATEp);			
			}

			if (typeof(StartYear) === 'string') {
				StartYear = parseInt(StartYear.substring(0,4));
				StopYear  = parseInt(StopYear.substring(0,4));
			}

			FILTERS = new Array();
			for (var j=0;j<(StopYear-StartYear);j++) {
				var patt = new RegExp(TEMPLATE_YEAR);
				year = ""+(j+StartYear);
				var PATTERN_YEAR = TEMPLATE_YEAR.replace(TEMPLATE_YEAR,year);
				FILTERS[j] = {"Title":year,"Value":PATTERN_YEAR};
			}

			return FILTERS;
		}
	}

	// http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
	$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};

	function resetdom() {
		// Make copy of catalogwrapper and place in thumb container.
		if ($("#thumb" + gallerynumber + " #catalogwrapper").length == 0) {
			$("#gallery" + gallerynumber + " #catalogwrapper").clone().insertAfter("#thumb" + gallerynumber + " #error")
		}

		// Toggle state set when call to cataloginfo() failed.
		$('#g-container').hide()
		$('#g-container .well').show()

		$(wrapper + ' #workingfullframe').css('visibility','hidden')
		$(wrapper + " #gallerythumbframe").html('')

		if ($(wrapper + " #catalogopen:visible").length == 0) {
			$(wrapper + " #catalogclose").click()
		}
		// Keep full frame width and height what it was last.  When image is
		// loaded, proper dimensions will be set.
		if ($(wrapper + " #fullframe").width() > 0)
			$(wrapper + " #fullframe").width($(wrapper + " #fullframe").width())
		if ($(wrapper + " #fullframe").height() > 0)
			$(wrapper + " #fullframe").height($(wrapper + " #fullframe").height())

		$(wrapper + " #fullframe").html('')
		$(wrapper).attr('nowvisible', '').attr('lastvisible', '').attr('totalvisible', '').attr('totalingallery', '')
		$(wrapper + " #controls").html('&nbsp;')
		$(wrapper + " #attributes").html('&nbsp;')
		$(wrapper + " #error").html('').hide()
		$(wrapper + " #warning").html('').hide()
		$(wrapper + " #connectionerror").html('')
		$(wrapper + " #catalog").html('')
		$(wrapper + " #thumbbrowseframe").html('')
	}

	function error(msg, clear) {
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

		if (totime != Infinity)
			setTimeout(function () {$(wrapper + ' #warning').html('').hide();},totime || 3000)
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

	function updatehash(el) {
		console.log(el)
		var val = $(wrapper + " #" + el + " option:selected").val()
		if (val !== "") {
			var qs = $.parseQueryString()
			console.log(qs)
			if (el !== 'id' && $($("#" + el + " option")[1]).val() === val) {
				// If selected is not gallery id and is second option, it is default.  Remove from hash.
				delete qs[el]
			} else {
				qs[el] = val
			}
			var hash = ""
			for (var key in qs) {
				hash = hash + "&" + key + "=" + qs[key]
			}
			console.log('updatehash(): Setting location.hash.')
			location.hash = hash.substr(1)
		}
	}

	function setdropdowns(all) {

		console.log("dropdowns(): Setting dropdowns in " 
			+ wrapper + " based on gallery information for "
			+ galleryid + ".")

		// Gallery drop-down
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
			$(wrapper + " #dropdowns #id #def").attr('selected','selected')
			$(wrapper + ' #dropdownswrapper').show()
			$(wrapper + ' #dropdownswrapper select').hide()
			$(wrapper + ' #dropdownswrapper #dropdowns #id').show()
			return
		}

		// Select default gallery.
		$(wrapper + " #id option[value='" + galleryid + "']").attr('selected','selected')

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

	function setWH(el, type) {

		console.log("setWH(): Computing width and height of " 
			+ type + " images based on image size and options.")

		var ar = el.naturalWidth/el.naturalHeight

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

	function thumblist() {

		console.log("thumblist(): Called.")

		var galleryid = $(wrapper + " #id").val()
		var SORTBY    = $(wrapper + " #sortby").val()
		var ORDER     = $(wrapper + " #order").val()
		var regexp    = $(wrapper + " #regexp :selected").attr('value')

		var SORTBYS  = GALLERYINFO['attributes']
		var ORDERS   = GALLERYINFO['orders']

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
		for (j = 0; j < GALLERYINFO["fullfiles"].length; j++) {
			INFOjs[j] = new Object();
			INFOjs[j]["FileName"] = GALLERYINFO["fullfiles"][j][0];
			INFOjs[j]["FullFile"] = GALLERYINFO["fullfiles"][j][0];
			if (GALLERYINFO["thumbfiles"].length > 0) {
				INFOjs[j]["ThumbFile"] = GALLERYINFO["thumbfiles"][j][0];
			} else {
				INFOjs[j]["ThumbFile"] = GALLERYINFO["fullfiles"][j][0];
			}
			
			if (Object.keys(SORTBYS).length > 0) {
				for (z = 0;z < SORTBYS["Values"].length;z++) {
					INFOjs[j][z] = GALLERYINFO["fullfiles"][j][z];
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
				} else {
					var INFOrs = clone(INFOjs);
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
			//console.log('thumblist.js: First image is now ' + INFOrs[0].FileName);
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
		if (ORDER.match("random")){
			//console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in random order.")
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

		return INFOrs
	}

	function gallery() {

		setthumbs()

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
			INFOjs = thumblist(); 

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
			
			firstimage(0)

			// TODO: Detect bad images:
			// https://github.com/desandro/imagesloaded
			// http://stackoverflow.com/questions/821516/browser-independent-way-to-detect-when-image-has-been-loaded
			// http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached

			// Find first valid thumbnail
			function firstimage(f) {

				console.log("gallery.firstimage(): Called.  Setting thumb #" + f + " into DOM.");
				if (f == 0) setcontrolbindings();

				$('<img class="gallerythumbbrowse firstimage"/>')
					.appendTo($(wrapper + ' #gallerythumbframe'))
					.attr("id",f+1)
					.attr("src", VIVIZ["galleries"][galleryid]["thumbdir"] + INFOjs[f].ThumbFile)
					.error(function () {
						// First image is bad.
						console.log("gallery.firstimage(): Image " + f + " is bad.");
						//warning("Image " + f + " not found.",true);
						$(this).remove();

						warning("Image " + (f+1) + " could not be loaded.",true,Infinity);
						
						if (f == INFOjs.length-1) {
							warning("No images could be loaded.",true,Infinity);
							console.log("No images could be loaded.");
							$(wrapper + " #workingfullframe").css('visibility','hidden');
							return;
						}
						firstimage(f+1)
					})
					.load(function () {
						
						if (f > 0) {
							if (f == 1) {
								warning("The first image in this subset could not be loaded.",true)
							} else {
								warning("The first " + f + " images" + " in this subset could not be loaded.",true)
							}
						}
						
						// Trigger load of the first full image.
						$(wrapper).attr('nowvisible',f+1)
						console.log("gallery.firstimage(): First thumbnail image loaded.")
						console.log("gallery.firstimage(): Applying click bindings and then clicking it to trigger load of full image.")
						$(this).bind('click',setthumbbindings).click()

						// Scroll to top.
						$(wrapper + " #gallerythumbframe").scrollTo(0);

						console.log('gallery.firstimage(): First thumbnail has natural dimensions = '
							+this.naturalWidth+'x'+this.naturalHeight+'.');

						// Set height of thumbnail image - setWH() Modifies VIVIZ["galleries"][galleryid]
						var tmp = setWH(this, 'thumb');
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
					console.log("gallery.settabledims(): Full image does not need to be reduced in height to prevent vert. scrollbar.")
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
							var tmp = setWH(this, 'full');

							// Set height of full image.
							console.log("gallery.loadfull(): Setting full image height")
							$(this).css("height",VIVIZ["galleries"][galleryid]["fullHeight"]);
							//$(this).css("width",VIVIZ["galleries"][galleryid]["fullWidth"]);

							// After this function sets VIVIZ[gallerid] dimensions, 
							// then call prepnext(), which uses these dimensions.
							console.log("gallery.loadfull(): Calling settabledims().")
							settabledims(this, function () {prepnext()});

						} else {
							prepnext()
						}

						setfilename($(this).attr('id'))

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

			// If Nfill > 1, we need to load more images initially to trigger appearance of scroll bar.
			if (Nfill > 1)
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
							//warning("Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.",true);
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

	function thumb() {

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
						var lt = [$(el).offset().left-setthumbbindings.overlayDimensions[0]+$(el).width(),$(el).position().top]						
					}

				}

				return lt
			}

			// Overlay on click.
			$(wrapper + ' .thumbbrowse').click(function () {
				console.log("Thumb click event.")
				$(setthumbbindings.active).css("border", "solid white 3px")
				setthumbbindings.active = this
				$(this).css("border", "solid blue 3px")

				lt = positionoverlay(this)
				console.log(lt)
				$(wrapper + ' #thumbbrowseoverlay').unbind('load')
				$(wrapper + ' #thumbbrowseoverlay')
					.show()
					.attr("src", $(this).attr("srcfull"))
					.css("left", lt[0])
					.css("top", lt[1])
					.load(function () {
						setthumbbindings.overlayOffset   = [$(wrapper + ' #thumbbrowseoverlay').offset().left, $(wrapper + ' #thumbbrowseoverlay').offset().top]
						setthumbbindings.overlayPosition = [$(wrapper + ' #thumbbrowseoverlay').position().left, $(wrapper + ' #thumbbrowseoverlay').position().top]
						setthumbbindings.overlayDimensions = [$(wrapper + ' #thumbbrowseoverlay').width(), $(wrapper + ' #thumbbrowseoverlay').height()]
						lt = positionoverlay(setthumbbindings.active)
						console.log(lt)
						$(this).css("left", lt[0])
						$(this).css("top", lt[1])
					})
			})

			// If image is clicked on, close.
			$(wrapper + ' #thumbbrowseoverlay').click(function(){
				console.log("Overlay clicked.")
				$(wrapper + ' #thumbbrowseoverlay').hide()
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

				$('<img class="thumbbrowse" src="css/transparent.png"/>')
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