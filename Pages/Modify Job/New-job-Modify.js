

/* text entry variables */
var modifyJobNameTextField = document.getElementById("modify-name-text");
var modifyJobAddressTextField = document.getElementById("modify-address-text");
var modifyJobLongitudeTextField = document.getElementById("modify-long-text");
var modifyJobLatitudeTextField = document.getElementById("modify-lat-text");
var modifyJobNotes = document.getElementById("notes-textarea");

var modifySearchButton = document.getElementById("modify-address-search");
var modifyJobButton = document.getElementById("modify-job-button");

var companyName = "";
var user;





// checking if the user is logged in //
window.addEventListener('DOMContentLoaded', function () {

	
	if(localStorage.getItem("id") != null && localStorage.getItem("name") != null){
		var idString = removeExcessFromJobId(localStorage.getItem("id"));
		var companyString = localStorage.getItem("name")
		
		searchForJob(idString, companyString);
	}
	

}, false);

function removeExcessFromJobId(job){
	var returnString = job.replace("job-", "");
	return returnString;
}





function deleteButtonOnClick(){

}


function modifyButtonOnClick(){
	
}


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
					this.user = user;

					loadEmployeesmodify(companyName);

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

function clearButtonOnClick(){
	modifyJobNameTextField.value = "";
	modifyJobAddressTextField.value = "";
	modifyJobLongitudeTextField.value = "";
	modifyJobLatitudeTextField.value = "";
	modifyJobNotes.value = "";

	modifySearchButton.disabled = true;
	modifyJobButton.disabled = true;

	modifyAddressFilledIn = false;
	modifyNameFilledIn = false;
	modifyLongFilledIn = false;
	modifyLatFilledIn = false;
	modifyNotesFilledIn = false;
}



// creation of the job //
function modifyButtonOnClick(){
	var date = new Date();
	var dateString = "" + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();


	var floatLong = parseFloat(modifyJobLongitudeTextField.value);
	var floatLat = parseFloat(modifyJobLatitudeTextField.value);

	// adds the data to both the job itself and the employees involved //
	var batch = db.batch();
	var docData = {
		name: modifyJobNameTextField.value,
		address: modifyJobAddressTextField.value,
		date: dateString,
		location: new firebase.firestore.GeoPoint(floatLat, floatLong),
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

*/