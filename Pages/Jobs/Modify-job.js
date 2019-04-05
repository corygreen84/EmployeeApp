// **** this is for the modal view variables **** //
var modifyJobSpan = document.getElementsByClassName("modifyJobClose")[0];
var modifyJobModal = document.getElementById("modify-job-modal-box");

var modifyButton = document.getElementById("modify-job-button");
var deleteButton = document.getElementById("delete-job-button");

var jobNameTextField = document.getElementById("modify-job-name-text");
var addressTextField = document.getElementById("modify-address-text");

var nameTextFilled = false;
var addressTextFilled = false;

var job;

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	listOfEmployees = [];
	listOfSelectedEmployees = [];
	
	modifyButton.disabled = true;
	
}, false);



function mainJobListOnClick(item){
	console.log(item.id);
	modifyJobModal.style.display = "block";
	
	
}



// removing the modal view //
modifyJobSpan.onclick = function(){
	modifyJobModal.style.display = "none";
};


// **** closing the modal view is handled through Window-onclick.js **** //


// text change methods //
function modifyJobNameTextChange(){
	
}

function modifyAddressTextChange(){
	
}




// ending methods //
function modifyJobOnClick(){
	
}

function deleteJobOnClick(){
	
}
