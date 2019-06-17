
var jobLoaded;

var db = firebase.firestore();

function searchForJob(job, company){

	var jobRef = db.collection('companies').doc(company).collection('jobs').doc(job);
	jobRef.get().then(function(doc){
		if(doc.exists){

			var data = doc.data();
			var newJob = new Jobs();

			var address = data["address"];
			var date = data["date"];
			var name = data["name"];
			var location = data["location"];
			var employees = data["employees"];

			newJob.address = address;
			newJob.name = name;
			newJob.date = date;
			newJob.long = location["longitude"];
			newJob.lat = location["latitude"];
			newJob.employees = employees;

			jobLoaded = newJob;

			loadIntoFields(jobLoaded);
		}
	});		
}

function loadIntoFields(job){
	modifyJobNameTextField.value = job.name;
	modifyJobAddressTextField.value = job.address;
	modifyJobLongitudeTextField.value = "" + job.long;
	modifyJobLatitudeTextField.value = "" + job.lat;
}

function putOnMap(address, long, lat){
	placeOnMapModify(long, lat, address);
}
