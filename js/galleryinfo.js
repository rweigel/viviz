function galleryinfo(galleryid) {

	var usecache = true
	var fullfiles = []
	var thumbfiles = []

	if (usecache) {
		if (typeof(galleryinfo.GALLERYINFO) !== 'object') {
			galleryinfo.GALLERYINFO = new Object()
		}
		
		if (galleryinfo.GALLERYINFO[galleryid]) {
			return galleryinfo.GALLERYINFO[galleryid]
		}
	}

	var CATALOGINFO = cataloginfo(galleryid);

	if (typeof(CATALOGINFO) === "string") {
		return CATALOGINFO
	}

	if (typeof(CATALOGINFO["fullscript"]) === 'string') {
		fullfiles = eval("(" + CATALOGINFO["fullscript"] + ")()")
	}

	if (typeof(CATALOGINFO["fullscript"]) === 'function') {
		fullfiles = eval(CATALOGINFO["fullscript"]())
	}

	if (typeof(CATALOGINFO["thumbscript"]) === 'string') {
		thumbfiles = eval("(" + CATALOGINFO["thumbscript"] + ")()")
	}

	if (typeof(CATALOGINFO["thumbscript"]) === 'function') {
		thumbfiles = eval(CATALOGINFO["thumbscript"]())
	}

	if (typeof(CATALOGINFO["fullfiles"]) === 'object') {
		fullfiles = CATALOGINFO["fullfiles"]
	}

	if (typeof(CATALOGINFO["fullfiles"]) === 'string') {
		fullfiles = extractfiles(CATALOGINFO["fullfiles"])
		if (typeof(fullfiles) === 'string') {
			// Response is an error message.
			return fullfiles
		}
	}

	if (typeof(CATALOGINFO["thumbfiles"]) === 'object') {
		thumbfiles = CATALOGINFO["thumbfiles"]
	}

	if (typeof(CATALOGINFO["thumbfiles"]) === 'string') {
		thumbfiles = extractfiles(CATALOGINFO["thumbfiles"])
	}
	
	var options = {};
	if (CATALOGINFO["strftime"]) {
		options.type = "strftime";
		options.template = CATALOGINFO["strftime"]
		options.timeRange = CATALOGINFO["start"] + "/" + CATALOGINFO["stop"]
	} 

	if (CATALOGINFO["sprintf"]) {
		var step = parseInt(CATALOGINFO["delta"])
		if (isNaN(step)) {
			var step = 1
			console.log("galleryinfo.js: delta is not defined " + " or is NaN.  Using value of 1.")
		}
		options.type = "sprintf";
		options.template = CATALOGINFO["sprintf"]
		options.indexRange = CATALOGINFO["start"] + "/" + CATALOGINFO["stop"] + "/" + step
	}

	if (CATALOGINFO["sprintf"] || CATALOGINFO["strftime"]) {
		options.debug = false
		var fullfiles = []
		var xfiles = expandtemplate(options);
		for (var i = 0; i < xfiles.length; i++) {
			fullfiles[i] = [xfiles[i]]
		}
	}

	VIVIZ["galleries"][galleryid]["fullfiles"] = fullfiles

	if (thumbfiles.length == 0) {
		VIVIZ["galleries"][galleryid]["thumbfiles"] = thumbfiles
	} else {
		VIVIZ["galleries"][galleryid]["thumbfiles"] = fullfiles		
	}

	VIVIZ["galleries"][galleryid]["totalingallery"] = fullfiles.length 
	VIVIZ["galleries"][galleryid]["orders"] = extractorders()
	VIVIZ["galleries"][galleryid]["attributes"] = extractattributes(galleryid)


	if (VIVIZ["config"]["useAutoAttributes"] || VIVIZ["galleries"][galleryid]["useAutoAttributes"]) {		

			// When useAutoAttributes is true, ignores attributes specified in file.
			// TODO: Add options useAutoAttributesOnly (current meaning of useAutoAttributes) 
			// and useAutoAttributesAlso (Append auto attributes to existing)?	

			na = 0

			// Create regexps based on time information
			if (CATALOGINFO["strftime"]) {
				VIVIZ["galleries"][galleryid]["autoattributes"] = filterlist(CATALOGINFO["start"],CATALOGINFO["stop"],CATALOGINFO["strftime"])
			
				VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"] = VIVIZ["galleries"][galleryid]["autoattributes"]

				// Add an All attribute at the end.
				na = VIVIZ["galleries"][galleryid]["autoattributes"].length || 0
			}


			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na] = {}
			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na].Title = "All"
			VIVIZ["galleries"][galleryid]["attributes"]["Values"][0]["Filters"][na].Value = ".*"	

	}

	if (fullfiles.length == 0) {
		console.log("No files")
		return "No file list was generated."
	}

	if (usecache) {
		galleryinfo.GALLERYINFO[galleryid] = VIVIZ["galleries"][galleryid]
	}

	console.log("galleryinfo.js: Returing")
	console.log(VIVIZ["galleries"][galleryid])

	return VIVIZ["galleries"][galleryid]
}

function extractorders() {
	var ORDERS = {
		    "Title": "Sort order",
		    "Titleshort": "-Sort order-",
		    "Class": "updatelocal",
		    "Values": [{"Title": "No sort", "Value": "none"},
						{"Title": "Ascending", "Value": "ascending"},
		               	{"Title": "Descending","Value": "descending"},
		               	{"Title": "Random","Value": "random"}]
	}
	return ORDERS;
}

function extractattributes(galleryid) {

	ATTRIBUTES = new Object();
	
	ATTRIBUTES["Title"]      = "Sort attributes";
	ATTRIBUTES["Titleshort"] = "-Sort by-";
	ATTRIBUTES["Class"]      = "updatelocal";

	ATTRIBUTES["Values"]             = new Array();
	ATTRIBUTES["Values"][0]          = new Object();
	ATTRIBUTES["Values"][0]["Title"] = "Filename";
	ATTRIBUTES["Values"][0]["Value"] = "0";

	ATTRIBUTES["Values"][0]["Filters"]    = new Array();
	ATTRIBUTES["Values"][0]["Filters"][0] = new Object();
	ATTRIBUTES["Values"][0]["Filters"][0]["Title"] = "All";
	ATTRIBUTES["Values"][0]["Filters"][0]["Value"] = ".*";

	return ATTRIBUTES;

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

	var FILES = new Array();
	$("#status").text("Retrieving list of files");
	console.log("galleryinfo.extractfiles(): Getting file list from " + URLFiles)
	if (URLFiles.match(/\.txt$/)) {
		$.ajax({
			type: "GET",
			url: URLFiles,
			async: false,
			dataType: "text",
			error: function () {
				msg = "Error reading <a style='text-decoration:underline' href='" + URLFiles + "'>" + URLFiles + "</a>."
				console.log(msg)	
			},
			success: function (data) {
						console.log('galleryinfo.extractfiles(): Extracting files from ' + URLFiles);
						FILES = CSVToArray(data.replace(/\n$/,''));
						//FILES = data.split(/\n/); Use this instead?
					}
		});
		$("#status").text("");
	} else {

		// A service request that returns a JSON array of files.
		$.ajax({
			type: "GET",
			url: URLFiles,
			async: false,
			dataType: "json",
			error: function (err, textStatus, errorThrown) {
				console.log(err)
				msg = "Error reading <a style='text-decoration:underline' target='_blank' href='" + URLFiles + "'>" + URLFiles + "</a>."
				if (textStatus && textStatus !== 'error') {
					if (errorThrown) {
						msg = msg + "<br/>Error: " + textStatus + ", " + errorThrown
					} else {
						msg = msg + "<br/>Error: " + textStatus + "."
					}
	
				}
				console.log(msg)
			},
			success: function (data) {
						console.log('Extracting files from ' + URLFiles);
						if (typeof(data[0]) === "string") {
							for (var k=0;k<data.length;k++) {
								FILES[k] = [];
								FILES[k][0] = data[k];
							}
						} else {
							FILES = data;
						}	
					}
		})
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