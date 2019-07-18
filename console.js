
var _user;
var _companyName;
var _username;

var activeNav = "JobsPageDiv";


window.addEventListener('DOMContentLoaded', function () {

	toggleHighlightedNav();

	var mainBody = document.getElementById("main-body");
	mainBody.hidden = true;
	
	firebase.auth().onAuthStateChanged(function(user){
		
		if(!user){
			window.location.href = "index.html";
		}else{
			mainBody.hidden = false;
			
			_user = user;
			bringUpUserCompanyName(_user.email);
			
			//document.getElementById("frame-object").data = "/Employee/Pages/Jobs/Jobs.html";
			document.getElementById("frame-object").src = "Pages/Jobs/Jobs.html";
		}
	});

}, false);



window.onclick = function(event) {
	
	var objectElement = document.getElementById("frame-object");

	if(event.target.id == "0"){
		showDropDown();
	}else if(event.target.id == "1"){
		loginOffOnClick();

		showDropDown();
	}else if(event.target.id == "JobsPage"){
		activeNav = "JobsPageDiv";
		objectElement.src = "Pages/Jobs/Jobs.html";
	}else if(event.target.id == "EmployeesPage"){
		activeNav = "EmployeesPageDiv";
		objectElement.src = "Pages/Employees/Employees.html";
	}else if(event.target.id == "ReportsPage"){
		activeNav = "ReportsPageDiv";
		objectElement.src = "Pages/Reportscopy/Reports.html";
	}else if(event.target.id == "PayPage"){
		activeNav = "PayPageDiv";
		objectElement.src = "Pages/Pay-Period.html";
	}else if(event.target.id == "CommunicationPage"){
		activeNav = "CommunicationPageDiv";
		objectElement.src = "Pages/Communication.html";
	}

	toggleHighlightedNav();
}

function showDropDown(){
	document.getElementById("myDropdown").classList.toggle("show");
}





function toggleHighlightedNav(){

	var navItems = document.getElementsByClassName("side-nav-bar-div");
	for(var i in navItems){
		if(navItems[i].id != undefined){
			navItems[i].style.backgroundColor = "#525963";
		}
	}
	document.getElementById(activeNav).style.backgroundColor = "#0080ff";
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
			var username = document.getElementById("username-profile");
			
			title.innerHTML = _companyName.toString();
			username.innerHTML = _username.toString();
		}
	}).catch(function(error){
		console.log("error getting document: " + error);
	});
}





function loginOffOnClick(){
	firebase.auth().signOut().then(function() {

		localStorage.removeItem("id");
		localStorage.removeItem("name");
		
		window.location.href = "index.html";

	}).catch(function(error) {
		console.log("error signing out...");
	});
}

