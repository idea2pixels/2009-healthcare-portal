// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.
// ************************************************************************
// This file handles the injection of custom markup from the custom.xml
// file into the DIVs dedicated to that purpose.
// ************************************************************************

(function($hw, $) {

  $hw.ready(insertCustomMarkup);

  function insertCustomMarkup() {
    $.get($hw.config.root + '/inc/custom/custom.xml', {},
            function(data) {
              insertMarkup(data);
              $(document).trigger("org.healthwise.custom_loaded");
            }, 'xml'
        );
  }

  function insertMarkup(data) {
    var rootNode = getChildNodeByName(data, 'custommarkupfile')

    var nodesByClass = $('#HwContainer .HwCustom');
    var customMarkupNodes = getCustomMarkupNodes(rootNode);
    for (var i = 0; i < nodesByClass.length; i++) {
      var activeNode = getChildNodeById(customMarkupNodes, nodesByClass[i].id);
      var markup = getMarkupFromDivNode(activeNode, (typeof ($hw.document.id) != "undefined") ? $hw.document.id : '*');
      HwApplyClientHTML(nodesByClass[i], markup);
    }
  }

  function getCustomMarkupNodes(node) {
    var nodeArr = [];
    for (var i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].nodeName == 'custommarkupdiv')
        nodeArr.push(node.childNodes[i]);
    }
    return nodeArr;
  }

  function getMarkupFromDivNode(node, hwid) {
    var custMarkupNodesArr = getChildNodesByName(node, 'custommarkup');
    if (hwid == '*') {
      var messageBodyNode = getChildNodeByName(custMarkupNodesArr[0], 'message-body');
      var markup = getInnerHTML(messageBodyNode);
      return markup;
    }
    else {
      for (var i = 0; i < custMarkupNodesArr.length; i++) {
        if (hwidIsInNode(custMarkupNodesArr[i], hwid)) {
          var messageBodyNode = getChildNodeByName(custMarkupNodesArr[i], 'message-body');
          var markup = getInnerHTML(messageBodyNode);
          return markup;
        }
      }
      return '';
    }
  }

  function hwidIsInNode(node, hwid) {
    var contentAffectedNode = getChildNodeByName(node, 'content-affected');
    var contentNodes = getChildNodesByName(contentAffectedNode, 'content');
    for (var i = 0; i < contentNodes.length; i++) {
      var contentHwid = contentNodes[i].attributes[0].nodeValue;
      if (contentHwid == '*' || hwid.toLowerCase() == contentHwid.toLowerCase())
        return true;
    }
    return false;
  }

  function getChildNodeByName(node, name) {
    for (var j = 0; j < node.childNodes.length; j++) {
      if (node.childNodes[j].nodeName == name) {
        return node.childNodes[j];
      }
    }
    return null;
  }

  function getChildNodesByName(node, name) {
    var childArr = [];
    for (var j = 0; j < node.childNodes.length; j++) {
      if (node.childNodes[j].nodeName == name) {
        childArr.push(node.childNodes[j]);
      }
    }
    return childArr;
  }

  function getChildNodeById(nodes, name) {
    for (var i = 0; i < nodes.length; i++) {
      var attrs = nodes[i].attributes;
      if (attrs) {
        for (var j = 0; j < attrs.length; j++) {
          if (attrs[j].nodeName.toLowerCase() == 'id') {
            if (attrs[j].nodeValue == name)
              return nodes[i];
          }
        }
      }
    }
    return null;
  }

  function getInnerHTML(node) {
    var s = '';
    for (var i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].xml) {
        // IE
        s = s + node.childNodes[i].xml;
      }
      else {
        // Firefox
        var serializer = new XMLSerializer();
        s = s + serializer.serializeToString(node.childNodes[i]);
      }
    }
    return s;
  }

  function HwApplyClientHTML(elem, htmlFragment) {
    if (elem != null && typeof (htmlFragment) != "undefined") {
      elem.innerHTML = htmlFragment;
    }
  }

})(org.healthwise, jQuery);