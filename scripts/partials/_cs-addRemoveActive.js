function fn_addRemoveActive(thisClass,DataValue){
	var thisClass = thisClass.split(" ");
	//console.log(thisClass[1]+", "+thisClass[2]);
	
		$(".option[data-value = '"+DataValue+"']").addClass("active");
		$(".option[data-value != '"+DataValue+"']").removeClass("active");
		
		/*if( thisClass[1] != undefined && thisClass[2] === undefined ){
			console.log(thisClass[1]);
			$(".option."+thisClass[1]+"[data-value = '"+DataValue+"']").addClass("active");
			$(".option."+thisClass[1]+"[data-value != '"+DataValue+"']").removeClass("active");
		} 
		
		if( thisClass[1] != undefined && thisClass[2] != undefined){
			console.log(thisClass[2])
			$(".option."+thisClass[1]+"."+thisClass[2]+"[data-value = '"+DataValue+"']").addClass("active");
			$(".option."+thisClass[1]+"."+thisClass[2]+"[data-value != '"+DataValue+"']").removeClass("active");
		} */
	
}