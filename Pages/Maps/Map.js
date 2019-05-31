
var url = "https://maps.googleapis.com/maps/api/geocode/json?";
var key = "&key=AIzaSyAbrSfOKkZEFVCLYk254tLC3dNGX3k7yiU";

var httpRequest = new XMLHttpRequest();

var address = "";
var newJobLong;
var newJobLat;

var createMap;
var modifyMap;
var marker;

var pinDropped = false;

var createLongitudeTextField = document.getElementById("create-long-text");
var createLatitudeTextField = document.getElementById("create-lat-text");
var createAddressTextField = document.getElementById("create-address-text");

var modifyLongitudeTextField = document.getElementById("modify-long-text");
var modifyLatitudeTextField = document.getElementById("modify-lat-text");
var modifyAddressTextField = document.getElementById("modify-address-text");


var modifySearchButton = document.getElementById("modify-address-search");
var modifyRevertButton = document.getElementById("revert-button");




// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	marker = null;
}, false);



function initMap(){

	createMap = new google.maps.Map(document.getElementById("create-map"), {
		center: {lat: 37.984361, lng:-120.381767},
		zoom: 7
	});

	modifyMap = new google.maps.Map(document.getElementById("modify-map"),{
		center: {lat: 37.984361, lng:-120.381767},
		zoom: 7
	});

	
}


// came from create is a boolean value to signify that the source was from //
// creating a new job.  If it is false, its source came from Modifying //
// a previous job //
function searchForPlace(address, long, lat, cameFromCreate){

	var addressField;
	var longitudeField;
	var latitudeField;

	if(cameFromCreate){
		addressField = createAddressTextField;
		longitudeField = createLongitudeTextField;
		latitudeField = createLatitudeTextField;
	}else{
		addressField = modifyAddressTextField;
		longitudeField = modifyLongitudeTextField;
		latitudeField = modifyLatitudeTextField;
	}
		




		// deciding if the address is filled out or the coordinates are filled out //
		// if both are filled out, then we have a problem //

		// if all three fields are filled in, then we have a problem //
		if(address != "" && (long != "" || lat != "")){
			let alertConfirm = confirm("Please enter either an Address or a Coordinate to search.  Not both.");
			if(alertConfirm){
				
				longitudeField.value = "";
				latitudeField.value = "";
				addressField.value = "";

				addressTextChanged = false;
				
				toggleCoordinatesFilled(false, cameFromCreate);

				return;
			}

		// if the address field is filled in, then we search using that //
		}else if(address != "" && long == "" && lat == ""){
			// address search //
			longitudeField.value = "";
			latitudeField.value = "";

			this.address = address;

			// I should have a popup appear when both the address and long/lat fields are filled in //
			// that asks which set of data the user wants to use //
			var replaceWhiteSpaceInAddress = address.replace(/\s/g, "+");
			var finalUrl = url + "address=" + replaceWhiteSpaceInAddress + key;
	
			httpRequest.open("GET", finalUrl);
			httpRequest.send();

			httpRequest.onreadystatechange = function(){
				if(httpRequest.readyState == 4 && httpRequest.status == 200){
					var jsonParse = JSON.parse(httpRequest.responseText);
					parsePlaceByAddress(jsonParse, cameFromCreate);
				}
			}

		// if the coordinates are filled in, then we search using that //
		}else if(address == "" && long != "" && lat != ""){

			this.address = address;

			var finalUrl = url + "latlng=" + lat + "," + long + key;
	
			httpRequest.open("GET", finalUrl);
			httpRequest.send();

			httpRequest.onreadystatechange = function(){
				if(httpRequest.readyState == 4 && httpRequest.status == 200){
					var jsonParse = JSON.parse(httpRequest.responseText);
					parsePlaceByCoordinate(jsonParse, cameFromCreate);
				}
			}
		}

}

// parse based by address //
function parsePlaceByAddress(json, cameFromCreate){
	
	if(json["results"] != undefined){
		var results = json["results"];
		for(var i in results){
			
			var resultsArray = results[i];
			if(resultsArray != undefined){
				var geometryResults = resultsArray["geometry"];
				if(geometryResults != undefined){
					var locationResults = geometryResults["location"];
					if(locationResults != undefined){
						newJobLong = locationResults["lng"];
						newJobLat = locationResults["lat"];
						
						if(cameFromCreate){
							// place on the map //
							placeOnMapCreate(newJobLong, newJobLat);

							createLongitudeTextField.value = newJobLong;
							createLatitudeTextField.value = newJobLat;

							toggleCoordinatesFilled(true, cameFromCreate);
						
							toggleCreateButton();
						}else{
							placeOnMapModify(newJobLong, newJobLat);

							modifyLongitudeTextField.value = newJobLong;
							modifyLatitudeTextField.value = newJobLat;

							//toggleCoordinatesFilled(true, cameFromCreate);
						
							//toggleCreateButton();
							//toggleJobModifyButton();
						}
					}
				}
			}
		}
	}
}

// parse by coordinates //
function parsePlaceByCoordinate(json, cameFromCreate){

	if(json["results"] != undefined){
		var results = json["results"];

		if(Object.keys(results).length == 0){
			//toggleCoordinatesFilled(true, cameFromCreate);
			if(cameFromCreate){
				addressTextFilled = false;
				//_addressTextChanged = false;
				//_addressTextChanged = false;
				//toggleCreateButton();
			}else{
				_addressTextChanged = false;
				//toggleJobModifyButton();
			}
		}else{
			for(var i in results){
				if(i == 0){
					var resultsArray = results[i];
					if(resultsArray != undefined){
						var geometryResults = resultsArray["geometry"];
						var formattedAddress = resultsArray["formatted_address"];
						if(geometryResults != undefined && formattedAddress != undefined){
							var locationResults = geometryResults["location"];
						
							if(locationResults != undefined){
								newJobLong = locationResults["lng"];
								newJobLat = locationResults["lat"];
						


								if(cameFromCreate){
									// place on the map //
									placeOnMapCreate(newJobLong, newJobLat, formattedAddress);

									createAddressTextField.value = formattedAddress;
									createLongitudeTextField.value = newJobLong;
									createLatitudeTextField.value = newJobLat;
							
									toggleAddressFilled(true, cameFromCreate);
									toggleCoordinatesFilled(true, cameFromCreate);

									toggleCreateButton();
								}else{
									placeOnMapModify(newJobLong, newJobLat, formattedAddress);

									modifyAddressTextField.value = formattedAddress;
									modifyLongitudeTextField.value = newJobLong;
									modifyLatitudeTextField.value = newJobLat;
							
									//toggleAddressFilled(true, cameFromCreate);
									//toggleCoordinatesFilled(true, cameFromCreate);

									//toggleCreateButton();
									//toggleJobModifyButton();
								}
							}
						}
					}
					return;
				}
			}
		}
	}
}


// placing on the map and putting a marker on //
function placeOnMapCreate(long, lat, address){
	createMap = new google.maps.Map(document.getElementById("create-map"), {
		center: {lat: lat, lng:long},
		zoom: 17
	});

	marker = new google.maps.Marker({
		position: {lat: lat, lng: long},
		map: createMap,
		animation: google.maps.Animation.DROP,
		title: address
	});
}


// placing on the map and putting a marker on //
function placeOnMapModify(long, lat, address){
	modifyMap = new google.maps.Map(document.getElementById("modify-map"), {
		center: {lat: lat, lng:long},
		zoom: 17
	});

	marker.setMap(null);

	marker = new google.maps.Marker({
		position: {lat: lat, lng: long},
		map: modifyMap,
		animation: google.maps.Animation.DROP,
		title: address
	});

	
}



// erases the markers on the map //
function eraseButtonOnClick(){
	address = "";
	newJobLong = null;
	newJobLat = null;

	createAddressTextField.value = "";
	createLongitudeTextField.value = "";
	createLatitudeTextField.value = "";

	

	if(marker != null){
		marker.setMap(null);
		google.maps.event.clearInstanceListeners(createMap);
	}

	toggleCreateButton();
}






function modifyEraseButtonOnClick(){
	address = "";
	newJobLong = null;
	newJobLat = null;

	modifyAddressTextField.value = "";
	modifyLongitudeTextField.value = "";
	modifyLatitudeTextField.value = "";

	modifySearchButton.disabled = true;
	revertButton.disabled = false;


	if(marker != null){
		marker.setMap(null);
		google.maps.event.clearInstanceListeners(modifyMap);
	}
}








// adds a marker to the map //
function addButtonOnClick(){
	var _ = createMap.addListener('click', function(event){
		if(marker != null){
			marker.setMap(null);
		}
		var location = event.latLng;
		marker = new google.maps.Marker({
			position: location,
			map: createMap,
			title: "Custom Marker"
		});
		newJobLong = marker.getPosition().lng();
		newJobLat = marker.getPosition().lat();

		createLongitudeTextField.value = newJobLong;
		createLatitudeTextField.value = newJobLat;

		toggleCoordinatesFilled(true, true);
		toggleCreateButton();
		toggleSearchButton();
	});
}



function modifyAddButtonOnClick(){
	var _ = modifyMap.addListener('click', function(event){
		if(marker != null){
			marker.setMap(null);
		}
		var location = event.latLng;
		marker = new google.maps.Marker({
			position: location,
			map: modifyMap,
			title: "Custom Marker"
		});

		pinDropped = true;

		newJobLong = marker.getPosition().lng();
		newJobLat = marker.getPosition().lat();

		modifyLongitudeTextField.value = newJobLong;
		modifyLatitudeTextField.value = newJobLat;

		modifySearchButton.disabled = false;
		modifyRevertButton.disabled = false;
	});
}







function toggleCoordinatesFilled(filled, cameFromCreate){
	if(cameFromCreate){
		longitudeTextFilled = filled;
		latitudeTextFilled = filled;
	}else{
		longitudeChanged = filled;
		latitudeChanged = filled;
	}

}

function toggleAddressFilled(filled, cameFromCreate){
	if(cameFromCreate){
		addressTextFilled = filled;
	}else{
		addressTextChanged = filled;
	}
}

