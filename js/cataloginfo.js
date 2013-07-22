function cataloginfo(galleryid) {

	// Read XML catalog file.
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
			//console.log('cataloginfo: Using cached gallery list');
			return cataloginfo.GALLERIES;
		}

		var GALLERIES           = new Object();
		GALLERIES["Title"]      = "Galleries";
		GALLERIES["Titleshort"] = "-Galleries-";
		GALLERIES["Class"]      = "updatelglobal";
		GALLERIES["Values"]     = new Array();
		$(cataloginfo.xml).find("catalog > gallery").each(
				function (i) {
					GALLERIES["Values"][i]          = new Object();
					GALLERIES["Values"][i]["Title"] = $(this).children("title").text();
					GALLERIES["Values"][i]["Value"] = $(this).attr("id");
					GALLERIES["Values"][i]["Id"]    = $(this).attr('id');
				});
	
		//console.log("cataloginfo.js: Returning list of all galleries in xml/catalog.xml");
		//console.log(GALLERIES);
		cataloginfo.GALLERIES = GALLERIES;
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
				if (_CATALOGINFO["Fulldir"])					
					galleryid = _CATALOGINFO["Fulldir"];
			}
			//console.log('cataloginfo.js: galleryid = ' + galleryid);

			if (_CATALOGINFO["Strftime"])
				_CATALOGINFO["Strftime"] = _CATALOGINFO["Strftime"].replace(/\$/g,"%");
			if (_CATALOGINFO["Sprintf"])
				_CATALOGINFO["Sprintf"] = _CATALOGINFO["Sprintf"].replace(/\$/g,"%");
		
			if (_CATALOGINFO["Strftime"] && _CATALOGINFO["Stop"]) {
				_CATALOGINFO["StrftimeStop"] = _CATALOGINFO["Stop"];
			}
			if (_CATALOGINFO["Strftime"] && _CATALOGINFO["Start"]) {
				_CATALOGINFO["StrftimeStart"] = _CATALOGINFO["Start"];
			}
			if (_CATALOGINFO["Sprintf"] && _CATALOGINFO["Stop"]) {
				_CATALOGINFO["SprintfStop"] = _CATALOGINFO["Stop"];
			}
			if (_CATALOGINFO["Sprintf"] && _CATALOGINFO["Start"]) {
				_CATALOGINFO["SprintfStart"] = _CATALOGINFO["Start"];
			}
			
			if (!_CATALOGINFO["Galleryid"])
				_CATALOGINFO["Galleryid"] = galleryid;

			if (!_CATALOGINFO["Files"] && !_CATALOGINFO["Sprintf"] && !_CATALOGINFO["Strftime"])
				_CATALOGINFO["Files"] = galleryid;
			
			if (!_CATALOGINFO["Fulldir"])
				_CATALOGINFO["Fulldir"] = galleryid;
			
			if (!_CATALOGINFO["Thumbdir"])
				_CATALOGINFO["Thumbdir"]  = galleryid;

			_CATALOGINFO["Title"]     = galleryid;
			_CATALOGINFO["About"]     = "Gallery auto-generated based on URL."
			_CATALOGINFO["Aboutlink"] = galleryid;
			//_CATALOGINFO["Fullpreprocess"] = "http://aurora.gmu.edu/cgi-bin/convert.cgi?scale=4";

			// Place auto-generated information at front of gallery list
			//console.log('cataloginfo.js: Adding ' + galleryid + ' to front of gallery list cache.');
			cataloginfo.GALLERIES["Values"].splice(0,0,new Object());
			cataloginfo.GALLERIES["Values"][0]["Title"] = galleryid;
			cataloginfo.GALLERIES["Values"][0]["Value"] = galleryid;
			cataloginfo.GALLERIES["Values"][0]["Id"]    = galleryid;

		} else {
			// Extract gallery information from from catalog.xml

			//console.log("cataloginfo.js: Returning info for galleryid = " + galleryid);
			var query = "catalog > gallery[id='" + galleryid + "']";
	
			//console.log('cataloginfo.js: Evaluating ' + query);

			_CATALOGINFO["Galleryid"]  = $(cataloginfo.xml).find(query).attr('id');
			if (!_CATALOGINFO["Galleryid"]) {
				error("Error: Gallery with id " + galleryid + " not found in <a href='xml/catalog.xml'>catalog.xml</a>. Redirecting.");
				setTimeout(function () {location.hash = "#"},3000);
				//$("#error").html("");
			}
			_CATALOGINFO["Title"]      = $(cataloginfo.xml).find(query).siblings('title').text();
			if (_CATALOGINFO["Title"] == "")
				_CATALOGINFO["Title"] = _CATALOGINFO["Galleryid"]
			
			_CATALOGINFO["Titleshort"] = $(cataloginfo.xml).find(query).siblings('titleshort').text();
			if (_CATALOGINFO["Titleshort"] == "")
				_CATALOGINFO["Titleshort"] = _CATALOGINFO["Title"]
	
			_CATALOGINFO["Files"]         = $(cataloginfo.xml).find(query).children('files').text();
			// TODO: change this because this will match "aboutlink" too. Syntax is ":children['about']" ? 
			_CATALOGINFO["About"]         = $(cataloginfo.xml).find(query).children('about').text();	
			_CATALOGINFO["Aboutlink"]     = $(cataloginfo.xml).find(query).children('aboutlink').text();
			_CATALOGINFO["Script"]        = $(cataloginfo.xml).find(query).children('script').text();
			_CATALOGINFO["Script"]        = $(cataloginfo.xml).find(query).children('code').text();
			_CATALOGINFO["Strftime"]      = $(cataloginfo.xml).find(query).children('strftime').text();
			_CATALOGINFO["StrftimeStart"] = $(cataloginfo.xml).find(query).children('strftimestart').text();
			_CATALOGINFO["StrftimeStop"]  = $(cataloginfo.xml).find(query).children('strftimestop').text();
			_CATALOGINFO["Sprintf"]       = $(cataloginfo.xml).find(query).children('sprintf').text();
			_CATALOGINFO["SprintfStart"]  = $(cataloginfo.xml).find(query).children('sprintfstart').text();
			_CATALOGINFO["SprintfStop"]   = $(cataloginfo.xml).find(query).children('sprintfstop').text();
			_CATALOGINFO["Fullfiles"]    = $(cataloginfo.xml).find(query).children('fullfiles').text();
			//console.log((cataloginfo.xml).find(query).children('fullfiles').text());

			_CATALOGINFO["Fulldir"]       = $(cataloginfo.xml).find(query).children('fulldir').text();

			_CATALOGINFO["Thumbdir"]      = $(cataloginfo.xml).find(query).children('thumbdir').text();
			_CATALOGINFO["Thumbfiles"]      = $(cataloginfo.xml).find(query).children('thumbfiles').text();
			_CATALOGINFO["Fullpreprocess"]  = $(cataloginfo.xml).find(query).children('fullpreprocess').text();
			_CATALOGINFO["Thumbpreprocess"] = $(cataloginfo.xml).find(query).children('thumbpreprocess').text();
			_CATALOGINFO["Fullpostprocess"]  = $(cataloginfo.xml).find(query).children('fullpostprocess').text();
			_CATALOGINFO["Thumbpostprocess"] = $(cataloginfo.xml).find(query).children('thumbpostprocess').text();
		
		}
		//console.log(query)
		//console.log($(cataloginfo.xml).find(query).children('fulldir').text())
		// Extract gallery node (there must be a way to do this without using a RegEx, for example, using find() ...)
		// Will only match id="Test" and not not id = "Test" or id='Test'.
		//console.log(galleryid);

		re = new RegExp('[\\S\\s]*(<gallery id="' + galleryid + '">[\\S\\s]*?<\/gallery>)[\\S\\s]*');
		_CATALOGINFO["Xml"] = cataloginfo.jqXHR.responseText.replace(re,"$1"); 
		_CATALOGINFO["Xml"] = _CATALOGINFO["Xml"].replace(/\n\t/g,'\n');
		
		cataloginfo.CATALOGINFO[galleryid] = _CATALOGINFO;
		//console.log("cataloginfo.js: _CATALOGINFO =");
		//console.log(_CATALOGINFO);
		return _CATALOGINFO;
		
	}
		
}