// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.
org.healthwise.module('tracking', function($hw, $) {
	var public = {};

	$hw.ready(function() {
		$('a.HwLinkListLetterPair').click(function() {
			var url = new String(this.href);
			public.track({
				type: 'LIST',
				subletter: url.substr(url.indexOf('#') + 1).toLowerCase()
			});
		});

		if (!($hw.document.hasActiveNavigation || $("meta[name*=pageType]").attr('content') == 'search'))
			public.track({});
	});


	// Public functions

	public.track = function(data) {
		var data = getTrackingData(data);
		if (!data) return;

		var config = $hw.getConfig('tracking');
		if (config && config.clientToken)
			data.clientToken = config.clientToken;

		$(document).trigger('org.healthwise.tracking', data);
	}

	public.debug = function(data) {
		org.healthwise.error("TRACKING\n\n" + (function(data) {
			var txt = "";
			for (var key in data) txt += key + ": " + data[key] + "\n";
			return txt;
		})(data)
      + "\n\nAccount: " + hwSetAccount(data)
    );
	}


	// Private functions

	function getTrackingData(data) {
		data.type = (data.type || $("meta[name*=pageType]").attr('content')).toUpperCase();

		if (data.type == "CONTENT") {
			// Definitions get their data set explicitely in call to track(), for other documents
			// grab information out of DOM
			if (!data.docHwid) {
				data.docType = org.healthwise.document.doctype;

				if (data.docType == 'Static') {
					// Symptom checker
					data.docType = 'MultiMedia';
					data.docHwid = 'hwSxChk';
				} else {
					data.docHwid = org.healthwise.document.id;
				}
				data.docTitle = document.title;
				if (!data.sectHwid) {
					data.sectHwid = data.sectHwid || org.healthwise.document.section || "";
					data.sectTitle = data.sectTitle || $('#sec-' + data.sectHwid + " .HwSectionTitle").text() || "";
				}
			} else {
				data.sectHwid = data.sectHwid || "";
				data.sectTitle = data.sectTitle || "";
			}
		} else if (data.type == "CATEGORY") {

			data.category = document.title.replace(/category list - /i, '');
		}
		else if (data.type == "LIST") {
			// For list pages, figure out letters and subletters from URL
			var url = new String(document.location);
			var m = url.match(/\/([\w-]+)\/([\w-]+).html(?:#([\w-]+))?/);
			if (m != null) {
				data.filter = m[1];
				data.letter = m[2];
				if (m[3] && !data.subletter)
					data.subletter = m[3].toLowerCase();
			}
		}
		else if (data.type == "SEARCH") {
		}
		else if (data.type == "LANDING") {
			data.type = 'HOMEPAGE';
		}
		else if (data.type == "SLIDESHOW") {
		}
		else {
			org.healthwise.error("Unknown Page Type in Analytics Tracking: " + data.type);
		}
		return data;
	}

	return public;

} (org.healthwise, jQuery));

