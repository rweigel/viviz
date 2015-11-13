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

	// Error message.
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
			options.debug = true
			console.log(options)
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

	VIVIZ["galleries"][galleryid]["totalingallery"] = files.length 
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
}

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