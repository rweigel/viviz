function cataloginfo(galleryid) {

	console.log("cataloginfo.js: Called.")

	qs = $.parseQueryString();
	var hashisgallery = false
	if (location.hash.match(/fulldir=/)) {
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

		if (hashisgallery) {
			// Hash is query string with gallery information
			console.log("cataloginfo.js: Hash is a query string with gallery information:")
			console.log(qs)
			if (!VIVIZ["catalog"]) {
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
					GALLERIES["Values"][i]          = new Object();
					GALLERIES["Values"][i]["Title"] = el.title || el.id;
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

		console.log(qs)
		for (key in qs) {
			if (qs[key] === 'true') {qs[key] = true}
			if (qs[key] === 'false') {qs[key] = false}
			if ($.isNumeric(qs[key])) {qs[key] = parseFloat(qs[key])}
			if (VIVIZ[galleryid]) {
				if (VIVIZ[galleryid][key] !== qs[key] && qs[key] && VIVIZ[galleryid][key]) {
					console.log("cataloginfo.js: Changing setting " + key + " from " + VIVIZ[galleryid][key] + " to " + qs[key]);
					VIVIZ[galleryid][key] = qs[key]
				}
			}
		}

		console.log("cataloginfo.js: galleryid given.  Returning gallery information for galleryid = " + galleryid)
		var _CATALOGINFO = new Object();

		// JSON information

		// Find gallery with matching id in json array.
		for (i = 0;i < VIVIZ["catalog"].length; i++) {
			if (VIVIZ["catalog"][i]["id"] === galleryid) {
				_CATALOGINFO["galleryid"] = VIVIZ["catalog"][i]["id"]
				break
			}
		}
		
		// Copy gallery information
		for (key in VIVIZ["catalog"][i]) {
			_CATALOGINFO[key] = VIVIZ["catalog"][i][key];
		}
		
		if (_CATALOGINFO["sprintf"] && _CATALOGINFO["start"]) {
			_CATALOGINFO["sprintfstart"] = _CATALOGINFO["start"]
		}
		if (_CATALOGINFO["sprintf"] && _CATALOGINFO["stop"]) {
			_CATALOGINFO["sprintfstop"] = _CATALOGINFO["stop"]
		}

		if (_CATALOGINFO["strftime"] && _CATALOGINFO["start"]) {
			_CATALOGINFO["strftimestart"] = _CATALOGINFO["start"]
		}
		if (_CATALOGINFO["strftime"] && _CATALOGINFO["stop"]) {
			_CATALOGINFO["strftimestop"] = _CATALOGINFO["stop"]
		}
		
		// Convert to string (for case where $Y alone is used in strftime, strftimestart could be a string.)
		if (_CATALOGINFO["strftimestart"])
			_CATALOGINFO["strftimestart"] = "" + _CATALOGINFO["strftimestart"]

		if (_CATALOGINFO["strftimestop"])		
		_CATALOGINFO["strftimestop"] = "" + _CATALOGINFO["strftimestop"]

		_CATALOGINFO["json"] = VIVIZ["catalog"][i]
	
		console.log("cataloginfo.js: Returning")
		console.log(_CATALOGINFO)
		return _CATALOGINFO;	
	}
		
}