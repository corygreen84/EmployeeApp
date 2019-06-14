

/* text entry variables */
var createJobNameTextField = document.getElementById("create-name-text");
var createJobAddressTextField = document.getElementById("create-address-text");
var createJobLongitudeTextField = document.getElementById("create-long-text");
var createJobLatitudeTextField = document.getElementById("create-lat-text");
var createJobNotes = document.getElementById("notes-textarea");

var createSearchButton = document.getElementById("create-address-search");
var createJobButton = document.getElementById("create-job-button");

var companyName = "";
var user;



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	createJobNameTextField.value = "";
	createJobAddressTextField.value = "";
	createJobLongitudeTextField.value = "";
	createJobLatitudeTextField.value = "";
	createJobNotes.value = "";

	createSearchButton.disabled = true;
	createJobButton.disabled = true;

	checkState();

}, false);



function checkState(){
	firebase.auth().onAuthStateChanged(function(user){

		// if the user is good to go, we need to pull their email address to get their company info //
		if(user){
			
			if(db != null){
				var emailRef = db.collection("admin").doc(user.email);
				emailRef.get().then(function(doc){
					
					console.log("user is not null");
					// getting the company name //
					companyName = doc.data().company;
					this.user = user;

				}).then(function(){
					
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
		}else{
			
		}
	});
}


function backButtonOnClick(){
	console.log("back button clicked");
}

function clearButtonOnClick(){
	createJobNameTextField.value = "";
	createJobAddressTextField.value = "";
	createJobLongitudeTextField.value = "";
	createJobLatitudeTextField.value = "";
	createJobNotes.value = "";

	createSearchButton.disabled = true;
	createJobButton.disabled = true;

	createAddressFilledIn = false;
	createNameFilledIn = false;
	createLongFilledIn = false;
	createLatFilledIn = false;
	createNotesFilledIn = false;
}


function createButtonOnClick(){

}