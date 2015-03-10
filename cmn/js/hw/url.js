// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.
org.healthwise.module('url', function($hw, $) {

	var public = {};

	// pass in 'root' for the docType to get a url in the root. Use the filename
	// for docHwid in this case
	public.getURL = function(docType, docHwid, sectHwid) {
		var url;
		if (docType == 'root')
			return $hw.config.root + '/' + docHwid + '.html';
		else {
			url = 'content/' + docType + '/' + docHwid + '.html';
			if (sectHwid != '')
				return url + '#' + sectHwid;
			else
				return url;
		}
	}

	public.getURLWithQueryString = function(page, params) {
		var url = page + '.html?';
		for (var param in params) {
			url += param + '=' + params[param] + '&';
		}
		url = url.slice(0, -1);
		return url;
	}

	public.stripSectionFromPath = function(path) {
		var sectionCharIndex = path.indexOf("#");
		if (sectionCharIndex > -1) {
			path = path.substr(0, sectionCharIndex);
		}
		return path;
	}

	//Parse URL for <folder>/<page>.html#<bookmark>
	public.parseURL = function(pageTypePattern, url) {
		var listPos = url.indexOf(pageTypePattern + "/");
		var returnHash = new Array();
		var hasBookmark = true;

		if (listPos == -1) {
			return returnHash;
		}
		var filterPlusLetter = url.substring(listPos, url.length);
		filterPlusLetter = filterPlusLetter.replace(pageTypePattern + "/", "");

		var reUrlPattern = /(\w+)\/([\w-]+)\.htm[l]?\#([\w-]+)/;
		if (!reUrlPattern.test(filterPlusLetter)) {
			reUrlPattern = /(\w+)\/(\w+)\.htm[l]?/;
			hasBookmark = false;
		}
		if (!reUrlPattern.test(filterPlusLetter)) {
			return returnHash;
		}
		var match = reUrlPattern.exec(filterPlusLetter);

		returnHash["folder"] = match[1];
		returnHash["page"] = match[2];
		if (hasBookmark) {
			returnHash["bookmark"] = match[3];
		}
		else {
			returnHash["bookmark"] = "";
		}

		return returnHash;
	}

	return public;

} (org.healthwise, jQuery));