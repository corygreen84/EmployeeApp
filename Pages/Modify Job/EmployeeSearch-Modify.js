

var listOfSelectedEmployees = [];
var listOfEmployeesModify = [];

// **** end of modal view variables **** //
var listView = document.getElementById("job-listview-div");
var listOfJobs = [];

var db = firebase.firestore();

window.addEventListener('DOMContentLoaded', function () {

}, false);



// brings up all the employees for this company //
function loadEmployeesModify(companyName){
	
	listOfEmployeesModify = [];

	var companyRef = db.collection('companies').doc(companyName).collection('employees');
	companyRef.onSnapshot(function(querySnapshot){

		var data = querySnapshot.docs.map(function(documentSnapshot){
		listOfEmployeesModify = [];

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

				listOfEmployeesModify.push(newEmployeeObject);
			}
		}
		parseEmployeesAndAddToListViewModify();

	});
}


// shows all the possible employees for this company in the modify job panel //
function parseEmployeesAndAddToListViewModify(){
	
	$("#employee-list-container ul").empty();

	for(var j = 0; j < listOfEmployeesModify.length; j++){
		
		var firstName = listOfEmployeesModify[j].first;
		var lastName = listOfEmployeesModify[j].last;
		var employeeNumber = listOfEmployeesModify[j].employeeNumber;
		var status = listOfEmployeesModify[j].status;
		var uniqueIdentifier = listOfEmployeesModify[j].uniqueId;
		var statusToString = "";
		if(status == true){
			statusToString = "Available";
		}else{
			statusToString = "Not Available";
		}

		
		$("#employee-list-container ul").append('<li id=' 
		+ uniqueIdentifier + ' onclick="modifyListItemOnClick(this)" data-icon="plus" class="employee-li"><a href="#" id="icon-' 
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
function modifyListItemOnClick(item){

	if($('#icon-' + item.id).hasClass('ui-icon-plus') == true){
		$('#icon-' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');

		for(var l = 0; l < listOfEmployeesModify.length; l++){
			if(listOfEmployeesModify[l].uniqueId == item.id){
				listOfSelectedEmployees.push(listOfEmployeesModify[l]);
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


function loadEmployeesToToggle(employees){
	// dictionary for this job holds the unique ids for each employee //
	var listOfEmployeeNumbersToBeMinused = [];
	for(var i in listOfEmployeesModify){
		for(var j in dictionaryOfEmployeesForThisJob){
			if(dictionaryOfEmployeesForThisJob[j] == listOfEmployeesModify[i].uniqueId){
				listOfEmployeeNumbersToBeMinused.push(listOfEmployeesModify[i].uniqueId);
			}
		}
	}

	for(var h in listOfEmployeeNumbersToBeMinused){
		$('#icon--' + listOfEmployeeNumbersToBeMinused[h]).removeClass('ui-icon-plus').addClass('ui-icon-minus');
	}	
}




/*

function changePlusToMinusOnEmployees(){


	// dictionary for this job holds the unique ids for each employee //
	var listOfEmployeeNumbersToBeMinused = [];
	for(var i in listOfEmployeesModify){
		for(var j in dictionaryOfEmployeesForThisJob){
			if(dictionaryOfEmployeesForThisJob[j] == listOfEmployeesModify[i].uniqueId){
				listOfEmployeeNumbersToBeMinused.push(listOfEmployeesModify[i].uniqueId);
			}
		}
	}

	for(var h in listOfEmployeeNumbersToBeMinused){
		$('#icon--' + listOfEmployeeNumbersToBeMinused[h]).removeClass('ui-icon-plus').addClass('ui-icon-minus');
	}
}

*/

