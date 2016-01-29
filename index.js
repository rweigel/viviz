// Configuation options.
var VIVIZ = {}
VIVIZ["config"] =
	{
		"catalog": "catalogs/virbo.json",
		"defaultMode": "gallery",
		"showThumbstrip": true,
		"showFileName": true,
		"showAboutText": true,
		"showCatalog": true,
		"showControls": true,
		"showAttributes": true,
		"showCatalog": true,
		"showDropdowns": true,
		"showDownloads": true,
		"useAutoAttributes": true,
		"thumbWidth": 0.25,
		"thumbHeight": 0.25,
		"fullWidth": 1.0,
		"fullHeight": 1.0,
		"lazyLoadMax": 6,
		"frameRate": 500,
		"play": false,
		"port": 8002,
		"proxyServer": "http://localhost:8002/proxy?url=",
		"useCachedImages": false,
	}

// Test catalog.  Comment out next line to use above catalog.
if (typeof(location) !== "undefined") { // To allow server-side use of this file.
	if (location.hostname === "localhost") {
		console.log("index.js: hostname is localhost.  Using test catalog.")
		delete VIVIZ["config"]["catalog"]
	}
}

// Note: In general it is best to use $ instead of % in configuation except in
// the scripts.  This is because sprintf=demo-%04d.png is decoded to demo-d.png,
// so you must use demo-$04d.png.  In scripts where sprintf and strftime are used,
// the % must be used.
VIVIZ["catalog"] = 
		[
			{
				"id": "ACE/Multi/1",
				"title": "ACE/Multi",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbdir": "http://virbo.org/images/pngwalk/ACE/Multi/thumbs400/"
			},
			{
				"id": "ACE/Multi/2",
				"title": "ACE/Multi w/ no thumbdir",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/"
			},
			{
				"id": "ACE/Multi/3",
				"title": "ACE/Multi w/ no thumbdir & thumbWidth=0.1",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbWidth": 0.1
			},
			{
				"id": "ACE/Multi/4",
				"title": "ACE/Multi w/ no thumbdir & thumbWidth=100",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbWidth": 100
			},
			{
				"id": "ACE/Multi/5",
				"title": "ACE/Multi w/ dir, no thumbdir & thumbWidth=0.1.",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"dir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbWidth": 0.1
			},
			{
				"id": "ACE/Multi/6",
				"title": "ACE/Multi w/ dir, no thumbdir & thumbWidth=100.",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"dir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbWidth": 100
			},
			{
				"id": "ACE/Multi/7",
				"title": "ACE/Multi thumbdir is relative path.",
				"aboutlink": "http://virbo.org/gallery#ACE",
				"strftime": "product_$Y$m$d.png",
				"start": "1998-01-01",
				"stop": "2012-04-30",
				"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
				"thumbdir": "../thumbs400/"
			},
			{
				"id": "ACE/Multi/8",
				"title": "ACE/Multi with start number and regexp.",
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
				"id": "Demo/05",
				"title": "fullfiles as array with array elements of file information",
				"fulldir":"images/full/",
				"thumbdir":"images/thumb/",
				"fullfiles": [["demo-2001.png"],["demo-2002.png"],["demo-2003.png"],["demo-2004.png"]]
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
				"id": "Demo/22",
				"title": "No dir given; images must be in same directory as index.htm",
				"strftime": "demo-$Y.png",
				"start": 2001,
				"stop": 2002
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
				"id": "dir=http%3A%2F%2Flocalhost%3A8004%2F%3Fcatalog%3DIMAGE%2FPT1M%26dataset%3DABK%26parameters%3DX%26return%3Dimage%26format%3Dpng%26type%3Dtimeseries%26style%3D0%26image.width%3D800%26image.height%3D200&strftime=%26start%3D-P1D%26stop%3D%24Y-%24m-%24d&start=2010-09-27&stop=2014-09-30",
				"title": "ID specified as URL with encoded values in index.js."
			},
			{
				"id": "catalog=catalogs/demo-catalog.json",
				"title": "Catalog given as URL.  For testing VIVIZ['config']['catalog'] only.  Screws up back button."
			},
			{
				"id": "INVALID/ID",
				"title": "Invalid ID.  Error message is wrong because of use of configuration URL in gallery configuration. URL is assumed to be gallery configuration. Append x to id in address bar to see proper error message."
			}
		]