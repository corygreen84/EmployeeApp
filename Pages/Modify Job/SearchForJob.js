
var jobLoaded;

var modifiedAddress;
var modifiedDate;
var modifiedName;
var modifiedLocation;
var modifiedEmployees;
var modifiedNotes;

var db = firebase.firestore();

function searchForJob(job, company){

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
			loadEmployeesModify(company);
			loadEmployeesToToggle(jobLoaded.employees);
		}
	});	
	
	
}

function loadIntoFields(job){
	modifyJobNameTextField.value = job.name;
	modifyJobAddressTextField.value = job.address;
	modifyJobLongitudeTextField.value = "" + job.long;
	modifyJobLatitudeTextField.value = "" + job.lat;
	if(job.notes != undefined){
		modifyJobNotes.value = job.notes;
	}

	modifyNameFilledIn = true;
	modifyAddressFilledIn = true;
	modifyLongFilledIn = true;
	modifyLatFilledIn = true;
	modifyNotesFilledIn = true;

	toggleSearchButton();

	putOnMap(job.address, job.long, job.lat);
}

function putOnMap(address, long, lat){
	placeOnMapModify(long, lat, address);
}
