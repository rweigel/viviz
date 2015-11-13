function cataloginfo(galleryid) {

	//console.log("cataloginfo.js: Called.")

	qs = $.parseQueryString();
	var keys = ["dir","full","thumb","strftime","sprintf","script","list","start","stop"]
	var hash = location.hash
	var hashisgallery = false
	for (var j in keys) {
		if (hash.indexOf(keys[j] + "=") > -1) {
			hashisgallery = true
		}
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

		// Copy gallery information
		for (key in VIVIZ["catalog"][i]) {
			if (typeof(VIVIZ["catalog"][i]) === 'string') {
				VIVIZ["galleries"][galleryid][key] = VIVIZ["catalog"][i][key].replace(/^\s+|\s+$/g,'')
			} else {
				VIVIZ["galleries"][galleryid][key] = VIVIZ["catalog"][i][key]
			}
		}

		// Copy configuration information for gallery not found in global configuration
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