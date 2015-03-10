<script type="text/javascript">
	(function($)
	{
	   $(document).ready(function() {
	      $('#debug li').click(function()
	      {
	         switchStylestyle(this.getAttribute("data"));
	         return false;
	      });
	   });

	   function switchStylestyle(styleName)
	   {
	      $('link[@rel*=style][title]').each(function(i) 
	      {
	         this.disabled = true;
	         if (this.getAttribute('title') == styleName) this.disabled = false;
	      });
	   }
	})(jQuery);	
</script>
<div id="debug">
	
	<h4>Skin selector:</h4>
	<ul id="debug-style-switch">
		<li data="ge">GE</li> 
		<li data="cisco">Cisco</li>
		<li data="blue-cross">Blue Cross</li>
		<li data="fedex"> FedEx</li>
	</ul>
	
</div>