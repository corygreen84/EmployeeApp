

var db = firebase.firestore();

var nameLabel = document.getElementById("name-label");
var employeeNumberLabel = document.getElementById("employee-number-label");

var liveViewDiv = document.getElementById("employee-live-view-div");
var reportViewDiv = document.getElementById("employee-report-view-div");

var liveViewButton = document.getElementById("live-view-button");
var reportViewButton = document.getElementById("report-view-button");

var selectedEmployee;


// regardless of what viewing options the user requests, this still gets called first //
function loadEmployeeHistory(id){
	
	selectedEmployee = listOfEmployees[id];

	// this is the default view //
	getEmployeeLiveHistory(listOfEmployees[id]);

	nameLabel.innerHTML = listOfEmployees[id].first + " " + listOfEmployees[id].last;
	employeeNumberLabel.innerHTML = "Employee #: " + listOfEmployees[id].employeeNumber;

	liveViewDiv.style.display = "block";
	reportViewDiv.style.display = "none";

	$('#report-view-button').removeClass("ui-btn-active");
	$('#live-view-button').addClass("ui-btn-active");
}


function liveViewListOnClick(){
	liveViewDiv.style.display = "block";
	reportViewDiv.style.display = "none";
	getEmployeeLiveHistory(selectedEmployee);
}


function reportViewOnClick(){
	liveViewDiv.style.display = "none";
	reportViewDiv.style.display = "block";
	$("#main-area ul").empty();
}








function getEmployeeLiveHistory(employee){
	var employeeRef = db.collection('companies').doc(companyName).collection('employees').doc(employee.uniqueId);
	employeeRef.onSnapshot(function(doc){
		var docData = doc.data();

		var history = docData.jobHistory;
		parseEmployeeHistory(history);
	});
}




function parseEmployeeHistory(history){

	$("#employee-live-view-ul").empty();

	var listViewUl = $("#employee-live-view-ul");

	for(var h in history){
		var convertedString = convertStringToJSONData("[" + history[h] + "]");
		var jsonData = JSON.parse(convertedString);

		for(var i in jsonData){

			var jobDate = jsonData[i].date;
			var jobTime = jsonData[i].time;
			var jobAddress = jsonData[i].jobAddress;
			var jobName = jsonData[i].jobName;

			var dataTheme = "";
			if(jobName == "Logged In" || jobName == "Logged Off"){
				dataTheme = 'data-theme="b"';
			}else{
				dataTheme = 'data-theme="a"';
			}

			var secondaryLi = $('<li '+ dataTheme +'><a href="#"><h3>' + jobName + '</h3><p><strong>' + jobAddress + '</strong></p><p class="ui-li-aside">' + jobDate + ' @ ' + jobTime + '</p></a></li>');
			listViewUl.append(secondaryLi);
			
		}
		
	}
	//$("#employee-live-view-ul").trigger("create");
	$("#employee-live-view-ul").listview().listview('refresh');
}


function convertStringToJSONData(textString){
	var tempString = textString;
	var regExp = new RegExp("\\\\", "g");
	var replaceDash = tempString.replace(regExp, "");
	
	return replaceDash;
}








