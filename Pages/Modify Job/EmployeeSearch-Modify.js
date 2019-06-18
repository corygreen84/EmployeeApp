

var listOfSelectedEmployees = [];
var listOfEmployeesModify = [];
var listOfOriginalEmployees = [];


// original employees is a list of all the employees that are originally attached to the job //
var dictionaryOfOriginalEmployees = {};

// modified employees are those employees that the user adds or removes from the original list //
var dictionaryOfModifiedEmployees = {};



// results of comparing the original list to the updated 
var resultsOfCheckingDifferencesInArrays = {};

// **** end of modal view variables **** //
var listView = document.getElementById("job-listview-div");
var listOfJobs = [];

var db = firebase.firestore();

window.addEventListener('DOMContentLoaded', function () {

}, false);



// brings up all the employees for this company //
function loadEmployeesModify(companyName, employees){
	
	//listOfEmployeesModify = [];
	listOfOriginalEmployees = [];

	var companyRef = db.collection('companies').doc(companyName).collection('employees');
	companyRef.onSnapshot(function(querySnapshot){

		var data = querySnapshot.docs.map(function(documentSnapshot){
		listOfEmployeesModify = [];

		dictionaryOfModifiedEmployees = {};
		dictionaryOfOriginalEmployees = {};
		dictionaryOfAllEmployees = {};

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
		parseEmployeesAndAddToListViewModify(employees);

	});
}


// shows all the possible employees for this company in the modify job panel //
function parseEmployeesAndAddToListViewModify(employeesToggle){
	
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

	loadEmployeesToToggle(employeesToggle);
}





function loadEmployeesToToggle(employees){

	for(var k in employees){
		dictionaryOfOriginalEmployees[employees[k]] = employees[k];
		dictionaryOfModifiedEmployees[employees[k]] = employees[k];
	}

	// dictionary for this job holds the unique ids for each employee //
	var listOfEmployeeNumbersToBeMinused = [];
	for(var i in listOfEmployeesModify){
		for(var j in employees){
			if(employees[j] == listOfEmployeesModify[i].uniqueId){
				listOfEmployeeNumbersToBeMinused.push(listOfEmployeesModify[i].uniqueId);
			}
		}
	}

	for(var h in listOfEmployeeNumbersToBeMinused){
		$('#icon-' + listOfEmployeeNumbersToBeMinused[h]).removeClass('ui-icon-plus').addClass('ui-icon-minus');
	}	
}







// with this function I want to be able to toggle the + and - buttons per row //
// and add/subtract it to the selected list //

function modifyListItemOnClick(item){

	console.log("change log 9");

	resultsOfCheckingDifferencesInArrays = {};

	if($('#icon-' + item.id).hasClass('ui-icon-plus') == true){
		$('#icon-' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');

		for(var l = 0; l < listOfEmployeesModify.length; l++){
			if(listOfEmployeesModify[l].uniqueId == item.id){
				//listOfSelectedEmployees.push(listOfEmployeesModify[l]);
				dictionaryOfModifiedEmployees[item.id] = listOfEmployeesModify[l].uniqueId;
			}
		}
	}else{
		$('#icon-' + item.id).removeClass('ui-icon-minus').addClass('ui-icon-plus');
			delete dictionaryOfModifiedEmployees[item.id];

	}

	// **** this section is for figuring out what has and hasnt been added to the job **** //
	
	var tempArrayOfEmployeesModify = [];
	var tempArrayOfOriginalEmployees = [];


	for(var mod in dictionaryOfModifiedEmployees){
		tempArrayOfEmployeesModify.push(dictionaryOfModifiedEmployees[mod]);
	}

	for(var orig in dictionaryOfOriginalEmployees){
		tempArrayOfOriginalEmployees.push(dictionaryOfOriginalEmployees[orig]);
	}

	// **** checking to see what is the same, what has been added and what has been deleted **** //
	resultsOfCheckingDifferencesInArrays = checkDifferenceBetweenTwoArrays(tempArrayOfOriginalEmployees, tempArrayOfEmployeesModify);
	
	var addedArray = resultsOfCheckingDifferencesInArrays["updatedToAdd"];
	var deletedArray = resultsOfCheckingDifferencesInArrays["originalsToDelete"];

	if(addedArray.length > 0 || deletedArray.length > 0){
		employeeListChanged = true;
	}else{
		employeeListChanged = false;
	}

	toggleModifyJobButton();

}



