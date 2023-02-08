var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

$(".navbar-nav > li").click( function(event){
	if(isTouch){
		event.preventDefault();
	}
	$(this).children("a").addClass("clicked");
	$(".navbar-nav > li").not(this).children("a").removeClass("clicked");
});





$(".navbar-nav > li").hover( function(){
$(this).children(".subnav-container").show();
}, function(){
$(this).children(".subnav-container").hide();
});