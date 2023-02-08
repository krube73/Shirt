function fn_ToggleSection(DataName){
	$(".option-section[data-name = '"+DataName+"']").toggleClass("active");
	$(".option-section[data-name = '"+DataName+"']").children(".option-container").slideToggle();
}


function fnShowHideOptions(dataAction, dataActionSub){
	var OptionSection = $(".option-section[data-name = '"+dataAction+"']");
	var OptionContainer = $(OptionSection).find(".option-container");
	var NOTOptionSection = $(".option-section[data-name != '"+dataAction+"']");
	var NOTOptionContainer = $(NOTOptionSection).find(".option-container");
	var OptionContainerPanel = $(OptionContainer).children(".option-container-panel");
	if( $(OptionContainerPanel.length > 0)){
		$(".option-container-panel[data-name = '"+dataActionSub+"']").find(".sub-reveal").slideDown();
		$(".option-container-panel[data-name = '"+dataActionSub+"']").find(".panel-title").addClass("active");
	}
	$(NOTOptionSection).removeClass("active");
	$(NOTOptionContainer).slideUp();
	$(OptionContainer).slideDown(500, function(){
		$(OptionSection).addClass("active", 500);
	});
}

function fn_ShowHideSubOptions(dataAction, dataActionSub){
	console.log(dataAction, dataActionSub);
	var OptionContainerPanel = $(".option-container-panel[data-name = '"+dataActionSub+"']");
	var NOTOptionContainerPanel = $(".option-container-panel[data-name != '"+dataActionSub+"']");
	
	if(dataActionSub){
		$(NOTOptionContainerPanel).find(".sub-reveal").slideUp();
		$(NOTOptionContainerPanel).find(".panel-title").removeClass("active");
	
		$(OptionContainerPanel).find(".sub-reveal").slideDown();
		$(OptionContainerPanel).find(".panel-title").addClass("active");
	}
	
	if(!dataActionSub){
		fnShowHideOptions(dataAction)
	}
	
}