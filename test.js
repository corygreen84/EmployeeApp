

var originalTestArray = ["corygreen@hotmail.com", "garygreen@hotmail.com", "eli@hotmail.com"];
var updatedArray = ["eli@hotmail.com"];


// **** this is only for testing purposes **** //
window.addEventListener('DOMContentLoaded', function () {

	checkDifferenceBetweenTwoArrays(originalTestArray, updatedArray);
	
}, false);




function checkDifferenceBetweenTwoArrays(_originalArray, _updatedArray){

	var whatHappened = 0;
	var returnDictionary = {};
	var DELETED = -1;
	var REARRANGED = 0;
	var ADDED = 1;

	// creating a dictionary that coincides with the email address given.  A -1 value means it was deleted, 0 means it was just rearranged, and 1 means it was added //
	if(_originalArray.length > _updatedArray.length){
		for(var originalKey in _originalArray){
			for(var updatedKey in _updatedArray){
				if(_originalArray[originalKey] == _updatedArray[updatedKey]){
					returnDictionary[originalKey] = REARRANGED;
				}else{
					returnDictionary[originalKey] = DELETED;
				}
			}
		}


		for(var things in returnDictionary){
			if(returnDictionary[things] == DELETED){
				whatHappened = DELETED;
			}else{
				whatHappened = ADDED;
			}
		}

	}else{
		for(var updatedKey in _updatedArray){

			console.log("here");
			// setting the values to be neutral //
			returnDictionary[_updatedArray[updatedKey]] = REARRANGED;
		}
	}

	for(var thing in returnDictionary){
		console.log("thing " + returnDictionary[thing]);
	}
}

