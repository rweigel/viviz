var fs       = require('fs');
var http     = require('http'); http.globalAgent.maxSockets = 100;  // Most Apache servers have this set at 100.
var request  = require("request");
var express  = require('express');
var app      = express().use(express.bodyParser());
var server   = require("http").createServer(app);
var qs       = require('querystring');
var fs       = require('fs');
var xml2js   = require('xml2js');
var mkdirp   = require("mkdirp");
var readdirp = require("readdirp");
var clc      = require('cli-color');

var argv    = require('yargs')
				.default
				({
					'file': "index.htm"
				})
				.argv

eval(require('fs').readFileSync(__dirname + '/index.js', 'utf8'))

var port = VIVIZ["port"] || 8002;
var file = argv.file;

// Log to console with color
console.logc = function (str,color) {var msg = clc.xterm(color); console.log(msg(str))}

var debug = true;

process.on('uncaughtException', function(err) {
	if (err.errno === 'EADDRINUSE') {
		console.error((new Date()).toISOString() + " [viviz] Port " + port + " already in use.")
	} else {
		console.error(err)
	}
	fs.writeFileSync('viviz.error', err);
	process.exit(1)
})

function handleRequest(req, res) {
	var options = parseOptions(req);
	if (debug) {
		console.log((new Date()).toISOString() + " - [viviz] File content: " + JSON.stringify(options))
	}

	if (options.fulldir === "") {
		res.send(400,"A URL must be given as fulldir.\n")
		return
	}

	var tmpa = options.id.split("/");	
	var path  = tmpa.slice(0,tmpa.length-1).join("/");
	if (debug) console.log((new Date()).toISOString() + " - [viviz] Path: " +__dirname+"/"+ path + "/")

	var xfname = tmpa[tmpa.length-1]
	if (debug) console.log((new Date()).toISOString() + " - [viviz] Filename: " + xfname+".json")

	if (debug) console.log((new Date()).toISOString() + " - [viviz] Creating: "+__dirname+"/uploads/"+path)
	mkdirp(__dirname+"/uploads/"+path,cb)

	function cb() {
		var zfname = "/uploads/"+path + "/" + xfname+".json"
		zfname = zfname.replace(/\/\//g,"/")
		if (debug) {
			console.log((new Date()).toISOString() + " - [viviz] Saving: " + __dirname + zfname)
		}
		fs.writeFileSync(__dirname + zfname,"var cataloginfo=" + JSON.stringify(options))
		if (debug) {
			console.log((new Date()).toISOString() + " - [viviz] Sent response.")
		}
		res.send("Catalog saved to http://"+req.headers.host+zfname+"\n")
	}
}

function parseOptions(req) {
	var options = {};
    
	function s2b(str) {if (str === "true") {return true} else {return false}}
	function s2i(str) {return parseInt(str)}

	var tmp = req.originalUrl.replace('/save/?','');
	
	if ( tmp.match(/^ftp\:\//) || tmp.match(/^http\:\//) || tmp.match(/^https\:\//) || tmp.match(/^file\:\//) ) {
		options.fulldir	= tmp;
		tmp = tmp.replace("\://","/").split('/');
		tmp[1] = tmp[1].replace(".","/");
		options.id = tmp.join("/").replace(/([a-z])\/$/i,"$1");
		if (debug) {
			console.log((new Date()).toISOString() + " - [viviz] ID: " + options.id)
		}
	} else {
		options.fulldir	= req.query.fulldir || req.body.fulldir	|| "";
		options.id	    = req.query.id    	|| req.body.id		|| "";
	}
	
	options.name			= req.query.name			|| req.body.name			|| "";
	options.title			= req.query.title			|| req.body.title			|| "Test Catalog";
	options.about			= req.query.about			|| req.body.about			|| "";
	options.script			= req.query.script			|| req.body.script			|| "";
	options.attributes		= req.query.attibutes		|| req.body.attributes		|| "";
	options.sprintf			= req.query.sprintf			|| req.body.sprintf			|| "";
	options.sprintfstart	= req.query.sprintfstart	|| req.body.sprintfstart	|| "";
	options.sprintfstop		= req.query.sprintfstop		|| req.body.sprintfstop		|| "";
	options.strftime		= req.query.strftime		|| req.body.strftime		|| "";
	options.strftimestart	= req.query.strftimestart	|| req.body.strftimestart	|| "";
	options.strftimestop	= req.query.strftimestop	|| req.body.strftimestop    || "";

	options.thumbdir		= req.query.thumbdir		|| req.body.thumbdir		|| "";
	options.fullwidth		= req.query.fullwidth 		|| req.body.fullwidth		|| "";
	options.thumbwidth		= req.query.thumbwidth		|| req.body.thumbwidth		|| "200";
	options.fullheight		= req.query.fullheight 		|| req.body.fullheight		|| "";
	options.thumbheight		= req.query.thumbheight		|| req.body.thumbheight		|| "";
	options.fullpreprocess	= req.query.fullpreprocess	|| req.body.fullpreprocess	|| "http://imgconvert.org/";
	options.thumbpreprocess	= req.query.thumbpreprocess	|| req.body.thumbpreprocess	|| "http://imgconvert.org/";
	
	return options;
}

// Allow files to be served from these directories
app.use('/images', express.static(__dirname + '/images'));
app.use('/deps', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/catalogs', express.static(__dirname + '/catalogs'));
app.use('/dat', express.static(__dirname + '/dat'));
app.use('/doc', express.static(__dirname + '/doc'));
app.use('/', express.static(__dirname + '/'));

// Allow directory listings of these directories
app.use('/images',express.directory(__dirname + '/images'));
app.use('/deps',express.directory(__dirname + '/js'));
app.use('/css',express.directory(__dirname + '/css'));
app.use('/catalogs',express.directory(__dirname + '/catalogs'));
app.use('/dat',express.directory(__dirname + '/dat'));
app.use('/doc',express.directory(__dirname + '/doc'));

//curl "http://localhost:8005/save/?id=test/test2"
app.post('/save', function (req, res) {handleRequest(req,res)});
app.get('/save', function (req, res) {handleRequest(req,res)});

app.get('/proxy', function (req, res) {

		// Remote address
		var remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	    var u = req.query.url

	    if (!u) {
	        res.end("No URL found")
	    }

		console.log("Proxy request from " + remoteAddress + " for " + u)
		if (req.headers['x-forwarded-for']) {
			console.log("x-forwarded-for = " + req.headers['x-forwarded-for'])
			console.log("remoteAddress = " + req.connection.remoteAddress)

		}

	    if (remoteAddress !== "::ffff:127.0.0.1" && remoteAddress !== "::1") {
	    	var msg = "Use of proxy requires originating request to be from localhost.";
		    console.log(msg + ". Request was from " + remoteAddress);
		    res.status(500).send(msg)
		    return;
	    	// TODO: If request is not from localhost, allow if URL is whitelist.
		    //VIVIZ = require("./index.js").VIVIZ;
	    }

		request({
		    url: u
		}).on('error', function(e) {
		    res.end(e)
		    res.end("Error when attemtping to request " + u)
		}).pipe(res)

})

app.get('/catalogs', function (req, res) {
	var files = [];
	var catalogs = [];
	readdirp({ root: './uploads', fileFilter: '*.json'})
	.on('data', function (entry) {
		if (debug) {
			console.log((new Date()).toISOString() + " - [viviz] " + entry)
		}
		var data = fs.readFileSync(entry.fullPath,'utf8')
		catalogs.push(require(entry.fullPath))
		files.push(entry.path)
	})
	.on('end', function () {
		res.contentType('application/json')
		res.send("catalogjsonuploads="+JSON.stringify(catalogs))
	})	
})

app.get('/', function (req, res) {
<<<<<<< HEAD
	if (Object.keys(req.query).length === 0) {
		res.setHeader('content-type','text/html');
		res.write(fs.readFileSync(__dirname+"/"+file,"utf8"));
		res.end();
	} else {
		res.send(400);
	}
=======
	res.setHeader('content-type','text/html');
	res.write(fs.readFileSync(__dirname+"/"+file,"utf8"));
	res.end();
>>>>>>> 37691df4651d32c096f3a472b38cc838b8bc5229
});
app.get('/embed.htm', function (req, res) {
	res.write(fs.readFileSync(__dirname+"/embed.htm","utf8"));
	res.end();
});

if (process.versions['electron']) {
		// If launched using Electron binary
		server.listen(port, startapp);
} else {
	server.listen(port);
}

console.log((new Date()).toISOString() + " [viviz] Listening on port " + port)

<<<<<<< HEAD
function parseOptions(req) {
	var options = {};

	if (!req.query || !req.body) {
		return options;
	}
    
	function s2b(str) {if (str === "true") {return true} else {return false}}
	function s2i(str) {return parseInt(str)}
	
	options.dir = req.query.dir || req.body.dir || "";
	
	return options;
}
=======
function startapp() {
	const electron = require('electron')

	const eapp = electron.app
	// Module to create native browser window.
	const BrowserWindow = electron.BrowserWindow

	// Keep a global reference of the window object, if you don't, the window will
	// be closed automatically when the JavaScript object is garbage collected.
	var mainWindow

	function createWindow () {
	  mainWindow = new BrowserWindow({title: "viviz", width: 800, height: 600})
	  mainWindow.loadURL('http://localhost:' + port)

	  // Emitted when the window is closed.
	  mainWindow.on('closed', function () {
	    // Dereference the window object, usually you would store windows
	    // in an array if your app supports multi windows, this is the time
	    // when you should delete the corresponding element.
	    mainWindow = null
	    process.exit(0);
	  })
	}

	eapp.on('ready', createWindow)
}
>>>>>>> 37691df4651d32c096f3a472b38cc838b8bc5229
