

var createNameFilledIn = false;
var createAddressFilledIn = false;
var createLongFilledIn = false;
var createLatFilledIn = false;
var createNotesFilledIn = false;


// variables for the times section //
var dateStartFilledIn = false;
var dateEndFilledIn = false;
var includeWeekendsToggle = false;
var jobStartTimeFilledIn = false;
var jobEndTimeFilledIn = false;
var lunchStartFilledIn = false;
var lunchEndFilledIn = false;



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

}, false);



function dateChange(){
	var dateStartDate = document.getElementById('start-day-text').value;
	var endStartDate = document.getElementById('end-day-text').value;
	var startTime = document.getElementById('start-time-text').value;
	var endTime = document.getElementById('end-time-text').value;
	var startLunch = document.getElementById('lunch-start-text').value;
	var endLunch = document.getElementById('lunch-end-text').value;

	var startDateDate = new Date(dateStartDate);
	var endDateDate = new Date(endStartDate);

	var todaysDate = new Date();
	var todaysYear = "" + todaysDate.getFullYear();
	var todaysMonth = todaysDate.getMonth() + 1;
	var todaysMonthString = "" + todaysMonth;
	var todaysDay = todaysDate.getDay() + 1;
	var todaysDayString = "" + todaysDay;

	



	if(dateStartDate != ""){
		// comparing the beginning date and end date to make sure //
		// the beginning date is not in the future //
		if(startDateDate <= endDateDate){
			dateStartFilledIn = true;
		}else{
			dateStartFilledIn = false;
		}
	}else{
		dateStartFilledIn = false;
	}

	if(endStartDate != ""){
		// comparing the end date and beginning date to make sure //
		// the end date is not in the past //
		if(endDateDate >= startDateDate){
			dateEndFilledIn = true;
		}else{
			dateEndFilledIn = false;
		}

	}else{
		dateEndFilledIn = false;
	}

	if(startTime != ""){
		jobStartTimeFilledIn = true;
	}else{
		jobStartTimeFilledIn = false;
	}

	if(endTime != ""){
		jobEndTimeFilledIn = true;
	}else{
		jobEndTimeFilledIn = false;
	}

	if(startLunch != ""){
		lunchStartFilledIn = true;
	}else{
		lunchStartFilledIn = false;
	}

	if(endLunch != ""){
		lunchEndFilledIn = true;
	}else{
		lunchEndFilledIn = false;
	}

	toggleCreateJobButton();
}




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


function checkToMakeSureLongAndLatOnlyContainNumbers(text){
	var isNumber = text.match(/^\d+$/);
	if(isNumber){
		console.log("is a number");
	}else{
		console.log("is not a number");
	}
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
	if(createNameFilledIn == true && 
		createAddressFilledIn == true && 
		createLongFilledIn == true && 
		createLatFilledIn == true && 
		dateStartFilledIn == true && 
		dateEndFilledIn == true && 
		jobStartTimeFilledIn == true && 
		jobEndTimeFilledIn == true && 
		lunchStartFilledIn == true &&
		lunchEndFilledIn == true){

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



