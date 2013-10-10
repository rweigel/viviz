function cataloginfo(galleryid) {

	// Read XML catalog file.
	if (typeof(cataloginfo.json) != 'object') {
		cataloginfo.json = new Object();
		cataloginfo.json = catalogjsonuploads.concat(catalogjsonbase);
	}
	if (typeof(cataloginfo.xml) != 'object') {
		//console.log("cataloginfo.js: No cached xml/catalog.xml");
		cataloginfo.xml = new Object();
		cataloginfo.jqXHR = new Object();

		var text = $("#xml").text();
		if (text.length > 0) { 
			var text2 = $((new DOMParser).parseFromString(text, "text/xml"));
			cataloginfo.xml = text2;
			//cataloginfo.xml = $.parseXML(text);
			cataloginfo.jqXHR.responseText = $("#xml").text();
			return cataloginfo();
		}

		$.ajax({
			type: "GET",
			url: "xml/catalog.xml",
			async: false,
			dataType: "xml",
			success: function (data,textStatus, jqXHR) {
				cataloginfo.jqXHR = jqXHR;
				cataloginfo.xml = data;
				//console.log(cataloginfo.xml)
			},
			error: function (xhr, textStatus, errorThrown) {
				var text = $("#xml").text();
				if (text.length) {
					var text2 = $((new DOMParser).parseFromString(text, "text/xml"));
					cataloginfo.xml = text2;
					//cataloginfo.xml = $.parseXML(text);
					cataloginfo.jqXHR.responseText = $("#xml").text();
					warning("cataloginfo.js: Could not read xml/catalog.xml.  Using catalog found embedded in g.htm.  See http://viviz.org/#local_machine.")
					var textError = errorThrown.message;
					 
					if (location.href.indexOf("file://")==0) {
						error(" Some browsers do not allow files to be read from local machine.  A different browser or installation method may be required. http://viviz.org/#Installation");
					}
					if (textStatus) {
						//error("<p>cataloginfo.js: Error reading xml/catalog.xml. Error thrown = <b>" + textError + "</b>. Status = " + textStatus + "</p>");
					} else {
						//error("<p>cataloginfo.js: Error reading xml/catalog.xml. Error thrown = <b>" + errorThrown + "</b></p>");
					}
				}
				//console.log("cataloginfo.js: Error reading xml/catalog.xml.");
				//console.log("cataloginfo.js: status: " + textStatus);
				//console.log("cataloginfo.js: server error: " + errorThrown);
			}
		});
	}

	// If no arguments, return list of galleries.
	if (arguments.length == 0) {

		if (typeof(cataloginfo.GALLERIES) != 'object') {
			cataloginfo.GALLERIES = new Object();
		} else {
			console.log('cataloginfo: Using cached gallery list');
			return cataloginfo.GALLERIES;
		}

		var GALLERIES           = new Object();
		GALLERIES["Title"]      = "Galleries";
		GALLERIES["Titleshort"] = "-Galleries-";
		GALLERIES["Class"]      = "updatelglobal";
		GALLERIES["Values"]     = new Array();
		var j = 0;
		var cat = [];
		
		$(cataloginfo.xml).find("catalog > gallery").each(
				function (i) {
					GALLERIES["Values"][i]          = new Object();
					GALLERIES["Values"][i]["Title"] = $(this).children("title").text();
					GALLERIES["Values"][i]["Value"] = $(this).attr("id");
					GALLERIES["Values"][i]["Id"]    = $(this).attr('id');
					j = j+1;
				});
		
		cataloginfo.json.forEach(
				function (el,i) {
					GALLERIES["Values"][i+j]          = new Object();
					GALLERIES["Values"][i+j]["Title"] = el.title;
					GALLERIES["Values"][i+j]["Value"] = el.id;
					GALLERIES["Values"][i+j]["Id"]    = el.id;					
				});
		
		console.log("cataloginfo.js: Returning list of all galleries in xml/catalog.xml");
		cataloginfo.GALLERIES = GALLERIES;
		
		// Use to write catalog.xml as JSON (without attributes node).
		if (0) {
			for (i = 0;i < GALLERIES["Values"].length;i++) {
				//console.log(GALLERIES["Values"][i]["Id"])
				//$("#cat").append(GALLERIES["Values"][i]["Id"] + "\n")
				$("#cat").append(JSON.stringify(cataloginfo(GALLERIES["Values"][i]["Id"])) + ",\n")
			}
		}
		
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
		
		if ( (galleryid.match(/http/)) || (galleryid.match(/ftp/)) || (galleryid.match(/file/)) ) {
			// Auto-generate catalog information from URL
			
			//console.log('cataloginfo.js: URL-based galleryid found URL.  Parsing query parameters to create catalog information.')

			if (galleryid.match("&")) {
				var querystr = galleryid;
				var queryarr = querystr.split("&");
				if (!queryarr[0].match("=")) {  // First argument is assumed to be fulldir
					queryarr[0] = "fulldir=" + queryarr[0];
				}  
				for (i = 0; i < queryarr.length; i++) {
					var paramarr = queryarr[i].split('=');
					var key = paramarr[0].charAt(0).toUpperCase() + paramarr[0].slice(1);
					_CATALOGINFO[key] = paramarr[1];
				}
				if (_CATALOGINFO["fulldir"])					
					galleryid = _CATALOGINFO["fulldir"];
			}

			if (_CATALOGINFO["strftime"])
				_CATALOGINFO["strftime"] = _CATALOGINFO["strftime"].replace(/\$/g,"%");
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

			if (!_CATALOGINFO["files"] && !_CATALOGINFO["sprintf"] && !_CATALOGINFO["strftime"])
				_CATALOGINFO["files"] = galleryid;
			
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
			// Extract gallery information from from catalog.xml

			console.log("cataloginfo.js: Returning info for galleryid = " + galleryid);
			var query = "catalog > gallery[id='" + galleryid + "']";
	
			//console.log('cataloginfo.js: Evaluating ' + query);

			_CATALOGINFO["galleryid"]  = $(cataloginfo.xml).find(query).attr('id');
			if (!_CATALOGINFO["galleryid"]) {
				error("Error: Gallery with id " + galleryid + " not found in <a href='xml/catalog.xml'>catalog.xml</a>. Redirecting.");
				setTimeout(function () {location.hash = "#"},3000);
				//$("#error").html("");
			}
			_CATALOGINFO["title"]      = $(cataloginfo.xml).find(query).siblings('title').text();
			if (_CATALOGINFO["title"] == "")
				_CATALOGINFO["title"] = _CATALOGINFO["galleryid"]
			
			_CATALOGINFO["titleshort"] = $(cataloginfo.xml).find(query).siblings('titleshort').text();
			if (_CATALOGINFO["titleshort"] == "")
				_CATALOGINFO["titleshort"] = _CATALOGINFO["title"]
	
			_CATALOGINFO["files"]         = $(cataloginfo.xml).find(query).children('files').text();
			
			// TODO: change this because this will match "aboutlink" too. Syntax is ":children['about']" ? 
			_CATALOGINFO["about"]         = $(cataloginfo.xml).find(query).children('about').text();	
			_CATALOGINFO["aboutlink"]     = $(cataloginfo.xml).find(query).children('aboutlink').text();
			_CATALOGINFO["script"]        = $(cataloginfo.xml).find(query).children('script').text();
			_CATALOGINFO["script"]        = $(cataloginfo.xml).find(query).children('xscript').text();
			_CATALOGINFO["strftime"]      = $(cataloginfo.xml).find(query).children('strftime').text();
			_CATALOGINFO["strftimestart"] = $(cataloginfo.xml).find(query).children('strftimestart').text();
			_CATALOGINFO["strftimestop"]  = $(cataloginfo.xml).find(query).children('strftimestop').text();
			_CATALOGINFO["sprintf"]       = $(cataloginfo.xml).find(query).children('sprintf').text();
			_CATALOGINFO["sprintfstart"]  = $(cataloginfo.xml).find(query).children('sprintfstart').text();
			_CATALOGINFO["sprintfstop"]   = $(cataloginfo.xml).find(query).children('sprintfstop').text();
			_CATALOGINFO["fullfiles"]    = $(cataloginfo.xml).find(query).children('fullfiles').text();
			//console.log((cataloginfo.xml).find(query).children('fullfiles').text());

			_CATALOGINFO["fulldir"]       = $(cataloginfo.xml).find(query).children('fulldir').text();

			_CATALOGINFO["thumbdir"]      = $(cataloginfo.xml).find(query).children('thumbdir').text();
			_CATALOGINFO["thumbfiles"]      = $(cataloginfo.xml).find(query).children('thumbfiles').text();
			_CATALOGINFO["fullpreprocess"]  = $(cataloginfo.xml).find(query).children('fullpreprocess').text();
			_CATALOGINFO["thumbpreprocess"] = $(cataloginfo.xml).find(query).children('thumbpreprocess').text();
			_CATALOGINFO["fullpostprocess"]  = $(cataloginfo.xml).find(query).children('fullpostprocess').text();
			_CATALOGINFO["thumbpostprocess"] = $(cataloginfo.xml).find(query).children('thumbpostprocess').text();

			for (i = 0;i<cataloginfo.json.length;i++) {
				if (cataloginfo.json[i]["id"] === galleryid) break;
			}
			
			if (typeof(cataloginfo.json[i]) !== "undefined") {
				_CATALOGINFO["galleryid"] = cataloginfo.json[i]["id"]
				for (key in cataloginfo.json[i]) {
					console.log(key)
					_CATALOGINFO[key] = cataloginfo.json[i][key];
				}
			}

		}
		
		console.log(_CATALOGINFO)
		//console.log(query)
		//console.log($(cataloginfo.xml).find(query).children('fulldir').text())

		//re = new RegExp('[\\S\\s]*(<gallery id="' + galleryid + '">[\\S\\s]*?<\/gallery>)[\\S\\s]*');
		//_CATALOGINFO["xml"] = cataloginfo.jqXHR.responseText.replace(re,"$1"); 
		//_CATALOGINFO["xml"] = _CATALOGINFO["xml"].replace(/\n\t/g,'\n');
		cataloginfo.CATALOGINFO[galleryid] = _CATALOGINFO;

		return _CATALOGINFO;
		
	}
		
}