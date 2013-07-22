function thumblist(wrapper){

	var galleryid = $(wrapper + " #gallery").val();
	var SORTBY    = $(wrapper + " #sortby").val();
	var ORDER     = $(wrapper + " #order").val();
	var regexp    = $(wrapper + " #regexp :selected").attr('value');

    var INFOG    = galleryinfo(galleryid);
	var SORTBYS  = INFOG['attributes'];
	var ORDERS   = INFOG['orders'];
	var THUMBDIR = INFOG['thumbdir'];
	var FULLDIR  = INFOG['fulldir'];
	
	// http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling
	function shuffle(array) { 
	    var tmp, current, top = array.length;

	    if(top) while(--top) {
	        current = Math.floor(Math.random() * (top + 1));
	        tmp = array[current];
	        array[current] = array[top];
	        array[top] = tmp;
	    }

	    return array;
	}

	// http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
	function clone(obj){       
        if (obj == null || typeof(obj) != 'object') 
            return obj;
        
        var temp = new obj.constructor(); // changed (twice)
        for (var key in obj) 
            temp[key] = clone(obj[key]);
        
        return temp;
    }

    var INFOjs = new Array();
    for (j = 0; j < INFOG["files"].length; j++) {
		INFOjs[j] = new Object();
		INFOjs[j]["FileName"] = INFOG["files"][j][0];
		INFOjs[j]["FullFile"] = INFOG["files"][j][0];
		if (typeof(INFOG["thumbfiles"]) !== "undefined")
			INFOjs[j]["ThumbFile"] = INFOG["thumbfiles"][j][0];
		
		if (Object.keys(SORTBYS).length > 0) {
			for (z = 0;z < SORTBYS["Values"].length;z++) {
				INFOjs[j][z] = INFOG["files"][j][z];
			}
		}
		INFOjs[j]["ImageNumber"] = j;
	}
    
 	state = galleryid+SORTBY+ORDER+regexp;
	if (typeof(thumblist.cache) != 'object') {
		thumblist.cache = new Object();
	}
	if ( thumblist.cache[state] ) {
		//console.log('thumblist.js: Using cached thumblist.');
		return thumblist.cache[state];
	}  
	//console.log('thumblist.js: No cached thumblist for state = gallery + sortby + order + regexp = ' + state);
    ////console.log(SORTBY);
        
    I = new Array();
    if (regexp) {
        var REGEXP = new RegExp(regexp);
    	if (typeof(INFOjs[0][SORTBY]) == "string") {
    		var k = 0;
    		for (var i = 0; i < INFOjs.length; i++) {
    			if (INFOjs[i][SORTBY].match(REGEXP)) {
    				I[i] = k;
    				k = k+1;
    			}
    		}
    		//console.log("thumblist.js: Regexp " + REGEXP + " removed " + (INFOjs.length-k) + "/" + INFOjs.length + " elements.");
        	//console.log('thumblist.js: First image is now ');
        	//console.log(INFOjs[I[0]]);       	
    	} else {
    		if (!regexp.match(regexp,'true')) {
    			regexp = regexp.replace('gt','>').replace('ge','<=').replace('lt','<').replace('le','<=');
    			regexp = regexp.replace('and','&').replace('&amp;','&');
    			regexp = regexp.replace('&lt;','<');
    			regexp = regexp.replace('&gt;','>');
    			var k = 0;
    			for (var i = 0; i < INFOjs.length; i++) {
    				var test = regexp.replace(/this/g,INFOjs[i][SORTBY]);
    				//var test = regexp.replace('this',INFOjs[i][SORTBY]);
    				//console.log('thumblist.js: Testing ' + test);
    				if (eval(test)) {
    					I[i] = k;
    					k = k+1;
    				}
    			}
    			//console.log("thumblist.js: Expression " + REGEXP + " removed " + (INFOjs.length-k) + "/" + INFOjs.length + " elements.");
    			//console.log('thumblist.js: First image is now ');
    			//console.log(INFOjs[I[0]]);
    		} else {
    	    	var INFOrs = clone(INFOjs);
    			//console.log("thumblist.js: Expression true removed zero elements elements.");
    			//console.log('thumblist.js: First image is now ');
    			//console.log(INFOjs);
    		}
    	}
    	if (I.length > 0) {
    		var INFOr = new Array();
        	for (i = 0; i < I.length; i++) {
        		INFOr[I[i]] = INFOjs[i];
        	}
        	var INFOrs = clone(INFOr);
    	} else {
    		var INFOrs = clone(INFOjs);
    	}
    } else {
    	var INFOrs = clone(INFOjs);
    }
    
    if (ORDER.match("ascending")) {
        //console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in ascending order.");
        
        if (typeof(INFOrs[0][SORTBY]) == "string") {
            //console.log('thumblist.js: Sorting attribute ' + SORTBY + " as string.");
            INFOrs.sort(function(a,b) {
            	return a[SORTBY].localeCompare(b[SORTBY]);
            });
        } else {
            //console.log('thumblist.js: Sorting attribute ' + SORTBY + " as number.");
        	INFOrs.sort(function(a, b){
        		return a[SORTBY] - b[SORTBY];
        	});
        }
    	//console.log('thumblist.js: First image is now ' + INFOrs[0].FileName);

    }

    if (ORDER.match("descending")){
        //console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in descending order.");
        if (typeof(INFOrs[0][SORTBY]) == "string") {
            //console.log('thumblist.js: Sorting attribute ' + SORTBY + " as string.");
            INFOrs.sort(function(a,b) {
            	return b[SORTBY].localeCompare(a[SORTBY]);
            });
        } else {
            //console.log('thumblist.js: Sorting attribute ' + SORTBY + " as number.");
        	INFOrs.sort(function(a, b){
        		return b[SORTBY] - a[SORTBY];
        	});
        }
    	//console.log('thumblist.js: First image is now ' + INFOrs[0]);
    }
    if (ORDER.match("random")){
        //console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in random order.");
    	var idx = new Array();
    	for (i = 0;i<INFOr.length;i++) {
    		idx[i] = i;
    	}
    	var idx2 = shuffle(idx);
    	for (i = 0;i<INFOr.length;i++) {
        	INFOrs[idx2[i]] = INFOr[i];
    	}
    	//console.log('thumblist.js: First image is now ' + INFOrs[0].FileName);
    }
  
	if ((!ORDER.match("random")) & (typeof(thumblist.cache[state]) != 'object')) {
		thumblist.cache[state] = new Object();
		thumblist.cache[state] = INFOrs;
	}

    return INFOrs;
 
}