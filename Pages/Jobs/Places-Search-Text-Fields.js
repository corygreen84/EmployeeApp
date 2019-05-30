

var _addressTextChanged = false;
var _longitudeChanged = false;
var _latitudeChanged = false;

var revertButton = document.getElementById("revert-button");


window.addEventListener('DOMContentLoaded', function () {
	revertButton.disabled = true;
}, false);


function modifyAddressTextChange(){

	if(jobAddressTextField.value != job.address && jobAddressTextField.value != ""){
		jobLongitudeTextField.value = "";
		jobLatitudeTextField.value = "";
		modifySearchButton.disabled = false;
		_addressTextChanged = true;
	}else if(jobAddressTextField.value == job.address){
		jobLongitudeTextField.value = locationLong;
		jobLatitudeTextField.value = locationLat;
		modifySearchButton.disabled = true;
		_addressTextChanged = false;
	}else if(jobAddressTextField.value == ""){
		modifySearchButton.disabled = true;
	}
	toggleRevertButton();
}


function modifyLongTextChange(){
	if(jobLongitudeTextField.value != locationLong && jobLongitudeTextField.value != ""){
		jobAddressTextField.value = "";
		modifySearchButton.disabled = false;
		_longitudeChanged = true;
	}else if(jobLongitudeTextField.value == locationLong){
		jobAddressTextField.value = job.address;
		modifySearchButton.disabled = true;
		_longitudeChanged = false;
	}else if(jobLongitudeTextField.value == ""){
		modifySearchButton.disabled = true;
	}
	

	//toggleSearchModifyButton();
	toggleRevertButton();
}




function modifyLatTextChange(){
	if(jobLatitudeTextField.value != locationLat && jobLatitudeTextField.value != ""){
		jobAddressTextField.value = "";
		modifySearchButton.disabled = false;
		_latitudeChanged = true;
	}else if(jobLatitudeTextField.value == locationLat){
		jobAddressTextField.value = job.address;
		modifySearchButton.disabled = true;
		_latitudeChanged = false;
	}else if(jobLatitudeTextField.value == ""){
		modifySearchButton.disabled = true;
	}

	//toggleSearchModifyButton();
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
	modifySearchButton.disabled = true;
}





function toggleSearchModifyButton(){

}

function toggleJobModifyButton(){
	if(nameTextChanged == true || 
		_addressTextChanged == true || 
		employeeListChanged == true || 
		_latitudeChanged == true || 
		_longitudeChanged == true){

			modifyJobButton.disabled = false;
			
	}else{
		modifyJobButton.disabled = true;
	}
}