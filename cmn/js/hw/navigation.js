// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.

org.healthwise.module('navigation', function($hw, $) {


	$hw.ready(function() {
		if ($hw.document.hasActiveNavigation) {
			$.history.init(org.healthwise.navigation.currentSection);
		}

		// This magic attaches click handlers to links within a document to the
		// same document. It is required to hook up the history handler to these
		// links or the section handling will not work correctly.
		$('.HwContent a[href*=' + $hw.document.id + '.html]').click(function() {
			return org.healthwise.navigation.section(this.href.replace(/^.*#/, ''));
		});

		$('#HwFooter a[href*=' + $hw.document.id + '.html]').click(function() {
			return org.healthwise.navigation.section(this.href.replace(/^.*#/, ''));
		});

		$(document).bind('org.healthwise.overlayopen', bindSlideShowButtons);
		$(document).bind('org.healthwise.overlayclose', overlayClosing);

		if ($hw.document.doctype == 'Multum' && $('div.DrugImagesSlideShow').length > 0) {
			$(window).unload(trackMultumSlideshows);
		}

		bindSlideShowButtons();

	});


	// Public functions
	var public = {};

	public.section = function(id) {
		if ($hw.document.hasActiveNavigation) {
			$.history.load(id);
			return false;
		}
		// For other document, just follow the link
		return true;
	};

	public.currentSection = function() {
		return navStackShowCurrentSection();
	};

	public.changeSlide = function(a, b) {
		return changeSlide(a, b);
	};


	// Private functions
	
	var maxSlideViewed = 0;

	/* 
	Hide all navigation section div elements except the one with the input id 
	*/
	function navStackShowSection(id) {
		$('.HwNavigationSection').hide();
		$('#sec-' + id).show();
		$('.HwSectionNavItem').hide();
		$('#secNav-' + id).show();
		$('#HwNavigation li').removeClass('HwNavigationItemCurrent');
		$('#nav-' + id).addClass('HwNavigationItemCurrent');

		window.scrollTo(0, 0);

		org.healthwise.tracking.track({
			type: 'CONTENT',
			sectHwid: id,
			sectTitle: $('#sec-' + id + ' .HwSectionTitle').text()
		});
	}

	function navStackShowCurrentSection() {
		var sectionId = getSectionId();
		navStackShowSection(sectionId, sectionId);
	}

	function getSectionId() {
		var url = String(document.location);
		var index = url.indexOf('#');
		if (index > 0 && index < url.length - 1) {
			return url.substring(index + 1);
		}
		return $hw.document.section;
	}


	function getSectionFromURL(path) {
		return path.hash.substring(1);
	}

	function bindSlideShowButtons(elem) {
		$('input.HwSlideButtonPrev').click(function() {
			var currentSlideNum = $(this).attr('id').substr($(this).attr('id').indexOf('_') + 1)
			org.healthwise.navigation.changeSlide(currentSlideNum, parseInt(currentSlideNum) - 1);
			return true;
		});
		$('input.HwSlideButtonNext').click(function() {
			var currentSlideNum = $(this).attr('id').substr($(this).attr('id').indexOf('_') + 1)
			org.healthwise.navigation.changeSlide(currentSlideNum, parseInt(currentSlideNum) + 1);
			return true;
		});
	}

	function overlayClosing() {
		if ($('div.SlideShow').length > 0) {
			trackSlideShow($('div#HwPopoutHeaderTitle').text(), $('div.HwSlide').length, maxSlideViewed);
		}
	}

	function trackMultumSlideshows() {
		trackSlideShow(document.title, $('div.HwSlide').length, maxSlideViewed);
	}

	function trackSlideShow(title, numSlides, maxSlide) {
		org.healthwise.tracking.track({
			type: 'SLIDESHOW',
			pageName: title,
			slideShowCount: numSlides,
			maxSlideViewed: maxSlide
		})
	}

	/*
	Used by slideshows. Move to next/prev slide.
	*/
	function changeSlide(a, b) {
		if (typeof (maxSlideViewed) != 'undefined') {
			c = Math.max(a, b);
			if (c > maxSlideViewed) { maxSlideViewed = c; }
		}

		document.getElementById('Slide' + a).style.display = "none";
		document.getElementById('Slide' + b).style.display = "";
	}


	return public;
} (org.healthwise, jQuery));