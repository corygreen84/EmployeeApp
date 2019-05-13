
function dropDownOnBlur(){

	var profileButton = document.getElementById("myDropdown");
	var classList = profileButton.classList;
	var contains = true;
	for(var i in classList){
		if(classList[i] == "show"){
			contains = false;
		}
	}
	if(contains == false){
		document.getElementById("myDropdown").classList.toggle("show");
	}

	
}
