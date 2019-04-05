

// **** this is for the modal view variables **** //
var createJobSpan = document.getElementsByClassName("createJobClose")[0];
var createJobModal = document.getElementById("create-new-job-modal-box");

var createButton = document.getElementById("create-button");

var jobNameTextField = document.getElementById("job-name-text");
var addressTextField = document.getElementById("address-text");

var nameTextFilled = false;
var addressTextFilled = false;

var listOfSelectedEmployees = [];

// **** end of modal view variables **** //
var listView = document.getElementById("job-listview-div");
var listOfJobs = [];

var db = firebase.firestore();



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	listOfEmployees = [];
	listOfSelectedEmployees = [];

	createButton.disabled = true;
	
}, false);


function createNewJobOnClick(){
	createJobModal.style.display = "block";
	
	listOfSelectedEmployees = [];
	
	jobNameTextField.value = "";
	addressTextField.value = "";
	
	nameTextFilled = false;
	addressTextFilled = false;
	
	for(var n = 0; n < listOfEmployees.length; n++){
		$('#icon-' + listOfEmployees[n].employeeNumber).removeClass('ui-icon-minus').addClass('ui-icon-plus');
	}
	toggleCreateButton();
}


// removing the modal view //
createJobSpan.onclick = function(){
	createJobModal.style.display = "none";
};



// **** closing the modal view is handled through Window-onclick.js **** //



// text field checks //
function jobNameTextChange(){
	if(jobNameTextField.value != ""){
		nameTextFilled = true;
	}else{
		nameTextFilled = false;
	}
	toggleCreateButton();
}

function addressTextChange(){
	if(addressTextField.value != ""){
		addressTextFilled = true;
	}else{
		addressTextFilled = false;
	}
	toggleCreateButton();
}

// toggling the create button //
function toggleCreateButton(){
	if(nameTextFilled == true && addressTextFilled == true){
		createButton.disabled = false;
	}else{
		createButton.disabled = true;
	}
}




// with this function I want to be able to toggle the + and - buttons per row //
// and add/subtract it to the selected list //
function listItemOnClick(item){

	for(var l = 0; l < listOfEmployees.length; l++){

		if(listOfEmployees[l].employeeNumber == item.id){
			if(!listOfSelectedEmployees.includes(listOfEmployees[l])){

				listOfSelectedEmployees.push(listOfEmployees[l]);
				
				// change the button icon to be a minus symbol //
				$('#icon-' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');
			}else{
				// if list of selected employees does not include the passed in employee //
				// we need to remove it from the list //
				for(var m = 0; m < listOfSelectedEmployees.length; m++){
					if(listOfSelectedEmployees[m] === listOfEmployees[l]){
						listOfSelectedEmployees.splice(m, 1);
						
						// change the button icon to be a plus symbol //
						$('#icon-' + item.id).removeClass('ui-icon-minus').addClass('ui-icon-plus');
					}
				}
			}
		}
	}
}


// adding all employees to the list //
function addAllOnClick(){
	
	var addAllButton = $('#add-all');
	if(addAllButton.text() == "Add All"){
		
		// setting all the button icons to be - //
		for(var n = 0; n < listOfEmployees.length; n++){
			$('#icon-' + listOfEmployees[n].employeeNumber).removeClass('ui-icon-plus').addClass('ui-icon-minus');
		}

		listOfSelectedEmployees = listOfEmployees;		
		addAllButton.text("Remove All");
	}else{

		for(var n = 0; n < listOfEmployees.length; n++){
			$('#icon-' + listOfEmployees[n].employeeNumber).removeClass('ui-icon-minus').addClass('ui-icon-plus');
		}
		listOfSelectedEmployees = [];
		addAllButton.text("Add All");
	}
	$("#employee-list-div ul").listview('refresh');
}





// creation of the job //
function createButtonOnClick(){
	var tempListOfEmployeeEmails = [];
	var date = new Date();
	var dateString = "" + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
	console.log(dateString);
	for(var p = 0; p < listOfSelectedEmployees.length; p++){
		tempListOfEmployeeEmails.push(listOfSelectedEmployees[p].email);
	}
	
	var docData = {
		name:jobNameTextField.value,
		address: addressTextField.value,
		employees: tempListOfEmployeeEmails,
		date: dateString
	}
	
	
	db.collection('companies').doc(companyName).collection('jobs').add(docData)
	.then(function(){
		// removing the display //
		createJobModal.style.display = "none";
	}).catch(function(error){
		console.log("error");
	});
	
}






