
		
		
		$(function() {
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

  
		
		
		
		
		
		});