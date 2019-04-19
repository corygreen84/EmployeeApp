
/*
var originalTestArray = ["steve@hotmail.com", "corygreen@hotmail.com", "garygreen@hotmail.com", "eli@hotmail.com", "mo@yahoo.com", "nChavez@hotmail.com", "leroy@hotmail.com", "lars@hotmail.com"];
var updatedTestArray = ["eli@hotmail.com", "lars@hotmail.com", "gary@hotmail.com"];


// **** this is only for testing purposes **** //
window.addEventListener('DOMContentLoaded', function () {

	var returnCheckDifference = checkDifferenceBetweenTwoArrays(originalTestArray, updatedTestArray);
	for(var i in returnCheckDifference){
		console.log("theres a few in here " + i);
	}
	
}, false);


*/
// returns a dictionary containing the ones that should be deleted, //
// the ones that should be added and the ones that stay the same //
function checkDifferenceBetweenTwoArrays(_originalArray, _updatedArray){

	let tempArrayOfOriginalEmailsToDelete = _originalArray;
	let tempArrayOfUpdatedEmailsToAdd = _updatedArray;
	let tempArrayOfSameEmails = [];

	let returnDictionary = {};

	
	// going through and seeing what is the same out of the updated array compared to the original //
	for(var original in _originalArray){
		for(var updated in _updatedArray){
			if(_originalArray[original] == _updatedArray[updated]){
				tempArrayOfSameEmails.push(_originalArray[original]);
			}
		}
	}

	// going through the original array and getting whats already in the updated array //
	// this is the to be deleted list of emails //
	for(var k in tempArrayOfOriginalEmailsToDelete){
		for(var l in tempArrayOfSameEmails){
			if(tempArrayOfOriginalEmailsToDelete[k] == tempArrayOfSameEmails[l]){
				tempArrayOfOriginalEmailsToDelete.splice(k, 1);
			}
		}
	}

	for(var m in tempArrayOfSameEmails){
		for(var n in tempArrayOfUpdatedEmailsToAdd){
			if(tempArrayOfUpdatedEmailsToAdd[n] == tempArrayOfSameEmails[m]){
				tempArrayOfUpdatedEmailsToAdd.splice(n, 1);
			}
		}
	}

	returnDictionary["originalsToDelete"] = tempArrayOfOriginalEmailsToDelete;
	returnDictionary["updatedToAdd"] = tempArrayOfUpdatedEmailsToAdd;
	returnDictionary["same"] = tempArrayOfSameEmails;
	
	/*
	for(var i in tempArrayOfSameEmails){
		console.log("same " + tempArrayOfSameEmails[i]);
	}

	for(var j in tempArrayOfOriginalEmailsToDelete){
		console.log("deleted " + tempArrayOfOriginalEmailsToDelete[j]);
	}

	for(var o in tempArrayOfUpdatedEmailsToAdd){
		console.log("added " + tempArrayOfUpdatedEmailsToAdd[o]);
	}
	*/

	return returnDictionary;
	
}

