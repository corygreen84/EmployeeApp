

var modifyNameFilledIn = false;
var modifyAddressFilledIn = false;
var modifyLongFilledIn = false;
var modifyLatFilledIn = false;
var modifyNotesFilledIn = false;


var employeeSelectedListChanged = false;

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	toggleModifyJobButton();
	toggleSearchButton();
}, false);

// **** modify name on change event **** //
function modifyNameOnchange(){
	
	if(modifyJobNameTextField.value != modifiedName){
		modifyNameFilledIn = true;
	}else{
		modifyNameFilledIn = false;
	}

	toggleModifyJobButton();
}

// **** address and coordinate change events **** //
function modifyAddressOnchange(){
	if(modifyJobAddressTextField.value != modifiedAddress){
		modifyAddressFilledIn = true;
	}else{
		modifyAddressFilledIn = false;
	}

	toggleSearchButton();
	toggleModifyJobButton();
}

function modifyLongOnchange(){

	if(modifyJobLongitudeTextField.value != modifiedLocation["longitude"]){
		modifyLongFilledIn = true;
	}else{
		modifyLongFilledIn = false;
	}
	toggleSearchButton();
	toggleModifyJobButton();
}

function modifyLatOnchange(){
	if(modifyJobLatitudeTextField.value != modifiedLocation["latitude"]){
		modifyLatFilledIn = true;
	}else{
		modifyLatFilledIn = false;
	}

	toggleSearchButton();
	toggleModifyJobButton();
}



// **** notes modify **** //
function modifyNotesOnKeyDown(){
	if(modifyJobNotes.value != modifiedNotes){
		modifyNotesFilledIn = true;
	}else{
		modifyNotesFilledIn = false;
	}

	toggleModifyJobButton();
}



function toggleSearchButton(){

	// if all fields are filled in with default data, we dont enable the search button //
	if(modifyAddressFilledIn == true || modifyLongFilledIn == true || modifyLatFilledIn == true){
		modifySearchButton.disabled = false;
	}else{
		modifySearchButton.disabled = true;
	}
}





function toggleModifyJobButton(){
	if(modifyNameFilledIn == true || modifyAddressFilledIn == true || modifyLongFilledIn == true || modifyLatFilledIn == true || modifyNotesFilledIn){
		if(modifyJobNameTextField.value != "" && 
			modifyJobAddressTextField.value != "" && 
			modifyJobLongitudeTextField.value != "" && 
			modifyJobLatitudeTextField.value != "" && 
			modifyJobNotes.value != ""){

			modifyJobButton.disabled = false;
		}else{
			modifyJobButton.disabled = true;
		}
		
	}else{
		modifyJobButton.disabled = true;
	}
}


function searchButtonOnClick(){

	searchForPlace(modifyJobAddressTextField.value, modifyJobLongitudeTextField.value, modifyJobLatitudeTextField.value);
}






