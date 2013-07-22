function attributemap(URL,keycolumn,delimiter,skip) {

	if (arguments.length < 4)
		var skip = 0;
	if (arguments.length < 3)
		var delimiter = " ";
	if (arguments.length < 2)
		var keycolumn = -1;
	
	if (keycolumn == -1) {
		//console.log('attributemap.js: No key specified.  Using row number as key.');
	}
	//console.log('attributemap.js: Delimiter is "' + delimiter + '"');

	var lines;
	$.ajax({
			type: "GET",
			url: URL,
			async: false,
			dataType: "text",
			error: function () {
						//console.log("attributemap.js: Error reading " + URL)
					},
			success: function (data) {
						//console.log('attributemap.js: Extracting files from ' + URL);
						lines = data.split(/\n/);
					}
		});

	//console.log(lines);
	MAP = new Object();
	var splitlines;
	for (j = skip; j < lines.length; j++) {
		splitlines = lines[j].split(delimiter);
		if (keycolumn > 0) {
			MAP[splitlines[keycolumn-1]] = splitlines;
			if (j == skip) {
				//console.log('attributemap.js: First line is ' + lines[j]);
				//console.log('attributemap.js: First key is ' + splitlines[keycolumn-1]);
			}
			if (j == lines.length - 1) {
				//console.log('attributemap.js: Last line is ' + lines[j]);
				//console.log('attributemap.js: Last key is ' + splitlines[keycolumn-1]);
			}
		} else {
			MAP[j+1] = splitlines;
			if (j == skip) {
				//console.log('attributemap.js: First line is ' + lines[j]);
				//console.log('attributemap.js: First key is ' + (j+1));
			}
			if (j == lines.length - 1) {
				//console.log('attributemap.js: Last line is ' + lines[j]);
				//console.log('attributemap.js: Last key is ' + (j+1));
			}
		}
	}
	//console.log('attributemap.js: Attributes extracted from ' + URL + ":");
	//console.log(MAP);
	
	return MAP;
}