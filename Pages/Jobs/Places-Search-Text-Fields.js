
var _addressTextChanged = false;
var _longitudeChanged = false;
var _latitudeChanged = false;


var revertButton = document.getElementById("revert-button");


window.addEventListener('DOMContentLoaded', function () {
	revertButton.disabled = true;
}, false);


function modifyAddressTextChange(){
	if(jobAddressTextField.value != job.address){
		_addressTextChanged = true;
	}else{
		_addressTextChanged = false;
	}

	toggleSearchButton();
	toggleRevertButton();
}


function modifyLongTextChange(){
	if(jobLongitudeTextField.value != locationLong){
		_longitudeChanged = true;
	}else{
		_longitudeChanged = false;
	}

	toggleSearchButton();
	toggleRevertButton();
}




function modifyLatTextChange(){
	if(jobLatitudeTextField.value != locationLat){
		_latitudeChanged = true;
	}else{
		_latitudeChanged = false;
	}

	toggleSearchButton();
	toggleRevertButton();
}


function toggleRevertButton(){
	if(jobAddressTextField.value != job.address || jobLongitudeTextField.value != locationLong || jobLatitudeTextField.value != locationLat){
		revertButton.disabled = false;
	}else{
		revertButton.disabled = true;
	}
}



function revertButtonOnClick(){
	jobAddressTextField.value = job.address;
	jobLongitudeTextField.value = locationLong;
	jobLatitudeTextField.value = locationLat;

	revertButton.disabled = true;
}



function toggleSearchButton(){


	// if we start typing in the search bar, I would like for the coordinates to disappear
}