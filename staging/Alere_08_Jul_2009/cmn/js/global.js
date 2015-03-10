var Alere = window.Alere || {};


$(document).ready(function() {
	/** 
	 * - SideBar Nav - 
	 * For accessability purposes, all nav items are expanded by default so 
	 * that each item can be accesed regardless of JavaScript availability.
	 **/
	
	// Hide each sub sub nav whose parent is not selected
	$("ul#side-bar-nav > :not(li[class='selected'])").find('ul').hide();
	
	// Add click event that expands a sub sub menu	
	$('ul#side-bar-nav > li > a').click(function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('selected').find('ul').toggle('fast');
	});
	
	
	/**
	 * Main Menu Navigation 
	 **/
	Alere.Menu = {};
	
	Alere.Menu.close = function() {
		$('ul#top-nav > li').removeClass('selected');
		$('ul#top-nav div.top-nav-sub').hide();
	};
	
	Alere.Menu.open = function(menuItem) {
		// Close all
		clearTimeout(Alere.Menu.timeout);
		$('ul#top-nav > li').removeClass('selected');
		$('ul#top-nav div.top-nav-sub').hide();
		// Open one
		$(menuItem).parent().toggleClass('selected').find('div.top-nav-sub').slideDown('fast');
	};
	
	Alere.Menu.timeout = null;
	// Add click event that expands a sub sub menu	
	$("ul#top-nav > li > a").click(function(e) {
		e.preventDefault();
		Alere.Menu.open(this);
		$(this).parent().bind('mouseleave', function(e) {
			clearTimeout(Alere.Menu.timeout);
			Alere.Menu.timeout = setTimeout(function() {
				Alere.Menu.close();
			}, 400);
		}).bind('mouseenter', function(e) { 
			clearTimeout(Alere.Menu.timeout);
		});
	});
	

	/** 
	 *	Module Utility Nav interaction model 
	 **/
	// Always show this button
	$('div.more').hide();
	$('a.tell-me-more').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('selected');
		$(this).closest('div').find('div.more').toggle('fast');
	});
	
	// Don't show again again button
	$('ul.utility-nav li.dont-show a').click(function(e) {
		e.preventDefault();
		var confirmBox = $(this).parent().find('div.dont-show-confirm');
		confirmBox.fadeIn('fast');
		confirmBox.find('a:first').one('click', function(e) {
			e.preventDefault();
			confirmBox.fadeOut('fast');
		});
		confirmBox.find('a:last').one('click', function(e) {
			e.preventDefault();
			confirmBox.hide();
			$(this).closest('div.module').fadeOut('slow');
		});
	});
	
	
	// Tell me more button
	$('ul.utility-nav li.show-more a').click(function(e) {
		e.preventDefault();

		// Clone a random module and insert it
		var totalNumberOfModules = $('div.main-well div.module').length;
		var randomModuleIndex = Math.ceil(Math.random() * totalNumberOfModules - 1);
 		var randomModuleNode = $('div.main-well div.module').get(randomModuleIndex);
		var clonedNode = $(randomModuleNode).clone(true);
		clonedNode.hide();
		$(this).closest('div.module').after(clonedNode);
		clonedNode.fadeIn('slow');
	});
	
	
	/** 
	 *	True / False Quiz  
	 **/
	
	var trueFalseForms = $('form.true-false');
	$('div.module div.answer').hide();
	trueFalseForms.find('label.true input').click(function() {
		var answerDiv = $(this).closest('div.module').find('div.answer')
		answerDiv.fadeIn('fast');		
		$(this).closest('fieldset').hide();
		answerDiv.find('h6.true').show();
		answerDiv.find('h6.false').hide();
	});
	
	trueFalseForms.find('label.second input').click(function() {
		var answerDiv = $(this).closest('div.module').find('div.answer')
		answerDiv.fadeIn('fast');
		$(this).closest('fieldset').hide();
		answerDiv.find('h6.true').hide();
		answerDiv.find('h6.false').show();
	});
	
	
	/**
	 * Set up example for inputs
	 **/
	$('input.example-text').example(function() {
	   return $(this).attr('title'); 
	});
	
	
	/**
	 * Form Field Help Overlay
	 **/
	$('div.more-overlay').hide();
	$('form a.form-field-help').hover(function(e) {
		var helpDIVId = $(this).attr('id').split('btn-')[1];
		var helpDiv = $('#' + helpDIVId);
		if(!$(this).helpDiv) {
			$(this).helpDiv = helpDiv;
			$('body').append(helpDiv);
		}
		helpDiv.css({left: (e.pageX - helpDiv.outerWidth()) - 10 + 'px', top: e.pageY + 10 + 'px'}).fadeIn('fast');
	},function() {
		$('div.more-overlay').fadeOut('fast');
		}
	);
	
	
	
	
	/**
	 * Image carousels on HPA Landing and HPA report pages 
	 **/
	function imageCarousel_initCallback(carousel) {
	    $('div.image-carousel ol a').bind('click', function(e) {
			e.preventDefault();
	        carousel.scroll($.jcarousel.intval($(this).attr('title')));
	        return false;
	    });

	    $('div.image-carousel a.next').bind('click', function() {
	        carousel.next();
	        return false;
	    });

	    $('div.image-carousel a.previous').bind('click', function() {
	        carousel.prev();
	        return false;
	    });
	};
	
	function imageCarousel_itemLoadCallback(carousel) {
		$('div.image-carousel ol li').removeClass('selected').eq(carousel.first-1).addClass('selected');
	}

    $("ul.image-carousel").jcarousel({
        scroll: 1,
		visible: 1,
        initCallback: imageCarousel_initCallback,
        // This tells jCarousel NOT to autobuild prev/next buttons
        buttonNextHTML: null,
        buttonPrevHTML: null,
		itemLoadCallback: {
		  onBeforeAnimation: imageCarousel_itemLoadCallback,
		  onAfterAnimation: null
		}
    });

	function listCarousel_initCallback(carousel) {
	    $(carousel.container).parent().find('ul.pagination.list-carousel-pagination li a.next').bind('click', function(e) {
			e.preventDefault();
	        carousel.next();
	        return false;
	    });
	    $(carousel.container).parent().find('ul.pagination.list-carousel-pagination li a.prev').bind('click', function(e) {
			e.preventDefault();
	        carousel.prev();
	        return false;
	    });
	};
	
	$('ul.list-carousel').jcarousel({
        scroll: 1,
		visible: 1,
        initCallback: listCarousel_initCallback,
        buttonNextHTML: null,
        buttonPrevHTML: null
    });
	
	
});

$(document).ready(function(){
	// $('#expand').hide();
	$(".arrow").click(function(){
		$("#expand").slideToggle("fast");
		$(this).toggleClass("active"); return false;
	});
	
	 
});

$(document).ready(function(){
 	$(".alphabet").click(function(){
		$("#step2").toggleClass("activestep"); return false;
	});
	
	 
})