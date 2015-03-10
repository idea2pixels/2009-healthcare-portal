// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.

(function($hw, $) {

  org.healthwise.include('control/pngfix.js');

  org.healthwise.ready(function() {
    pngfix(); // cannot be moved into any functions below due to scope issues

    addLinkEventHandlers();
    addLinkImages();
    addLandingPageLinks();
    addWorkarounds();
  });


  // Private functions

  function addLinkEventHandlers() {
    // actionsets 
    $('a.HwLinkShowActionset').click(function() {
      var id = '#Actionset' + $(this).attr('href').substr(1);
      $(id).toggleClass('HwActionsetOpen').toggleClass('HwActionsetClosed');
      return false;
    });

    $('a.HwLinkShowInnerLayer').click(function() {
      var id = '#' + $(this).attr('href').substr(1);
      $(id).toggleClass('HwQuizOpen').toggleClass('HwQuizClosed');
      return false;
    });

    $('a.HwActionsetNavigationLink').click(function() {
      var id = '#Actionset' + $(this).attr('href').substr(1);
      $(id).addClass('HwActionsetOpen').removeClass('HwActionsetClosed');
      return true;
    });

    // symptom topics
    $('a.HwSymptomAnswerLink').click(function() {
      var id = '#' + $(this).attr('href').substr(1);
      $(id).toggleClass('HwCysOpen').toggleClass('HwCysClosed');
      return false;
    });

    $('a.HwSeverityAnswerLink').click(function() {
      var docType = (org.healthwise.url.parseURL('..', $(this).attr('href')))['folder'];
      if (docType.toLowerCase() == 'definition') {
        org.healthwise.ui.openWindow($(this).attr('href'), true);
      }
      return false;
    });

    $('a.HwLinkEmergencyAnswer').click(function() {
      org.healthwise.ui.openWindow($(this).attr('href'), true);
      return false;
    });

    // condition centers
    $('a.HwLinkConditionCenterShow').click(function() {
      var id = $(this).attr('href');
      var actionStr = '';
      if ($(id).attr('class').indexOf('Action') != -1)
        actionStr = 'Action';

      $(id).toggleClass('HwConditionCenterOpen' + actionStr).toggleClass('HwConditionCenterClosed' + actionStr);
      return false;
    });

    // multimedia
    $('a.HwLinkMultiMedia,a.HwLinkDefinition,a.HwLinkCalculator,a.HwIToolImageStartButton').click(function() {
      org.healthwise.ui.openWindow($(this).attr('href'), true);
      return false;
    });

    $('a.HwLinkDefinition').mouseover(function() {
      org.healthwise.ui.mouseoverTooltip($(this).attr('href'), true);
      return false;
    });

    $('a.HwLinkDefinition').mouseout(function() {
      org.healthwise.ui.mouseoutTooltip();
      return false;
    });

    // references
    $('a.HwLinkReference').mouseover(function() {
      var id = $(this).attr('rel');
      org.healthwise.ui.mouseoverTooltipDiv(id);
      return false;
    });

    $('a.HwLinkReference').mouseout(function() {
      org.healthwise.ui.mouseoutTooltip();
      return false;
    });

    $('a.HwLinkReference').click(function() {
      org.healthwise.navigation.section($(this).attr('href').substr(1));
      window.scrollTo(0, 0); //?
      return true;
    });

    // Enable section navigation
    $('a.HwLinkNavstack').click(function() {
      return org.healthwise.navigation.section(this.href.replace(/^.*#/, ''));
    });
    $(".HwLastUpdated a").click(function() {
      return org.healthwise.navigation.section(this.href.replace(/^.*#/, ''));
    });
    $(".HwCredits p:first a").click(function() {
      return org.healthwise.navigation.section(this.href.replace(/^.*#/, ''));
    });

    // external links
    $('a.HwLinkExternal').click(function() {
      window.open($(this).attr('href'));
      org.healthwise.tracking.track({
        type: "PDF",
        url: $(this).attr('href'),
        title: $(this).text()
      });
      return false;
    });

  };


  function addLinkImages() {
    $('.HwLinkCalculator').append("<img src='" + org.healthwise.config.root + "/inc/custom/images/LinkInteractive.gif' alt='Click here to see an interactive tool.'/>");
    $('.HwLinkDefinition').append("<img src='" + org.healthwise.config.root + "/inc/custom/images/LinkInformation.png' alt='Click here to see more information.'/>");
    $('.HwLinkMultiMedia').append("<img src='" + org.healthwise.config.root + "/inc/custom/images/LinkMultimedia.png' alt='Click here to see an illustration.'/>");

    if ($.browser.msie && $.browser.version.substr(0, 1) == '6')
      $('.HwLinkExternal').append("<img src='" + org.healthwise.config.root + "/inc/custom/images/ie6/LinkExternal.gif' alt='Click here to open external link.'/>");
    else
      $('.HwLinkExternal').append("<img src='" + org.healthwise.config.root + "/inc/custom/images/LinkExternal.png' alt='Click here to open external link.'/>");
  };


  function addLandingPageLinks() {
    if ($hw.getConfig('hwDiChk')) {
      $('.HwLandingLinksDrugInteraction a').attr('href', $hw.getConfig('hwDiChk'));
      $('.HwLandingLinksDrugInteraction').show();
    }
    if ($hw.getConfig('hwOSHG')) {
      $('.HwLandingLinksOSHG a').attr('href', $hw.getConfig('hwOSHG'));
      $('.HwLandingLinksOSHG').show();
    }
    if ($hw.getConfig('hwSxChk')) {
      $('.HwLandingLinksSymptomChecker').show();
    }
  }

  function addWorkarounds() {
    // Hack to show vertical bar in content menu in IE6
    if ($.browser.msie) {
      $('.HwContentMenu li:not(:first)').css({ 'border-left': 'solid 1px black' });
    }

    // Hack to prevent NCI document overflowing the content area
    // (adds scroll bars to tables that are two wide)
    if ($hw.document.doctype == 'Nci') {
      $("table").wrap("<div style='overflow:auto;width:100%;'></div>");
    }

    // Hack deal with images that are too wide inside an actionset
    // (reduces padding in case there are images in actionsets and the layout is narrow)
    if ($('.HwActionsetInner .HwMedicalImage').length > 0 && $('.HwActionset').width() <= 480) {
      //$('.HwActionsetInner').addClass("HwActionsetReducePadding");
      $('.HwActionsetInner div.HwMedicalImage').addClass("HwActionsetReducePadding");
    }
  }
})(org.healthwise, jQuery);
