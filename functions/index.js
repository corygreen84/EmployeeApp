const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// **** when we get a write to the employees section of the job, we need to also update the employee with the job data **** //
// **** user modifies the employees on the job, the job then notifies the employees as to what job they have **** //
exports.updateUser = functions.firestore.document('companies/{company}/{jobs}/{job}').onUpdate((change, context) =>{

    var company = context.params.company;
	var job = context.params.job;

    var employeeBeforeChange = change.before.data();
    var employeeAfterChange = change.after.data();
	
	var db = admin.firestore();
	var returnedData = checkDifferenceBetweenTwoArrays(employeeBeforeChange["employees"], employeeAfterChange["employees"]);
	
	var deletedEmployees = returnedData["delete"];
	var addedEmployees = returnedData["add"];

	

	// if the job has been deleted, then I need to take the job away from the employee //


	// going through and removing the employees //
	for(var i in deletedEmployees){
		var dbD = db.doc('companies/' + company + '/employees/' + deletedEmployees[i]);

		dbD.update({
			jobs: admin.firestore.FieldValue.arrayRemove(job)
		});
	}



	// going through and adding the employees //
	for(var j in addedEmployees){
		var dbDoc = db.doc('companies/' + company + '/employees/' + addedEmployees[j]);
		

		dbDoc.update({
			jobs: admin.firestore.FieldValue.arrayUnion(job)
		});
	}

	return 0;
});




// deleting the employees associated with this job //
exports.deleteUser = functions.firestore.document('companies/{company}/{jobs}/{job}').onDelete((change, context) =>{

	const deletedValue = change.data();
	var db = admin.firestore();

	var company = context.params.company;
	var job = context.params.job;

	var employees = deletedValue["employees"];
	

	for(var k in employees){
		var dbD = db.doc('companies/' + company + '/employees/' + employees[k]);

		dbD.update({
			jobs: admin.firestore.FieldValue.arrayRemove(job)
		});
	}
	return 0;
});





// when a job is created, this gets notified and adds the job to the employees //
exports.createUser = functions.firestore.document('companies/{company}/{jobs}/{job}').onCreate((change, context) =>{

	var db = admin.firestore();
	var company = context.params.company;
	var job = context.params.job;

	const addedValue = change.data();

	var employees = addedValue["employees"];

	for(var k in employees){
		var dbD = db.doc('companies/' + company + '/employees/' + employees[k]);

		dbD.update({
			jobs: admin.firestore.FieldValue.arrayUnion(job)
		});
	}

	return 0;
});




















// checking the difference in dictionaries //
function checkDifferenceBetweenTwoArrays(_originalArray, _updatedArray){

	let tempArrayOfOriginalEmailsToDelete = _originalArray;
	let tempArrayOfUpdatedEmailsToAdd = _updatedArray;
	let tempArrayOfSameEmails = [];

	let returnDictionary = {};

	
	// going through and seeing what is the same out of the updated array compared to the original //
	for(var original in _originalArray){
		for(var updated in _updatedArray){
			if(_originalArray[original] === _updatedArray[updated]){
				tempArrayOfSameEmails.push(_originalArray[original]);
			}
		}
	}

	// going through the original array and getting whats already in the updated array //
	// this is the to be deleted list of emails //
	for(var k in tempArrayOfOriginalEmailsToDelete){
		for(var l in tempArrayOfSameEmails){
			if(tempArrayOfOriginalEmailsToDelete[k] === tempArrayOfSameEmails[l]){
                delete tempArrayOfOriginalEmailsToDelete[k];
			}
		}
	}

	for(var m in tempArrayOfSameEmails){
		for(var n in tempArrayOfUpdatedEmailsToAdd){
			if(tempArrayOfUpdatedEmailsToAdd[n] === tempArrayOfSameEmails[m]){
                delete tempArrayOfUpdatedEmailsToAdd[n];
			}
		}
	}

	returnDictionary["delete"] = tempArrayOfOriginalEmailsToDelete;
	returnDictionary["add"] = tempArrayOfUpdatedEmailsToAdd;
	returnDictionary["same"] = tempArrayOfSameEmails;

	return returnDictionary;
	
}




