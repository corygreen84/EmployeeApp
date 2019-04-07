

// **** this is for the modal view variables **** //
var createJobSpan = document.getElementsByClassName("createJobClose")[0];
var createJobModal = document.getElementById("create-new-job-modal-box");

var createButton = document.getElementById("create-job-button");

var jobCreateNameTextField = document.getElementById("create-name-text");
var addressCreateTextField = document.getElementById("create-address-text");

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
	
	jobCreateNameTextField.value = "";
	addressCreateTextField.value = "";
	
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
	console.log("job text -> " + jobCreateNameTextField.value);
	if(jobCreateNameTextField.value != ""){
		nameTextFilled = true;
	}else{
		nameTextFilled = false;
	}
	toggleCreateButton();
}

function addressTextChange(){
	
	if(addressCreateTextField.value != ""){
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

	if($('#icon-' + item.id).hasClass('ui-icon-plus') == true){
		$('#icon-' + item.id).removeClass('ui-icon-plus').addClass('ui-icon-minus');

		for(var l = 0; l < listOfEmployees.length; l++){
			if(listOfEmployees[l].employeeNumber == item.id){
				listOfSelectedEmployees.push(listOfEmployees[l]);
			}
		}
	}else{
		$('#icon-' + item.id).removeClass('ui-icon-minus').addClass('ui-icon-plus');

		for(var m = 0; m < listOfSelectedEmployees.length; m++){
			if(listOfSelectedEmployees[m] === listOfEmployees[l]){
				listOfSelectedEmployees.splice(m, 1);
				
				// change the button icon to be a plus symbol //
				$('#icon-' + item.id).removeClass('ui-icon-minus').addClass('ui-icon-plus');
			}
		}
	}
	/*
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
	*/
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
		name:jobCreateNameTextField.value,
		address: addressCreateTextField.value,
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






