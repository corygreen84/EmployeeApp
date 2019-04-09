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
var employeeListChanged = false;


// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	modifyJobButton.disabled = true;
	
}, false);



function mainJobListOnClick(item){

	listOfEmployeesForThisJob = [];
	modifyJobModal.style.display = "block";


	// getting the address so that we can match it up with that of the //
	// list of jobs array. Then the entire job gets brought into the //
	// job object. //
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


	for(var o = 0; o < job.employees.length; o++){
		console.log("email -> " + job.employees[o]);
	}

	//listOfEmployeesForThisJob = job.employees;

	loadEmployeesModify(companyName);
}





function loadEmployeesModify(companyName){
	
	listOfEmployees = [];
	var companyRef = db.collection('companies').doc(companyName).collection('employees');
	companyRef.get().then(function(querySnapshot){
		
		var data = querySnapshot.docs.map(function(documentSnapshot){
			
			return documentSnapshot.data();
		});	
		console.log("" + data.length);	
		for(var i = 0; i < data.length; i++){
			if(data[i].first != undefined && data[i].last != undefined && data[i].employeeNumber != undefined && data[i].status != undefined && data[i].phoneNumber != undefined && data[i].email != undefined){
				var newEmployeeObject = new Employees();
				newEmployeeObject.first = data[i].first;
				newEmployeeObject.last = data[i].last;
				newEmployeeObject.employeeNumber = data[i].employeeNumber;
				newEmployeeObject.status = data[i].status;
				newEmployeeObject.phone = data[i].phoneNumber;
				newEmployeeObject.email = data[i].email;
					
				listOfEmployees.push(newEmployeeObject);
			}
		}
		parseEmployeesAndAddToListViewModify();
	});	
}


// shows all the possible employees for this company in the modify job panel //
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
	
	var listOfEmployeeNumbersToBeMinused = [];
	for(var j = 0; j < job.employees.length; j++){
		for(var k = 0; k < listOfEmployees.length; k++){
			if(job.employees[j] == listOfEmployees[k].email){
				listOfEmployeeNumbersToBeMinused.push(listOfEmployees[k].employeeNumber);
			}
		}
	}

	for(var h = 0; h < listOfEmployeeNumbersToBeMinused.length; h++){
		$('#icon--' + listOfEmployeeNumbersToBeMinused[h]).removeClass('ui-icon-plus').addClass('ui-icon-minus');
	}
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
	}else if($('#icon--' + item.id).hasClass('ui-icon-minus') == true){

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


	toggleJobModifyButton();

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
	if(nameTextChanged == true || addressTextChanged == true || employeeListChanged == true){
		modifyJobButton.disabled = false;
	}else{
		modifyJobButton.disabled = true;
	}
}




// ending methods //
function modifyJobOnClick(){

	/*
	// zeroing out the employees array //
	db.collection('companies').doc(companyName).collection('jobs').doc(jobId).update({
		employees: []
	}).then(function(){
		console.log("complete");
	});

	db.collection('companies').doc(companyName).collection('jobs').doc(jobId).update({
		employees: 
	}).then(function(){
		console.log("complete complete");
	});
	*/
	


}

// this should notify/modify the employees involved that the job has been deleted //
function deleteJobOnClick(){

	db.collection('companies').doc(companyName).collection('jobs').doc(jobId).delete().then(function(){
		modifyJobModal.style.display = "none";
	}).catch(function(error){
		console.log("error " + error);
	});
}
