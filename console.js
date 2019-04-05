
var _user;
var _companyName;
var _username;



window.addEventListener('DOMContentLoaded', function () {

	var mainBody = document.getElementById("main-body");
	mainBody.hidden = true;
	
	firebase.auth().onAuthStateChanged(function(user){
		
		if(!user){
			window.location.href = "/Employee/index.html";
		}else{
			mainBody.hidden = false;
			
			_user = user;
			bringUpUserCompanyName(_user.email);
			
			document.getElementById("frame-object").data = "/Employee/Pages/Jobs.html";
		}
	});
}, false);


function showDropDown(){
	document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
	
	var objectElement = document.getElementById("frame-object");
	if(event.target.id == "0"){
		document.getElementById("myDropdown").classList.toggle("show");
	}else if(event.target.id == "1"){
		document.getElementById("myDropdown").classList.toggle("show");
		loginOffOnClick();
	}else if(event.target.id == "2"){
		objectElement.data = "/Employee/Pages/Jobs.html";
	}else if(event.target.id == "3"){
		objectElement.data = "/Employee/Pages/Employees/Employees.html";
	}else if(event.target.id == "4"){
		objectElement.data = "/Employee/Pages/Reports.html";
	}else if(event.target.id == "5"){
		objectElement.data = "/Employee/Pages/Pay-Period.html";
	}else if(event.target.id == "6"){
		objectElement.data = "/Employee/Pages/Communication.html";
	}
}



// brings up the username and company for use on the page itself //
function bringUpUserCompanyName(email){
	var db = firebase.firestore();
	
	var docRef = db.collection("admin").doc(email);
	docRef.get().then(function(doc){
		if(doc.exists){
			
			_companyName = doc.data().company;
			_username = doc.data().username;
			
			var title = document.getElementById("title-label");
			var username = document.getElementById("user-name");
			
			title.innerHTML = _companyName.toString();
			username.innerHTML = _username.toString();
		}
	}).catch(function(error){
		console.log("error getting document: " + error);
	});
}

function profileOnClick(){
	console.log("profile clicked");
}





function loginOffOnClick(){
	firebase.auth().signOut().then(function() {
		window.location.href = "/Employee/index.html";
	}).catch(function(error) {
		console.log("error signing out...");
	});
}

