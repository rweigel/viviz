// Based on http://paulgueller.com/2011/04/26/parse-the-querystring-with-jquery/
jQuery.extend({
	  parseQueryString: function (def) {
		var nvpair = {}
		var qs = window.location.hash.replace(/^#/,'')
		var pairs = qs.split('&')
		$.each(pairs, function(i, v){
			var pair = v.split('=')
			if ((typeof(pair[1]) === "undefined") && def) {
			  nvpair[def] = pair[0]	  	
			} else {
				if (pair[0] !== '') {
					nvpair[pair[0]] = pair[1]
				}
			}
		})
		return nvpair
	  }
	})
