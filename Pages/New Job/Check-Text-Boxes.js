

var createNameFilledIn = false;
var createAddressFilledIn = false;
var createLongFilledIn = false;
var createLatFilledIn = false;
var createNotesFilledIn = false;

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

}, false);


// **** name change event **** //
function createNameOnchange(){
	if(createJobNameTextField.value != ""){
		createNameFilledIn = true;
	}else{
		createNameFilledIn = false;
	}

	toggleCreateJobButton();
}




// **** address and coordinate change events **** //
function createAddressOnchange(){
	if(createJobAddressTextField.value != ""){
		createAddressFilledIn = true;
	}else{
		createAddressFilledIn = false;
	}

	toggleSearchButton();
	toggleCreateJobButton();
}

function createLongOnchange(){
	if(createJobLongitudeTextField.value != ""){
		createLongFilledIn = true;
	}else{
		createLongFilledIn = false;
	}

	toggleSearchButton();
	toggleCreateJobButton();
}

function createLatOnchange(){
	if(createJobLatitudeTextField.value != ""){
		createLatFilledIn = true;
	}else{
		createLatFilledIn = false;
	}

	toggleSearchButton();
	toggleCreateJobButton();
}





// **** notes change event **** //
function createNotesOnKeyDown(){
	if(createJobNotes.value != ""){
		createNotesFilledIn = true;
	}else{
		createNotesFilledIn = false;
	}
}






function toggleSearchButton(){

	if(createAddressFilledIn == true && createLongFilledIn == true && createLatFilledIn == true){
		createSearchButton.disabled = true;
	}else{

		if(((createLongFilledIn == true && createLatFilledIn == false) || (createLongFilledIn == false && createLatFilledIn == true)) && createAddressFilledIn == true){
			createSearchButton.disabled = false;
		}else if(createAddressFilledIn == true && (createLongFilledIn == false && createLatFilledIn == false)){
			createSearchButton.disabled = false;
		}else if(createLongFilledIn == true && createLatFilledIn == true){
			createSearchButton.disabled = false;
		}else{
			createSearchButton.disabled = true;
		}
	}
}


function toggleCreateJobButton(){
	if(createNameFilledIn == true && createAddressFilledIn == true && createLongFilledIn == true && createLatFilledIn == true){
		createJobButton.disabled = false;
	}else{
		createJobButton.disabled = true;
	}
}

function searchButtonOnClick(){
	searchForPlace(createJobAddressTextField.value, createJobLongitudeTextField.value, createJobLatitudeTextField.value);
}


function createNotesOnKeyDown(){

}



