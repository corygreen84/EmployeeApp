// **** this is for the modal view variables **** //
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('create-new-employee-modal-box');

var firstName = document.getElementById("first-name-text");
var lastName = document.getElementById("last-name-text");
var email = document.getElementById("email-text");
var phone = document.getElementById("phone-text");
var employeeNumber = document.getElementById("employee-Number-text");

var createButton = document.getElementById("employee-create-button");

var firstNameFilled = false;
var lastNameFilled = false;
var emailFilled = false;
var phoneFilled = false;
var employeeNumberFilled = false;

// **** this is for the main area **** //
var db = firebase.firestore();

var companyName = "";
var listOfEmployees = [];

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	createButton.disabled = true;
	checkState();
	
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
					
					// from this, we load the employees //
					loadEmployees(user ,companyName);
				}).then(function(){
					
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
			
		}else{
			
		}
	});
}






function loadEmployees(user, companyName){
	if(user){
		if(db != null){

			var companyRef = db.collection('companies').doc(companyName).collection('employees');
			companyRef.onSnapshot(function(querySnapshot){
				
				$("#employee-listview-div ul").empty();
				
				listOfEmployees = [];
				
				var data = querySnapshot.docs.map(function(documentSnapshot){
					return documentSnapshot.data();
				});	
				
				for(var i = 0; i < data.length; i++){
					if(data[i].first != undefined && data[i].last != undefined && data[i].employeeNumber != undefined && data[i].status != undefined && data[i].phoneNumber != undefined && data[i].email != undefined){
						var newEmployeeObject = new Employees();
						newEmployeeObject.first = data[i].first;
						newEmployeeObject.last = data[i].last;
						newEmployeeObject.employeeNumber = data[i].employeeNumber;
						newEmployeeObject.status = data[i].status;
						newEmployeeObject.phone = data[i].phoneNumber;
						newEmployeeObject.email = data[i].email;


						listOfEmployees.push(newEmployeeObject);
					}
				}

				
				parseEmployeesAndAddToListView();
			});	
		}
	}
}



function parseEmployeesAndAddToListView(){
	
	for(var j = 0; j < listOfEmployees.length; j++){
		
		var firstName = listOfEmployees[j].first;
		var lastName = listOfEmployees[j].last;
		var employeeNumber = listOfEmployees[j].employeeNumber;
		var status = listOfEmployees[j].status;
		var statusToString = "";
		if(status == true){
			statusToString = "Available";
		}else{
			statusToString = "Not Available";
		}
		
		// appending the info to the modal views list view //
		$("#employee-listview-div ul").append('<li id=' + employeeNumber + ' onclick="listItemOnClick(this)"><a href="#" id="icon-' + employeeNumber + '"><h2>' + firstName + ' ' + lastName + '</h2><p>Employee #: ' + employeeNumber + '</p><p class="ui-li-aside"><strong>Status: ' + statusToString + '</strong></p></a></li>');
	}
	
	// refreshing the list //
	$("#employee-listview-div ul").listview('refresh');	
}

// creating the job class //
class Employees{
	constructor(){
		var first;
		var last;
		var employeeNumber;
		var status;
		var email;
		var phone;
	}
}

class Jobs{
	constructor(){
		var name;
		var address;
		var employees;
		var date;
	}
}






