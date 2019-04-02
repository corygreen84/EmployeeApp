

// **** this is for the modal view variables **** //
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('create-new-job-modal-box');

var createButton = document.getElementById("create-button");

var jobNameTextField = document.getElementById("job-name-text");
var addressTextField = document.getElementById("address-text");

var nameTextFilled = false;
var addressTextFilled = false;


var companyName = "";
var listOfEmployees = [];
var listOfSelectedEmployees = [];

// **** end of modal view variables **** //
var listView = document.getElementById("job-listview-div");
var listOfJobs = [];

var db = firebase.firestore();



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	listOfEmployees = [];
	listOfSelectedEmployees = [];
	
	checkState();
	
	createButton.disabled = true;
	
}, false);

function checkState(){
	firebase.auth().onAuthStateChanged(function(user){
		
		// if the user is good to go, we need to pull their email address to get their company info //
		if(user){

			if(db != null){
				var emailRef = db.collection("admin").doc(user.email);
				emailRef.get().then(function(doc){
					
					// getting the company name //
					companyName = doc.data().company;
					
					// from this, we load the employees and the jobs tied to this company //
					loadJobs(user, companyName);
					loadEmployees(user ,companyName);
				}).then(function(){
					
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
		}else{
			
		}
	});
}






function loadEmployees(user, companyName){
	if(user){
		if(db != null){

			var companyRef = db.collection('companies').doc(companyName).collection('employees');
			companyRef.get().then(function(querySnapshot){
				
				var data = querySnapshot.docs.map(function(documentSnapshot){
					
					return documentSnapshot.data();
				});	
				
				for(var i = 0; i < data.length; i++){
					var newEmployeeObject = new Employees();
					newEmployeeObject.first = data[i].first;
					newEmployeeObject.last = data[i].last;
					newEmployeeObject.employeeNumber = data[i].employeeNumber;
					newEmployeeObject.status = data[i].status;
					newEmployeeObject.phone = data[i].phoneNumber;
					newEmployeeObject.email = data[i].email;
					
					listOfEmployees.push(newEmployeeObject);
				}
				
				parseEmployeesAndAddToListView();
			});	
		}
	}
}


// **** this is really the start of the modal view create job **** //
function parseEmployeesAndAddToListView(){
	
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
		
		// appending the info to the modal views list view //
		$("#employee-list-div ul").append('<li id=' + employeeNumber + ' onclick="listItemOnClick(this)" data-icon="plus"><a href="#" id="icon-' + employeeNumber + '"><h2>' + firstName + ' ' + lastName + '</h2><p>Employee #: ' + employeeNumber + '</p><p class="ui-li-aside"><strong>Status: ' + statusToString + '</strong></p></a></li>');
	}
	
	// refreshing the list //
	$("#employee-list-div ul").listview('refresh');	
}



// with this function I want to be able to toggle the + and - buttons per row //
// and add/subtract it to the selected list //
function listItemOnClick(item){

	// if the list of selected employees is empty, then we just put the first selected item in it without //
	// checking to see if the item is already in here... //
	for(var l = 0; l < listOfEmployees.length; l++){
		
		console.log("" + listOfEmployees[l].employeeNumber + " id -> " + item.id + "list # " + listOfEmployees.length);
		
		if(listOfEmployees[l].employeeNumber == item.id){
			if(!listOfSelectedEmployees.includes(listOfEmployees[l])){

				listOfSelectedEmployees.push(listOfEmployees[l]);
				
				// change the button icon to be a minus symbol //
				$('#icon-' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');
			}else{
				// if list of selected employees does not include the passed in employee //
				// we need to remove it from the list //
				for(var m = 0; m < listOfSelectedEmployees.length; m++){
					if(listOfSelectedEmployees[m] === listOfEmployees[l]){
						listOfSelectedEmployees.splice(m, 1);
						
						// change the button icon to be a plus symbol //
						$('#icon-' + item.id).removeClass('ui-icon-minus').addClass('ui-icon-plus');
					}
				}
			}
		}
	}
}


// adding all employees to the list //
function addAllOnClick(){
	
	var addAllButton = $('#add-all');
	if(addAllButton.text() == "Add All"){
		
		// setting all the button icons to be - //
		for(var n = 0; n < listOfEmployees.length; n++){
			$('#icon-' + listOfEmployees[n].employeeNumber).removeClass('ui-icon-plus').addClass('ui-icon-minus');
		}

		listOfSelectedEmployees = listOfEmployees;		
		addAllButton.text("Remove All");
	}else{

		for(var n = 0; n < listOfEmployees.length; n++){
			$('#icon-' + listOfEmployees[n].employeeNumber).removeClass('ui-icon-minus').addClass('ui-icon-plus');
		}
		listOfSelectedEmployees = [];
		addAllButton.text("Add All");
	}
	$("#employee-list-div ul").listview('refresh');
}











function createNewJobOnClick(){
	modal.style.display = "block";
	
	listOfSelectedEmployees = [];
	
	jobNameTextField.value = "";
	addressTextField.value = "";
	
	nameTextFilled = false;
	addressTextFilled = false;
	
	for(var n = 0; n < listOfEmployees.length; n++){
		$('#icon-' + listOfEmployees[n].employeeNumber).removeClass('ui-icon-minus').addClass('ui-icon-plus');
	}
	toggleCreateButton();
}


// removing the modal view //
span.onclick = function(){
	modal.style.display = "none";
};


// displaying the modal view //
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

// text field checks //
function jobNameTextChange(){
	if(jobNameTextField.value != ""){
		nameTextFilled = true;
	}else{
		nameTextFilled = false;
	}
	toggleCreateButton();
}

function addressTextChange(){
	if(addressTextField.value != ""){
		addressTextFilled = true;
	}else{
		addressTextFilled = false;
	}
	toggleCreateButton();
}

// toggling the create button //
function toggleCreateButton(){
	if(nameTextFilled == true && addressTextFilled == true){
		createButton.disabled = false;
	}else{
		createButton.disabled = true;
	}
}





// creation of the job //
function createButtonOnClick(){
	var tempListOfEmployeeEmails = [];
	var date = new Date();
	var dateString = "" + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
	console.log(dateString);
	for(var p = 0; p < listOfSelectedEmployees.length; p++){
		tempListOfEmployeeEmails.push(listOfSelectedEmployees[p].email);
	}
	
	var docData = {
		name:jobNameTextField.value,
		address: addressTextField.value,
		employees: tempListOfEmployeeEmails,
		date: dateString
	}
	
	
	db.collection('companies').doc(companyName).collection('jobs').add(docData)
	.then(function(){
		// removing the display //
		modal.style.display = "none";
	}).catch(function(error){
		console.log("error");
	});
	
}






// **** this is the main list view area **** //

// loading all the jobs //
function loadJobs(user, companyName){
	// loading the data //
	
	var jobRef = db.collection('companies').doc(companyName).collection('jobs');
	jobRef.onSnapshot(function(querySnapshot){
		var data = querySnapshot.docs.map(function(documentSnapshot){		
			return documentSnapshot.data();
		});	
		
		
		// zeroing out the list of jobs //
		listOfJobs = [];
		for(var q = 0; q < data.length; q++){
			
			var newJob = new Jobs();
			newJob.name = data[q].name;
			newJob.address = data[q].address;
			newJob.employees = data[q].employees;
			newJob.date = data[q].date;
			
			listOfJobs.push(newJob);
		}
		parseJobs(listOfJobs);
	});
}



function parseJobs(_listOfJobs){
	
	$("#job-listview-div ul").empty();
	
	for(var r = 0; r < _listOfJobs.length; r++){
		
		var name = _listOfJobs[r].name;
		var date = _listOfJobs[r].date;
		var employees = _listOfJobs[r].employees;
		var address = _listOfJobs[r].address;
		
		// putting it all into a list view //
		$("#job-listview-div ul").append('<li id=' + r + ' onclick="mainJobListOnClick(this)"><a href="#"><h2>' + name + '</h2><p><strong>' + address + '</strong></p><p class="ui-li-aside"><strong>' + date + '</strong></p></a></li>');
		
	}
	$("#job-listview-div ul").listview('refresh');
}

function mainJobListOnClick(event){
	console.log("refresh");
	$("#job-listview-div ul").listview('refresh');
}













// creating the job class //
class Employees{
	constructor(){
		var first;
		var last;
		var employeeNumber;
		var status;
		var email;
		var phone;
	}
}

class Jobs{
	constructor(){
		var name;
		var address;
		var employees;
		var date;
	}
}






