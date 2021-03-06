

/* text entry variables */
var createJobNameTextField = document.getElementById("create-name-text");
var createJobAddressTextField = document.getElementById("create-address-text");
var createJobLongitudeTextField = document.getElementById("create-long-text");
var createJobLatitudeTextField = document.getElementById("create-lat-text");
var createJobNotes = document.getElementById("notes-textarea");

var dateStartDateTextField = document.getElementById('start-day-text');
var endStartDateTextField = document.getElementById('end-day-text');
var startTimeTextField = document.getElementById('start-time-text');
var endTimeTextField = document.getElementById('end-time-text');
var startLunchTextField = document.getElementById('lunch-start-text');
var endLunchTextField = document.getElementById('lunch-end-text');

var weekendCheckMark = document.getElementById('weekend-checkmark');
var weekendCheckMarkLabel = document.getElementById('checkmark-label');

var createSearchButton = document.getElementById("create-address-search");
var createJobButton = document.getElementById("create-job-button");

var companyName = "Greenmachine Studios";
var user;

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	//checkState();
	loadEmployeesCreate(companyName);

	clearEverything();
	
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
					this.user = user;

					loadEmployeesCreate(companyName);

				}).then(function(){
					
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
		}else{
			
		}
	});
}


function backButtonOnClick(){
	window.location = "https://seekanddestroy84.github.io/EmployeeApp/Pages/Jobs/Jobs.html";
}


function clearEverything(){
	createJobNameTextField.value = "";
	createJobAddressTextField.value = "";
	createJobLongitudeTextField.value = "";
	createJobLatitudeTextField.value = "";
	createJobNotes.value = "";

	dateStartDateTextField.value = "";
	endStartDateTextField.value = "";
	startTimeTextField.value = "";
	endTimeTextField.value = "";
	startLunchTextField.value = "";
	endLunchTextField.value = "";

	createSearchButton.disabled = true;
	createJobButton.disabled = true;

	weekendCheckMark.checked = false;
	weekendCheckMarkLabel.classList.add("ui-checkbox-off");
	weekendCheckMarkLabel.classList.remove("ui-checkbox-on");

	createAddressFilledIn = false;
	createNameFilledIn = false;
	createLongFilledIn = false;
	createLatFilledIn = false;
	createNotesFilledIn = false;

	dateStartFilledIn = false;
	dateEndFilledIn = false;
	includeWeekendsToggle = false;
	jobStartTimeFilledIn = false;
	jobEndTimeFilledIn = false;
	lunchEndFilledIn = false;
	lunchStartFilledIn = false;
}

function clearButtonOnClick(){
	clearEverything();
}



// creation of the job //
function createButtonOnClick(){
	var date = new Date();
	var dateString = "" + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

	var floatLong = parseFloat(createJobLongitudeTextField.value);
	var floatLat = parseFloat(createJobLatitudeTextField.value);

	// adds the data to both the job itself and the employees involved //
	var batch = db.batch();
	var docData = {
		name: createJobNameTextField.value,
		address: createJobAddressTextField.value,
		date: dateString,
		location: new firebase.firestore.GeoPoint(floatLat, floatLong),
		notes: createJobNotes.value,
		jobStartDate: dateStartDateTextField.value,
		jobEndDate: endStartDateTextField.value,
		jobStartTime: startTimeTextField.value,
		jobEndTime: endTimeTextField.value,
		jobLunchStart: startLunchTextField.value,
		jobLunchEnd: endLunchTextField.value,
		weekends: weekendCheckMark.checked,
		employees: []
	}
	
	db.collection('companies').doc(companyName).collection('jobs').add(docData)
	.then(function(docRef){
		
		var employeesRefJobs = db.collection('companies').doc(companyName).collection('jobs').doc(docRef.id);
		for(var i in listOfSelectedEmployees){

			batch.update(employeesRefJobs, {"employees": firebase.firestore.FieldValue.arrayUnion(listOfSelectedEmployees[i].uniqueId) });
			var jobEmployeeRef = db.collection('companies').doc(companyName).collection('employees').doc(listOfSelectedEmployees[i].uniqueId);
			
			batch.update(jobEmployeeRef, {"jobs": firebase.firestore.FieldValue.arrayUnion(docRef.id) });
		}

		batch.commit().then(function(){
			window.location = "https://seekanddestroy84.github.io/EmployeeApp/Pages/Jobs/Jobs.html";
		});
	}).catch(function(error){
		console.log("error" + error);
	});
}