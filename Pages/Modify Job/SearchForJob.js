

var db = firebase.firestore();

function searchForJob(job, company){

	var jobRef = db.collection('companies').doc(company).collection('jobs').doc(job)
	jobRef.get().then(function(querySnapshot){
		
		var data = querySnapshot.docs.map(function(documentSnapshot){
		
		return documentSnapshot.data();
	});	

	for(var info in data){
		console.log("data -> " + data[info]);
	}
	/*
	for(var i = 0; i < data.length; i++){
		if(data[i].first != undefined && data[i].last != undefined && data[i].employeeNumber != undefined && data[i].status != undefined && data[i].phoneNumber != undefined && data[i].email != undefined && data[i].id != undefined){
			var newEmployeeObject = new Employees();
			newEmployeeObject.first = data[i].first;
			newEmployeeObject.last = data[i].last;
			newEmployeeObject.employeeNumber = data[i].employeeNumber;
			newEmployeeObject.status = data[i].status;
			newEmployeeObject.phone = data[i].phoneNumber;
			newEmployeeObject.email = data[i].email;
			newEmployeeObject.uniqueId = data[i].id;

			listOfEmployeesCreate.push(newEmployeeObject);
		}
	}
	*/
	
});

	
}

function parseJobInfo(){

}