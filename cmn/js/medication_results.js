
//selectDrugByLetter?letter=a&docTypeId=1
var prime = "http://blue-healthcare.alere-wellnessportal.com/drugs/";
var resultsPage = "http://ordvmapowebrpt1/apollo_ui/modules/mod_med-search.html";

$(document).ready(function(){

var name = $.jqURL.get('name');
var letter = $.jqURL.get('letter');
var type = $.jqURL.get('type');
var docid = $.jqURL.get('docid')

//Set the language on what to enter in the search 
//based on type= in the query string.

$("form#med-search label").append("Search by ");

switch (type) 
{
case "1":
  $("form#med-search label").append("medication");
  var bodyClass="med"
  break;
case "2":
  $("form#med-search label").append("suppliment");
  var bodyClass="supp"
  break;
case "3":
  $("form#med-search label").append("herbal medicine");
  var bodyClass="herb"
  break;
case "4":
  $("form#med-search label").append("alternative therapy");
  var bodyClass="alt"
  break;
case "2,3":
  $("form#med-search label").append("suppliment or herbal");
  var bodyClass="soh"
  break;
default: //Set the default type to medication when the type is missing
   var msg = "The doc type is missing in the QueryString." + 
   "\n(1=Medication, 2=Herbal & Supplimental, 3=Herbal Interactions, 4=Alternative Therapies)" + 
   "\n\n Type=1 or 'Medication' is the default type";
   
  //alert(msg); //HIDE in DEBUG MODE
  var type="1"
  $("form#med-search label").append("medication");
  break;
}
$("form#med-search label").append(" name. ");


//Set Alphabet Query String

var alpha = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");

$.each(alpha, function(i, n){  
	var aurl = resultsPage + "?type=" + type + "&letter=" + n;
	var aid = ".chooseByLetter a#letter-" + n;
	if (letter != n) {
		//alert(aid)
		$(aid).attr("href", aurl); 
	} else {
		$(aid).addClass("landed");
};
}); 


//Show Search Results or Matching Document
if (type!=undefined) {

//alert('letter=' + letter); //debug

if (docid!=undefined){ //determine if it's by NAME or LETTER
	var url = prime + "selectOneDrug?docTypeId=" + type + "&docId=" + docid;

//alert('url=' + url); //debug
	
	//add loading gif
	//$("div#show_data").empty().html('<img src="../cmn/img/loadingAnimation.gif" /> ...LOADING');
	$.getJSON(url,
       function(data){
			//docTypeId & docId returns the exact HTML document.
		$("div#show_data").empty() //remove loading gif
		$("div#show_data").addClass(bodyClass);
   		$("div#show_data").html(data.htmlBody);
		//$("div#show_data").append("<br><br>" + bodyClass) //DEBUG
		
		});

} else if (letter!=undefined) {

	var url = prime + "selectDrugByLetter?docTypeId=" + type + "&letter=" + letter;
		
//alert('url=' + url); //debug

//add loading gif
$("div#show_data").empty().html('<img src="../cmn/img/loadingAnimation.gif" /><blink>...LOADING</blink><br>');
	
	$.getJSON(url,
        function(data){
		var icnt = 0;
		//alert(data)
		$("div#show_data").empty(); //remove loading gif
		$("div#show_data").addClass("search-results");	
		$.each(data.items, function(i,item){
			//LETTER returns the items starting with the letter passed in the query string
			 var ltr_url= resultsPage +"?type=" + item.docTypeId + "&docid=" + item.docId;
            $("div#show_data").append("<a href='" + ltr_url + "'>" + item.title + "</a><br />");
			icnt++;
		  });
		
		icnt += '' //change to text
		var srch = "<h1>" + icnt + " Search Results for \" " + letter + " \" </h1>";
		$("div#result_count").append(srch); //remove loading gif 
		$("div#show_data").append("</div>");	   
	  });
	
	
} else { };
};

$("input#search-submit1").click(function() {
		//alert($("input#search-query1").attr("value"));
		
		var url = resultsPage + "?type=" + type + "&letter=" + $("input#search-query1").attr("value");
		document.location = url; 
		
	});

});
     
