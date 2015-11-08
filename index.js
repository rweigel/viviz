VIVIZ = {
	"defaultMode": "gallery",
	"showThumbstrip": true,
	"showFileName": true,
	"showAboutText": true,
	"showCatalog": true,
	"showControls": true,
	"showAttributes": true,
	"showCatalog": true,
	"showDropdowns": true,
	"showDownloads": false,
	"useAutoAttributes": true,
	"thumbWidth": 0.25,
	"thumbHeight": 0.25,
	"fullWidth": 1.0,
	"fullHeight": 1.0,
	"lazyLoadMax": 5,
	"frameRate": 500,
	"play": false,
	"port": 8002,
	"proxyServer": "http://localhost:8002/proxy?url=",
	"useCachedImages": false
}

// Other Configuration options.			
// "basedir"

// Needed for server install.
if (typeof(exports) !== "undefined" && require) {
	exports.VIVIZ = VIVIZ
}

VIVIZ["galleries"] = {};

// These variables are defined in index-vars.js.  Define them here in case index-vars.js was not 
// loaded for any reason.
if (!fullfilesDemo7) {
	var fullfilesDemo7 = [["demo-2001.png"],["demo-2002.png"],["demo-2003.png"],["demo-2004.png"]]
}
if (!fullfilesDemo8) {
	var fullfilesDemo8 = "demo-2001.png\ndemo-2002.png\ndemo-2003.png\ndemo-2004.png"
}

// VIVIZ["catalog"] is an array of gallery objects.
// Any of the default options specified in the VIVIZ object
// that appear in a gallery object over-ride default options.  
// Options may also be specified in URL query hash string, e.g.,
// #ACE/Multi&thumbWidth=0.25&showFileName=false

// Content below can be copied into index-vars.js.
VIVIZ["catalog"] =
	[
		{
			"id": "ACE/Multi/1",
			"title": "ACE/Multi",
			"titleshort": "ACE/Multi",
			"about": "http://virbo.org/gallery#ACE",
			"strftime": "product_%Y%m%d.png",
			"start": "1998-01-01",
			"stop": "2012-04-30",
			"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
			"thumbdir": "http://virbo.org/images/pngwalk/ACE/Multi/thumbs400/",
		},
		{
			"id": "ACE/Multi/2",
			"title": "ACE/Multi with no thumbdir and thumbWidth = 0.25",
			"titleshort": "ACE/Multi/Alt",
			"about": "http://virbo.org/gallery#ACE",
			"strftime": "product_%Y%m%d.png",
			"start": "1998-01-01",
			"stop": "2012-04-30",
			"fulldir": "http://virbo.org/images/pngwalk/ACE/Multi/fulls/",
			"thumbWidth": 0.1
		},
		{
			"id": "Demo/01",
			"title": "sprintf",
			"fulldir":"images/full/",
			"thumbdir":"images/thumb/",
			"sprintf": "demo-%04d.png",
			"start": 1,
			"stop": 4
		},
		{
			"id": "Demo/02",
			"title": "strfmtime",
			"fulldir":"images/full/",
			"thumbdir":"images/thumb/",
			"strftime": "demo-%Y.png",
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
			"id": "Demo/07",
			"title": "fullfiles as array defined in index-vars.js.",
			"fulldir":"images/full/",
			"thumbdir":"images/thumb/",
			"fullfiles": fullfilesDemo7
		},
		{
			"id": "Demo/08",
			"title": "fullfiles as string with newlines defined in index-vars.js",
			"fulldir":"images/full/",
			"thumbdir":"images/thumb/",
			"fullfiles": fullfilesDemo8
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
			"fullfiles": "http://localhost:"+VIVIZ["port"]+"/catalogs/lists/demo-filelist.txt"
		},
		{
			"id": "Demo/12",
			"title": "fullfiles as localhost URL to file with JavaScript array. (Requires full application install)",
			"fulldir": "images/full/",
			"fullfiles": "http://localhost:"+VIVIZ["port"]+"/catalogs/lists/demo-filelist.json"
		},
		{
			"id": "Demo/13",
			"title": "fullfiles as remote URL to text file. (Requires full application install.)",
			"fulldir": "images/full/",
			"fullfiles": "http://viviz.org/app/catalogs/lists/demo-filelist.txt"
		},
		{
			"id": "Demo/14",
			"title": "fullfiles as remote URL to file with JavaScript array. (Requires full application install.)",
			"fulldir": "images/full/",
			"fullfiles": "http://viviz.org/app/catalogs/lists/demo-filelist.json"
		},
		{
			"id": "fulldir=http://virbo.org/images/pngwalk/ACE/Multi/fulls/&strftime=product_%Y%m%d.png&strftimestart=1998-01-01&strftimestop=1998-01-04",
			"title": "ID specified as URL in index.js.",
			"about": "Configuration not recommended.  <code>fulldir</code> must be first argument."
		}
	]
