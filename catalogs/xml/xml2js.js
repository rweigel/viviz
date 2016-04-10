var fs = require('fs'),
    xml2js = require('xml2js');
 
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/enlil.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        //console.log(JSON.stringify(result,null,4));
        r = result.catalog.gallery;
        var r2 = [];
        for (i = 0; i < r.length; i++) {
        	r2[i] = {};
        	r2[i]["id"] = r[i]["$"]["id"];
        	for (k in r[i]) {
        		if (k !== "$") {
        			r2[i][k] = r[i][k][0]
        		}
        	}
        }
        console.log(JSON.stringify(r2, null, 4));
        //console.log(r2)
        //console.log('Done');
    });
});