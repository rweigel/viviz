function expandtemplate(options,callback) {

	// Interpretation of timeRanges:
	// DATE/DURATION       = DATE/now+DURATION
	// DURATION/DATE       = DATE/DATE+DURATION
	// -DURATION/DATE      = DATE-DURATION/DATE
	// DATE1/DATE2         = DATE1/DATE2
	// DURATION1/DURATION2 = now+DURATION1/now+DURATION2

	var template   = options.template;
	var timeRange  = options.timeRange;
	var indexRange = options.indexRange;
	var type       = options.type || "strftime";
	var check      = options.check || false;
	var debug      = options.debug || false;
	var log        = options.log   || false;
	var proxy      = options.proxy;
	var side       = "client";

	if (options.timeRange) {
		timeRange = expandISO8601Duration(timeRange);
		var Start = timeRange.split("/")[0];
		var Stop  = timeRange.split("/")[1];
		tmpStart = new Date(Start);
		tmpStop  = new Date(Stop);
		if (tmpStop.getTime() < tmpStart.getTime()) {
			if (debug) console.log("Returing empty list because stop time is greater than start time.");
			return [];
		}
	}
	if (options.indexRange && type == "sprintf") {
		var Start = indexRange.split("/")[0];
		var Stop  = indexRange.split("/")[1];
		var Step  = indexRange.split("/")[2];
	}

	var logstr = "";
	if (debug) {
		if (log) {
			logstr = logstr + "," + "Start: " + Start + "," + ",Stop: " + Stop + ", Step: "+Step;
		} else {
			console.log("Start: " + Start);
			console.log("Stop:  " + Stop);
			console.log("Step:  " + Step);
		}
	}

	var tic = new Date().getTime();
	var files   = [];
	var headers = [];

	if (!options.template.match(/\$|\%/)) {
		files[0] = options.template;
		if (debug) console.log("expandtemplate.js: No wildcards")
		return finished();
	}
	
	if (type == "sprintf") {

		// Allow identifiers to be a $.  Internally use %.
		template = template.replace(/\$/g,'%');

		if (typeof(Start) === "string") {Start = parseInt(Start);}	
		if (typeof(Stop) === "string") {Stop = parseInt(Stop);}
		if (typeof(Step) === "string") {Step = parseInt(Step);} else {Step = 1;}
			
		var k = Start;
		for (i = Start; i < Stop + 1; i = i + Step) {
			var tmps = template;
			files[k-Start] = sprintf(tmps,i);
			k = k+1;
		}
	
		if (check) return head(files,proxy,headcomplete);
		if (!check) return finished();
	}

	if (type == "strftime") {

		// YYYY-MM-DD is interpreted as GMT in later versions of Javascript Date()
		// YYYY-MM-DDT00 is interpreted as having local timezone.
		Start = pad(Start);
		Stop = pad(Stop);

		//Start = Start + "Z";
		//Stop = Stop + "Z";
		// Date('YYYY-MM-DDZ') is invalid in Firefox. Remove all trailing Zs
		// (internally dates and times are always assumed to be UT)
		Start = Start.replace(/Z$/,''); 
		Stop = Stop.replace(/Z$/,'');
			
		// Allow identifiers to be a %.  Internally use $.
		template = template.replace(/\%/g,'$');


		if (debug) {
			if (log) {
				//logstr = logstr + ",template = " + template;
			} else {
				console.log("template = " + template);
				console.log("Start:");
				console.log(Start);
				console.log("Stop:");
				console.log(Stop);
				console.log("Step:");
				console.log(Step);
			}
		}

		// Remove time zone ("GMT") with substr(0,25).
		var START_dateinc = new Date(new Date(Start).toUTCString().substr(0, 25));
		var START_dateoff = new Date(new Date(Start).toUTCString().substr(0, 25));
		var STOP_date     = new Date(new Date(Stop).toUTCString().substr(0, 25));

		var START_dateinc = new Date(Start);
		var START_dateoff = new Date(Start);
		var STOP_date     = new Date(Stop);
		
		if (debug) {
			if (log) {
				logstr = logstr + "," + "START_dateinc: " + START_dateinc;
				logstr = logstr + "," + "START_dateoff: " + START_dateoff;
				logstr = logstr + "," + "STOP_date:     " + STOP_date;
				logstr = logstr + "," + "Step:          " + Step;
			} else {
				console.log("Start:")
				console.log(Start);
				console.log("START_dateinc:")
				console.log(START_dateinc);
				console.log("START_dateoff:");
				console.log(START_dateoff);
				console.log("Stop:");
				console.log(Stop);
				console.log("STOP_date:");
				console.log(STOP_date);
				console.log("Step:");
				console.log(Step);
			}
		}

		var addinc = {};
		var addoff = {};

		var keys  = ["microseconds","seconds","minutes","hours","days","days","months","years"];
		var codes = ["f",           "S",      "M",      "H",    "j",   "d",   "m",     "Y"];

		// Extract deltas (assumes 1 delta only!)
		for (i = 0; i < codes.length;i++)
			addinc[keys[i]] = parseInt(template.replace(new RegExp(".*\\${"+ codes[i] +";delta=([0-9].*)}.*"),"$1")) || 0;
		
		// Extract offsets (assumes 1 offset only!)
		for (i = 0; i < codes.length;i++)
			addoff[keys[i]] = parseInt(template.replace(new RegExp(".*\\${"+ codes[i] +";offset=([0-9].*)}.*"),"$1")) || 0;

		// Remove delta argument and replace $ with special character % for delta arguments. 
		while (template.match("{.*delta.*}"))
			template = template.replace(new RegExp("(.*)\\${([a-z]);delta=[0-9].*?}(.*)","gi"),"$1%$2$3");	
		
		// Replace $ with % for all codes (will be for all except those with offset arguments).
		template = template.replace(new RegExp("\\$([a-z])","gi"),"%$1");
		
		// Remove offset argument but keep $.
		while (template.match("{.*offset.*}"))
			template = template.replace(new RegExp("(.*)\\${([a-z]);offset=[0-9].*}(.*)","ig"),"$1$$$2$3");

		// If there were no increments given, make increment equal to 1 for any code given.
		// Increment codes are marked with special character %.
		for (i = 0; i < codes.length;i++)
		 	if (template.match("%"+codes[i]) && allzero(addinc)) addinc[keys[i]] = 1;

		// If there were no offsets given, make offset equal to 1 for any code given.
		for (i = 0; i < codes.length;i++)
		 	if (template.match("$"+codes[i]) && allzero(addoff)) addoff[keys[i]] = 1;
						
		if (debug) {
			if (log) {
				logstr = logstr + "," + "addoff="+JSON.stringify(addoff);
				logstr = logstr + "," + "addoff="+JSON.stringify(addinc);
				logstr = logstr + "," + "START_dateinc=" + JSON.stringify(START_dateinc);
				//logstr = logstr + "," + "template="+JSON.stringify(template);
			} else {
				console.log("addoff");
				console.log(addoff);
				console.log("addinc");
				console.log(addinc);
				console.log("template");
				console.log(template);
				console.log("START_dateinc:");
				console.log(START_dateinc);
				console.log("START_dateoff:");
				console.log(START_dateoff);
				console.log("STOP_date:");
				console.log(STOP_date);				
				console.log("--------------")
			}
		}
		
		var i = 0;

		if (allzero(addinc)) {
			files[0] = template;
		} else {
			while (START_dateinc.isBefore(STOP_date)) {
				files[i] = START_dateinc.strftime(template);

				START_dateoff = new Date(START_dateinc); // Copy 
				START_dateinc.add(addinc);
				START_dateoff.add(addoff);

				files[i] = START_dateoff.strftime(files[i].replace(/\$/g,"%"));

				i = i+1;
			}
			if (0) {
			//if (Stop.substring(11).match(/[1-9]/)) {
				
				if (debug) {
					var msg = "Stop date has non-zero in time component.  Adding one more file.";
					if (log) {
						logstr = logstr + "," + msg
					} else {
						console.log(msg)
					}
				}
				// If stop date has time component, grab extra file.
				files[i] = START_dateinc.strftime(template);
				START_dateinc.add(addinc);
				files[i] = START_dateoff.strftime(files[i].replace(/\$/g,"%"));
				START_dateoff.add(addoff);
										
			}

		}	
		if (!callback) {
			//return files;
		}
		if (check) return head(files,proxy,headcomplete);
		if (!check) return finished();
		
	}

	function allzero(obj) {for (var prop in obj) {if (obj[prop] > 0) return false} return true}

	function finished() {

		var elapsed = new Date().getTime() - tic;
		if (debug) {
			if (check) {
				if (log) {
					logstr = logstr + ", Generated and checked " + files.length + " URLs in " + elapsed + " ms (" + Math.round(elapsed/files.length) + " ms per)";
				} else {
					console.log("Generated and checked " + files.length + " URLs in " + elapsed + " ms (" + Math.round(elapsed/files.length) + " ms per)");
				}
			} else {
				if (log) {
					logstr = logstr + ", Generated " + files.length + " URLs in " + elapsed + " ms (" + Math.round(files.length/elapsed) + " per ms)";					
				} else {
					console.log("Generated " + files.length + " URLs in " + elapsed + " ms (" + Math.round(files.length/elapsed) + " per ms)");
				}
			}
		}
		
		if (callback) {
			callback(files,headers,options);
		} else {
			if (log) {
				return {files: files, log: logstr}
			} else {
				return files
			}
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
		
}

function pad(dt) {
	if (dt.length == 10) {
		// YYYY-MM-DD
		dt = dt + "T00:00:00";
	}
	if (dt.length == 13) {
		// YYYY-MM-DDT00
		dt = dt + ":00:00";
	}
	if (dt.length == 16) {
		// YYYY-MM-DDT00:00
		dt = dt + ":00";
	}
	return dt
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

	//var debug = true;
	if (timeRange.split("/").length > 1) {
		var options = {};
		if (timeRange.split("/")[0].match(/P/) && !timeRange.split("/")[1].match(/P/)) {
			// DURATION/DATE
			options.now = timeRange.split("/")[1];
		} else {
			// DATE/DURATION
			options.now = new Date().toISOString();
		}
		var a = expandISO8601Duration(timeRange.split("/")[0],options);
		var b = expandISO8601Duration(timeRange.split("/")[1],options);
		var tmpa = new Date(a);
		var tmpb = new Date(b);
		if ((tmpa.getTime() > tmpb.getTime()) && !(timeRange.split("/")[0].match(/P/) && timeRange.split("/")[1].match(/P/)) ){
			// This will occur for DURATION/DATE when DURATION is positive.
			//console.log(timeRange)
			//console.log("x Returning "+ b + "/" + a)
			return b + "/" + a;
		} else {
			//console.log("Returning "+ a + "/" + b)
			return a + "/" + b;			
		}
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
	var sprintf = sp.sprintf;
	var vsprintf = sp.vsprintf;

	exports.expandtemplate = expandtemplate;
	exports.expandISO8601Duration = expandISO8601Duration;
	
}