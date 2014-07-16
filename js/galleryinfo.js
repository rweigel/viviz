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

function extractoutputs() {
	var OUTPUTS = {
		"Title": "Download",
		    "Titleshort": "-Download Options-",
		    "Class": "updatelocal",
		    "Values": [{"Title": "File List", "Value": "filelist"},
						{"Title": "Animated GIF", "Value": "gif"},
		               	{"Title": "MP4","Value": "mp4"},
		               	{"Title": "MOV","Value": "mov"},
		               	{"Title": "Zip","Value": "zip"}]
	}
	return OUTPUTS;
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
		
	var FILES = new Array();
	//var Proxy = "proxy.php?url=";
	var Proxy = "";
	URLFiles = Proxy + URLFiles;
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
	for (var j=0;j<(StopYear-StartYear+1);j++) {
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

	if (typeof(galleryinfo.GALLERYINFO) != 'object') {
		galleryinfo.GALLERYINFO = new Object();
	}
	
	if (galleryinfo.GALLERYINFO[galleryid]) {
		//console.log('galleryinfo: Using cached gallery information for ' + galleryid);
		return galleryinfo.GALLERYINFO[galleryid]
	}
	_GALLERYINFO = new Object();
	var fullfiles = [];
	var thumbfiles = [];

	var CATALOGINFO = cataloginfo(galleryid);

	if (CATALOGINFO["fulllistscript"]) {
		fullfiles = eval(CATALOGINFO["fulllistscript"])(); 
	}

	if (CATALOGINFO["thumblistscript"]) {
		thumbfiles = eval(CATALOGINFO["thumblistscript"])(); 
	}

	if (CATALOGINFO["fullfilelist"]) {
		fullfiles  = extractfiles(CATALOGINFO["fullfilelist"]);
	}		

	if (CATALOGINFO["thumbfilelist"]) {
		thumbfiles  = extractfiles(CATALOGINFO["thumbfilelist"]);
	}

	if (CATALOGINFO["fullfiles"]) {
		fullfiles = extractfiles(CATALOGINFO["fullfiles"]);
	}
	
	if (CATALOGINFO["thumbfiles"]) {
		thumbfiles = extractfiles(CATALOGINFO["thumbfiles"]);
	}

	if (CATALOGINFO["strftime"]) {
		_GALLERYINFO["strftime"]      = CATALOGINFO["strftime"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["strftimestart"] = CATALOGINFO["strftimestart"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["strftimestop"]  = CATALOGINFO["strftimestop"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		
		// Create regexps based on time information
		_GALLERYINFO["autoattributes"]  = menulist(CATALOGINFO["strftimestart"],CATALOGINFO["strftimestop"],CATALOGINFO["strftime"]);

		// Generate list of files based on template, start, and stop.
		// TODO: Generalize to handle hours, minutes, seconds.
		
		if (CATALOGINFO["strftimestart"].match(/^[0-9]{4}-[0-9]{3}$/)) {
			// YYYY-DOY
			var START_year = CATALOGINFO["strftimestart"].substr(0,4);
			var START_day  = CATALOGINFO["strftimestart"].substr(5,3);
			var START_date = new Date(Date.parse(START_year+"-01-01").add({days:parseInt(START_day)-1}).toString('yyyy-MM-dd'));
			var START_ms   = new Date(Date.parse(START_year+"-01-01").add({days:parseInt(START_day)-1}));
		} else {
			var START_ms   = new Date(Date.parse(CATALOGINFO["strftimestart"]));
			var START_date = new Date(Date.parse(CATALOGINFO["strftimestart"]));
			var STOP_date = new Date(Date.parse(CATALOGINFO["strftimestop"]));
			//console.log(START_ms)
		}
			
		if (CATALOGINFO["strftimestop"].match(/^[0-9]{4}-[0-9]{3}$/)) {
			// YYY-DOY
			var STOP_year = CATALOGINFO["strftimestop"].substr(0,4);
			var STOP_day  = CATALOGINFO["strftimestop"].substr(5,3);
			var STOP_ms   = new Date(Date.parse(STOP_year+"-01-01").add({days:parseInt(STOP_day)-1}));
		} else {
			var STOP_ms    = new Date(Date.parse(CATALOGINFO["strftimestop"]));
		}

		if (CATALOGINFO["strftimestop"].match(/^[0-9]{4}-[0-9]{3}$/) || CATALOGINFO["strftimestop"].match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
			var Ndays = 1 + Math.round((STOP_ms.valueOf()-START_ms.valueOf())/(1000*24*60*60));
		}

		// YYYY-MM
		var incr = false;
		if (CATALOGINFO["strftimestop"].match(/^[0-9]{4}-[0-9]{2}$/)) {
			incr = {months:1};			
		}
		if (CATALOGINFO["strftimestop"].match(/^[0-9]{4}$/)) {
			incr = {years:1};			
		}
		//console.log("Number of days: " + Ndays)
		fullfiles = new Array();
		var tic = new Date().getTime();
		var i = 0;
		// Remove time zone 
		//console.log(CATALOGINFO["StrftimeStart"]);
		//console.log("--")
		//console.log(START_date);
		//START_date = new Date(new Date(START_date).toUTCString().substr(0, 25));
		//console.log(Date.compare(START_date,STOP_date));
		//console.log(incr);
		if (incr) {
			while (Date.compare(START_date,STOP_date) <= 0) {
				fname = START_date.strftime(CATALOGINFO["strftime"]);
				//console.log(Date.compare(START_date,STOP_date));
				//console.log(fname);
				fullfiles[i] = [fname];
				START_date.add(incr);
				i = i+1;		
			}
		} else {	
			// Faster to not use Date.compare().
			while (i < Ndays) {
				fname = START_date.strftime(CATALOGINFO["strftime"]);
				//console.log(Date.compare(START_date,STOP_date));
				//console.log(fname);
				fullfiles[i] = [fname];
				START_date.addDays(1);
				i = i + 1;
			}
		}
		var elapsed = new Date().getTime() - tic;
		//console.log("galleryinfo.js: Creation of file list of length " + Ndays + " took " + elapsed + " ms");
	} 

	if (CATALOGINFO["sprintf"]) {
		_GALLERYINFO["sprintfstart"] = CATALOGINFO["sprintfstart"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["sprintfstop"]  = CATALOGINFO["sprintfstop"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["sprintf"]      = CATALOGINFO["sprintf"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');

		_GALLERYINFO["sprintfdelta"] = parseInt(CATALOGINFO["sprintfdelta"].replace(/\n/,'').replace(/^\s+|\s+$/g,''));
		
		if (isNaN(_GALLERYINFO["sprintfdelta"])) {
			_GALLERYINFO["sprintfdelta"] = 1;
			console.log("galleryinfo.js: sprintfdelta is not defined or is NaN.  Using value of 1.")
		}
		var fullfiles = new Array();
		io = parseInt(_GALLERYINFO["sprintfstart"]);
		i = io;
		z = io;
		while (i < parseInt(_GALLERYINFO["sprintfstop"]) + 1) {			
			var tmps = _GALLERYINFO["sprintf"];
			fullfiles[z-io] = [sprintf(tmps,i)];
			z = z+1;
			i = i + _GALLERYINFO["sprintfdelta"];
		}
	}
	
	if (0) {
	if (CATALOGINFO.hasOwnProperty("fullfiles")) {
		if (!_GALLERYINFO["fullfiles"]) {
			$("#error").html("Could not generate file list for gallery "+galleryid);
			return false;
		} else if (_GALLERYINFO["fullfiles"].length == 0) {
			$("#error").html("File list for gallery "+galleryid+" has no elements.");
			return false;
		}
	}
}
    
	if (CATALOGINFO["fulldir"]) {
		_GALLERYINFO["fulldir"] = CATALOGINFO["fulldir"];
		if (VIVIZ["useCachedImages"]) {
			_GALLERYINFO["fulldir"] = "http://imgconvert.org/convert.cgi?in="+_GALLERYINFO["fulldir"];
		}
		_GALLERYINFO["fullfiles"] = [];
		for (var j = 0;j < fullfiles.length;j++) {
			_GALLERYINFO["fullfiles"][j] = [];
			if (!fullfiles[0][0].match(/^http|^ftp|^file/)) {
				_GALLERYINFO["fullfiles"][j][0] = _GALLERYINFO["fulldir"] + fullfiles[j][0];
			} else {
				_GALLERYINFO["fullfiles"][j][0] = fullfiles[j][0];
			}
			for (var i = 1;i<fullfiles[j].length;i++) {
				_GALLERYINFO["fullfiles"][j][i] = fullfiles[j][i];
			}
		}
	} else {
		_GALLERYINFO["fulldir"] = "";			
	}

	if (thumbfiles.length == 0) {
		thumbfiles = fullfiles;
	}
	if (CATALOGINFO["thumbdir"]) {
		_GALLERYINFO["thumbdir"] = CATALOGINFO["thumbdir"];
		if (VIVIZ["useCachedImages"]) {
			_GALLERYINFO["thumbdir"] = "http://imgconvert.org/convert.cgi?in="+_GALLERYINFO["thumbdir"];
		}
		_GALLERYINFO["thumbfiles"] = [];
		for (var j = 0;j < thumbfiles.length;j++) {
			_GALLERYINFO["thumbfiles"][j] = [];
			if (!thumbfiles[0][0].match(/^http|^ftp|^file/)) {
				_GALLERYINFO["thumbfiles"][j][0] = _GALLERYINFO["thumbdir"] + thumbfiles[j][0];
			} else {
				_GALLERYINFO["thumbfiles"][j][0] = thumbfiles[j][0];
			}
			for (var i = 1;i<thumbfiles[j].length;i++) {
				_GALLERYINFO["thumbfiles"][j][i] = thumbfiles[j][i];
			}
		}
	} else {
		_GALLERYINFO["thumbdir"] = "";			
	}

	_GALLERYINFO["totalingallery"] = _GALLERYINFO["fullfiles"].length;	
	_GALLERYINFO["orders"]         = extractorders();
	_GALLERYINFO["attributes"]     = extractattributes(galleryid);
	_GALLERYINFO["outputs"]		   = extractoutputs();
	
	if (_GALLERYINFO["autoattributes"])
		_GALLERYINFO["attributes"]["Values"][0]["Filters"] = _GALLERYINFO["autoattributes"]
	
	galleryinfo.GALLERYINFO[galleryid] = _GALLERYINFO;
	
	//console.log("galleryinfo.js: _GALLERYINFO = ");
	//console.log(_GALLERYINFO);

	return _GALLERYINFO;

		
}
