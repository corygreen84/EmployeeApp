// **** this is for the modal view variables **** //
var span = document.getElementsByClassName("close")[0];
var spanModal = document.getElementsByClassName("closeModal")[0];
var modal = document.getElementById('create-new-employee-modal-box');
var modifyModal = document.getElementById('modify-employee-modal-box');

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



// **** this is for the modify data section **** //
var employee;

var modifyButton = document.getElementById("modify-button");

var modifyFirst = document.getElementById("modify-first-name-text");
var modifyLast = document.getElementById("modify-last-name-text");
var modifyEmail = document.getElementById("modify-email-text");
var modifyPhone = document.getElementById("modify-phone-text");
var modifyEmployeeNumber = document.getElementById("modify-employee-Number-text");

var firstModified = false;
var lastModified = false;
var emailModified = false;
var phoneModified = false;
var employeeNumberModified = false;


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








// **** this is for the modal popup **** //
function createEmployeeOnClick(){
	modal.style.display = "block";
	firstName.value = "";
	lastName.value = "";
	email.value = "";
	phone.value = "";
	employeeNumber.value = "";
	
	createButton.disabled = true;
}


// removing the modal view //
span.onclick = function(){
	modal.style.display = "none";
};

spanModal.onclick = function(){
	modifyModal.style.display = "none";
}



// displaying the modal view //
window.onclick = function(event) {
	if (event.target == modal || event.target == modifyModal) {
	  
		console.log("clicked elsewhere");
		modal.style.display = "none";
		modifyModal.style.display = "none";
	}
} 

// text field checks //
function firstNameTextChange(){
	if(firstName.value != ""){
		firstNameFilled = true;
	}else{
		firstNameFilled = false;
	}
	toggleCreateButton();
}

function lastNameTextChange(){
	if(lastName.value != ""){
		lastNameFilled = true;
	}else{
		lastNameFilled = false;
	}
	toggleCreateButton();
}

function emailTextChange(){
	var containsAtSymbol = false;
	var containsDotSymbol = false;
	if(email.value.indexOf('@') > -1){
		containsAtSymbol = true;
	}
	
	if(email.value.indexOf('.') > -1){
		containsDotSymbol = true;
	}
	
	if(containsAtSymbol == true && containsDotSymbol == true){
		emailFilled = true;
	}else{
		emailFilled = false;
	}
	toggleCreateButton();
}



function phoneTextChange(){
	if(phone.value != ""){
		phoneFilled = true;
	}else{
		phoneFilled = false;
	}
	toggleCreateButton();
}

function employeeNumberTextChange(){
	if(employeeNumber.value != ""){
		employeeNumberFilled = true;
	}else{
		employeeNumberFilled = false;
	}
	toggleCreateButton();
}



// toggling the create button //
function toggleCreateButton(){
	if(firstNameFilled == true && lastNameFilled == true && emailFilled == true && phoneFilled == true && employeeNumberFilled == true){
		createButton.disabled = false;
	}else{
		createButton.disabled = true;
	}
}





// creation of the Employee //
function createEmployeeButtonOnClick(){
	var docData = {
		first:firstName.value,
		last: lastName.value,
		email: email.value,
		phoneNumber: parseInt(phone.value, 10),
		employeeNumber: parseInt(employeeNumber.value, 10),
		status: false
	}
	
	
	db.collection('companies').doc(companyName).collection('employees').doc(email.value).set(docData)
	.then(function(){
		// removing the display //
		modal.style.display = "none";
	}).catch(function(error){
		console.log("error");
	});
	
}

















// **** when the user clicks on an employee, a new modal view will come up **** //
function listItemOnClick(item){	
	// get the employee info from the main array of employees //
	for(var r = 0; r < listOfEmployees.length; r++){
		if(listOfEmployees[r].employeeNumber == item.id){
			employee = listOfEmployees[r];
		}
	}
	
	modifyButton.disabled = true;
	
	modifyFirst.value = employee.first;
	modifyLast.value = employee.last;
	modifyEmail.value = employee.email;
	modifyPhone.value = employee.phone;
	modifyEmployeeNumber.value = employee.employeeNumber;

	modifyModal.style.display = "block";
}



function modifyFirstNameTextChange(){
	if(modifyFirst.value != employee.first){
		firstModified = true;
	}else{
		firstModified = false;
	}
	toggleModifyButton();
}

function modifyLastNameTextChange(){
	if(modifyLast.value != employee.last){
		lastModified = true;
	}else{
		lastModified = false;
	}
	toggleModifyButton();
}

function modifyEmailTextChange(){
	if(modifyEmail.value != employee.email){
		emailModified = true;
	}else{
		emailModified = false;
	}
	toggleModifyButton();
}

function modifyPhoneTextChange(){
	if(modifyPhone.value != employee.phone){
		phoneModified = true;
	}else{
		phoneModified = false;
	}
	toggleModifyButton();
}

function modifyEmployeeNumberTextChange(){
	if(modifyEmployeeNumber.value != employee.employeeNumber){
		employeeNumberModified = true;
	}else{
		employeeNumberModified = false;
	}
	toggleModifyButton();
}


function toggleModifyButton(){
	if(firstModified == true || lastModified == true || emailModified == true || phoneModified == true || employeeNumberModified == true){
		modifyButton.disabled = false;
	}else{
		modifyButton.disabled = true;
	}
}



function modifyOnClick(){
	var docData = {
		first: modifyFirst.value,
		last: modifyLast.value,
		email: modifyEmail.value,
		phoneNumber: parseInt(modifyPhone.value, 10),
		employeeNumber: parseInt(modifyEmployeeNumber.value, 10),
		status: false
	}
	
	
	db.collection('companies').doc(companyName).collection('employees').doc(employee.email).set(docData)
	.then(function(){
		// removing the display //
		closeModal.style.display = "none";
	}).catch(function(error){
		console.log("error");
	});
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






