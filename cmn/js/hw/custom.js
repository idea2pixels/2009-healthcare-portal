// � 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.

(function($hw, $) {

  // Configuration options
   $hw.setConfig('hwDiChk', "http://hwrxic.healthwise.net/hwrxic/?client=hwdemo");  // Drug Interaction Checker: enter 
  $hw.setConfig('hwSxChk', true);   // Symptom Checker: enter true to enable, false to disable
  $hw.setConfig('hwOSHG', false);   // OSHG: not currently supported

  // Set up search
  //$hw.setConfig('search', { url: "http://dvm-org-web01/xhtmlsearch/JsonSearch.axd" });
  $hw.setConfig('search', { url: "http://www.healthwise.org/xhtmlsearch/JsonSearch.axd" });
  $hw.include('control/search.foundations.js');

  // Set up omniture tracking
  /*
  $hw.setConfig('tracking', { clientToken: '', suffix: 'test' });
  $hw.include('custom/report_omniture.js');
  $(document).bind('org.healthwise.tracking', function(event, data) {
    //org.healthwise.tracking.debug(data);
    hwTrackEvent(data);
  });
  */
  
  org.healthwise.ready(function() {
  
  
  
  
  
  
  
  function setCookie(cookieName, cookieValue) { 
  document.cookie = escape(cookieName) + "=" + escape(cookieValue) ; 
  } 
  
  function getCookie(c_name)
  {
  if (document.cookie.length>0)
    {
    c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!=-1)
      { 
      c_start=c_start + c_name.length+1; 
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1) c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
      } 
      
    }
  return "";
  }
  
  var cookie = getCookie('loggedin');
  
  //alert(document.referrer);
  
  if (document.referrer == 'http://demo.healthwise.net/GateKeeper/login.aspx?token=hwdemo' || document.referrer == 'http://www.healthwise.org/p_demo/p_demo_landing_cont.aspx' || document.referrer == 'varPortalURL' || document.referrer == 'http://www.healthwise.org/p_demo/kb/default.aspx' || document.referrer == 'http://www.healthwise.org/p_demo_now.aspx?token=kbdemo'|| document.referrer == 'http://www.healthwise.org/p_demo_now.aspx?token=xhtmldemo')
  {
   setCookie('loggedin','yes'); 
  
  }
  else if (cookie == "yes")
  {
  
  }
  
  else
  { 
  //alert(varPortalURL);
  window.location.href = "http://www.healthwise.org/p_demo_now.aspx?token=xhtmldemo"; 
} 
  
  
    
  
  
    // Add custom DOM ready functions here  
    
              HomeButt();
  });

})(org.healthwise, jQuery);

function HomeButt()
{
                if (document.title=='Healthwise Knowledgebase')
                {
                                var daHB = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                }
                else
                {
                                var daHB = '<a href="http://www.healthwise.org/p_demo/81xhtmlus/index.html"><img src="http://www.healthwise.org/p_demo/81xhtmlus/inc/custom/images/homeBtn.jpg" WIDTH=65 HEIGHT=30 /></a>';
                                
                }
                $('.HwSearchHeader').html(daHB);
}



