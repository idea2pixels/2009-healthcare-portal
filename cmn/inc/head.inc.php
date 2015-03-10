<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
	<title>Alere HTML Framework</title>
	<link rel="stylesheet" href="cmn/css/blueprint/blueprint/screen.css" type="text/css" media="screen, projection">
	<link rel="stylesheet" href="cmn/css/blueprint/blueprint/print.css" type="text/css" media="print">
	<link rel="stylesheet" href="cmn/css/global.css" type="text/css" media="all">
	<link rel="stylesheet" href="cmn/css/modules.css" type="text/css" media="all">
	<link rel="stylesheet" href="cmn/css/article.css" type="text/css" media="all">
	<link rel="stylesheet" href="cmn/css/sign-in_register.css" type="text/css" media="all">
	<!-- 
		Integration Note:
			Generally you would only include a single skin style sheet which overrides
			all the default in global.css and modules.css as necessary.
			
			For debug/demo purposes all the style sheets are include here so that they can
			be toggled using the style sheet switcher (to see the style sheet switch add ?debug=1)
	-->
	<link rel="stylesheet" href="cmn/css/skins/ge.css" type="text/css" media="all" title="ge">
	<link rel="stylesheet alternate" href="cmn/css/skins/cisco.css" type="text/css" media="all" title="cisco">
	<link rel="stylesheet alternate" href="cmn/css/skins/fedex.css" type="text/css" media="all" title="fedex">
	<link rel="stylesheet alternate" href="cmn/css/skins/blue-cross.css" type="text/css" media="all" title="blue-cross">
	<!--[if IE]>
		<link rel="stylesheet" href="css/blueprint/ie.css" type="text/css" media="screen, projection">
		<link rel="stylesheet" href="cmn/css/global_ie.css" type="text/css" media="all">
	<![endif]-->
	<?php 
		// For debug purposes only
		if(isset($_GET['debug'])): ?>
		<style>
			#debug:hover {
				left:-10px;
			}
			#debug {
				-moz-border-radius:10px ;
				-webkit-border-radius:10px;
				border-radius:10px;
				position:fixed;
				top:10px;
				left:-129px;
				width:100px;
				z-index:1;
				padding:20px;
				background:#efefef;
				border:1px solid #333;
				border-left:0;
			}
			#debug li {
				cursor:pointer;
			}
			#debug-close {
				position:absolute;
				right:5px;
				top:3px;
				padding:0 3px;
				border:1px solid #fff;
			}
		</style>
		
	<? endif; ?>
</head>
<body>