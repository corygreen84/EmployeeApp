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


// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	createButton.disabled = true;
	
}, false);



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

// displaying the modal view //
window.onclick = function(event) {
	if (event.target == modal || event.target == modifyModal) {
	  
		console.log("clicked elsewhere");
		modal.style.display = "none";
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






