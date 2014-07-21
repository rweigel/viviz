function expandtemplate(options,callback) {
	
	var template   = options.template;
	var timeRange  = options.timeRange;
	var indexRange = options.indexRange;
	var type       = options.type;
	var check      = options.check;
	var debug      = options.debug;
	var proxy      = options.proxy;
	var side       = "client";
	
	if (options.timeRange) {
		timeRange = expandISO8601Duration(timeRange);
		Start = timeRange.split("/")[0];
		Stop  = timeRange.split("/")[1];
	} else {
		Start = indexRange.split("/")[0];
		Stop  = indexRange.split("/")[1];
	}
	
	if (debug) console.log("Start: " + Start);
	if (debug) console.log("Stop:  " + Stop);

	if (Start.length == 13) {Start = Start + ":00:00";}
	if (Stop.length == 13) {Stop = Stop + ":00:00";}
	if (Start.length == 16) {Start = Start + ":00";}
	if (Stop.length == 16) {Stop = Stop + ":00";}

	if (debug) console.log("Start: " + Start);
	if (debug) console.log("Stop:  " + Stop);

	var tic = new Date().getTime();
	var files   = [];
	var headers = [];

	if (!options.template.match(/\$|\%/)) {
		files[0] = options.template;
		if (debug) console.log("expandtemplate.js: No wildcards")
		return finished();
	}

	function allzero(obj) {for (var prop in obj) {if (obj[prop] > 0) return false} return true}

	function finished() {
		var elapsed = new Date().getTime() - tic;
		if (debug) {
			if (check) {
				console.log("Generated and checked " + files.length + " URLs in " + elapsed + " ms (" + Math.round(elapsed/files.length) + " ms per)");
			} else {
				console.log("Generated " + files.length + " URLs in " + elapsed + " ms (" + Math.round(files.length/elapsed) + " per ms)");
			}
		}
		
		if (callback) {
			callback(files,headers,options);
		} else {
			return files;
		}
	}
	
	
	function headcomplete(data,i) {
		var Nf = files.length;	
		if (!headcomplete.N) {headcomplete.N = 0;}
		headcomplete.N = headcomplete.N + 1; 
		headers[i] = data;
		if (Nf == headcomplete.N) {
			if (debug) console.log("All head requests complete.");
			return finished();
		}
	}
	
	if (type == "sprintf") {
		if (typeof(Start) === "string") Start = parseInt(Start);	
		if (typeof(Stop) === "string") Stop = parseInt(Stop);
			
		for (i = Start; i < Stop + 1; i++) {
			var tmps = template;
			files[i-Start] = sprintf(tmps,i);
		}
	
		if (check) return head(files,proxy,headcomplete);
		if (!check) return finished();
	}

	if (type == "strftime") {
			
		if (debug) console.log("template      = " + template);

		// Remove time zone with substr(0,25).		
		var START_dateinc  = new Date(new Date(Start).toUTCString().substr(0, 25));
		var START_dateoff  = new Date(new Date(Start).toUTCString().substr(0, 25));
		var STOP_date      = new Date(new Date(Stop).toUTCString().substr(0, 25));

		var addinc = {};
		var addoff = {};

		var keys  = ["microseconds","seconds","minutes","hours","days","days","months","years"];
		var codes = ["f",           "S",      "M",      "H",    "j",   "d",   "m",     "Y"];

		// Extract deltas
		for (i = 0; i < codes.length;i++)
			addinc[keys[i]] = parseInt(template.replace(new RegExp(".*\\${"+ codes[i] +";delta=([0-9].*)}.*"),"$1")) || 0;
		
		// Extract offsets
		for (i = 0; i < codes.length;i++)
			addoff[keys[i]] = parseInt(template.replace(new RegExp(".*\\${"+ codes[i] +";offset=([0-9].*)}.*"),"$1")) || 0;

		// Replace $ with % for codes with delta arguments and remove delta argument. 
		while (template.match("{.*delta.*}"))
			template = template.replace(new RegExp("(.*)\\${([a-z]);delta=[0-9].*}(.*)","gi"),"$1%$2$3");	
		
		// Replace $ with % for all other codes (except those with offset arguments).
		template = template.replace(new RegExp("\\$([a-z])","gi"),"%$1");
		
		// Remove offset argument but keep $.
		while (template.match("{.*offset.*}"))
			template = template.replace(new RegExp("(.*)\\${([a-z]);offset=[0-9].*}(.*)","ig"),"$1$$$2$3");
	
		//if (debug) console.log(template);
		
		for (i = 0; i < codes.length;i++)
		 	if (template.match("%"+codes[i]) && allzero(addinc)) addinc[keys[i]] = 1;		 	

		for (i = 0; i < codes.length;i++)
		 	if (template.match("$"+codes[i]) && allzero(addoff)) addoff[keys[i]] = 1;
						
		if (debug) {console.log("addoff");console.log(addoff);}
		if (debug) {console.log("addinc");console.log(addinc);}

		if (debug) console.log(template);
		if (debug) console.log(START_dateinc);
		
		var i = 0;
		
		START_dateoff.add(addoff);

		if (allzero(addinc)) {
			files[0] = template;
		} else {
			while (START_dateinc.isBefore(STOP_date)) {				
				files[i] = START_dateinc.strftime(template);
				START_dateinc.add(addinc);
				START_dateoff.add(addoff);
				files[i] = START_dateoff.strftime(files[i].replace(/\$/g,"%"));
				i = i+1;
			}
			if (Stop.substring(11).match(/[1-9]/)) {
				
				if (debug) console.log("Stop date has non-zero in time component.  Creating one more file");
				// If stop date has time component, grab extra file.
				files[i] = START_dateinc.strftime(template);
				START_dateinc.add(addinc);
				START_dateoff.add(addoff);
				files[i] = START_dateoff.strftime(files[i].replace(/\$/g,"%"));
		
								
			}

		}	
		if (!callback) return files;
		if (check) return head(files,proxy,headcomplete);
		if (!check) return finished();
		
	}
		
}

function expandISO8601Duration(timeRange,options) {

	function s2b(str) {if (str === "true") {return true} else {return false}}
	function s2i(str) {return parseInt(str)}

	if (!timeRange.match(/^P|\/P|^\-P|\/\-P/)) {return timeRange;}

	now = new Date().toISOString();
	if (options) { 
		var debug = options.debug;
		if (options.now) {
			now = options.now;
		}
	}

	if (timeRange.split("/").length > 1) {
		var options = {};
		if (timeRange.split("/")[0].match(/P/) && !timeRange.split("/")[1].match(/P/)) {
			options.now = timeRange.split("/")[1];
		} else {
			options.now = new Date().toISOString();
		}
		var a = expandISO8601Duration(timeRange.split("/")[0],options);
		var b = expandISO8601Duration(timeRange.split("/")[1],options);
		return a + "/" + b;
	} else {
		Duration = timeRange;
	}
	var Durationo = Duration;
	if (debug) console.log("expandISO8601Duration: Input: " + Duration);
	if (!Duration.match(/P|T/)) return Duration;
	var Durationo = Duration;
	var years = 0;
	var months = 0;
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	if (Duration.match("P")) {
		var sign    = parseInt(Duration.replace(/(.*)P.*/,"$11"));
		var years   = sign*parseInt(Duration.replace(/.*?([0-9]*)Y.*/,"$1"));
		var months  = sign*parseInt(Duration.replace(/.*?([0-9]*)M.*/,"$1"));
		var days    = sign*parseInt(Duration.replace(/.*?([0-9]*)D.*/,"$1"));
	}
	if (Durationo.match("T")) {
		var hours   = sign*parseInt(Durationo.replace(/.*?([0-9]*)H.*/,"$1"));
		var minutes = sign*parseInt(Durationo.replace(/.*?([0-9]*)M.*/,"$1"));
		var seconds = sign*parseInt(Durationo.replace(/.*?([0-9]*)S.*/,"$1"));
	}

	
	if (debug) console.log("expandISO8601Duration: Now: " + now )
	if (debug) console.log("expandISO8601Duration: Offset: ");
	if (debug) console.log({years:years,months:months,days:days,hours:hours,minutes:minutes,seconds:seconds});
	Duration = new Date(now).add({years:years,months:months,days:days,hours:hours,minutes:minutes,seconds:seconds});
	if (debug) console.log("expandISO8601Duration: Now+"+Durationo+" = " + Duration.toISOString())
	
	return Duration.toISOString();
}

// node.js
if (typeof(exports) !== "undefined" && require){

	var fs = require("fs");

	if (fs.existsSync(__dirname + "/deps")) {
		require(__dirname+"/deps/strftime");
		require(__dirname+"/deps/date");
		var sp = require(__dirname+"/deps/sprintf-0.7-beta1");
	} else {
		require(__dirname+"/../deps/strftime");
		require(__dirname+"/../deps/date");
		var sp = require(__dirname+"/../deps/sprintf-0.7-beta1");
	}	

	sprintf = sp.sprintf;
	vsprintf = sp.vsprintf;

	exports.expandtemplate = expandtemplate;
	exports.expandISO8601Duration = expandISO8601Duration;
	
}
