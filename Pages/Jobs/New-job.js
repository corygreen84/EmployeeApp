
var jobListViewElement = document.getElementById("job-listview");


// **** this is for the modal view variables **** //
var createJobSpan = document.getElementsByClassName("createJobClose")[0];
var createJobModal = document.getElementById("create-new-job-modal-box");
var createJobContent = document.getElementById("create-job-modal-content-id");


var searchButton = document.getElementById("create-address-search");
var createButton = document.getElementById("create-job-button");


var jobCreateNameTextField = document.getElementById("create-name-text");
var addressCreateTextField = document.getElementById("create-address-text");

var longitudeTextField = document.getElementById("create-long-text");
var latitudeTextField = document.getElementById("create-lat-text");



var nameTextFilled = false;
var addressTextFilled = false;

var longitudeTextFilled = false;
var latitudeTextFilled = false;

var listOfSelectedEmployees = [];
var listOfEmployeesCreate = [];

// **** end of modal view variables **** //
var listView = document.getElementById("job-listview-div");
var listOfJobs = [];

var db = firebase.firestore();



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	listOfSelectedEmployees = [];

	createButton.disabled = true;
	searchButton.disabled = true;
	
	jobListViewElement.preventDefault();
}, false);


function createNewJobOnClick(){

	$('#erase-marker-button').removeClass('ui-btn');
	$('#add-marker-button').removeClass('ui-btn');
	

	initMap();

	createJobModal.style.display = "block";
	
	listOfSelectedEmployees = [];
	
	jobCreateNameTextField.value = "";
	addressCreateTextField.value = "";
	latitudeTextField.value = "";
	longitudeTextField.value = "";
	
	nameTextFilled = false;
	addressTextFilled = false;

	

	toggleCreateButton();
	loadEmployeesCreate(companyName);
}


// removing the modal view //
createJobSpan.onclick = function(){
	createJobModal.style.display = "none";
};



// **** closing the modal view is handled through Window-onclick.js **** //



// text field checks //
function jobNameTextChange(){
	if(jobCreateNameTextField.value != ""){
		nameTextFilled = true;
	}else{
		nameTextFilled = false;
	}
	toggleCreateButton();
}






// **** address text changes **** //
function addressTextChange(){
	
	if(addressCreateTextField.value != ""){
		addressTextFilled = true;
	}else{
		addressTextFilled = false;
	}
	
	toggleSearchButton();
	toggleCreateButton();
}

function longTextChange(){
	if(longitudeTextField.value != ""){
		longitudeTextFilled = true;
	}else{
		longitudeTextFilled = false;
	}
	toggleSearchButton();
	toggleCreateButton();
}

function latTextChange(){
	if(latitudeTextField.value != ""){
		latitudeTextFilled = true;
	}else{
		latitudeTextFilled = false;
	}

	toggleSearchButton();
	toggleCreateButton();
}

function toggleSearchButton(){
	if(addressTextFilled == true || (longitudeTextFilled == true && latitudeTextFilled == true)){
		searchButton.disabled = false;
	}else{
		searchButton.disabled = true;
	}
}


function searchButtonOnClick(){
	var addressFieldText = addressCreateTextField.value;
	var longFieldText = longitudeTextField.value;
	var latFieldText = latitudeTextField.value;

	searchForPlace(addressFieldText, longFieldText, latFieldText, true);
	
}

// **** **** //























// toggling the create button //
function toggleCreateButton(){

	if(nameTextFilled == true && addressTextFilled == true && (longitudeTextFilled == true && latitudeTextFilled == true)){
		createButton.disabled = false;
	}else{
		createButton.disabled = true;
	}
}




// brings up all the employees for this company //
function loadEmployeesCreate(companyName){
	
	listOfEmployeesCreate = [];
	var companyRef = db.collection('companies').doc(companyName).collection('employees');
	companyRef.get().then(function(querySnapshot){
		
			var data = querySnapshot.docs.map(function(documentSnapshot){
			
			return documentSnapshot.data();
		});	

		for(var i = 0; i < data.length; i++){
			if(data[i].first != undefined && data[i].last != undefined && data[i].employeeNumber != undefined && data[i].status != undefined && data[i].phoneNumber != undefined && data[i].email != undefined && data[i].id != undefined){
				var newEmployeeObject = new Employees();
				newEmployeeObject.first = data[i].first;
				newEmployeeObject.last = data[i].last;
				newEmployeeObject.employeeNumber = data[i].employeeNumber;
				newEmployeeObject.status = data[i].status;
				newEmployeeObject.phone = data[i].phoneNumber;
				newEmployeeObject.email = data[i].email;
				newEmployeeObject.uniqueId = data[i].id;

				listOfEmployeesCreate.push(newEmployeeObject);
			}
		}
		parseEmployeesAndAddToListViewCreate();
	});	
}


// shows all the possible employees for this company in the modify job panel //
function parseEmployeesAndAddToListViewCreate(){
	
	$("#employee-list-div ul").empty();

	for(var j = 0; j < listOfEmployeesCreate.length; j++){
		
		var firstName = listOfEmployeesCreate[j].first;
		var lastName = listOfEmployeesCreate[j].last;
		var employeeNumber = listOfEmployeesCreate[j].employeeNumber;
		var status = listOfEmployeesCreate[j].status;
		var uniqueIdentifier = listOfEmployeesCreate[j].uniqueId;
		var statusToString = "";
		if(status == true){
			statusToString = "Available";
		}else{
			statusToString = "Not Available";
		}

		
		$("#employee-list-div ul").append('<li id=' 
		+ uniqueIdentifier + ' onclick="createListItemOnClick(this)" data-icon="plus" class="employee-li"><a href="#" id="icon-' 
		+ uniqueIdentifier + '"><h2>' 
		+ firstName + ' ' 
		+ lastName + '</h2><p>Employee #: ' 
		+ employeeNumber + '</p><p class="ui-li-aside"><strong>Status: ' 
		+ statusToString + '</strong></p></a></li>');
	}
	// refreshing the list //
	$("#employee-list-div ul").listview('refresh');	
}




// with this function I want to be able to toggle the + and - buttons per row //
// and add/subtract it to the selected list //
function createListItemOnClick(item){

	if($('#icon-' + item.id).hasClass('ui-icon-plus') == true){
		$('#icon-' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');

		for(var l = 0; l < listOfEmployeesCreate.length; l++){
			if(listOfEmployeesCreate[l].uniqueId == item.id){
				listOfSelectedEmployees.push(listOfEmployeesCreate[l]);
			}
		}
	}else{
		$('#icon-' + item.id).removeClass('ui-icon-minus').addClass('ui-icon-plus');

		for(var m = 0; m < listOfSelectedEmployees.length; m++){
			if(listOfSelectedEmployees[m].uniqueIdentifier == item.id){
				listOfSelectedEmployees.splice(m, 1);
			}
		}
	}
}


// creation of the job //
function createButtonOnClick(){
	var date = new Date();
	var dateString = "" + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();


	var floatLong = parseFloat(longitudeTextField.value);
	var floatLat = parseFloat(latitudeTextField.value);

	// adds the data to both the job itself and the employees involved //
	var batch = db.batch();
	var docData = {
		name: jobCreateNameTextField.value,
		address: addressCreateTextField.value,
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
			createJobModal.style.display = "none";
		});
	}).catch(function(error){
		console.log("error" + error);
	});
	
}







