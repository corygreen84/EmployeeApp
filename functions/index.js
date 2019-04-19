const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


// **** when we get a write to the employees section of the job, we need to also update the employee with the job data **** //
// **** user modifies the employees on the job, the job then notifies the employees as to what job they have **** //
exports.updateUser = functions.firestore.document('companies/{company}/{jobs}/{job}').onUpdate((change, context) =>{
    //var email = change.after.data().email;
    
    var company = context.params.company;
    var job = context.params.job;

    var employeeBeforeChange = change.before.data();
    var employeeAfterChange = change.after.data();
    
    var returnedData = checkDifferenceBetweenTwoArrays(employeeBeforeChange, employeeAfterChange);

    for(var keys in returnedData){
        console.log(returnedData[keys]);
    }
});



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
                //tempArrayOfOriginalEmailsToDelete.splice(k, 1);
                delete tempArrayOfOriginalEmailsToDelete[k];
			}
		}
	}

	for(var m in tempArrayOfSameEmails){
		for(var n in tempArrayOfUpdatedEmailsToAdd){
			if(tempArrayOfUpdatedEmailsToAdd[n] === tempArrayOfSameEmails[m]){
                //tempArrayOfUpdatedEmailsToAdd.splice(n, 1);
                delete tempArrayOfUpdatedEmailsToAdd[k];
			}
		}
	}

	returnDictionary["delete"] = tempArrayOfOriginalEmailsToDelete;
	returnDictionary["add"] = tempArrayOfUpdatedEmailsToAdd;
	returnDictionary["same"] = tempArrayOfSameEmails;

	return returnDictionary;
	
}
