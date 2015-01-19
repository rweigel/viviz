function cataloginfo(galleryid) {

	function setsource(v,source) {
		for (i = 0;i<v.length;i++) {
			v[i]["source"] = source;
		}
		return v
	}


	if (typeof(cataloginfo.js) != 'object') {
		cataloginfo.js = new Object();
	    if (typeof(catalogjsbase) === 'function') {
		console.log("cataloginfo.js: catalogjsbase function is defined.");
		cataloginfo.js = catalogjsbase();
	    }
	}


	if (typeof(cataloginfo.json) != 'object') {
		console.log("cataloginfo.js: No client-side cache of catalogjsonbase information.");
		cataloginfo.json = new Object();
		if (typeof(catalogjsonuploads) !== "undefined" && typeof(catalogjsonbase) !== "undefined") {
			console.log("cataloginfo.js: Variables catalogjsonbase and catalogjsonuploads both are defined.  Using both.");
			catalogjsonuploads = setsource(catalogjsonuploads,"uploads");
			catalogjsonbase    = setsource(catalogjsonbase,"xml/catalog.json");
			cataloginfo.json   = catalogjsonbase.concat(catalogjsonuploads);
		} else if (typeof(catalogjsonuploads) === "undefined" && typeof(catalogjsonbase) !== "undefined") {
			console.log("cataloginfo.js: Variable catalogjsonbase is defined.");
			catalogjsonbase    = setsource(catalogjsonbase,"xml/catalog.json");
			cataloginfo.json   = catalogjsonbase;
		} else if (typeof(catalogjsonuploads) !== "undefined" && typeof(catalogjsonbase) === "undefined") {
			console.log("cataloginfo.js: Variable catalogjsonuploads is defined.");
			catalogjsonuploads = setsource(catalogjsonuploads,"uploads");
			cataloginfo.json   = catalogjsonuploads;
		} else {
			console.log("cataloginfo.js: Variables catalogjsonbase and catalogjsonuploads both are not defined.");
		}
	}

	// Read XML catalog file.
	if (typeof(cataloginfo.xml) != 'object') {
		console.log("cataloginfo.js: No cached cataloginfo.xml");
		cataloginfo.xml = new Object();
		cataloginfo.jqXHR = new Object();

		var text = $("#xml").text();
		if (text.match("catalog")) { 
			console.log("cataloginfo.js: Found xml catalog node in index.html. Using it and ignoring xml/catalog.xml.")
			var text2 = $((new DOMParser).parseFromString(text, "text/xml"));
			cataloginfo.xml = text2;
			cataloginfo.jqXHR.responseText = $("#xml").text();
			return cataloginfo();
		} else {
			console.log("cataloginfo.js: Did not find xml catalog information in index.html.")
		}


		if (((cataloginfo.js) || (cataloginfo.json)) && (typeof(VIVIZ.CATALOGXML) === "undefined")) {
		    console.log("cataloginfo.js: Not using xml/catalog.xml (if found) because catalog info found in js or json.")
		} else {
		    VIVIZ.CATALOGXML = "xml/catalog.xml";
		    console.log("cataloginfo.js: Variable VIVIZ.CATALOGXML is not defined.  Using xml/catalog.xml.")

			$.ajax({
				type: "GET",
				    url: VIVIZ.CATALOGXML,
				    async: false,
				    dataType: "xml",
				    success: function (data,textStatus, jqXHR) {
				    cataloginfo.jqXHR = jqXHR;
				    cataloginfo.xml = data;
				    console.log("cataloginfo.js: Finished reading " + VIVIZ.CATALOGXML)
					},
				    error: function (xhr, textStatus, errorThrown) {
				    console.log("cataloginfo.js: Could not read " + VIVIZ.CATALOGXML + " " + errorThrown.message.split(":")[0])
					}
			    });
		}
	}

	// If no arguments, return list of galleries.
	if (arguments.length == 0) {

		if (typeof(cataloginfo.GALLERIES) != 'object') {
			cataloginfo.GALLERIES = new Object();
		} else {
			console.log('cataloginfo.js: Using cached gallery list');
			return cataloginfo.GALLERIES;
		}

		var GALLERIES           = new Object();
		GALLERIES["Title"]      = "Galleries";
		GALLERIES["Titleshort"] = "-Galleries-";
		GALLERIES["Class"]      = "updatelglobal";
		GALLERIES["Values"]     = new Array();
		
		var j = 0;
		var cat = [];
		
		if (cataloginfo.xml) {
			$(cataloginfo.xml).find("catalog > gallery").each(
					function (i) {
						GALLERIES["Values"][i]          = new Object();
						GALLERIES["Values"][i]["Title"] = $(this).children("title").text();
						GALLERIES["Values"][i]["Value"] = $(this).attr("id");
						GALLERIES["Values"][i]["Id"]    = $(this).attr('id');
						j = j+1;
					});
		}

		if (cataloginfo.json.length > 0) {
			cataloginfo.json.forEach(
					function (el,i) {
						GALLERIES["Values"][i+j]          = new Object();
						GALLERIES["Values"][i+j]["Title"] = el.title || el.id;
						GALLERIES["Values"][i+j]["Value"] = el.id;
						GALLERIES["Values"][i+j]["Id"]    = el.id;					
					});
		}		
		if (cataloginfo.js.length > 0) {
			cataloginfo.js.forEach(
					function (el,i) {
						GALLERIES["Values"][i+j]          = new Object();
						GALLERIES["Values"][i+j]["Title"] = el.title || el.id;
						GALLERIES["Values"][i+j]["Value"] = el.id;
						GALLERIES["Values"][i+j]["Id"]    = el.id;					
					});
		}		

		cataloginfo.GALLERIES = GALLERIES;
		
		// Use to write catalog.xml as JSON (without attributes node).
		if (0) {
			for (i = 0;i < GALLERIES["Values"].length;i++) {
				//console.log(GALLERIES["Values"][i]["Id"])
				//$("#cat").append(GALLERIES["Values"][i]["Id"] + "\n")
				$("#cat").append(JSON.stringify(cataloginfo(GALLERIES["Values"][i]["Id"])) + ",\n")
			}
			$("#cat").show();
		}
		
		if (GALLERIES.Values.length == 0) {
			$("#connectionerror").html("Problem reading gallery information.  See below for errors.");
			console.log("cataloginfo.js: Problem reading gallery information.");
			$("body").append("<a href='"+VIVIZ.CATALOGXML+"'>"+VIVIZ.CATALOGXML+"</a>").append("<iframe width='100%' src='"+VIVIZ.CATALOGXML+"'/>")
			return "";
		}
		console.log("cataloginfo.js: Returning list of "+GALLERIES.Values.length+" galleries.");

		return GALLERIES;
	}

	// If catalog id given, return gallery information.
	if (arguments.length == 1) {

		if (typeof(cataloginfo.CATALOGINFO) != 'object') {
			cataloginfo.CATALOGINFO = new Object();
		}

		if (cataloginfo.CATALOGINFO[galleryid]) {
			//console.log('cataloginfo: Using cached catalog information for ' + galleryid);
			return cataloginfo.CATALOGINFO[galleryid]
		}

		var _CATALOGINFO = new Object();
		
		if ( galleryid.match(/^ftp\:\//) || galleryid.match(/^http\:\//) || galleryid.match(/^https\:\//) || galleryid.match(/^file\:\//) ) {
			// Auto-generate catalog information from URL
			
			console.log(galleryid)
			console.log('cataloginfo.js: URL-based galleryid found URL.  Parsing query parameters to create catalog information.')

			_CATALOGINFO["source"] = "URL";

			if (galleryid.match("&")) {
				var querystr = galleryid;
				var queryarr = querystr.split("&");
				if (!queryarr[0].match("=")) {  // First argument is assumed to be fulldir
					queryarr[0] = "fulldir=" + queryarr[0];
				}  
				for (i = 0; i < queryarr.length; i++) {
					var paramarr = queryarr[i].split('=');
					var key = paramarr[0];
					_CATALOGINFO[key] = decodeURIComponent(paramarr[1]);
				}
				if (_CATALOGINFO["fulldir"])					
					galleryid = decodeURIComponent(_CATALOGINFO["fulldir"]);
			}

			if (_CATALOGINFO["strftime"])
				_CATALOGINFO["strftime"] = decodeURIComponent(_CATALOGINFO["strftime"]).replace(/\$/g,"%");
			if (_CATALOGINFO["sprintf"])
				_CATALOGINFO["sprintf"] = _CATALOGINFO["sprintf"].replace(/\$/g,"%");
		
			if (_CATALOGINFO["strftime"] && _CATALOGINFO["stop"]) {
				_CATALOGINFO["strftimestop"] = _CATALOGINFO["stop"];
			}
			if (_CATALOGINFO["strftime"] && _CATALOGINFO["start"]) {
				_CATALOGINFO["strftimestart"] = _CATALOGINFO["start"];
			}
			if (_CATALOGINFO["sprintf"] && _CATALOGINFO["stop"]) {
				_CATALOGINFO["sprintfStop"] = _CATALOGINFO["stop"];
			}
			if (_CATALOGINFO["sprintf"] && _CATALOGINFO["start"]) {
				_CATALOGINFO["sprintfstart"] = _CATALOGINFO["start"];
			}

			if (!_CATALOGINFO["galleryid"])
				_CATALOGINFO["galleryid"] = galleryid;

			if (!_CATALOGINFO["fullfilelist"] && !_CATALOGINFO["sprintf"] && !_CATALOGINFO["strftime"])
				_CATALOGINFO["fullfilelist"] = galleryid;
			
			if (!_CATALOGINFO["fulldir"])
				_CATALOGINFO["fulldir"] = galleryid;
			
			if (!_CATALOGINFO["thumbdir"])
				_CATALOGINFO["thumbdir"]  = galleryid;

			_CATALOGINFO["title"]     = galleryid;
			_CATALOGINFO["about"]     = "Gallery auto-generated based on URL."
			_CATALOGINFO["aboutlink"] = galleryid;

			// Place auto-generated information at front of gallery list
			//console.log('cataloginfo.js: Adding ' + galleryid + ' to front of gallery list cache.');
			cataloginfo.GALLERIES["Values"].splice(0,0,new Object());
			cataloginfo.GALLERIES["Values"][0]["Title"] = galleryid;
			cataloginfo.GALLERIES["Values"][0]["Value"] = galleryid;
			cataloginfo.GALLERIES["Values"][0]["Id"]    = galleryid;

		} else {


		    if (Object.keys(cataloginfo.xml).length > 0) {
			// Extract gallery information from from catalog.xml

			var text = $("#xml").text();
			if (text.length > 0) { 
				_CATALOGINFO["source"] = "index.html";
			} else {
				_CATALOGINFO["source"] = "xml/catalog.xml";
			}

			console.log("cataloginfo.js: Returning info for galleryid = " + galleryid);
			var query = "catalog > gallery[id='" + galleryid + "']";
	
			//console.log('cataloginfo.js: Evaluating ' + query);

			_CATALOGINFO["galleryid"]  = $(cataloginfo.xml).find(query).attr('id');
			if (!_CATALOGINFO["galleryid"]) {
				//warning("Error: Gallery with id " + galleryid + " not found in <a href='xml/catalog.xml'>catalog.xml</a>. Redirecting.");
				console.log("Error: Gallery with id " + galleryid + " not found in <a href='xml/catalog.xml'>catalog.xml</a>.");
				//setTimeout(function () {location.hash = "#"},1000);
				return "";
				//$("#error").html("");
			}
			_CATALOGINFO["title"]      = $(cataloginfo.xml).find(query).siblings('title').text();
			
			_CATALOGINFO["titleshort"] = $(cataloginfo.xml).find(query).siblings('titleshort').text();
			if (_CATALOGINFO["titleshort"] == "")
				_CATALOGINFO["titleshort"] = _CATALOGINFO["title"]
	
			_CATALOGINFO["files"]         = $(cataloginfo.xml).find(query).children('files').text();
			
			// TODO: change this because this will match "aboutlink" too. Syntax is ":children['about']" ? 
			_CATALOGINFO["about"]            = $(cataloginfo.xml).find(query).children('about').text();	
			_CATALOGINFO["aboutlink"]        = $(cataloginfo.xml).find(query).children('aboutlink').text();
			_CATALOGINFO["strftime"]         = $(cataloginfo.xml).find(query).children('strftime').text();
			_CATALOGINFO["strftimestart"]    = $(cataloginfo.xml).find(query).children('strftimestart').text();
			_CATALOGINFO["strftimestop"]     = $(cataloginfo.xml).find(query).children('strftimestop').text();
			_CATALOGINFO["sprintf"]          = $(cataloginfo.xml).find(query).children('sprintf').text();
			_CATALOGINFO["sprintfstart"]     = $(cataloginfo.xml).find(query).children('sprintfstart').text();
			_CATALOGINFO["sprintfstop"]      = $(cataloginfo.xml).find(query).children('sprintfstop').text();
			_CATALOGINFO["sprintfdelta"]     = $(cataloginfo.xml).find(query).children('sprintfdelta').text();

			_CATALOGINFO["fullpreprocess"]   = $(cataloginfo.xml).find(query).children('fullpreprocess').text();
			_CATALOGINFO["fullpostprocess"]  = $(cataloginfo.xml).find(query).children('fullpostprocess').text();
			_CATALOGINFO["fullfilelist"]     = $(cataloginfo.xml).find(query).children('fullfilelist').text();
			_CATALOGINFO["fulllistscript"]   = $(cataloginfo.xml).find(query).children('fulllistscript').text();
			_CATALOGINFO["fullfiles"]        = $(cataloginfo.xml).find(query).children('fullfiles').text();
			_CATALOGINFO["fulldir"]          = $(cataloginfo.xml).find(query).children('fulldir').text();

			_CATALOGINFO["thumbpreprocess"]  = $(cataloginfo.xml).find(query).children('thumbpreprocess').text();
			_CATALOGINFO["thumbpostprocess"] = $(cataloginfo.xml).find(query).children('thumbpostprocess').text();
			_CATALOGINFO["thumbfilelist"]    = $(cataloginfo.xml).find(query).children('thumbfilelist').text();
			_CATALOGINFO["thumblistscript"]  = $(cataloginfo.xml).find(query).children('thumblistscript').text();
			_CATALOGINFO["thumbfiles"]       = $(cataloginfo.xml).find(query).children('thumbfiles').text();
			_CATALOGINFO["thumbdir"]         = $(cataloginfo.xml).find(query).children('thumbdir').text();
		    }

		    // Find catalog with matching id in json array.
		    for (i = 0;i<cataloginfo.json.length;i++) {
			if (cataloginfo.json[i]["id"] === galleryid) break;
		    }
		    
		    if (typeof(cataloginfo.json[i]) !== "undefined") {
			_CATALOGINFO["galleryid"] = cataloginfo.json[i]["id"]
			    for (key in cataloginfo.json[i]) {
				_CATALOGINFO[key] = cataloginfo.json[i][key];
			    }
		    }
		    
		    // Find catalog with matching id in json array.
		    for (i = 0;i<cataloginfo.js.length;i++) {
			if (cataloginfo.js[i]["id"] === galleryid) break;
		    }
		    
		    if (typeof(cataloginfo.js[i]) !== "undefined") {
			_CATALOGINFO["galleryid"] = cataloginfo.js[i]["id"]
			    for (key in cataloginfo.js[i]) {
				_CATALOGINFO[key] = cataloginfo.js[i][key];
			    }
		    }
		    
		}


		// Set defaults (gallery.js check for empty string)
		if (!_CATALOGINFO["about"] || !_CATALOGINFO["about"]) {
		    _CATALOGINFO["about"] = "";
		} 
		if (!_CATALOGINFO["aboutlink"] || !_CATALOGINFO["aboutlink"]) {
		    _CATALOGINFO["aboutlink"] = "";
		} 
		if (!_CATALOGINFO["sprintfdelta"]|| !_CATALOGINFO["sprintfdelta"]) {
		    _CATALOGINFO["sprintfdelta"] = "";
		} 

		if (_CATALOGINFO["title"] === "" || !_CATALOGINFO["title"]) {
		    _CATALOGINFO["title"] = _CATALOGINFO["galleryid"];
		}

		// There must be a better way of doing this
		re = new RegExp('[\\S\\s]*(<gallery id="' + galleryid + '">[\\S\\s]*?<\/gallery>)[\\S\\s]*');
		if (typeof(cataloginfo.jqXHR.responseText) === "string") {
			_CATALOGINFO["xml"] = cataloginfo.jqXHR.responseText.replace(re,"$1"); 
			_CATALOGINFO["xml"] = _CATALOGINFO["xml"].replace(/\n\t/g,'\n');
		}
		cataloginfo.CATALOGINFO[galleryid] = _CATALOGINFO;

		// TODO: Validate all catalogs and strip bad ones.
		
		console.log(_CATALOGINFO)
		return _CATALOGINFO;
		
	}
		
}