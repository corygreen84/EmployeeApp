

/* text entry variables */
var modifyJobNameTextField = document.getElementById("modify-name-text");
var modifyJobAddressTextField = document.getElementById("modify-address-text");
var modifyJobLongitudeTextField = document.getElementById("modify-long-text");
var modifyJobLatitudeTextField = document.getElementById("modify-lat-text");
var modifyJobNotes = document.getElementById("notes-textarea");

var modifySearchButton = document.getElementById("modify-address-search");
var modifyJobButton = document.getElementById("modify-job-button");


var id;
var companyName;


// checking if the user is logged in //
window.addEventListener('DOMContentLoaded', function () {

	if(localStorage.getItem("id") != null && localStorage.getItem("name") != null){
		id = removeExcessFromJobId(localStorage.getItem("id"));
		companyName = localStorage.getItem("name")
		
		searchForJob(id, companyName);
	}
	

}, false);

function removeExcessFromJobId(job){
	var returnString = job.replace("job-", "");
	return returnString;
}

function backButtonOnClick(){
	window.location = "https://seekanddestroy84.github.io/EmployeeApp/Pages/Jobs/Jobs.html";
}

function clearButtonOnClick(){

	clearButtonClicked();
}

function modifyButtonOnClick(){
	modifyJobOnClick(id, companyName);
}



class Employees{
	constructor(){
		var first;
		var last;
		var employeeNumber;
		var status;
		var email;
		var phone;
		var uniqueId;
	}
}

class Jobs{
	constructor(){
		var name;
		var address;
		var lat;
		var long;
		var employees;
		var date;
		var jobId;
		var notes;
	}
}