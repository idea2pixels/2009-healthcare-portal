// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.


// Uncomment to turn on debugging on module binding code:
// org.healthwise.config.debug = true;


/* -------------------- Core org.healthwise functions ----------------------------

org.healthwise.setConfig(name, value);
org.healthwise.getConfig(name);
org.healthwise.include(path);
org.healthwise.module(moduleName, path);
org.healthwise.define(moduleName, functionName, function);
org.healthwise.error(msg);
org.healthwise.ready(function);
*/


org.healthwise.setConfig = function(name, value) {
    org.healthwise.config[name] = value;
    $(document).trigger('org.healthwise.config.' + name, value);
    return org.healthwise.config[name];
};

org.healthwise.getConfig = function(name) {
  return org.healthwise.config[name];
};

org.healthwise.include = function(fileName) {
  // If filename starts with letter it is considered relative
  // to the /inc directory, otherwise it is considered a ready path
  if (!fileName.match(/^([^\w]|http\:)/))
    fileName = org.healthwise.config.root + "inc/" + fileName;
  var script = '<script type="text/javascript" src="' + fileName + '"></script>';
  document.write(script);
};


org.healthwise.checkParameter = function(moduleName, parameterName) {
  if (typeof (org.healthwise.config[moduleName]) == 'undefined' ||
        typeof (org.healthwise.config[moduleName][parameterName]) == 'undefined') {
    org.healthwise.error("Required parameter '" + parameterName + "' undefined in module '" + moduleName + "'");
    return false;
  }
  return true;
};

org.healthwise.error = function(msg) {
  if (org.healthwise.config.debug)
    window.alert(msg);
};

org.healthwise.ready = function(f) {
  // TODO maybe add some logic to ensure that Jquery is loaded and wait for it if not
  // (only necessary if we need to set up ready() functions from this file
  jQuery(document).ready(f);
};



org.healthwise.module = function(name, implementation) {
  if (org.healthwise.config.debug) {
    for (var method in org.healthwise[name]) {
      if (!implementation[method])
        org.healthwise.error("Required method '" + method + "' not implemented in module '" + name + "'");
    }
  }

  org.healthwise[name] = implementation;
};

/* -------------------- APIs to standard modules ---------------------------- */

// User interaction interface
org.healthwise.ui = {
  openWindow: function(path, modal) { return true; },
  mouseoverTooltip: function(path, truncate) { return true; },
  mouseoutTooltip: function() { return true; },
  mouseoverTooltipDiv: function(div) { return true; },
  closeWindows: function() { }
};

// Navigation interface
org.healthwise.navigation = {
  section: function(id, targetId) { },
  currentSection: function() { },
  changeSlide: function(a, b) { }
};

// Search interface
org.healthwise.search = {
  search: function(searchTerm, numberOfResults, page, SearchResultsCallback) { }
};

// URL interface
org.healthwise.url = {
  getURL: function(docType, docHwid, sectHwid) { },
  // params should be a hash of query string parameters
  getURLWithQueryString : function(page, params) { },
  parseURL: function(pageTypePattern, url) { },
  stripSectionFromPath: function(path) { }
};

// Tracking interface
org.healthwise.tracking = {
  track: function(data) { },
  debug: function(data) { }
};



/* -------------------- Config and Document properties ----------------------- */

// Default configuration
org.healthwise.config.hwDiChk = false;
org.healthwise.config.hwSxChk = false;
org.healthwise.config.hwOSHG = false;

// Localization stuff
org.healthwise.localization = {};
org.healthwise.localization.MORE_TEXT = "More >";
org.healthwise.localization.CLOSE_TEXT = "CLOSE&nbsp;&nbsp;X";

// Omniture tracking needs this
var m_localization = org.healthwise.config.locale;

// Document uses javascript-based navigation (displaying one section at a time)
org.healthwise.document.hasActiveNavigation =
           org.healthwise.document.doctype == "Major" ||
           org.healthwise.document.doctype == "Mini" ||
           org.healthwise.document.doctype == "Special" ||
           org.healthwise.document.doctype == "Symptom" ||
           org.healthwise.document.doctype == "MedicalTest" ||
           org.healthwise.document.doctype == "Support";

// Document has sections
org.healthwise.document.hasNavigation =
          org.healthwise.document.hasActiveNavigation ||
           org.healthwise.document.doctype == "DrugDetail" ||
           org.healthwise.document.doctype == "TestDetail" ||
           org.healthwise.document.doctype == "SurgicalDetail" ||
           org.healthwise.document.doctype == "OtherDetail" ||
           org.healthwise.document.doctype == "Nci" ||
           org.healthwise.document.doctype == "Shc" ||
           org.healthwise.document.doctype == "Cam" ||
           org.healthwise.document.doctype == "Nord";



/* -------------------- Loading of necessary files ---------------------------- */



(function($hw) {

  // jQuery
  $hw.include('control/jquery-1.3.1.js');

  // Required stuff
  $hw.include('control/url.js');
  $hw.include('control/ie6-layout-patch.js');
  $hw.include('control/custom_injection.js');
  $hw.include('control/jquery.history.js');
  $hw.include('control/swfobject.js');
  $hw.include('control/navigation.js');
  $hw.include('control/ui.js');
  $hw.include('control/addcorners.js');
  $hw.include('control/tracking.js');
  $hw.include('control/behavior.js');

  // Custom includes
  $hw.include('custom/custom.js');

})(org.healthwise);

// stub so iTools don't error in IE. Will be overwritten if tracking is enabled.
function hwTrackEvent(ti) {
	return;
}

