

var modifyNameFilledIn = false;
var modifyAddressFilledIn = false;
var modifyLongFilledIn = false;
var modifyLatFilledIn = false;
var modifyNotesFilledIn = false;

var modifyNameModified = false;
var modifyAddressModified = false;
var modifyLongModified = false;
var modifyLatModified = false;
var modifyNotesModified = false;


var employeeSelectedListChanged = false;

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

}, false);

// **** modify name on change event **** //
function modifyNameOnchange(){
	/*
	if(modifyJobNameTextField.value != modifiedName){
		modifyNameFilledIn = true;
	}else{
		modifyNameFilledIn = false;
	}
	*/

	if(modifyJobNameTextField.value != modifiedName && modifyJobNameTextField.value != ""){
		modifyNameModified = true;
		modifyNameFilledIn = true;
	}else if(modifyJobNameTextField.value != modifiedName && modifyJobNameTextField == ""){
		modifyNameModified = true;
		modifyNameFilledIn = false;
	}else if(modifyJobNameTextField.value == modifiedName && modifyJobNameTextField.value != ""){
		modifyNameModified = false;
		modifyNameFilledIn = false;
	}else if(modifyJobNameTextField.value == modifiedName && modifyJobNameTextField.value == ""){
		modifyNameModified = false;
		modifyNameFilledIn = true;
	}


	console.log("name modified? " + modifyNameModified);
	console.log("name is empty? " + modifyNameFilledIn);
	


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

}



function toggleSearchButton(){

	// if all fields are filled in with default data, we dont enable the search button //





	/*
	if(modifyAddressFilledIn == true || modifyLongFilledIn == true || modifyLatFilledIn == true){



		modifySearchButton.disabled = false;
	}else{
		modifySearchButton.disabled = true;
	}
	*/
	
	/* original *** 
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
	*/
	
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






