// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.

(function(){ 

//Fix background Flickering for IE6
//Use Object Detection to detect IE6
var m = document.uniqueID && document.compatMode  && !window.XMLHttpRequest && document.execCommand ;
try{ if(!!m){ m("BackgroundImageCache", false, true) /* = IE6 only */ } }catch(oh){}; 



//simulate the stretched layout for IE6
var p_bgndClassName = 'HwPopoutBackground';
var p_chromeClassName = 'HwPopout';

$ie_initStretchBackground = function ( dEl ){
  
  if(!dEl && this.tagName ){
     dEl = this ;   
  }
  
  
  var f =  $ie_hasClass(dEl, p_chromeClassName); 
  if(!f){return;};//not a chrome block;
  dEl.runtimeStyle.behavior = 'none';
 
  
  var dBgnd = $ie_getBackgroundElementFromChrome(dEl);
  
  if(dBgnd){   
     
     if(!dBgnd.__displayAsBlock){ 
         //dBgnd.style.display = 'block';
         dBgnd.__displayAsBlock = 1;
         dEl.onresize  = $ie_initStretchBackground ;
     }
    ;
     $ie_stretchBackgroundToChromeSize(dBgnd);
  };
  
}


$ie_generateId = function( el ){
    el.id = el.id || 'gen_bgnd_' + window.document.uniqueID; 
    return el.id;
}

$ie_hasClass = function(dEl,className){
  
  if(!dEl){
      return false;
  }
  var re = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)"); 
  return  re.test(dEl.className);
}

$ie_getBackgroundElementFromChrome = function(dEl){
   
   if(dEl.__backgroundId){ 
     return window.document.getElementById(dEl.__backgroundId);
   };
   
  

  
    
   var dBgnd;
   var dChildren = dEl.children;
   for(var n= dChildren.length;n>=0;n-=1){
        var dChild  =  dChildren[n];
       
        if(  dChild && $ie_hasClass(dChild,p_bgndClassName)   ){
             
             dEl.__backgroundId = $ie_generateId( dChild ); 
             return dChild;
        };   
   };   
   return null;
}

$ie_stretchBackgroundToChromeSize = function( dEl ){
 	
  if(typeof(dEl) == 'string'){
    dEl = document.getElementById(dEl);    
  };
  
  if(!dEl){return;}
  
  
  var dStyle = dEl.currentStyle;
  if(!dStyle){return;}
  
  var dParent = dEl.parentNode;
  if(!dParent){return;}  
  
  var sParentPosition = dStyle.position    
  if( sParentPosition !='relative' && sParentPosition !='absolute'    ){  return; }
      
  var sPosition = dStyle.position;

  if( sPosition !== 'absolute'  ){ return ;}
  
  
  var sTop =  dStyle.top;
  var sBottom =  dStyle.bottom;
  
  
  sTop = (sTop.indexOf('px')>0)?sTop:'';
  sBottom = (sBottom.indexOf('px')>0)?sBottom:'';
  
  if(sTop && sBottom){
     
     var nTop = parseInt(sTop) || 0;
     var nBottom = parseInt(sBottom) || 0 ; 
     var sH = dParent.offsetHeight - nTop - nBottom + 'px';
     
     try{ dEl.style.height = sH;}
     catch(err){}
     
  }
  
  
  var sLeft =  dStyle.left;
  var sRight =  dStyle.right;
  sLeft = (sLeft.indexOf('px')>0)?sLeft:'';
  sRight = (sRight.indexOf('px')>0)?sRight:'';
  
 
  if(sLeft && sRight ){
    var nLeft = parseInt(sLeft) || 0;   
    var nRight = parseInt(sRight)  || 0 ;    
    var sW =  dParent.offsetWidth - nLeft  - nRight + 'px';
    try{ dEl.style.width = sW;}
    catch(err){};
  }
  
  
 
  if(dEl.className === p_bgndClassName ){
     
     var n = dEl.children.length - 1 ;
      while(n>=0){
        var sId =  $ie_generateId(  dEl.children[n] );
        $ie_stretchBackgroundToChromeSize( sId );
        n--;
     };     
  }
  
}


document.write('<style>.' + p_chromeClassName + '{behavior:expression($ie_initStretchBackground(this))}<\/style>');

//eod of clusore
})(); 
