
var emailFilledIn = false;


// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	
	// checking the state right away //
	checkState();
	
	document.getElementById("email-field").value = "";
	document.getElementById("password-field").value = "";
	
	var forgotPasswordButton = document.getElementById("forgot-password");
	var submitButton = document.getElementById("submit-button");
	
	
	forgotPasswordButton.disabled = true;
	submitButton.disabled = true;

}, false);





// this is just a simple check to make sure the email address is formatted somewhat correctly //
// logging in will also do a check to make sure the email address is correct //
function emailOnChange(){
	var emailValue = document.getElementById("email-field").value;
	var passwordButton = document.getElementById("forgot-password");
	var containsAtSymbol = false;
	var containsDotSymbol = false;
	if(emailValue.indexOf('@') > -1){
		containsAtSymbol = true;
	}
	
	if(emailValue.indexOf('.') > -1){
		containsDotSymbol = true;
	}
	
	if(containsAtSymbol == true && containsDotSymbol == true){
		passwordButton.disabled = false;
		emailFilledIn = true;
	}else{
		passwordButton.disabled = true;
		emailFilledIn = false;
	}
	
}


function passwordOnChange(){
	var passwordValue = document.getElementById("password-field").value;
	var createAccountButton = document.getElementById("create-account");
	var loginButton = document.getElementById("submit-button");
	if(passwordValue != "" && emailFilledIn == true){
		loginButton.disabled = false;
	}else{
		loginButton.disabled = true;
	}
}


// login in to an existing account //
function loginOnClick(){
	
	var email = document.getElementById("email-field").value;
	var password = document.getElementById("password-field").value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
		var errorMessage = error.message;
		let confirmOk = confirm(errorMessage);
		if(confirmOk){
			window.location.href = "/Employee/php/index.php";
		}
	});

}


function createUserAccountOnClick(){
	window.location.href = "/Employee/php/create-user.php";
}





// checking the state of the authorized user //
function checkState(){
	firebase.auth().onAuthStateChanged(function(user){
		
		if(user){
			if(user.emailVerified){
				window.location.href = "/Employee/php/console.php";
			}else{
				let confirmOk = confirm("Please follow the link sent via email to verify your email address");
				if(confirmOk){
					window.location.href = "/Employee/php/index.php";
				}
			}
		}
	});
}




function forgotPasswordOnClick(){
	var email = document.getElementById("email-field").value;
	
	firebase.auth().sendPasswordResetEmail(email).then(function(){
		let confirmOk = confirm("Please follow the link sent via email to reset your password.");
		if(confirmOk){
			window.location.href = "/Employee/php/index.php";
		}
	}).catch(function(error){
		let confirmOk = confirm(error);
		if(confirmOk){
			window.location.href = "/Employee/php/index.php";
		}
	});
}



