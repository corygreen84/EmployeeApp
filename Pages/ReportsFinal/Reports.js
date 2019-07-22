var db = firebase.firestore();

var listOfEmployees = [];
var listOfJobs = [];

var employeesButtonToggle = false;
var jobsbuttonToggle = false;

var employeeDiv = document.getElementById("by-employee");
var jobDiv = document.getElementById("by-job");

var companyName = "Greenmachine Studios";
//var companyName = "";

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	// this will be on the live version for checking to make sure there is an active users present //
	//checkState();

	loadEmployees(companyName);
	employeesButtonToggle = true;

	employeeDiv.style.display = "none";
	jobDiv.style.display = "none";

}, false);

/*
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
					loadEmployees(companyName);
				}).then(function(){
					
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
			
		}else{
			
		}
	});
}
*/







function employeesOnClick(){
	loadEmployees(companyName);
	employeeDiv.style.display = "block";
	jobDiv.style.display = "none";
}

function jobsOnClick(){
	loadJobs(companyName);
	employeeDiv.style.display = "none";
	jobDiv.style.display = "block";
}

function loadEmployees(companyName){
	var empRef = db.collection('companies').doc(companyName).collection('employees');
	empRef.onSnapshot(function(querySnapshot){

		$("#employee-job-ul").empty();
				
		listOfEmployees = [];

		var data = querySnapshot.docs.map(function(documentSnapshot){

			return documentSnapshot.data();
		});

		for(var d in data){
			if(data[d].first != undefined || data[d].last != undefined){
				var newEmployee = new Employees()
				newEmployee.first = data[d].first;
				newEmployee.last = data[d].last;
				newEmployee.employeeNumber = data[d].employeeNumber;
				newEmployee.status = data[d].status;
				newEmployee.email = data[d].email;
				newEmployee.phone = data[d].phoneNumber;
				newEmployee.uniqueId = data[d].id;
				newEmployee.jobHistory = data[d].jobHistory;

				listOfEmployees.push(newEmployee);
			}
		};

		parseEmployeesAndAddToListView();
	});
}


function parseEmployeesAndAddToListView(){
	
	for(var j = 0; j < listOfEmployees.length; j++){
		
		var firstName = listOfEmployees[j].first;
		var lastName = listOfEmployees[j].last;
		var employeeNumber = listOfEmployees[j].employeeNumber;
		var employeeId = listOfEmployees[j].uniqueId;

		// appending the info to the modal views list view //
		$("#employee-job-ul").append('<li id=' + j + ' onclick="listItemOnClick(this)"><a href="#" id="icon-' + employeeNumber + '"><h2>' + firstName + ' ' + lastName + '</h2><p>Employee #: ' + employeeNumber + '</p></a></li>');
	}
	
	// refreshing the list //
	$("#employee-job-ul").listview().listview('refresh');	
}




function loadJobs(companyName){
	var empRef = db.collection('companies').doc(companyName).collection('jobs');
	empRef.onSnapshot(function(querySnapshot){

		$("#employee-job-ul").empty();
				
		listOfEmployees = [];

		var data = querySnapshot.docs.map(function(documentSnapshot){

			return documentSnapshot.data();
		});


		// zeroing out the list of jobs //
		listOfJobs = [];
		for(var q = 0; q < data.length; q++){
			if(data[q].name != undefined && data[q].address != undefined && data[q].employees != undefined && data[q].date != undefined){
				var newJob = new Jobs();
				newJob.name = data[q].name;
				newJob.address = data[q].address;
				newJob.employees = data[q].employees;
				newJob.date = data[q].date;
				newJob.lat = data[q].location["_lat"];
				newJob.long = data[q].location["_long"];

				listOfJobs.push(newJob);
			}
		}
		parseJobs(listOfJobs);
	});
}

function parseJobs(_listOfJobs){
	
	$("#employee-job-ul").empty();
	
	for(var r = 0; r < _listOfJobs.length; r++){
		
		var _name = _listOfJobs[r].name;
		var _date = _listOfJobs[r].date;
		var _address = _listOfJobs[r].address;
		var _id = _listOfJobs[r].jobId;
		
		// putting it all into a list view //
		$("#employee-job-ul").append('<li id=job-' + r + ' onclick="mainJobListOnClick(this)"><a href="#"><h2>' + _name + '</h2><p><strong>' + _address + '</strong></p><p class="ui-li-aside"><strong>' + _date + '</strong></p></a></li>');
	}
	$("#employee-job-ul").listview('refresh');
}





// employee selected //
function listItemOnClick(item){
	employeeDiv.style.display = "block";
	jobDiv.style.display = "none";
	loadEmployeeHistory(item.id);
}








function mainJobListOnClick(item){
	employeeDiv.style.display = "none";
	jobDiv.style.display = "block";
	console.log("job cliked -> " + item.id);
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
		var uniqueId;
		var jobHistory;
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
	}
}

