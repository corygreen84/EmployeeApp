// **** this is for the modal view variables **** //
var spanModal = document.getElementsByClassName("closeModal")[0];
var modifyModal = document.getElementById('modify-employee-modal-box');

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

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	createButton.disabled = true;
	
}, false);






spanModal.onclick = function(){
	modifyModal.style.display = "none";
}



// displaying the modal view //
window.onclick = function(event) {
	if (event.target == modal || event.target == modifyModal) {
		modifyModal.style.display = "none";
	}
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
		modifyModal.style.display = "none";
	}).catch(function(error){
		console.log("error");
	});
}



function deleteOnClick(){
	db.collection('companies').doc(companyName).collection('employees').doc(employee.email).delete()
	.then(function(){
		// removing the display //
		modifyModal.style.display = "none";
	}).catch(function(error){
		console.log("error " + error);
		modifyModal.style.display = "none";
	});
}




