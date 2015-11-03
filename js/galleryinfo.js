function reporterror(URL) {
	$('#connectionerror').html('');
	if (location.protocol.match("file")) {
		error("galleryinfo.js: Error reading " + URL + ".<br>When the URL in the browser address bar starts with <b>file:/</b>, special configuration is needed.  See http://viviz.org/");
	} else {
		error("galleryinfo.js: Error reading " + URL + ".<br>The domain name of this URL must match the domain name in your address bar " + window.location.host);
	}		
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
	
	//extractfiles.cache = {};
	//if (extractfiles.cache[URLFiles])
	//	return extractfiles.cache[URLFiles];
	
	if (URLFiles.indexOf("http") != -1) {
		var tmparr = URLFiles.split("/");
		var tmparrp = VIVIZ["proxyServer"].split("/");

		var proxy = tmparrp[2]
		var files = tmparr[2]
		var host = location.hostname+(location.port ? ':'+location.port: '')

		if (VIVIZ["proxyServer"]) {
			if (host !== files) {
				console.log("Proxy server is required.");
				if (proxy !== host) {
					var msg = "proxyServer address (" + proxy + ") specified in configuation must match application address (" + host + ")"
					console.log(msg)
					error("#gallery1", msg)
					return
				} else {
					// TODO: Check that proxy actually works.
					URLFiles = VIVIZ["proxyServer"] + URLFiles;
				}
			}
		} else {
			if (host === files) {

			} else {
				console.log("Request is for file list from a http address, but no proxyServer specified in configuration and server address for file is not same as address of application.")
				console.log("Request will fail because of Same Origin policy.")
				error("#gallery1", "proxyServer must be specified in configuration or filelist URL must start with http://" + location.hostname+(location.port ? ':'+location.port: ''))
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
			error: function () {error("catalog.js: Error reading " + URLFiles,true)},
			success: function (data) {
						//console.log('galleryinfo.js: Extracting files from ' + URLFiles);
						FILES = CSVToArray(data.replace(/\n$/,''));
						//FILES = data.split(/\n/); Use this instead.
					}
		});
		$("#status").text("");
	} else if (URLFiles.match(/\.xml$/)) {
		$.ajax({
			type: "GET",
			url: URLFiles,
			async: false,
			dataType: "xml",
			error: function (xhr, textStatus, errorThrown) {
						error("catalog.js: Error reading " + URLFiles,true);
						//console.log(textStatus);
					},
			success: function (xml) {
						console.log('galleryinfo.js: Extracting files from ' + URLFiles);
						if ($(xml).find("gallery images data").length > 0) {
							eval("FILES = " + $(xml).find("gallery images data").text());
							console.log("galleryinfo.extractfiles(): Found " + FILES.length + " files in " + URLFiles);
						}
						if ($(xml).find("gallery images script").length > 0) {
							//eval($(xml).find("gallery images script").text());
							////console.log(files);
						}
						return FILES;
					}
		});
	} else {

		// A service request that returns a JSON array of files.
		$.ajax({
			type: "GET",
			url: URLFiles,
			async: false,
			dataType: "json",
			error: function () {error("galleryinfo.js: Error reading " + URLFiles,true)},
			success: function (data) {
						console.log('galleryinfo.js: Extracting files from ' + URLFiles);
						
						if (typeof(data[0]) === "string") {
							for (var k=0;k<data.length;k++) {
								FILES[k] = [];
								FILES[k][0] = data[k];
							}
						} else {
							FILES = data;
						}
						
					}
		});
	}

	$("#status").text("");
	//extractfiles.cache[URLFiles] = FILES;
	return FILES;

}

function menulist(StartYear,StopYear,TEMPLATE_YEAR) {

	// menulist(FILES,TEMPLATE)
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
		
		//console.log("menulist.js: No start/stop year given.  Computing from template " + TEMPLATEp);
		//console.log("menulist.js: StartYear = " + StartYear + ", EndYear = " + StopYear);	
		//console.log("menulist.js: Pattern to match for year = " + TEMPLATEp);

		return menulist(StartYear,StopYear,TEMPLATEp);			
	}

	StartYear = parseInt(StartYear.substring(0,4));
	StopYear  = parseInt(StopYear.substring(0,4));

	FILTERS = new Array();
	for (var j=0;j<(StopYear-StartYear);j++) {
		var patt = new RegExp(TEMPLATE_YEAR);
		year = ""+(j+StartYear);
		var PATTERN_YEAR = TEMPLATE_YEAR.replace(TEMPLATE_YEAR,year);
		FILTERS[j] = {"Title":year,"Value":PATTERN_YEAR};
	}

	return FILTERS;
}

function isimage(href) {
	if (href.match(/\.png$/)) {
		return true;
	} else {
		//console.log("galleryinfo.js: isimage: Rejected " + href);
		return false;
	}
}

function galleryinfo(galleryid) {

	console.log("galleryinfo.js: Called.")

	if (typeof(galleryinfo.GALLERYINFO) != 'object') {
		galleryinfo.GALLERYINFO = new Object();
	}
	
	if (galleryinfo.GALLERYINFO[galleryid]) {
		return galleryinfo.GALLERYINFO[galleryid]
	}

	_GALLERYINFO = new Object();
	var fullfiles = [];
	var thumbfiles = [];

	var CATALOGINFO = cataloginfo(galleryid);

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

		// fullfiles is a string with newlines
		if (CATALOGINFO["fullfiles"].indexOf(/\n/) != -1) {
			fullfiles = CSVToArray(data.replace(/\n$/,''))			
		} else {
			if (location.href.match(/^file/)) {
				error("#gallery1", "Configuration variable fullfiles cannot be an external file unless this page is loaded from a web server.<br/>")
				return false
			}
			fullfiles = extractfiles(CATALOGINFO["fullfiles"])
		}
	}

	if (typeof(CATALOGINFO["thumbfiles"]) === 'object') {
		thumbfiles = CATALOGINFO["thumbfiles"]
	}

	if (typeof(CATALOGINFO["thumbfiles"]) === 'string') {
		thumbfiles = extractfiles(CATALOGINFO["thumbfiles"])
	}
	
	if (CATALOGINFO["strftime"]) {
		_GALLERYINFO["strftime"]      = CATALOGINFO["strftime"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["strftimestart"] = CATALOGINFO["strftimestart"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["strftimestop"]  = CATALOGINFO["strftimestop"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		
		// Create regexps based on time information
		_GALLERYINFO["autoattributes"]  = menulist(CATALOGINFO["strftimestart"],CATALOGINFO["strftimestop"],CATALOGINFO["strftime"]);

		var options = {};
		options.template = _GALLERYINFO["strftime"];
		options.timeRange = _GALLERYINFO["strftimestart"] + "/" + _GALLERYINFO["strftimestop"];
		options.debug = false;
		options.type = "strftime";
		//console.log(options)
		var fullfiles = [];
		var xfiles = expandtemplate(options);
		//console.log(xfiles);

		for (var i =0; i < xfiles.length; i++) {
			fullfiles[i] = [xfiles[i]];
		}
		//console.log(fullfiles)
	} 

	if (CATALOGINFO["sprintf"]) {
		console.log(CATALOGINFO)
		_GALLERYINFO["sprintfstart"] = parseInt(CATALOGINFO["sprintfstart"]);
		_GALLERYINFO["sprintfstop"]  = parseInt(CATALOGINFO["sprintfstop"]);
		_GALLERYINFO["sprintf"]      = CATALOGINFO["sprintf"];
		_GALLERYINFO["sprintfdelta"] = parseInt(CATALOGINFO["sprintfdelta"]);
		
		if (isNaN(_GALLERYINFO["sprintfdelta"])) {
			_GALLERYINFO["sprintfdelta"] = 1;
			console.log("galleryinfo.js: sprintfdelta is not defined "
						+ " or is NaN.  Using value of 1.")
		}
		var fullfiles = new Array();
		io = _GALLERYINFO["sprintfstart"];
		i = io;
		z = io;
		while (i < _GALLERYINFO["sprintfstop"] + 1) {			
			var tmps = _GALLERYINFO["sprintf"];
			fullfiles[z-io] = [sprintf(tmps,i)];
			z = z+1;
			i = i + _GALLERYINFO["sprintfdelta"];
		}
	}

	if (!CATALOGINFO["thumbdir"]) {
		CATALOGINFO["thumbdir"] = CATALOGINFO["fulldir"]
	}
	if (thumbfiles.length == 0) {
		thumbfiles = fullfiles;
	}

	var types = {"full":fullfiles,"thumb":thumbfiles}
	var type;
	for (var type in types) {
		files = types[type]
		if (CATALOGINFO[type+"dir"]) {

			_GALLERYINFO[type+"dir"] = CATALOGINFO[type+"dir"];

			if (VIVIZ["basedir"]) {
			    _GALLERYINFO[type+"dir"] = VIVIZ["basedir"] + _GALLERYINFO[type+"dir"];
			}
			if (VIVIZ["useCachedImages"]) {
				_GALLERYINFO[type+"dir"] = "http://imgconvert.org/convert.cgi?in=" + _GALLERYINFO[type+"dir"];
			}

			_GALLERYINFO[type+"files"] = [];
			for (var j = 0; j < files.length; j++) {
				_GALLERYINFO[type+"files"][j] = [];
				if (!fullfiles[0][0].match(/^http|^ftp|^file/)) {
					_GALLERYINFO[type+"files"][j][0] = _GALLERYINFO[type+"dir"] + files[j][0];
				} else {
					_GALLERYINFO[type+"files"][j][0] = files[j][0];
				}
				for (var i = 1; i < fullfiles[j].length; i++) {
					_GALLERYINFO[type+"files"][j][i] = files[j][i];
				}
			}
		} else {
			_GALLERYINFO[type+"files"] = files
		}
	}

	_GALLERYINFO["totalingallery"] = _GALLERYINFO["fullfiles"].length;
	_GALLERYINFO["orders"]         = extractorders();
	_GALLERYINFO["attributes"]     = extractattributes(galleryid);

	if (_GALLERYINFO["autoattributes"]) {		
		if (VIVIZ["useAutoAttributes"]) {
			// When useAutoAttributes is true, ignore attributes specified in file.
			_GALLERYINFO["attributes"]["Values"][0]["Filters"] = _GALLERYINFO["autoattributes"];

			// Add an All attribute at the end.
			var na = _GALLERYINFO["autoattributes"].length;
			_GALLERYINFO["attributes"]["Values"][0]["Filters"][na] = {};
			_GALLERYINFO["attributes"]["Values"][0]["Filters"][na].Title = "All";
			_GALLERYINFO["attributes"]["Values"][0]["Filters"][na].Value = ".*";	

			// TODO: Add options useAutoAttributesOnly (current meaning of useAutoAttributes) 
			// and useAutoAttributesAlso (Append auto attributes to existing)?	
		}
	}

	galleryinfo.GALLERYINFO[galleryid] = _GALLERYINFO;
	
	console.log("galleryinfo.js: Returing");
	console.log(_GALLERYINFO);

	if (_GALLERYINFO.fullfiles.length == 0) {
		console.log("No files")
		return false;
	}
	return _GALLERYINFO;
}
