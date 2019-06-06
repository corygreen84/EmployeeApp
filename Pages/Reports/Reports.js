

var db = firebase.firestore();

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	checkState();

	
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
					loadEmployeeData(user, companyName);
				}).then(function(){
					
				}).catch(function(error){
					console.log("something happened. " + error);
				});
			}
			
		}else{
			
		}
	});
}



function loadEmployeeData(user, companyName){
	
	var empRef = db.collection('companies').doc(companyName).collection('employees');
	empRef.onSnapshot(function(querySnapshot){
		var employees = [];
		var data = querySnapshot.docs.map(function(documentSnapshot){

			return documentSnapshot.data();
		});


		for(var d in data){
			
			if(data[d].first != undefined || data[d].last != undefined){
				var newEmployee = new Employees()
				newEmployee.first = data[d].first;
				newEmployee.last = data[d].last;
				newEmployee.employeeNumber = data[d].employeeNumber;
				newEmployee.status = data[d].status;
				newEmployee.email = data[d].email;
				newEmployee.phone = data[d].phone;
				newEmployee.uniqueId = data[d].uniqueId;
				newEmployee.jobHistory = data[d].jobHistory;

				employees.push(newEmployee);
			}
			
		};

		parseEmployeeData(employees);
		
	});
}



function parseEmployeeData(employees){
	$("#main-list-view-div").empty();

	var listView = $("#main-list-view-div");
	
	// getting the main list //
	for(var e in employees){
		var name = "" + employees[e].first + " " + employees[e].last;
		var employeeNumber = employees[e].employeeNumber;
		var employeeEmail = employees[e].email;


		
		if(employees[e].jobHistory != ""){
			convertStringToJSONData(employees[e].jobHistory);
			//var jsonData = JSON.parse(employees[e].jobHistory);
			
		}
		// employee history has changed.  It is now just a data string that I need to pull appart //
		/*
		var employeeHistory = employees[e].jobHistory;
		console.log(employeeHistory);
		var jsonData = JSON.parse(employeeHistory);
		console.log(jsonData);
		*/

		/*
		// creating the first level div //
		var firstDiv = $('<div>', {"data-role":"collapsible"});
		listView.append(firstDiv);

		// creating the title for the collapsing item //
		var nameOfCollapse = $('<h2>'+ name + ' # ' + employeeNumber + ' - ' + employeeEmail + '</h2>');
		firstDiv.append(nameOfCollapse);

		
		// creating an unordered list //
		var secondLevelUl = $('<ul>', {"data-role":"listview", "data-theme": "a", "class":"scrollable secondLevelUl"});
		firstDiv.append(secondLevelUl);

		for(var eh in employeeHistory){


			var jobString = employeeHistory[eh];
			//convertStringToJSONData(jobString);
			console.log(jobString);

			


			var jobDate = employeeHistory[eh].date;
			var jobTime = employeeHistory[eh].time;
			var jobAddress = employeeHistory[eh].jobAddress;
			var jobName = employeeHistory[eh].jobName;

			var dataTheme = "";
			if(jobName == "Logged In" || jobName == "Logged Off"){
				dataTheme = 'data-theme="b"';
			}else{
				dataTheme = 'data-theme="a"';
			}

			var secondaryLi = $('<li '+ dataTheme +'><a href="#"><h3>' + jobName + '</h3><p><strong>' + jobAddress + '</strong></p><p class="ui-li-aside">' + jobDate + ' @ ' + jobTime + '</p></a></li>');
			secondLevelUl.append(secondaryLi);
			
		}
		*/
	}
	$("#main-list-view-div").trigger("create");	
}


function convertStringToJSONData(textString){
	var tempString = textString;
	var replaceDash = tempString.replace(/\\/g, "");
	
	console.log(tempString);
}




// employee on click //
function employeeReportOnClick(){

}

// job on click //
function jobReportOnClick(){
	
}


// creating the job class //
class Employees{
	constructor(){
		var first;
		var last;
		var employeeNumber;
		var status;
		var email;
		var phone;
		var uniqueId;
		var jobHistory;
	}
}

class Jobs{
	constructor(){
		var name;
		var address;
		var lat;
		var long;
		var employees;
		var date;
		var jobId;
	}
}






