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
		    "Values": [{"Title": "Ascending", "Value": "ascending"},
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

	xml = cataloginfo.xml;

	$(xml).find("catalog gallery[id='" + galleryid + "'] attributes attribute").each(
			function (i) {
					ATTRIBUTES["Values"][i] = new Object();
					ATTRIBUTES["Values"][i]["Title"] = $(this).find('name').text();
					ATTRIBUTES["Values"][i]["Value"] = i;

					ATTRIBUTES["Values"][i]["Filters"] = new Array();

					$(this).find('filters filter').each(
							function(j) {
								ATTRIBUTES["Values"][i]["Filters"][j] = new Object();
								ATTRIBUTES["Values"][i]["Filters"][j]["Title"] = $(this).find('title').text();
								ATTRIBUTES["Values"][i]["Filters"][j]["Value"] = $(this).find('value').text();
								//console.log($(this).text());
							})
	});
	if (ATTRIBUTES["Values"].length > 1) {
		//console.log("galleryinfo.js: Attributes found in " + URLCommon);
		//console.log(ATTRIBUTES);
	} else {
		//console.log("galleryinfo.js: No attributes found in " + URLCommon);
	}

	return ATTRIBUTES;
}

function extractfiles(URLFiles) {
	
	extractfiles.cache = {};
	if (extractfiles.cache[URLFiles])
		return extractfiles.cache[URLFiles];
		
	var FILES = new Array();
	//var Proxy = "proxy.php?url=";
	var Proxy = "";
	URLFiles = Proxy + URLFiles;
	$("#status").text("Retrieving list of files");
	
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
		extractfiles.cache[URLFiles] = FILES;
		return FILES;
	}

	if (URLFiles.match(/\.xml$/)) {
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
				
						//console.log('galleryinfo.js: Extracting files from ' + URLFiles);
						if ($(xml).find("gallery images data").length > 0) {
							eval("FILES = " + $(xml).find("gallery images data").text());
							//console.log("galleryinfo.js: extractfiles(): Found " + FILES.length + " files in " + URLFiles);
							////console.log(FILES);
						}
						if ($(xml).find("gallery images script").length > 0) {
							//eval($(xml).find("gallery images script").text());
							////console.log(files);
						}
					}
		});
		$("#status").text("");
		extractfiles.cache[URLFiles] = FILES;
		return FILES;
	}


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
		$("#status").text("");
		extractfiles.cache[URLFiles] = FILES;
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
	
	var CATALOGINFO = cataloginfo(galleryid);

	if (CATALOGINFO["Script"]) {
		_GALLERYINFO["files"] = eval(CATALOGINFO["Script"])(); 
	}
	
	if (CATALOGINFO["Fullfiles"]) {
		_GALLERYINFO["files"]  = extractfiles(CATALOGINFO["Fullfiles"]);
		//console.log(_GALLERYINFO["files"]);
	}
	
	if (CATALOGINFO["Thumbfiles"]) {
		_GALLERYINFO["thumbfiles"]  = extractfiles(CATALOGINFO["Thumbfiles"]);
		//console.log(_GALLERYINFO["files"]);
	}


	if (CATALOGINFO["Strftime"]) {
		_GALLERYINFO["Strftime"]      = CATALOGINFO["Strftime"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["StrftimeStart"] = CATALOGINFO["StrftimeStart"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["StrftimeStop"]  = CATALOGINFO["StrftimeStop"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		
		// Create regexps based on time information
		_GALLERYINFO["autoattributes"]  = menulist(CATALOGINFO["StrftimeStart"],CATALOGINFO["StrftimeStop"],CATALOGINFO["Strftime"]);

		// Generate list of files based on template, start, and stop.
		// TODO: Generalize to handle hours, minutes, seconds.
		
		if (CATALOGINFO["StrftimeStart"].match(/^[0-9]{4}-[0-9]{3}$/)) {
			// YYYY-DOY
			var START_year = CATALOGINFO["StrftimeStart"].substr(0,4);
			var START_day  = CATALOGINFO["StrftimeStart"].substr(5,3);
			var START_date = new Date(Date.parse(START_year+"-01-01").add({days:parseInt(START_day)-1}).toString('yyyy-MM-dd'));
			var START_ms   = new Date(Date.parse(START_year+"-01-01").add({days:parseInt(START_day)-1}));
		} else {
			var START_ms   = new Date(Date.parse(CATALOGINFO["StrftimeStart"]));
			var START_date = new Date(Date.parse(CATALOGINFO["StrftimeStart"]));
			var STOP_date = new Date(Date.parse(CATALOGINFO["StrftimeStop"]));
			//console.log(START_ms)
		}
			
		if (CATALOGINFO["StrftimeStop"].match(/^[0-9]{4}-[0-9]{3}$/)) {
			// YYY-DOY
			var STOP_year = CATALOGINFO["StrftimeStop"].substr(0,4);
			var STOP_day  = CATALOGINFO["StrftimeStop"].substr(5,3);
			var STOP_ms   = new Date(Date.parse(STOP_year+"-01-01").add({days:parseInt(STOP_day)-1}));
		} else {
			var STOP_ms    = new Date(Date.parse(CATALOGINFO["StrftimeStop"]));
		}

		if (CATALOGINFO["StrftimeStop"].match(/^[0-9]{4}-[0-9]{3}$/) || CATALOGINFO["StrftimeStop"].match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
			var Ndays = 1 + Math.round((STOP_ms.valueOf()-START_ms.valueOf())/(1000*24*60*60));
		}

		// YYYY-MM
		var incr = false;
		if (CATALOGINFO["StrftimeStop"].match(/^[0-9]{4}-[0-9]{2}$/)) {
			incr = {months:1};			
		}
		if (CATALOGINFO["StrftimeStop"].match(/^[0-9]{4}$/)) {
			incr = {years:1};			
		}
		//console.log("Number of days: " + Ndays)
		_GALLERYINFO["files"] = new Array();
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
				fname = START_date.strftime(CATALOGINFO["Strftime"]);
				//console.log(Date.compare(START_date,STOP_date));
				//console.log(fname);
				_GALLERYINFO["files"][i] = [fname];
				START_date.add(incr);
				i = i+1;		
			}
		} else {	
			// Faster to not use Date.compare().
			while (i < Ndays) {
				fname = START_date.strftime(CATALOGINFO["Strftime"]);
				//console.log(Date.compare(START_date,STOP_date));
				//console.log(fname);
				_GALLERYINFO["files"][i] = [fname];
				START_date.addDays(1);
				i = i + 1;
			}
		}
		var elapsed = new Date().getTime() - tic;
		//console.log("galleryinfo.js: Creation of file list of length " + Ndays + " took " + elapsed + " ms");
	} 

	if (CATALOGINFO["Sprintf"]) {
		_GALLERYINFO["SprintfStart"] = CATALOGINFO["SprintfStart"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["SprintfStop"]  = CATALOGINFO["SprintfStop"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["Sprintf"]      = CATALOGINFO["Sprintf"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		var files = new Array();
		io = parseInt(_GALLERYINFO["SprintfStart"]);
		for (i = io; i < parseInt(_GALLERYINFO["SprintfStop"]) + 1; i++) {
			var tmps = _GALLERYINFO["Sprintf"];
			files[i-io] = [sprintf(tmps,i)];
		}
		_GALLERYINFO["files"] = files;
	}
	
	if (CATALOGINFO.hasOwnProperty("files") && _GALLERYINFO["files"].length == 0) {
		//console.log("galleryinfo.js: Creation of file list failed.");
	}
    
	if (CATALOGINFO["Fulldir"]) {
		_GALLERYINFO["fulldir"] = CATALOGINFO["Fulldir"];
	} else {
		_GALLERYINFO["fulldir"] = "";			
	}

	if (CATALOGINFO["Fullfiles"]) {
		_GALLERYINFO["fullfiles"] = CATALOGINFO["Fullfiles"];
	} else {
		_GALLERYINFO["fullfiles"] = "";			
	}
	
	if (CATALOGINFO["Fullpreprocess"]) {
		_GALLERYINFO["fullpreprocess"] = CATALOGINFO["Fullpreprocess"];
	} else {
		_GALLERYINFO["fullpreprocess"] = "";			
	}

	if (CATALOGINFO["Thumbdir"]) {
		_GALLERYINFO["thumbdir"] = CATALOGINFO["Thumbdir"];
	} else {
		_GALLERYINFO["thumbdir"] = "";			
	}

	//console.log("++");
	//console.log(_GALLERYINFO["thumbdir"])
	
	// Relative paths given
	if ( !(_GALLERYINFO["thumbdir"].match(/^http:/) || _GALLERYINFO["thumbdir"].match(/^ftp:/) || _GALLERYINFO["thumbdir"].match(/^file:/))) {
		_GALLERYINFO["thumbdir"] = _GALLERYINFO["fulldir"] + _GALLERYINFO["thumbdir"];
	}
	
	if (CATALOGINFO["Thumbpreprocess"]) {
		_GALLERYINFO["thumbpreprocess"] = CATALOGINFO["Thumbpreprocess"];
	} else {
		_GALLERYINFO["thumbpreprocess"] = "";			
	}

	if (_GALLERYINFO["thumbpreprocess"]) { _GALLERYINFO['thumbdir'] = _GALLERYINFO["thumbpreprocess"] + _GALLERYINFO['thumbdir']; }
	if (_GALLERYINFO["fullpreprocess"]) { _GALLERYINFO['fulldir'] = _GALLERYINFO["fullpreprocess"] + _GALLERYINFO['fulldir']; }

	if (CATALOGINFO["Fullpostprocess"]) {
		_GALLERYINFO["fullpostprocess"] = CATALOGINFO["Fullpostprocess"];
	} else {
		_GALLERYINFO["fullpostprocess"] = "";			
	}
	if (CATALOGINFO["Thumbpostprocess"]) {
		_GALLERYINFO["thumbpostprocess"] = CATALOGINFO["Thumbpostprocess"];
	} else {
		_GALLERYINFO["thumbpostprocess"] = "";			
	}

	_GALLERYINFO["totalingallery"] = _GALLERYINFO["files"].length;	
	_GALLERYINFO["orders"]         = extractorders();
	_GALLERYINFO["attributes"]     = extractattributes(galleryid);
	
	if (_GALLERYINFO["autoattributes"])
		_GALLERYINFO["attributes"]["Values"][0]["Filters"] = _GALLERYINFO["autoattributes"]
	
	galleryinfo.GALLERYINFO[galleryid] = _GALLERYINFO;
	//console.log("galleryinfo.js: _GALLERYINFO = ");
	console.log(_GALLERYINFO);
	
	return _GALLERYINFO;

		
}
