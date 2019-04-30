
var _user;
var _companyName;
var _username;

var activeNav = "JobsPage";

window.addEventListener('DOMContentLoaded', function () {

	toggleHighlightedNav();

	var mainBody = document.getElementById("main-body");
	mainBody.hidden = true;
	
	firebase.auth().onAuthStateChanged(function(user){
		
		if(!user){
			window.location.href = "/Employee/index.html";
		}else{
			mainBody.hidden = false;
			
			_user = user;
			bringUpUserCompanyName(_user.email);
			
			document.getElementById("frame-object").data = "/Employee/Pages/Jobs/Jobs.html";
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
	}else if(event.target.id == "JobsPage"){
		activeNav = "JobsPage";
		objectElement.data = "/Employee/Pages/Jobs/Jobs.html";
	}else if(event.target.id == "EmployeesPage"){
		activeNav = "EmployeesPage";
		objectElement.data = "/Employee/Pages/Employees/Employees.html";
	}else if(event.target.id == "ReportsPage"){
		activeNav = "ReportsPage";
		objectElement.data = "/Employee/Pages/Reports.html";
	}else if(event.target.id == "PayPage"){
		activeNav = "PayPage";
		objectElement.data = "/Employee/Pages/Pay-Period.html";
	}else if(event.target.id == "CommunicationPage"){
		activeNav = "CommunicationPage";
		objectElement.data = "/Employee/Pages/Communication.html";
	}

	toggleHighlightedNav();
}



function toggleHighlightedNav(){

	var navItems = document.getElementsByClassName("a nav-item");
	for(var i in navItems){
		if(navItems[i].id != undefined){
			navItems[i].style.backgroundColor = "#0080ff";
		}
	}
	
	
	document.getElementById(activeNav).style.backgroundColor = "#FF7F50";
	

	
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

