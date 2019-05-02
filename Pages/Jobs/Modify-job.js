
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


	// I dont want to go by employee number anymore.  Its difficult to modify once set in stone //
	
	for(var j in job.employees){
		originalDictionaryOfJobs[j] = job.employees[j];
	}


	for(var k in job.employees){
		dictionaryOfEmployeesForThisJob[job.employees[k]] = job.employees[k];
	}


	loadAllEmployees(companyName);
}








// brings up all the employees for this company //
function loadAllEmployees(companyName){

	listOfEmployeesModify = [];

	var companyRef = db.collection('companies').doc(companyName).collection('employees');
	companyRef.get().then(function(querySnapshot){
		
		var data = querySnapshot.docs.map(function(documentSnapshot){
			
			return documentSnapshot.data();
		});	

		for(var i = 0; i < data.length; i++){
			if(data[i].first != undefined && data[i].last != undefined && data[i].employeeNumber != undefined && data[i].status != undefined && data[i].phoneNumber != undefined && data[i].email != undefined && data[i].id){
				
				var newEmployeeObject = new Employees();
				newEmployeeObject.first = data[i].first;
				newEmployeeObject.last = data[i].last;
				newEmployeeObject.employeeNumber = data[i].employeeNumber;
				newEmployeeObject.status = data[i].status;
				newEmployeeObject.phone = data[i].phoneNumber;
				newEmployeeObject.email = data[i].email;
				newEmployeeObject.uniqueId = data[i].id;

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
		var uniqueIdentifier = listOfEmployeesModify[j].uniqueId;
		var statusToString = "";
		if(status == true){
			statusToString = "Available";
		}else{
			statusToString = "Not Available";
		}

		
		// **** major changes **** //
		$("#modify-employee-list-div ul").append('<li id=' 
		+ uniqueIdentifier + ' onclick="modifyListItemOnClick(this)" data-icon="plus" class="employee-li"><a href="#" id="icon--' 
		+ uniqueIdentifier + '"><h2>' 
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


	// dictionary for this job holds the unique ids for each employee //
	var listOfEmployeeNumbersToBeMinused = [];
	for(var i in listOfEmployeesModify){
		for(var j in dictionaryOfEmployeesForThisJob){
			if(dictionaryOfEmployeesForThisJob[j] == listOfEmployeesModify[i].uniqueId){
				listOfEmployeeNumbersToBeMinused.push(listOfEmployeesModify[i].uniqueId);
			}
		}
	}

	for(var h in listOfEmployeeNumbersToBeMinused){
		$('#icon--' + listOfEmployeeNumbersToBeMinused[h]).removeClass('ui-icon-plus').addClass('ui-icon-minus');
	}

}









// when the user selects the employee from the list //
function modifyListItemOnClick(item){

	//console.log("item id - > " + item.id);
	resultsOfCheckingDifferencesInArrays = {};



	if($('#icon--' + item.id).hasClass('ui-icon-plus') == true){

		for(var i in listOfEmployeesModify){
			if(listOfEmployeesModify[i].uniqueId == item.id){
				dictionaryOfEmployeesForThisJob[item.id] = listOfEmployeesModify[i].uniqueId;
			}
		}
		
		$('#icon--' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');

	}else if($('#icon--' + item.id).hasClass('ui-icon-minus') == true){

		delete dictionaryOfEmployeesForThisJob[item.id];

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

	// **** checking to see what is the same, what has been added and what has been deleted **** //
	resultsOfCheckingDifferencesInArrays = checkDifferenceBetweenTwoArrays(tempArrayOfOriginalEmployees, tempArrayOfEmployeesModify);

	var addedArray = resultsOfCheckingDifferencesInArrays["updatedToAdd"];
	var deletedArray = resultsOfCheckingDifferencesInArrays["originalsToDelete"];

	if(addedArray.length > 0 || deletedArray.length > 0){
		employeeListChanged = true;
	}else{
		employeeListChanged = false;
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
		var batch = db.batch();

		var mainUpdate = db.collection('companies').doc(companyName).collection('jobs').doc(jobId);
		batch.update(mainUpdate, {"name": jobNameTextField.value, 
								"address": jobAddressTextField.value});

		var addedArr = resultsOfCheckingDifferencesInArrays["updatedToAdd"];
		var deletedArr = resultsOfCheckingDifferencesInArrays["originalsToDelete"];

		for(var i in addedArr){
			var employeesUpdate = db.collection('companies').doc(companyName).collection('employees').doc(addedArr[i]);
			batch.update(employeesUpdate, {"jobs": firebase.firestore.FieldValue.arrayUnion(jobId)});

			batch.update(mainUpdate, {"employees": firebase.firestore.FieldValue.arrayUnion(addedArr[i])} );
		}

		for(var j in deletedArr){
			var employeesDelete = db.collection('companies').doc(companyName).collection('employees').doc(deletedArr[j]);
			batch.update(employeesDelete, {"jobs": firebase.firestore.FieldValue.arrayRemove(jobId)});

			batch.update(mainUpdate, {"employees": firebase.firestore.FieldValue.arrayRemove(deletedArr[j])} );
		}

		batch.commit().then(function(){
		
			modifyJobModal.style.display = "none";
		});
	}
}



// this should notify/modify the employees involved that the job has been deleted //
function deleteJobOnClick(){

	let confirmOk = confirm("Are you sure you want to delete this job?");
	if(confirmOk){
		var batch = db.batch();

		var deleteFromJob = db.collection('companies').doc(companyName).collection('jobs').doc(jobId);
		batch.delete(deleteFromJob);

		for(var j in dictionaryOfEmployeesForThisJob){
			var deleteFromEmployee = db.collection('companies').doc(companyName).collection('employees').doc(dictionaryOfEmployeesForThisJob[j]);
			batch.update(deleteFromEmployee, {"jobs": firebase.firestore.FieldValue.arrayRemove(jobId)});
		}

		batch.commit().then(function(){
			modifyJobModal.style.display = "none";
		});
	}
}
