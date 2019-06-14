



var listOfSelectedEmployees = [];
var listOfEmployeesCreate = [];

// **** end of modal view variables **** //
var listView = document.getElementById("job-listview-div");
var listOfJobs = [];

var db = firebase.firestore();

window.addEventListener('DOMContentLoaded', function () {

	/*
	if(user != null){
		if(companyName != ""){
			loadEmployeesCreate(companyName);
		}
	}	
	*/

}, false);






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
	
	$("#employee-list-container ul").empty();

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

		
		$("#employee-list-container ul").append('<li id=' 
		+ uniqueIdentifier + ' onclick="createListItemOnClick(this)" data-icon="plus" class="employee-li"><a href="#" id="icon-' 
		+ uniqueIdentifier + '"><h2>' 
		+ firstName + ' ' 
		+ lastName + '</h2><p>Employee #: ' 
		+ employeeNumber + '</p><p class="ui-li-aside"><strong>Status: ' 
		+ statusToString + '</strong></p></a></li>');
	}
	// refreshing the list //
	$("#employee-list-container ul").listview('refresh');	
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