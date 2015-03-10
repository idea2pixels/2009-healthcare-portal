// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.
org.healthwise.module('ui', function($hw, $) {

  // Includes
  //$hw.include('control/jquery-ui.js');

  // Event handlers
  $(document).mousemove(getMousePos);

  // Public functions
  var public = {};

  public.openWindow = function(path, modal) {
    hoveringOverToolTip = false;
    openWindow(path, modal);
  };

  public.mouseoverTooltip = function(path, truncate) {
    hoveringOverToolTip = true;
    setTimeout(function() {
      if ($("div#HwTooltip")) {
        if (hoveringOverToolTip) {
          openTooltipWindow(path, truncate)
        }
      }
    }, HwTooltipTimeInMs);
  };

  public.mouseoverTooltipDiv = function(div) {
    hoveringOverToolTip = true;
    setTimeout(function() {
      if ($("div#HwTooltip")) {
        if (hoveringOverToolTip) {
          openTooltipWindowDiv(div)
        }
      }
    }, HwTooltipTimeInMs);
  };

  public.mouseoutTooltip = function(path) {
    setTimeout(checkCloseTooltipWindow, HwTooltipTimeOutMs);
    hoveringOverToolTip = false;
  };

  public.closeWindows = function() {
    return true;
  };


  // Private functions and properties

  //Mouse parameters
  var HwTooltipTimeOutMs = 800;
  var HwTooltipTimeInMs = 300;
  var hoveringOverToolTip = false;
  var xPos = 0;
  var yPos = 0;
  var hoverXOffset = 100;
  var hoverYOffset = 100;
  var setPointX = 0;
  var setPointY = 0;
  var hwToolTipWidth = 652;
  var hwToolTipWords = 100;
  var offsetY = 10;


  function checkCloseTooltipWindow() {
    if ($("div#HwTooltip")) {
      if (!hoveringOverToolTip) {
        closeTooltipWindow();
      }
    }
  }

  function openWindow(path, isModal) {
    var width = 742;
    clearAllOverlays();

    //IE will not read uri with a path anchor indicator
    path = $hw.url.stripSectionFromPath(path);

    $.ajax({
      type: "GET",
      url: path,
      dataType: "html",
      success: function(html) {
        loadWindow(html, width, isModal);
      }
    });

    return false;
  }

  function getConfig(html, key) {
    var regexString = "healthwise.document." + key + '\\s*=\\s*\\"([\\w-_]+)\\"';
    var re = new RegExp(regexString, "im");
    var match = re.exec(html);
    if (match) {
      return match[1];
    }
    return null;
  }

  function getInformation(html) {
    var htmlObject = $(html);

    var doctype = getConfig(html, "doctype");
    var hwid = getConfig(html, "id");
    if (doctype == 'Static' || hwid.substr(0, 4) == 'calc')
      doctype = 'ITool';
    else
      doctype = doctype.substr(0, 1).toUpperCase() + doctype.substr(1, doctype.length).toLowerCase();

    return {
      title: htmlObject.find(".HwContentTitle h1").text(),
      content: htmlObject.find(".HwContent"),
      credits: htmlObject.find(".HwContentInformation"),
      doctype: doctype,
      hwid: hwid
    }
  }

  function loadWindow(html, maxWidth, isModal) {
    var info = getInformation(html);
    //get JSON script
    var jsonStartTag = "<!--HwIToolsJson.Start-->";
    var jsonEndTag = "<!--HwIToolsJson.End-->";
    var jsonScriptText = getTagHtml(html, jsonStartTag, jsonEndTag);

    if (jsonScriptText) {
      jsonScriptText = stripHtmlTags(jsonScriptText);
      var jsonScript = document.createElement("script");
      jsonScript.type = "text/javascript";

      try {
        jsonScript.appendChild(document.createTextNode(jsonScriptText));
      }
      catch (er) {
        jsonScript.text = jsonScriptText;
      }
      document.getElementsByTagName("head")[0].appendChild(jsonScript);
    }

    if (isModal) {
      var overlayHtml = "<div id='HwDialogOverlay' class='HwDialogOverlay'> </div>";
      $("body").append(overlayHtml);
    }

    $("body").append(createOverlayElement("addCloseButton", info.doctype));

    $('div#HwPopoutContent').append(info.content);
    $('div#HwPopoutContent').append(info.credits);
    $('div#HwPopoutHeaderTitle').html(info.title);

    var heightBuffer = 40;
    var height = $('div#HwPopoutContent').height() + heightBuffer;

    // Hack to align iamges correctly in firefox
    // Make images not float right if there are more than one image on the page
    if ($.browser.mozilla) {
      if ($('#HwPopoutContent img.HwMedicalImage').length > 1) {
        $('#HwPopoutContent .HwMedicalImage').css({ float: 'none' });
      }
    }

    // Fix width issue in IE7
    var width = $('#HwPopout').width();
    $('#HwPopoutHeaderTitle').width("75%");
    $('#HwPopoutHeaderClose').css({ float: 'right' });
    $('#HwPopout').width(width);

    var width = $('#HwPopout').width();
    if (width > maxWidth) width = maxWidth;
    centerWindow("HwPopout", maxWidth);

    $(document).trigger('org.healthwise.overlayopen', $('#HwPopout'));

    if ($("div.SlideShow").length > 0) {
      $("div#HwPopout").width(width); // FF shrinks the overlay when the slide changes (ex:ug2775)
    }

    $("div.HwPopout").css({
      visibility: "visible"
    });

    if (isModal) {
      var dimension = getWindowDimensions();
      var docWidth = dimension.width;
      var docHeight = dimension.height;
      $("div#HwDialogOverlay").css({
        visibility: "visible",
        width: docWidth,
        height: docHeight
      });
    } else {
      $('#HwPopout').draggable({
        zIndex: 20,
        ghosting: false,
        opacity: 0.7,
        handle: '#HwPopoutHeader'
      });
    }

    $('div#HwPopoutHeaderClose').click(function() {
      $(document).trigger('org.healthwise.overlayclose', $('#HwPopout'));
      clearAllOverlays();
      return false;
    });

    /* What is this??
    $("#HwPopoutContent").click(function() {
    var height = $('div#HwPopoutContent').height() + heightBuffer;
    var width = $('div#HwPopout').width();
    if (width > maxWidth) width = maxWidth;
    $("div#HwPopout").height(height);
    $("div#HwPopout").width(width);
    });
    */

    // In IE6, the itools get the wrong width. Fix it.
    var width = $('#HealthwiseInteractiveTool').width()
    if (width > 200) {
      $('#HwPopout').width(width + 40);
    }

    if (info.hwid) {
      org.healthwise.tracking.track({
        type: 'content',
        docHwid: info.hwid,
        docTitle: info.title,
        docType: info.doctype
      });
    }
  }

  function createOverlayElement(addClose, doctype) {

    var overlay = "<div class='HwPopout HwType" + doctype + "' id='HwPopout'>\n" +
                "<div class='HwPopoutContent' id='HwPopoutContent'>" +
                "<div class='HwPopoutHeader' id='HwPopoutHeader'>" +
                "<div id='HwPopoutHeaderTitle' class='HwPopoutHeaderTitle'></div>";
    if (addClose) {
      overlay += "<div id='HwPopoutHeaderClose' class='HwPopoutHeaderClose'><a id='HwCloseOverlay' href='#'>" + org.healthwise.localization.CLOSE_TEXT + "</a></div>\n";
    }
    overlay += "<div class='HwPopoutHeaderClear'></div>";
    overlay += "</div>\n" +
                "</div>\n" +
                "<div class='HwPopoutBackground'>\n" +
                    "<u class='w'></u><u class='e'></u>\n" + //up
                    "<i class='w'></i><i class='e'></i>\n" + //in-between
                    "<b class='w'></b><b class='e'></b>\n" + //bottom
                "</div>\n" +
            "</div>\n";

    return overlay;
  }


  function centerWindow(windowId, maxWidth) {
    var buffer = 0.03; // 03%
    var height = $('#' + windowId).height()
    var width = $('#' + windowId).width();
    if (width > maxWidth) {
      width = maxWidth;
      $('#' + windowId).width(width);
    }

    var dimensions = getWindowDimensions();

    //X Axis
    var xPoint = 0;
    if (width < dimensions.width) {
      xPoint = Math.round((dimensions.width - width) / 2) + dimensions.left;
    }

    //Y Axis
    var yBuffer = Math.round((dimensions.bottom - dimensions.top) * buffer);
    var yPoint = dimensions.top + yBuffer;
    if ((height + yBuffer) < (dimensions.bottom - dimensions.top)) {
      yPoint = Math.round((dimensions.bottom - dimensions.top - height) / 2) + dimensions.top;
    }

    $('#' + windowId).css("position", "absolute"); //Overlay
    $('#' + windowId).css("left", xPoint + "px");
    $('#' + windowId).css("top", yPoint + "px");
  }




  function getTagHtml(htmlString, startTagString, endTagString) {

    var elementText = "";
    var elementBeginSearchPattern = new RegExp(startTagString, "im");
    var elementEndSearchPattern = new RegExp(endTagString, "im");

    var elementBeginIndex = htmlString.search(elementBeginSearchPattern) + startTagString.length;
    var elementEndIndex = htmlString.search(elementEndSearchPattern);
    if (elementBeginIndex >= 0 && elementBeginIndex >= 0) {
      elementText = htmlString.substr(elementBeginIndex, (elementEndIndex - elementBeginIndex));
    }

    return elementText;
  }

  function clearAllOverlays() {
    if ($("#HwTooltip")) {
      $("#HwTooltip").remove();
    }

    if ($("#HwPopout")) {
      $("#HwPopout").remove();
    }

    if ($("div#HwDialogOverlay")) {
      $("div#HwDialogOverlay").remove();
    }
  }

  function stripHtmlTags(content) {
    return content.replace(/(<([^>]+)>)/ig, " ");
  }

  function stripExtraWhiteSpace(content) {
    return content.replace(/("  ")/ig, " ");
  }

  function getWindowDimensions() {
    var standardbody = (document.compatMode == "CSS1Compat") ? document.documentElement : document.body
    var windowLeft = standardbody.scrollLeft;
    var windowTop = standardbody.scrollTop;
    var windowRight = $(window).width() + windowLeft;
    var windowBottom = $(window).height() + windowTop;
    var pageHeight = $(document).height();
    var pageWidth = $(document).width();

    return {
      top: windowTop,
      right: windowRight,
      bottom: windowBottom,
      left: windowLeft,
      width: pageWidth,
      height: pageHeight
    };
  }



  function openTooltipWindow(path, truncate) {
    clearAllOverlays();
    if (hoveringOverToolTip) {
      $("body").append(createTooltipElement());
      path = $hw.url.stripSectionFromPath(path);
      $.ajax({
        type: "GET",
        url: path,
        dataType: "html",
        success: function(html) {
          loadToolTipWindow(html, path, truncate);
        }
      });
    }
    return false;
  }

  function openTooltipWindowDiv(id) {
    clearAllOverlays();
    if (hoveringOverToolTip) {
      $("body").append(createTooltipElement());
      loadToolTipWindowDiv(id);
    }
    return false;
  }


  function loadToolTipWindow(html, path, truncate) {
    var maxWidth = hwToolTipWidth;
    var maxWords = hwToolTipWords;

    var info = getInformation(html);
    var contentHtml = info.content.html();
    if (truncate) {
      contentHtml = limitWords(contentHtml, maxWords);
    }

    $('div#HwTooltipText').html("<div class='HwContent'>" + contentHtml + "</div>");
    $('div#HwTooltipHeaderTitle').html(info.title);

    var closeButton = $('div#HwTooltipHeaderClose > a');
    for (i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function() { closeTooltipWindow(); };
    }

    positionWindow("HwTooltip", maxWidth);

    $("div.HwPopout").css("visibility", "visible");

    $("div#HwTooltip").mouseover(function() {
      hoveringOverToolTip = true;
    }).mouseout(function() {
      hoveringOverToolTip = false;
      setTimeout(checkCloseTooltipWindow, HwTooltipTimeOutMs);
    });

    $("a#HwTooltipWantMoreLink").click(function() {
      openWindow(path, true);
      return false;
    });
  }

  function loadToolTipWindowDiv(id) {
    var maxWidth = hwToolTipWidth;
    var maxWords = hwToolTipWords;

    var titleText = 'Reference';
    var contentText = "<div class='HwContent'>" + $('#' + id).html() + "</div>";

    $('div#HwTooltipContent').append(contentText);
    $('div#HwTooltipHeaderTitle').html(titleText);

    var closeButton = $('div#HwTooltipHeaderClose > a');
    for (i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function() { closeTooltipWindow(); };
    }

    positionWindow("HwTooltip", maxWidth);

    $("div.HwPopout").css("visibility", "visible");

    $("div#HwTooltip").mouseover(function() {
      hoveringOverToolTip = true;
    }).mouseout(function() {
      hoveringOverToolTip = false;
      setTimeout(checkCloseTooltipWindow, HwTooltipTimeOutMs);
    });

    $("a#HwTooltipWantMoreLink").click(function() {
      openWindowDiv(id, true);
      return false;
    });
  }

  function createTooltipElement() {

    var overlay = "<div class='HwPopout' id='HwTooltip'>\n" +
                "<div class='HwPopoutContent' id='HwTooltipContent'>" +
                "<div class='HwPopoutHeader' id='HwTooltipHeader'>" +
                "<div class='HwPopoutHeaderTitle' id='HwTooltipHeaderTitle' ></div>";
    // See page 94 of Pro CSS Techniques book for why this div is necessary
    overlay += "<div class='HwPopoutHeaderClear'></div>";
    overlay += "</div>\n" +
                "<div class='HwTooltipText' id='HwTooltipText'> </div>" +
                "</div>\n" +
                    "<div class='HwPopoutBackground'>\n" +
                    "<u class='w'></u><u class='e'></u>\n" + //up
                    "<i class='w'></i><i class='e'></i>\n" + //in-between
                    "<b class='w'></b><b class='e'></b>\n" + //bottom
                "</div>\n" +

            "</div>\n";

    return overlay;
  }

  function closeTooltipWindow() {
    if ($("div#HwTooltip")) {
      $("div#HwTooltip").remove();
    }
  }

  function getMousePos(evt) {
    var standardbody = (document.compatMode == "CSS1Compat") ? document.documentElement : document.body

    if (window.attachEvent) {
      xPos = event.clientX + standardbody.scrollLeft;
      yPos = event.clientY + standardbody.scrollTop;
    } else {
      xPos = evt.pageX;
      yPos = evt.pageY;
    }
  }

  function positionWindow(toolTipWindowId, maxWidth) {

    //Get mouse position
    setPointX = xPos;
    setPointY = yPos;

    var height = $('#' + toolTipWindowId).height();

    var width = $('#' + toolTipWindowId).width();
    if (width > maxWidth) {
      width = maxWidth;
      $('#' + toolTipWindowId).width(width);
    }

    var offsetX = Math.round(width * -1 / 2);  //Center of dialog
    var dimension = getWindowDimensions();

    //alert("("+dimension.top+","+dimension.left+")-("+dimension.bottom+","+dimension.right+")\n"+
    //    dimension.width + "x" + dimension.height);
    //alert("(" + setPointX + "," + setPointY + ")-(" + offsetX + "," + offsetY + ")\n");
    //alert(_clientY + "/" + _scrollTop + "/" + _pageY + "/" + yPos + "\n");


    var element = $('#' + toolTipWindowId);
    element.css("position", "absolute"); //Overlay

    //X Axis
    if ((setPointX + offsetX) > dimension.right) { // if box is off the right side of the screen
      element.css("left", (dimension.right - width) + "px");
    }
    else if ((setPointX + offsetX) < dimension.left) { // if box is off the left side of the screen
      element.css("left", dimension.left + "px");
    }
    else { //Default centered on mouse cursor
      element.css("left", (setPointX + offsetX) + "px");
    }

    //Y Axis
    if ((setPointY + offsetY + height) > dimension.bottom) { // if box is off the bottom of the screen hover above word
      element.css("top", (setPointY - height - offsetY) + "px");
    }
    else {//Default under mouse cursor
      element.css("top", (setPointY + offsetY) + "px");
    }
  }

  function limitWords(content, maxWords) {
    var text = content;
    var replaceElements = new Array();
    replaceElements["<br>"] = "!BREAK!";
    replaceElements["<br\/>"] = "!BREAK!";
    replaceElements["<br \/>"] = "!BREAK!";
    replaceElements["<\/li>"] = "!BREAK!";
    replaceElements["<\/p>"] = "!BREAK!!BREAK!";
    replaceElements["<\/tr>"] = "!BREAK!";
    for (var element in replaceElements) {
      text = text.replace(new RegExp(element, "img"), replaceElements[element]);
    }
    text = stripHtmlTags(text);
    text = stripExtraWhiteSpace(text);
    text = text.replace(new RegExp("!BREAK!", "mg"), "<br/>");
    var words = text.split(" ");
    if (words.length > maxWords) {
      text = "";
      for (i = 0; i < maxWords; i++) {
        text += words[i] + " ";
      }
      text += "(...)";
      text += "<div id='HwTooltipWantMore'><a href='#' id='HwTooltipWantMoreLink'>" + org.healthwise.localization.MORE_TEXT + "</a></div>";
      return text;
    }
    /* If we didn't need to crop the document, just return original markup */
    return content;
  }




  //
  // getKey(key)
  // Gets keycode. If 'Esc' is pressed then it hides all overlay windows.
  //

  function getKey(e) {
    var keycode, lettercode, Esc;
    if (typeof (window["event"]) != "undefined") {
      keycode = event.keyCode;
      lettercode = event.keyCode;
      Esc = 27;
    }
    else {
      keycode = e.keyCode;
      lettercode = e.which;
      Esc = e.DOM_VK_ESCAPE;
    }

    lettercode = String.fromCharCode(lettercode).toLowerCase();

    if (keycode == Esc) {
      clearAllOverlays();
    }
  }

  //
  // listenKey()
  //
  org.healthwise.ready(function() { document.onkeypress = getKey; });

  /**
  * Attach tab events for accessability   
  */
  org.healthwise.ready(function() {
    $(".HwPopoffLinkDefinition, .HwOverlayLinkDefinition").focus(function() {
      var mediaType = $(this).attr("rel");
      var path = $(this).attr("href");
      var offset = $(this).offset();
      xPos = offset.left;
      yPos = offset.top;
      org.healthwise.onMouseOverMedia($(this), mediaType, path);
    });

    $(".HwPopoffLinkDefinition, .HwOverlayLinkDefinition").blur(function() {
      var mediaType = $(this).attr("rel");
      var path = $(this).attr("href");
      org.healthwise.onMouseOutMedia($(this), mediaType, path);
    });
  });

  return public;

} (org.healthwise, jQuery));
