function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var pg = getParameterByName("pg");
var Scene7Base = "http://s7d5.scene7.com/is/image/PaulFredrick/";	
var MonoImagePath = "https://www.paulfredrick.com/csimages/mono/";

//find device width
function fn_FindDeviceWidth(){
	var bodyWidth = jQuery("body").width();
	
	if(bodyWidth <= 320 ){
		deviceName = "pp";
		imgSuffix= "xs";
		scene7WID = "115"
	}
	if( bodyWidth > 320 && bodyWidth <= 736 ){
		deviceName = "pl";
		imgSuffix = "sm";
	}
	if(bodyWidth > 736 && bodyWidth <= 768){
		deviceName = "tp";
		imgSuffix = "md";
	}
	if(bodyWidth > 768 && bodyWidth <= 1024){
		deviceName = "tl";
		imgSuffix = "md";
	}
	if(bodyWidth > 1024){
		deviceName = "d";
		imgSuffix = "lg";
	}
}
//end find device width