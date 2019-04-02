

/* **** this is for the modal view **** */
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('create-new-job-modal-box');

var createButton = document.getElementById("create-button");

var jobNameTextField = document.getElementById("job-name-text");
var addressTextField = document.getElementById("address-text");

var nameTextFilled = false;
var addressTextFilled = false;


var companyName = "";
var listOfEmployees = [];

var db = firebase.firestore();



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	listOfEmployees = [];
	
	checkState();
	
	createButton.disabled = true;
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
					
					// from this, we load the employees and the jobs tied to this company //
					loadJobs(user, companyName);
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
			companyRef.get().then(function(querySnapshot){
				
				var data = querySnapshot.docs.map(function(documentSnapshot){
					
					return documentSnapshot.data();
				});	
				
				for(var i = 0; i < data.length; i++){
					var newEmployeeObject = new Employees();
					newEmployeeObject.first = data[i].first;
					newEmployeeObject.last = data[i].last;
					newEmployeeObject.employeeNumber = data[i].employeeNumber;
					newEmployeeObject.status = data[i].status;
					
					listOfEmployees.push(newEmployeeObject);
				}
				
				parseEmployeesAndAddToListView();
			});
		}
	}else{
			
	}
}



function parseEmployeesAndAddToListView(){
	
	for(var j = 0; j < listOfEmployees.length; j++){
		console.log("refreshing");
		$("#employee-list-div ul").append('<li><a href="#"><h2>Gary Green</h2><p>Employee #:3413565</p><p class="ui-li-aside"><strong>Status: Available</strong></a></li>');
		//$("employee-ul").append('<li>');
	}

	$("#employee-list-div ul").listview('refresh');

/*

<li><a href="#">
	<h2>Cory Green</h2>
	<p>Employee #:324129</p>
	<p class="ui-li-aside"><strong>Status: Available</strong></p>
							
</a></li>

*/	
}


function loadJobs(user, companyName){
	
}


// **** modal popup stuff **** //
function createNewJobOnClick(){
	modal.style.display = "block";
}

span.onclick = function(){
	modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

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


function toggleCreateButton(){
	if(nameTextFilled == true && addressTextFilled == true){
		createButton.disabled = false;
	}else{
		createButton.disabled = true;
	}
}


// adding all employees to the list //
function addAllOnClick(){
	console.log("in here fool");
}


// creation of the job //
function createButtonOnClick(){
	console.log("also in here...");
}




// creating the job class //
class Employees{
	constructor(){
		var first;
		var last;
		var employeeNumber;
		var status;
	}
}