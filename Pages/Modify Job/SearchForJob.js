
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
	modifyJobNameTextField.value = job.name;
	modifyJobAddressTextField.value = job.address;
	modifyJobLongitudeTextField.value = "" + job.long;
	modifyJobLatitudeTextField.value = "" + job.lat;
	if(job.notes != undefined){
		modifyJobNotes.value = job.notes;
	}


	// this is the opposite of what we think //
	// I want the search and modify buttons to be blanked out when the fields are first loaded //
	modifyNameFilledIn = false;
	modifyAddressFilledIn = false;
	modifyLongFilledIn = false;
	modifyLatFilledIn = false;
	modifyNotesFilledIn = false;

	toggleSearchButton();

	putOnMap(job.address, job.long, job.lat);
}

function putOnMap(address, long, lat){
	placeOnMapModify(long, lat, address);
}



function clearButtonClicked(){
	modifyJobNameTextField.value = modifiedName
	modifyJobAddressTextField.value = modifiedAddress;
	modifyJobLongitudeTextField.value = modifiedLocation["longitude"];
	modifyJobLatitudeTextField.value = modifiedLocation["latitude"];
	if(modifiedNotes != undefined){
		modifyJobNotes.value = modifiedNotes;
	}

	console.log(passedInCompany);
	// getting the default employee data //
	loadEmployeesModify(passedInCompany, jobLoaded.employees);
}