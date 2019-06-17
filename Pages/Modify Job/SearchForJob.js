
var jobLoaded;

var modifiedAddress;
var modifiedDate;
var modifiedName;
var modifiedLocation;
var modifiedEmployees;
var modifiedNotes;

var passedInCompany;

var db = firebase.firestore();

function searchForJob(job, company){

	passedInCompany = company;

	var jobRef = db.collection('companies').doc(company).collection('jobs').doc(job);
	jobRef.get().then(function(doc){
		if(doc.exists){

			var data = doc.data();
			var newJob = new Jobs();

			modifiedAddress = data["address"];
			modifiedDate = data["date"];
			modifiedName = data["name"];
			modifiedLocation = data["location"];
			modifiedEmployees = data["employees"];
			modifiedNotes = data["notes"];

			newJob.address = modifiedAddress;
			newJob.name = modifiedName;
			newJob.date = modifiedDate;
			newJob.long = modifiedLocation["longitude"];
			newJob.lat = modifiedLocation["latitude"];
			newJob.employees = modifiedEmployees;
			newJob.notes = modifiedNotes;

			jobLoaded = newJob;


			// finalizing the job //
			loadIntoFields(jobLoaded);
			loadEmployeesModify(company, jobLoaded.employees);
			//loadEmployeesToToggle(jobLoaded.employees);
		}
	});	
}

function loadIntoFields(job){

	setThingsToDefault(job.name, job.address, job.long, job.lat, job.notes);

}








function clearButtonClicked(){

	setThingsToDefault(modifiedName, modifiedAddress, modifiedLocation["longitude"], modifiedLocation["latitude"], modifiedNotes);

	// getting the default employee data //
	loadEmployeesModify(passedInCompany, jobLoaded.employees);
}


function setThingsToDefault(name, address, long, lat, notes){
	modifyJobNameTextField.value = name
	modifyJobAddressTextField.value = address;
	modifyJobLongitudeTextField.value = long;
	modifyJobLatitudeTextField.value = lat;
	if(modifiedNotes != undefined){
		modifyJobNotes.value = notes;
	}else{
		modifyJobNotes.value = "";
	}

	modifyNameFilledIn = false;
	modifyAddressFilledIn = false;
	modifyLongFilledIn = false;
	modifyLatFilledIn = false;
	modifyNotesFilledIn = false;

	toggleSearchButton();
	toggleModifyJobButton();

	putOnMap(address, long, lat);
}

function putOnMap(address, long, lat){
	placeOnMapModify(long, lat, address);
}