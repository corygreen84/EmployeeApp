// **** this is for the modal view variables **** //
var modifyEmployeeSpan = document.getElementsByClassName("modifyEmployeeModalClose")[0];
var modifyEmployeeModal = document.getElementById('modify-employee-modal-box');

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

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	createButton.disabled = true;
	
}, false);






modifyEmployeeSpan.onclick = function(){
	modifyEmployeeModal.style.display = "none";
}


// **** closing the modal view is handled through window-onclick.js **** //




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

	modifyEmployeeModal.style.display = "block";
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
	let confirmOk = confirm("Are you sure you want to modify this employee?");
	if(confirmOk){
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
			modifyEmployeeModal.style.display = "none";
		}).catch(function(error){
			console.log("error");
		});
	}
}



function deleteOnClick(){
	
	let confirmOk = confirm("Are you sure you want to delete this employee?");
	if(confirmOk){
		db.collection('companies').doc(companyName).collection('employees').doc(employee.email).delete()
		.then(function(){
			// removing the display //
			modifyEmployeeModal.style.display = "none";
		}).catch(function(error){
			console.log("error " + error);
			modifyEmployeeModal.style.display = "none";
		});
	}
}




