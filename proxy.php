<?php

$whitelist = array(); // Allow directory listing of any URL.  Danger.
//$whitelist = array("virbo.org","spdf.gsfc.nasa.gov");

// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: GET');

// Additional headers which may be sent along with the CORS request
// The X-Requested-With header allows jQuery requests to go through
header('Access-Control-Allow-Headers: X-Requested-With');

$url = $_GET['url'];

if (count($whitelist) > 0) {
	$urlp = parse_url($url);
	$host = $urlp["host"];
	if (!in_array($host,$whitelist)) {
		echo "Host $host is not in whitelist";
		return;
	}
}

// Only allow URLs that end with /
if (preg_match("/\/$/",$url)) { 
	echo file_get_contents ($url);
} else {
    echo "URL must end with /";
}
