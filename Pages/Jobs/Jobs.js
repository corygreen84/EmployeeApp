
var companyName = "";
var listOfEmployees = [];

// **** end of modal view variables **** //
var listView = document.getElementById("job-listview-div");
var listOfJobs = [];

var db = firebase.firestore();


// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	listOfEmployees = [];
	
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



// **** this is the main list view area **** //

// loading all the jobs //
function loadJobs(user, companyName){
	// loading the data //
	
	var arrayOfIds = [];
	var jobRef = db.collection('companies').doc(companyName).collection('jobs');
	jobRef.onSnapshot(function(querySnapshot){
		var data = querySnapshot.docs.map(function(documentSnapshot){
			arrayOfIds.push(documentSnapshot.id);	
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
				newJob.jobId = arrayOfIds[q];
			
				listOfJobs.push(newJob);
			}
		}
		parseJobs(listOfJobs);
	});
}



function parseJobs(_listOfJobs){
	
	$("#job-listview-div ul").empty();
	
	for(var r = 0; r < _listOfJobs.length; r++){
		
		var _name = _listOfJobs[r].name;
		var _date = _listOfJobs[r].date;
		var _employees = _listOfJobs[r].employees;
		var _address = _listOfJobs[r].address;
		var _id = _listOfJobs[r].jobId;
		
		var replaceWhiteSpaceWithDash = _address.replace(/ /g, "-");
		
	
		// putting it all into a list view //
		$("#job-listview-div ul").append('<li id=job-' + replaceWhiteSpaceWithDash + ' onclick="mainJobListOnClick(this)"><a href="#"><h2>' + _name + '</h2><p><strong>' + _address + '</strong></p><p class="ui-li-aside"><strong>' + _date + '</strong></p></a></li>');
		
	}
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
		var jobId;
	}
}






