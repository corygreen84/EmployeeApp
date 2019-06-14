
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
				}).then(function(){
					
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
		}else{
			
		}
	});
}


// **** this is the main list view area **** //

// loading all the jobs //
function loadJobs(user, companyName){

	var dictionaryOfIds = {};
	var jobRef = db.collection('companies').doc(companyName).collection('jobs');
	jobRef.onSnapshot(function(querySnapshot){

		var data = querySnapshot.docs.map(function(documentSnapshot){

			dictionaryOfIds[documentSnapshot.data().name] = documentSnapshot.id;

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
				newJob.jobId = dictionaryOfIds[data[q].name];
				

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
		var _address = _listOfJobs[r].address;
		var _id = _listOfJobs[r].jobId;
		
		// putting it all into a list view //
		$("#job-listview-div ul").append('<li id=job-' + _id + ' onclick="mainJobListOnClick(this)"><a href="#"><h2>' + _name + '</h2><p><strong>' + _address + '</strong></p><p class="ui-li-aside"><strong>' + _date + '</strong></p></a></li>');
		
	}
	$("#job-listview-div ul").listview('refresh');
}



function createNewJobOnClick(){
	window.location = "https://seekanddestroy84.github.io/EmployeeApp/Pages/New Job/New-job.html";
}


function mainJobListOnClick(item){
	localStorage.setItem("item", item.id);
	window.location = "https://seekanddestroy84.github.io/EmployeeApp/Pages/Modify Job/New-job-Modify.html";
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






