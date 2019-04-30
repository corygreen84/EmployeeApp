
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

let originalDictionaryOfJobs = {};
let dictionaryOfEmployeesForThisJob = {};
var listOfEmployeesModify = [];

var resultsOfCheckingDifferencesInArrays = {};

var employeeListChanged = false;



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	modifyJobButton.disabled = true;
	
}, false);



// user clicks on a job //
function mainJobListOnClick(item){

	for(var h in originalDictionaryOfJobs){
		delete originalDictionaryOfJobs[h];
	}

	for(var l in dictionaryOfEmployeesForThisJob){
		delete dictionaryOfEmployeesForThisJob[l];
	}
	
	
	modifyJobModal.style.display = "block";
	modifyJobButton.disabled = true;

	for(var i = 0; i < listOfJobs.length; i++){
		if("job-" + listOfJobs[i].jobId == item.id){
			job = listOfJobs[i];
		}
	}
	



	jobNameTextField.value = job.name;
	jobAddressTextField.value = job.address;
	jobId = job.jobId;


	// loading the original list of employees into a dictionary //
	// this dictionary will not change //
	for(var j in job.employees){
		originalDictionaryOfJobs[j] = job.employees[j];
	}


	
	for(var k in job.employees){
		dictionaryOfEmployeesForThisJob[k] = job.employees[k];
	}

	loadEmployeesModify(companyName);
}








// brings up all the employees for this company //
function loadEmployeesModify(companyName){

	for(var h in originalDictionaryOfJobs){
		delete originalDictionaryOfJobs[h];
	}
	
	listOfEmployeesModify = [];

	var companyRef = db.collection('companies').doc(companyName).collection('employees');
	companyRef.get().then(function(querySnapshot){
		
		var data = querySnapshot.docs.map(function(documentSnapshot){
			
			return documentSnapshot.data();
		});	

		for(var i = 0; i < data.length; i++){
			if(data[i].first != undefined && data[i].last != undefined && data[i].employeeNumber != undefined && data[i].status != undefined && data[i].phoneNumber != undefined && data[i].email != undefined){
				
				var newEmployeeObject = new Employees();
				newEmployeeObject.first = data[i].first;
				newEmployeeObject.last = data[i].last;
				newEmployeeObject.employeeNumber = data[i].employeeNumber;
				newEmployeeObject.status = data[i].status;
				newEmployeeObject.phone = data[i].phoneNumber;
				newEmployeeObject.email = data[i].email;

				listOfEmployeesModify.push(newEmployeeObject);
			}
		}
		parseEmployeesAndAddToListViewModify();
	});	
}


// shows all the possible employees for this company in the modify job panel //
function parseEmployeesAndAddToListViewModify(){
	
	$("#modify-employee-list-div ul").empty();

	for(var j = 0; j < listOfEmployeesModify.length; j++){
		
		var firstName = listOfEmployeesModify[j].first;
		var lastName = listOfEmployeesModify[j].last;
		var employeeNumber = listOfEmployeesModify[j].employeeNumber;
		var status = listOfEmployeesModify[j].status;
		var statusToString = "";
		if(status == true){
			statusToString = "Available";
		}else{
			statusToString = "Not Available";
		}

		
		$("#modify-employee-list-div ul").append('<li id=' 
		+ employeeNumber + ' onclick="modifyListItemOnClick(this)" data-icon="plus" class="employee-li"><a href="#" id="icon--' 
		+ employeeNumber + '"><h2>' 
		+ firstName + ' ' 
		+ lastName + '</h2><p>Employee #: ' 
		+ employeeNumber + '</p><p class="ui-li-aside"><strong>Status: ' 
		+ statusToString + '</strong></p></a></li>');
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
	for(var i in listOfEmployeesModify){
		for(var j in dictionaryOfEmployeesForThisJob){
			if(dictionaryOfEmployeesForThisJob[j] == listOfEmployeesModify[i].email){
				listOfEmployeeNumbersToBeMinused.push(listOfEmployeesModify[i].employeeNumber);
			}
		}
	}

	for(var h = 0; h < listOfEmployeeNumbersToBeMinused.length; h++){
		$('#icon--' + listOfEmployeeNumbersToBeMinused[h]).removeClass('ui-icon-plus').addClass('ui-icon-minus');
	}

}



// when the user selects the employee from the list //
function modifyListItemOnClick(item){

	resultsOfCheckingDifferencesInArrays = {};

	if($('#icon--' + item.id).hasClass('ui-icon-plus') == true){

		for(var i = 0; i < listOfEmployeesModify.length; i++){
			if(listOfEmployeesModify[i].employeeNumber == item.id){
				dictionaryOfEmployeesForThisJob[item.id] = listOfEmployeesModify[i].email;
			}
		}
		
	
		$('#icon--' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');
	}else if($('#icon--' + item.id).hasClass('ui-icon-minus') == true){

		if(dictionaryOfEmployeesForThisJob[item.id] != null){
			delete dictionaryOfEmployeesForThisJob[item.id];
		}

		$('#icon--' + item.id).removeClass('ui-icon-minus').addClass('ui-icon-plus');
	}


	// **** this section is for figuring out what has and hasnt been added to the job **** //
	var tempArrayOfEmployeesModify = [];
	var tempArrayOfOriginalEmployees = [];

	
	for(var mod in dictionaryOfEmployeesForThisJob){
		tempArrayOfEmployeesModify.push(dictionaryOfEmployeesForThisJob[mod]);
	}
	
	for(var orig in originalDictionaryOfJobs){
		tempArrayOfOriginalEmployees.push(originalDictionaryOfJobs[orig]);
	}
	
	resultsOfCheckingDifferencesInArrays = checkDifferenceBetweenTwoArrays(tempArrayOfOriginalEmployees, tempArrayOfEmployeesModify);
	
	for(var _ in resultsOfCheckingDifferencesInArrays){
		var addedArray = resultsOfCheckingDifferencesInArrays["updatedToAdd"];
		var deletedArray = resultsOfCheckingDifferencesInArrays["originalsToDelete"];

		if(addedArray.length > 0 || deletedArray.length > 0){
			employeeListChanged = true;
		}else{
			employeeListChanged = false;
		}
		
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




// modifies the job with the data given //
function modifyJobOnClick(){
	let confirmOk = confirm("Are you sure you want to modify this job?");
	if(confirmOk){
		db.collection('companies').doc(companyName).collection('jobs').doc(jobId).update({
			name: jobNameTextField.value,
			address: jobAddressTextField.value,
			employees: dictionaryOfEmployeesForThisJob
		}).then(function(){
			modifyJobModal.style.display = "none";
		}).catch(function(error){
			console.log("error " + error);
		});
	}
}



// this should notify/modify the employees involved that the job has been deleted //
function deleteJobOnClick(){
	let confirmOk = confirm("Are you sure you want to delete this job?");
	if(confirmOk){
		db.collection('companies').doc(companyName).collection('jobs').doc(jobId).delete().then(function(){
			modifyJobModal.style.display = "none";
		}).catch(function(error){
			console.log("error " + error);
		});
	}
}
