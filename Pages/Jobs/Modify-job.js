// **** this is for the modal view variables **** //
var modifyJobSpan = document.getElementsByClassName("modifyJobClose")[0];
var modifyJobModal = document.getElementById("modify-job-modal-box");

var modifyJobButton = document.getElementById("modify-job-button");
var deleteJobButton = document.getElementById("delete-job-button");

var jobNameTextField = document.getElementById("modify-job-name-text");
var jobAddressTextField = document.getElementById("modify-address-text");

var listView = document.getElementById("modify-employee-list-div");

var nameTextChanged = false;
var addressTextChanged = false;

var job;
var jobId;

var listOfEmployeesForThisJob = [];


// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	modifyJobButton.disabled = true;
	
}, false);



function mainJobListOnClick(item){

	listOfEmployeesForThisJob = [];
	

	modifyJobModal.style.display = "block";
	
	for(var i = 0; i < listOfJobs.length; i++){
		var listOfJobsAddress = listOfJobs[i].address;
		var addressWithReplacement = listOfJobsAddress.replace(/ /g, "-");

		if("job-" + addressWithReplacement == item.id){
			job = listOfJobs[i];
		}
	}
	
	jobNameTextField.value = job.name;
	jobAddressTextField.value = job.address;
	jobId = job.jobId;

	listOfEmployeesForThisJob = job.employees;

	parseEmployeesAndAddToListViewModify();
}


function parseEmployeesAndAddToListViewModify(){

	$("#modify-employee-list-div ul").empty();

	for(var j = 0; j < listOfEmployees.length; j++){
		
		var firstName = listOfEmployees[j].first;
		var lastName = listOfEmployees[j].last;
		var employeeNumber = listOfEmployees[j].employeeNumber;
		var status = listOfEmployees[j].status;
		var statusToString = "";
		if(status == true){
			statusToString = "Available";
		}else{
			statusToString = "Not Available";
		}

		$("#modify-employee-list-div ul").append('<li id=' + employeeNumber + ' onclick="modifyListItemOnClick(this)" data-icon="plus" class="employee-li"><a href="#" id="icon--' + employeeNumber + '"><h2>' + firstName + ' ' + lastName + '</h2><p>Employee #: ' + employeeNumber + '</p><p class="ui-li-aside"><strong>Status: ' + statusToString + '</strong></p></a></li>');
	}

	// refreshing the list //
	$("#modify-employee-list-div ul").listview('refresh');	
	
	changePlusToMinusOnEmployees();
}



// once loaded, this goes through the list of total employees //
// and checks to see what lines up with the list of employees //
// that go along with the job //
function changePlusToMinusOnEmployees(){

	console.log("im in here....");
	for(var j = 0; j < job.employees.length; j++){
		for(var k = 0; k < listOfEmployees.length; k++){
			if(job.employees[j] == listOfEmployees[k].email){
				$('#icon--' + listOfEmployees[k].employeeNumber).removeClass('ui-icon-plus').addClass('ui-icon-minus');
			}else{
				$('#icon--' + listOfEmployees[k].employeeNumber).removeClass('ui-icon-minus').addClass('ui-icon-plus');
			}
		}
	}

	console.log("" + listOfEmployeesForThisJob.length);
}



// when the user selects the employee from the list //
function modifyListItemOnClick(item){

	if($('#icon--' + item.id).hasClass('ui-icon-plus') == true){

		for(var k = 0; k < listOfEmployees.length; k++){
			if(listOfEmployees[k].employeeNumber == item.id){
				listOfEmployeesForThisJob.push(listOfEmployees[k].email);
			}
		}

		$('#icon--' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');
	}else{
		
		// picking out the email from the selected index //
		var tempEmployeeSelectedEmail;
		for(var m = 0; m < listOfEmployees.length; m++){
			if(listOfEmployees[m].employeeNumber == item.id){
				tempEmployeeSelectedEmail = listOfEmployees[m].email;
			}
		}

		// list of employees for this job will only be an array of email addresses //
		for(var l = 0; l < listOfEmployeesForThisJob.length; l++){
			if(listOfEmployeesForThisJob[l] == tempEmployeeSelectedEmail){
				listOfEmployeesForThisJob.splice(l, 1);
			}
		}

		$('#icon--' + item.id).removeClass('ui-icon-minus').addClass('ui-icon-plus');
	}

	console.log("" + listOfEmployeesForThisJob.length);
}







// removing the modal view //
modifyJobSpan.onclick = function(){
	modifyJobModal.style.display = "none";
};


// **** closing the modal view is handled through Window-onclick.js **** //


// text change methods //
function modifyJobNameTextChange(){
	if(jobNameTextField.value != job.name){
		nameTextChanged = true;
	}else{
		nameTextChanged = false;
	}
	toggleJobModifyButton();
}

function modifyAddressTextChange(){
	if(jobAddressTextField.value != job.address){
		addressTextChanged = true;
	}else{
		addressTextChanged = false;
	}
	toggleJobModifyButton();
}


function toggleJobModifyButton(){
	if(nameTextChanged == true || addressTextChanged == true){
		modifyJobButton.disabled = false;
	}else{
		modifyJobButton.disabled = true;
	}
}




// ending methods //
function modifyJobOnClick(){
	
	for(var j = 0; j < listOfEmployeesForThisJob.length; j++){
		console.log("" + listOfEmployeesForThisJob[j]);
	}



	/*
	db.collection('companies').doc(companyName).collection('jobs').doc(jobId).update({
		name: jobNameTextField.value,
		address: jobAddressTextField.value,
		employees: firebase.firestore.FieldValue.arrayUnion(listOfEmployeesForThisJob)
	}).then(function(){
		console.log("success!");
	}).catch(function(error){
		console.log("err " + error);
	});
	*/
	/*
	for(var q = 0; q < _listOfEmployees.length; q++){
		db.collection('companies').doc(companyName).collection('employees').doc(_listOfEmployees[q]).update({
			jobs: firebase.firestore.FieldValue.arrayUnion(jobID)
		}).then(function(){
			console.log("success");
		}).catch(function(error){
			console.log("error -> " + error);
		});
	}


	jobNameTextField.value;
	jobAddressTextField.value;
	listOfEmployeesForThisJob;
	*/

}

function deleteJobOnClick(){
	
}
