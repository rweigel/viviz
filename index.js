
//////////////////////////////
// Begin configuation.
// URL string is empty for Test because gallery information
// is located in VIVIZ["catalogs"]["Test"]
var VIVIZ = {}
VIVIZ["config"] =
	{
		"catalogs": {
			"Test": {"URL": ""},
			"ViRBO": {"URL": "catalogs/virbo.json"},
			"Enlil": {"URL": "catalogs/enlil.json"}
		},
		"defaultCatalog": "Test",
		"defaultGallery": "",
		"defaultMode": "gallery",
		"defaultFirstImage": 1,
		"showThumbstrip": true,
		"showCatalog": true,
		"showDropdowns": true,
		"showControls": true,
		"showAboutText": true,
		"showAttributes": true,
		"showFileName": true,
		"thumbWidth": 0.25,
		"thumbHeight": 0.25,
		"fullWidth": 1.0,
		"fullHeight": 1.0,
		"useAutoAttributes": true,
		"lazyLoadMax": 6,
		"frameRate": 500,
		"play": false,
		"port": 8002,
		"debug": true,
		"proxyServer": "http://localhost:8002/proxy?url="
	}

// Note: In general it is best to use $ instead of % in configuation except in
// the scripts.  This is because sprintf=demo-%04d.png is decoded to demo-d.png,
// so you must use demo-$04d.png.  In scripts where sprintf and strftime are used,
// the % must be used.
VIVIZ["catalogs"] = {};
VIVIZ["catalogs"]["Test"] = 
		[
			{
				"id": "SOHO/Sunspots",
				"title": "Sunspot measurements from SOHO",
				"aboutlink": "http://sohowww.nascom.nasa.gov/sunspots/",
				"strftime": "$Y$m$d.jpg",
				"fulldir": "http://sohowww.nascom.nasa.gov/data/synoptic/sunspots_earth/sunspots_1024_",
				"thumbdir": "http://sohowww.nascom.nasa.gov/data/synoptic/sunspots_earth/sunspots_512_",
				"thumbWidth": 256,
				"start": "2006-01-20",
				"stop": "P0D"
			},
			{
				"id": "ACE/Multi/a",
				"title": "ACE/Multi",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbdir": "http://virbo.org/images/pngwalk/ACE/Multi/thumbs400/"
			},
			{
				"id": "ACE/Multi/b",
				"title": "ACE/Multi/a w/ no thumbdir",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/"
			},
			{
				"id": "ACE/Multi/c",
				"title": "ACE/Multi/b w/ no thumbdir & thumbWidth=0.1",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbWidth": 0.1
			},
			{
				"id": "ACE/Multi/d",
				"title": "ACE/Multi/c w/ no thumbdir & thumbWidth=100",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbWidth": 100
			},
			{
				"id": "ACE/Multi/e",
				"title": "ACE/Multi/d w/ dir, no thumbdir & thumbWidth=0.1.",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"dir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbWidth": 0.1
			},
			{
				"id": "ACE/Multi/f",
				"title": "ACE/Multi/e w/ dir, no thumbdir & thumbWidth=100.",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"dir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbWidth": 100
			},
			{
				"id": "ACE/Multi/g",
				"title": "ACE/Multi/f thumbdir is relative path.",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbdir": "../thumbs400/"
			},
			{
				"id": "ACE/Multi/h",
				"title": "ACE/Multi/g with start number and regexp.",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbdir": "../thumbs400/",
				"defaultFirstImage": 10
			},
			{
				"id": "ACE/Multi/i",
				"title": "ACE/Multi/h with start number and regexp.",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbdir": "../thumbs400/",
				"defaultRegExp": "2000",
				"defaultFirstImage": 10
			},
			{
				"id": "Demo/01",
				"title": "sprintf",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"sprintf": "demo-$04d.png",
				"start": 1,
				"stop": 4
			},
			{
				"id": "Demo/02",
				"title": "strftime",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"strftime": "demo-$Y.png",
				"start": 2001,
				"stop": 2004
			},
			{
				"id": "Demo/03",
				"title": "fullscript as function",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullscript": function() {files = [];for (i = 0; i < 4; i++) {files[i] = ['demo-' + sprintf('%04d',i+1) + '.png']};return files}
			},
			{
				"id": "Demo/04",
				"title": "fullscript as string",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullscript": "function() {files = [];for (i = 0; i < 4; i++) {files[i] = ['demo-' + sprintf('%04d',i+1) + '.png']};return files}"
			},
			{
				"id": "Demo/05a",
				"title": "fullfiles as array with array elements of file information",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullfiles": [["demo-2001.png"],["demo-2002.png"],["demo-2003.png"],["demo-2004.png"]]
			},
			{
				"id": "Demo/05b",
				"title": "Same as Demo/05a but with attribute for each image",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullfiles": [["demo-2001.png",1],["demo-2002.png",2],["demo-2003.png",3],["demo-2004.png",4]]
			},
			{
				"id": "Demo/05c",
				"title": "Same as Demo/05b but with attribute names",
				"fulldir": "images/full/",
				"thumbdir": "images/thumb/",
				"attributes": ["Filename","Age"],
				"fullfiles": [["demo-2001.png",1],["demo-2002.png",2],["demo-2003.png",3],["demo-2004.png",4]]
			},
			{
				"id": "Demo/05d",
				"title": "Same as Demo/05c but with attribute filters",
				"fulldir": "images/full/",
				"thumbdir": "images/thumb/",
				"attributes": ["Filename","Age"],
				"filters": [[{}],[{"name": "All", "value": "Age >= 0"}, {"name": "Age > 1", "value": "Age > 1.0"}]],
				"fullfiles": [["demo-2001.png",1],["demo-2002.png",2],["demo-2003.png",3],["demo-2004.png",4]]
			},
			{
				"id": "Demo/05e",
				"title": "Same as Demo/05d but with defaultFirstImage",
				"fulldir": "images/full/",
				"thumbdir": "images/thumb/",
				"defaultFirstImage": 2,
				"attributes": ["Filename","Age"],
				"filters": [[{}],[{"name": "Age > 1", "value": "Age > 1.0"}]],
				"fullfiles": [["demo-2001.png",1],["demo-2002.png",2],["demo-2003.png",3],["demo-2004.png",4]]
			},
			{
				"id": "Demo/06",
				"title": "fullfiles as string with file information separated by newlines",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullfiles": "demo-2001.png\ndemo-2002.png\ndemo-2003.png\ndemo-2004.png"
			},
			{
				"id": "Demo/09",
				"title": "fullfiles as string with relative path to text file. (Will not work for simple installation.)",
				"fulldir": "images/full/",
				"fullfiles": "catalogs/lists/demo-filelist.txt"
			},
			{
				"id": "Demo/10",
				"title": "fullfiles as string with relative path to JavaScript file. (Will not work for simple installation.)",
				"fulldir": "images/full/",
				"fullfiles": "catalogs/lists/demo-filelist.json"
			},
			{
				"id": "Demo/11",
				"title": "fullfiles as localhost URL to text file. (Requires full application install)",
				"aboutlink": "http://viviz.org/",
				"fulldir": "images/full/",
				"fullfiles": "http://localhost:"+VIVIZ["config"]["port"]+"/catalogs/lists/demo-filelist.txt"
			},
			{
				"id": "Demo/12",
				"title": "fullfiles as localhost URL to file with JavaScript array. (Requires full application install)",
				"fulldir": "images/full/",
				"fullfiles": "http://localhost:"+VIVIZ["config"]["port"]+"/catalogs/lists/demo-filelist.json"
			},
			{
				"id": "Demo/13",
				"title": "fullfiles as remote URL to text file. (Requires full application install.)",
				"fulldir": "images/full/",
				"fullfiles": "https://raw.githubusercontent.com/rweigel/viviz/master/catalogs/lists/demo-filelist.txt"
			},
			{
				"id": "Demo/14",
				"title": "fullfiles as remote URL to file with JavaScript array. (Requires full application install.)",
				"fulldir": "images/full/",
				"fullfiles": "https://raw.githubusercontent.com/rweigel/viviz/master/catalogs/lists/demo-filelist.json"
			},
			{
				"id": "Demo/15",
				"title": "First image is 404.",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullfiles": [["xdemo-2001.png"],["demo-2002.png"],["demo-2003.png"],["demo-2004.png"]]
			},
			{
				"id": "Demo/15b",
				"title": "Demo/15 with attributes and filters.",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"attributes": ["Filename","Age"],
				"filters": [[{}],[{"name": "Age > 1", "value": "Age > 1.0"}]],
				"fullfiles": [["xdemo-2001.png",1],["demo-2002.png",2],["demo-2003.png",3],["demo-2004.png",4]]
			},
			{
				"id": "Demo/16",
				"title": "First two images are 404.",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullfiles": [["xdemo-2001.png"],["xdemo-2002.png"],["demo-2003.png"],["demo-2004.png"]]
			},
			{
				"id": "Demo/17",
				"title": "All images are 404.",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullfiles": [["xdemo-2001.png"],["xdemo-2002.png"],["xdemo-2003.png"],["xdemo-2004.png"]]
			},
			{
				"id": "Demo/18",
				"title": "Should always fail. Response is 404.",
				"fulldir": "images/full/",
				"fullfiles": "http://mag.gmu.edu/demo-filelist.txt"
			},
			{
				"id": "Demo/19",
				"title": "Should always fail. Response is 404.",
				"fulldir": "images/full/",
				"fullfiles": "http://mag.gmu.edu/demo-filelist.json"
			},
			{
				"id": "Demo/20",
				"title": "Should always fail.  Site returns html instead of 404.",
				"fulldir": "images/full/",
				"fullfiles": "http://viviz.org/demo-filelist.txt"
			},
			{
				"id": "Demo/21",
				"title": "fullfiles as remote URL to file with JavaScript array. (Requires full application install.)",
				"title": "Should always fail.  Site returns html instead of 404.",
				"fullfiles": "http://viviz.org/demo-filelist.json"
			},
			{
				"id": "Demo/22a",
				"title": "No dir given; images must be in same directory as index.htm",
				"strftime": "demo-$Y.png",
				"start": 2001,
				"stop": 2002
			},
			{
				"id": "Demo/22b",
				"title": "Same as Demo/22a but gallery specified as hash.",
				"id":"strftime=demo-$Y.png&start=2001&stop=2002"
			},
			{
				"id": "Demo/22c",
				"title": "Same as Demo/22b but gallery specified as hash with first image bad.",
				"id":"strftime=demo-$Y.png&start=2000&stop=2002"
			},
			{
				"id": "Demo/23",
				"title": "No dir given; images must be in same directory as index.htm",
				"strftime": "demo-$Y.png",
				"start": 2001,
				"stop": 2002,
				"fullfiles": ""
			},
			{
				"id": "dir=http://sohowww.nascom.nasa.gov/data/synoptic/sunspots_earth/&strftime=sunspots_512_$Y$m$d.jpg&start=2006-01-20&stop=P0D",
				"title": "Example in documentation."
			},
			{
				"id": "dir=http://sohowww.nascom.nasa.gov/data/synoptic/sunspots_earth/&strftime=sunspots_512_$Y$m$d.jpg&start=2006-01-20&stop=P0D",
				"title": "Example in documentation.  Should be error because % is used instead of $."
			},
			{
				"id": "dir=images/full/&strftime=demo-$Y.png&start=2001&stop=2004",
				"title": "Example in documentation."
			},
			{
				"id": "dir=images/full/&strftime=demo-$Y.png&start=2001&stop=2004",
				"title": "Example in documentation"
			},
			{
				"id": "fulldir=images/full/&thumbdir=images/thumb/&strftime=demo-$Y.png&start=2001&stop=2004",
				"title": "Example in documentation."
			},
			{
				"id": "fulldir=http://virbo.org/images/pngwalk/ACE/Multi/fulls/&strftime=product_$Y$m$d.png&start=1998-01-01&stop=1998-01-04",
				"title": "ID specified as URL in index.js."
			},
			{
				"id": "dir=http://virbo.org/images/pngwalk/ACE/Multi/fulls/&strftime=product_$Y$m$d.png&start=1998-01-01&stop=1998-01-04",
				"title": "ID specified as URL in index.js."
			},
			{
				"id": "dir=http://virbo.org/images/pngwalk/ACE/Multi/fulls/&strftime=product_$Y$m$d.png&start=1998-01-01&stop=1998-01-04&thumbWidth=0.1",
				"title": "ID specified as URL in index.js."
			},
			{
				"id": "dir=http%3A%2F%2Flocalhost%3A8004%2F%3Fcatalog%3DIMAGE%2FPT1M%26dataset%3DABK%26parameters%3DX%26return%3Dimage%26format%3Dpng%26type%3Dtimeseries%26style%3D0%26image.width%3D800%26image.height%3D200&strftime=%26start%3D-P1D%26stop%3D%24Y-%24m-%24d&start=2014-09-01&stop=2014-09-30",
				"title": "ID specified as URL with encoded values in index.js (28 images)."
			},
			{
				"id": "dir=http%3A%2F%2Flocalhost%3A8004%2F%3Fcatalog%3DIMAGE%2FPT1M%26dataset%3DABK%26parameters%3DX%26return%3Dimage%26format%3Dpng%26type%3Dtimeseries%26style%3D0%26image.width%3D800%26image.height%3D200&strftime=%26start%3D-P1D%26stop%3D%24Y-%24m-%24d&start=2010-09-27&stop=2014-09-30",
				"title": "ID specified as URL with encoded values in index.js (1000+ images)."
			},
			{
				"id": "INVALID/ID",
				"title": "Invalid ID.  Error message is wrong because of use of configuration URL in gallery configuration. URL is assumed to be gallery configuration. Append x to id in address bar to see proper error message."
			},
			{
				"id": "dir=http://emfisis.physics.uiowa.edu/pngwalk/RBSP-A/HFR-WFR_L2/&strftime=product_$Y$m$d.png&start=20151226&stop=20151228",
				"title": "ID specified as URL in index.js."
			}
		]

// End configuration.
//////////////////////////////		

if (typeof(location) !== "undefined") { // To allow server-side use of this file.
	if (location.hostname === "localhost") {
		//console.log("---index.js: hostname is localhost.  Using test catalog.")
		VIVIZ["config"]["defaultCatalog"] = "ViRBO";
	}
	if (location.hostname === "viviz.org") {
		//console.log("index.js: hostname is localhost.  Using test catalog.")
		//delete VIVIZ["config"]["catalog"]
	}
	if (location.hostname === "virbo.org") {
		console.log("index.js: hostname is virbo.org.  Using ViRBO catalog.")
		VIVIZ["config"]["defaultCatalog"] = "ViRBO";
	}
	//if (location.href.indexOf("file:") != 0) {
	if (0) {
		var nr = 0;
		var l = VIVIZ["catalogs"]["Test"].length;
		for (var j = 0; j < l; j++) {
			var fullfiles = VIVIZ["catalogs"]["Test"][j-nr].fullfiles;
			if (typeof(fullfiles) === "string") {
				if (fullfiles.match(/^http/)) {
					console.log("Removing " + VIVIZ["catalogs"]["Test"][j-nr]["id"])
					VIVIZ["catalogs"]["Test"].splice(j-nr,1)
					nr = nr+1
				}
			}
		}

		for (var j in VIVIZ["catalogs"]["Test"]) {
			var fulldir = VIVIZ["catalogs"]["Test"][j].fulldir;
			if (fulldir) {
				if (fulldir.match(/^images/)) {
				VIVIZ["catalogs"]["Test"][j].fulldir = 
					"http://viviz.org/" + fulldir
				}
			}
			var thumbdir = VIVIZ["catalogs"]["Test"][j].thumbdir;
			if (thumbdir) {
				if (thumbdir.match(/^images/)) {
				VIVIZ["catalogs"]["Test"][j].thumbdir = 
					"http://viviz.org/" + thumbdir
				}
			}

		}
		//console.log("index.js: href starts with file:.  Using test catalog and modifying tests.")
		//prepend images/full and images/thumb with http://viviz.org/
		//remove ones that require full install.
	}
}
