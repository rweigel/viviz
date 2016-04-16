var fs         = require('fs');
var http       = require('http'); 
var request    = require("request");
var express    = require('express');
var app        = express();
var server     = require("http").createServer(app);
var serveIndex = require('serve-index');

var qs       = require('querystring');
var fs       = require('fs');
var xml2js   = require('xml2js');
var mkdirp   = require("mkdirp");
var readdirp = require("readdirp");
var clc      = require('cli-color');
var dirwalk  = require('./node_modules/dirwalk/dirwalk.js').dirwalk;

var argv    = require('yargs')
				.default
				({
					'file': "index.htm",
					'port': "8002"
				})
				.argv

eval(require('fs').readFileSync('./index.js', 'utf8'))

var port = VIVIZ["port"] || argv.port;
var file = argv.file;

// Log to console with color
console.logc = function (str,color) {
    var msg = clc.xterm(color); console.log(msg(str))
}

var debug = true;

process.on('uncaughtException', function(err) {
	if (err.errno === 'EADDRINUSE') {
		console.error((new Date()).toISOString() + " [viviz] Port "
			      + port + " already in use.")
	} else {
		console.error(err)
	}
	fs.writeFileSync('viviz.error', err);
	process.exit(1)
})

// Allow files to be served from these directories
app.use('/images', express.static(__dirname + '/images'));
app.use('/deps', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/catalogs', express.static(__dirname + '/catalogs'));
app.use('/dat', express.static(__dirname + '/dat'));
app.use('/doc', express.static(__dirname + '/doc'));
app.use('/', express.static(__dirname + '/'));

// Allow directory listings of these directories
app.use('/images',serveIndex(__dirname + '/images', {'icons': true}));
app.use('/deps',serveIndex(__dirname + '/js', {'icons': true}));
app.use('/css',serveIndex(__dirname + '/css', {'icons': true}));
app.use('/catalogs',serveIndex(__dirname + '/catalogs', {'icons': true}));
app.use('/dat',serveIndex(__dirname + '/dat', {'icons': true}));
app.use('/doc',serveIndex(__dirname + '/doc', {'icons': true}));

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
})

app.get('/', function (req, res) {
	if (Object.keys(req.query).length === 0) {
		res.setHeader('content-type','text/html');
		res.write(fs.readFileSync(__dirname+"/"+file,"utf8"));
		res.end();
	} else {
		options = parseOptions(req);
		dirl();
	}
});

server.listen(port)
console.log((new Date()).toISOString() + " [viviz] Listening on port " + port)

function parseOptions(req) {
	var options = {};
    
	function s2b(str) {if (str === "true") {return true} else {return false}}
	function s2i(str) {return parseInt(str)}
	
	options.dir = req.query.dir || req.body.dir || "";
	
	return options;
}

function dirl() {
	url = "http://localhost:9999/images/full/"
	//url = "http://mag.gmu.edu/tmp/";
	var opts = {id: 0, url: url, dirpattern: "", filepattern: "", debug: true, debugcache: false};
	dirwalk(opts, function (error, list, flat, nested) {
		if (error) {
			console.log(error);
		} else {
			console.log(list);
		}
	})
}