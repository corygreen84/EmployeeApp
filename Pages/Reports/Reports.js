

var db = firebase.firestore();

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	checkState();

	
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
					loadEmployeeData(user, companyName);
				}).then(function(){
					
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
			
		}else{
			
		}
	});
}



function loadEmployeeData(user, companyName){
	var employees = [];
	var empRef = db.collection('companies').doc(companyName).collection('employees');
	empRef.onSnapshot(function(querySnapshot){

		var data = querySnapshot.docs.map(function(documentSnapshot){

			return documentSnapshot.data();
		});


		for(var d in data){
			var newEmployee = new Employees()
			newEmployee.first = data[d].first;
			newEmployee.last = data[d].last;
			newEmployee.employeeNumber = data[d].employeeNumber;
			newEmployee.status = data[d].status;
			newEmployee.email = data[d].email;
			newEmployee.phone = data[d].phone;
			newEmployee.uniqueId = data[d].uniqueId;
			newEmployee.jobHistory = data[d].jobHistory;

			employees.push(newEmployee);
		};

		parseEmployeeData(employees);
	});
}



function parseEmployeeData(employees){
	//$("#employee-report-ul").empty();
	

	for(var e in employees){
		var name = "" + employees[e].first + " " + employees[e].last;
	}
	/*
	for(var r = 0; r < _listOfJobs.length; r++){
		
		var _name = _listOfJobs[r].name;
		var _date = _listOfJobs[r].date;
		var _address = _listOfJobs[r].address;
		var _id = _listOfJobs[r].jobId;
		

		// putting it all into a list view //
		$("#job-listview-div ul").append('<li id=job-' + _id + ' onclick="mainJobListOnClick(this)"><a href="#"><h2>' + _name + '</h2><p><strong>' + _address + '</strong></p><p class="ui-li-aside"><strong>' + _date + '</strong></p></a></li>');
		
	}
	*/
	$("#job-listview-div ul").listview('refresh');
}



// employee on click //
function employeeReportOnClick(){

}

// job on click //
function deleteJobOnClick(){
	
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






