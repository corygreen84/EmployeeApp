

var modifyNameFilledIn = false;
var modifyAddressFilledIn = false;
var modifyLongFilledIn = false;
var modifyLatFilledIn = false;
var modifyNotesFilledIn = false;

var employeeSelectedListChanged = false;

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

}, false);

// **** modify name on change event **** //
function modifyNameOnchange(){
	if(modifyJobNameTextField.value != modifiedName || modifyJobNameTextField.value == ""){
		modifyNameFilledIn = true;
	}else{
		modifyNameFilledIn = false;
	}

	toggleModifyJobButton();
}

// **** address and coordinate change events **** //
function modifyAddressOnchange(){
	if(modifyJobAddressTextField.value != modifiedAddress && modifyJobAddressTextField.value != ""){
		modifyAddressFilledIn = true;
	}else{
		modifyAddressFilledIn = false;
	}

	toggleSearchButton();
	toggleModifyJobButton();
}

function modifyLongOnchange(){


	console.log(modifiedLocation["longitude"]);
	if(modifyJobLongitudeTextField.value != modifiedLocation["longitude"] && modifyJobLongitudeTextField.value != ""){
		modifyLongFilledIn = true;
	}else{
		modifyLongFilledIn = false;
	}

	toggleSearchButton();
	toggleModifyJobButton();
}

function modifyLatOnchange(){
	if(modifyJobLatitudeTextField.value != modifiedLocation["latitude"] && modifyJobLatitudeTextField.value != ""){
		modifyLatFilledIn = true;
	}else{
		modifyLatFilledIn = false;
	}

	toggleSearchButton();
	toggleModifyJobButton();
}




function toggleSearchButton(){

	if(modifyAddressFilledIn == true && modifyLongFilledIn == true && modifyLatFilledIn == true){
		modifySearchButton.disabled = true;
	}else{

		if(((modifyLongFilledIn == true && modifyLatFilledIn == false) || (modifyLongFilledIn == false && modifyLatFilledIn == true)) && modifyAddressFilledIn == true){
			modifySearchButton.disabled = false;
		}else if(modifyAddressFilledIn == true && (modifyLongFilledIn == false && modifyLatFilledIn == false)){
			modifySearchButton.disabled = false;
		}else if(modifyLongFilledIn == true && modifyLatFilledIn == true){
			modifySearchButton.disabled = false;
		}else{
			modifySearchButton.disabled = true;
		}
	}
}




function toggleModifyJobButton(){

}



/*
function toggleModifyJobButton(){
	if(modifyNameFilledIn == true && modifyAddressFilledIn == true && modifyLongFilledIn == true && modifyLatFilledIn == true){
		modifyJobButton.disabled = false;
	}else{
		modifyJobButton.disabled = true;
	}
}
*/

function searchButtonOnClick(){
	searchForPlace(modifyJobAddressTextField.value, modifyJobLongitudeTextField.value, modifyJobLatitudeTextField.value);
}


function modifyNotesOnKeyDown(){

}



