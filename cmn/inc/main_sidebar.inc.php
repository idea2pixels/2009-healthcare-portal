				<!-- 
					Credits Counter
					Integration Notes:
						- Can support up to 3 digits
						- Background is styled through skin CSS
				-->
				<div class="module credits">
					<h3>You've Earned</h3>
					<h4><strong><?=$template["credits"]?></strong> credits</h4>
					<p>Earn 50 more credits and you'll have enough for $150 cash card!</p>
					<ul>
						<li><a href="#">What are credits?</a></li>
						<li><a href="#">How do I earn more credits?</a></li>
					</ul>
				</div>
				<!-- End Credits Counter -->
				
				<!--
					Sub-Nav 
					Integration Notes:
						- Add class="selected" to the top level list to indicate the user is currently inside the section
						- Add class="last" to the last item in the top level list
						- Add class="last" to the last item in the sub list
						- All JavaScript interaction is unobtrusive. Generate the nav as if javascript is not a requirement.
				-->
				<div class="module alt-nav">
					<ul id="side-bar-nav">
						<li class="selected">
							<a href="#">Program Info </a>
							<ul>
								<li><a href="#">Track Credits</a></li>
								<li><a href="#">Program Overview</a></li>
								<li><a href="#">Success Stories</a></li>
								<li class="last"><a href="#">Wellness Champions</a></li>
							</ul>
						</li>
						<li>
							<a href="#">Health Resources</a>
							<ul>
								<li><a href="#">Personal Health Record</a></li>
								<li><a href="#">Wellness Assessment</a></li>
								<li><a href="#">Healthy Living Programs</a></li>
								<li><a href="#">Health Challenges</a></li>
								<li><a href="#">Online Seminars</a></li>
								<li><a href="#">Personal Resource Center</a></li>
								<li><a href="#">Health Coaching</a></li>
								<li><a href="#">Health Screenings</a></li>
								<li class="last"><a href="#">[Third Party Programs]</a></li>
							</ul>
						</li>
						<li>
							<a href="#">Condition Care</a>
							<ul>
								<li><a href="#">Assessment</a></li>
								<li><a href="#">Asthma</a></li>								
								<li><a href="#">CAD</a></li>
								<li><a href="#">CHF</a></li>
								<li><a href="#">COPD</a></li>								
								<li><a href="#">Diabetes</a></li>
								<li><a href="#">Pain</a></li>
								<li><a href="#">Pregnancy/ Preconception</a></li>
								<li class="last"><a href="#">Oncology</a></li>
							</ul>
						</li>
						<li class="last">
							<a href="#">Beneﬁts Info</a>
							<ul>
								<li><a href="#">Benefits Overview</a></li>
								<li><a href="#">SSO to Health Plans</a></li>
								<li><a href="#">EAP</a></li>
								<li class="last"><a href="#">[Custom Links]</a></li>								
							</ul>	
						</li>
					</ul>
				</div>
				<!-- End Sub Nav -->
			
				<!-- 
					Company News Module 
					Integration Notes:
						- Logo is 106x30 background image defined in the skin CSS
				-->
				<div class="module news last">
					<h2><?=$template["companyName"]?> News</h2>
					<ul class="news">
						<li><a href="#">Become a Wellness Advocate</a></li>
						<li><a href="#">Share Your Success Story!</a></li>
						<li><a href="#">April Seminar: Beating the Odds</a></li>
						<li><a href="#">More About the FedEx Wellness Program</a></li>
					</ul>
				</div>
				<!-- End Company News -->