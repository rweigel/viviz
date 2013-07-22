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
