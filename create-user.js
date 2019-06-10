
var emailFilledIn = false;
var passwordGoodToGo = false;
var usernameFilledIn = false;
var companyFilledIn = false;


// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	document.getElementById("submit-button-create").disabled = true;
	document.getElementById("email-field-create").value = "";
	document.getElementById("username-field-create").value = "";
	document.getElementById("password-field-create").value = "";
	document.getElementById("company-field-create").value = "";

}, false);





function emailOnChangeCreate(){
	var emailValue = document.getElementById("email-field-create").value;
	var containsAtSymbol = false;
	var containsDotSymbol = false;
	if(emailValue.indexOf('@') > -1){
		containsAtSymbol = true;
	}
	
	if(emailValue.indexOf('.') > -1){
		containsDotSymbol = true;
	}
	
	if(containsAtSymbol == true && containsDotSymbol == true){
		emailFilledIn = true;
	}else{
		emailFilledIn = false;
	}
	
	toggleCreateAccountButton();
}


function passwordOnChangeCreate(){
	var passwordValue = document.getElementById("password-field-create").value;
	if(passwordValue != ""){
		passwordGoodToGo = true;
	}else{
		passwordGoodToGo = false;
	}
	toggleCreateAccountButton();
}


function companyOnChangeCreate(){
	var companyValue = document.getElementById("company-field-create").value;
	if(companyValue != ""){
		companyFilledIn = true;
	}else{
		companyFilledIn = false;
	}
	toggleCreateAccountButton();
}


function usernameOnChangeCreate(){
	var usernameValue = document.getElementById("username-field-create").value;
	if(usernameValue != ""){
		usernameFilledIn = true;
	}else{
		usernameFilledIn = false;
	}
	toggleCreateAccountButton();
}


function toggleCreateAccountButton(){
	var loginButton = document.getElementById("submit-button-create");
	if(emailFilledIn == true && passwordGoodToGo == true && usernameFilledIn == true && companyFilledIn == true){
		loginButton.disabled = false;
	}else{
		loginButton.disabled = true;
	}
}





// creating an account //
function createOnClick(){
	
	var email = document.getElementById("email-field-create").value;
	var password = document.getElementById("password-field-create").value;
	var username = document.getElementById("username-field-create").value;
	var company = document.getElementById("company-field-create").value;
	
	var db = firebase.firestore();
	if(db != null){
		
		var companyRef = db.collection("companies").doc(company).collection("jobs");
		companyRef.get().then(function(querySnapshot){
			var exists = false;
			querySnapshot.forEach(function(doc){
				exists = true;
			});
			
			if(exists){
				let confirmOk = confirm("The company already exists.  Please check again.");
				if(confirmOk){
					window.location.href = "index.html";
				}
			}else{
				// creates the user in the central database first the auth //
				firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
		
					// if there is a problem with creating an account such as the user already exists ... //
					var errorMessage = error.message;
					let confirmOk = confirm(errorMessage);
					if(confirmOk){
						window.location.href = "index.html";
					}
				});
	
				firebase.auth().onAuthStateChanged(function(user){
					if(user){
						createUserInDatabase(email, username, company, user);
					}else{
						console.log("User logged out");
					}
				});
			}
		}).catch(function(error){
			console.log("error -> " + error);
		});
	}else{
		console.log("db is null");
	}
		
}


function createUserInDatabase(email, username, company, user){
	var db = firebase.firestore();
	if(db != null){
		// checking to see if the document already exists in the database //
		var emailRef = db.collection("admin").doc("" + email);
		emailRef.get().then(function(doc){
			if(!doc.exists){
				db.collection("admin").doc(email).set({
					company: company,
					email: email,
					username: username
				}).then(function(){
					if(user.emailVerified == false){
						// once this is all done, we send out the email verification... only if this is the first time //
						createCompanyInDatabase(user, company);
					}
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
		});
	}
}


function createCompanyInDatabase(user, companyName){

	var db = firebase.firestore();
	if(db != null){

		let batch = db.batch();
		var companyNameRef = db.collection("companies").doc(companyName);
		batch.set(companyNameRef,{});

		let newBatch = db.batch();

		batch.commit().then(function(){
			db.collection("companies").doc(companyName).collection("employees").add({

			}).then(function(){
				console.log("good to go");
			}).catch(function(err){
				console.log("errorrrrrrrr", err);
			});
			
		});

		/*
		db.collection("companies").doc(companyName).set({

		}).then(function(){
			
		}).catch(function(error){
			console.log("nothing to add");
		});
		*/

		/*
		db.collection("companies").doc(companyName).collection("employees").add({
			
		}).then(function(event){
			db.collection("companies").doc(companyName).collection("jobs").add({
				
			}).then(function(event){
				sendOutEmailVerification(user);
			}).catch(function(error){
				
			});
		}).catch(function(error){
			
		});
		*/
	}
	
}







function sendOutEmailVerification(user){
	user.sendEmailVerification().then(function(){
		let confirmOk = confirm("Please check your email address for an email verification link. Then, login once you have verified your email address.");
		if(confirmOk){
			
			logOutUser();
		}
	}).catch(function(error){
		console.log("error -> " + error);	
	});
}



function logOutUser(){
	firebase.auth().signOut().then(function() {
		window.location.href = "index.html";
	}).catch(function(error) {
		console.log("error signing out..." + error);
	});
	
}


function backOnClick(){
	window.location.href = "index.html";
}
  

