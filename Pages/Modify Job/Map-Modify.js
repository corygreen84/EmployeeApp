
var url = "https://maps.googleapis.com/maps/api/geocode/json?";
var key = "&key=AIzaSyAbrSfOKkZEFVCLYk254tLC3dNGX3k7yiU";

var httpRequest = new XMLHttpRequest();

var address = "";
var newJobLong;
var newJobLat;


var modifyMap;
var marker;
// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	marker = null;
	
}, false);



function initMap(){

	modifyMap = new google.maps.Map(document.getElementById("main-map-view"), {
		disableDefaultUI: true,
		center: {lat: 37.984361, lng:-120.381767},
		zoom: 9
	});
	
}





function searchForPlace(address, long, lat){

	// searching by address and disregarding the coordinates //
	if(address != "" && ((long != "" && lat == "") || (long == "" && lat != ""))){
		searchByAddress(address);
	}else if(address == "" && (long != "" && lat != "")){
		searchByCoordinates(long, lat);
	}else if(address != "" && (long == "" && lat == "")){
		searchByAddress(address);
	}
}



function searchByAddress(address){
	var replaceWhiteSpaceInAddress = address.replace(/\s/g, "+");
	var finalUrl = url + "address=" + replaceWhiteSpaceInAddress + key;

	httpRequest.open("GET", finalUrl);
	httpRequest.send();

	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState == 4 && httpRequest.status == 200){
			var jsonParse = JSON.parse(httpRequest.responseText);
			parsePlaceByAddress(jsonParse, address);
		}
	}
}

function searchByCoordinates(long, lat){

	var finalUrl = url + "latlng=" + lat + "," + long + key;
	
	httpRequest.open("GET", finalUrl);
	httpRequest.send();

	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState == 4 && httpRequest.status == 200){
			var jsonParse = JSON.parse(httpRequest.responseText);
			parsePlaceByCoordinate(jsonParse);
		}
	}
}

// parse based by address //
function parsePlaceByAddress(json, address){
	
	if(json["results"] != undefined){
		var results = json["results"];
		if(Object.keys(results).length == 0){
			noResultsFound();
		}else{
			for(var i in results){
			
				var resultsArray = results[i];
				if(resultsArray != undefined){
					var geometryResults = resultsArray["geometry"];
					if(geometryResults != undefined){
						var locationResults = geometryResults["location"];
						if(locationResults != undefined){
							newJobLong = locationResults["lng"];
							newJobLat = locationResults["lat"];



							placeOnMapModify(newJobLong, newJobLat, address);
							modifyJobLongitudeTextField.value = newJobLong;
							modifyJobLatitudeTextField.value = newJobLat;
						
							modifyAddressFilledIn = true;
							modifyLongFilledIn = true;
							modifyLatFilledIn = true;
						
							toggleSearchButton();
							toggleModifyJobButton();
						}
					}
				}
			}
		}
	}
}



// parse by coordinates //
function parsePlaceByCoordinate(json, cameFrommodify){

	if(json["results"] != undefined){
		var results = json["results"];

		if(Object.keys(results).length == 0){
			noResultsFound();
			
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

								this.address = formattedAddress;

								// place on the map //
								placeOnMapModify(newJobLong, newJobLat, formattedAddress);

								modifyJobAddressTextField.value = formattedAddress;
								modifyJobLongitudeTextField.value = newJobLong;
								modifyJobLatitudeTextField.value = newJobLat;
							
								modifyAddressFilledIn = true;
								modifyLongFilledIn = true;
								modifyLatFilledIn = true;
						
								toggleSearchButton();
								toggleModifyJobButton();
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
function placeOnMapModify(long, lat, address){
	modifyMap = new google.maps.Map(document.getElementById("main-map-view"), {
		center: {lat: lat, lng:long},
		zoom: 17
	});

	marker = new google.maps.Marker({
		position: {lat: lat, lng: long},
		map: modifyMap,
		animation: google.maps.Animation.DROP,
		title: address
	});
}


// give the user a notification that there were no results found //
function noResultsFound(){
	if(confirm("No results found.  Please try again.")) {
		modifyJobAddressTextField.value = "";
		modifyJobLongitudeTextField.value = "";
		modifyJobLatitudeTextField.value = "";
							
		modifyAddressFilledIn = false;
		modifyLongFilledIn = false;
		modifyLatFilledIn = false;

		toggleSearchButton();
		toggleModifyJobButton();
	}

	
}



function deleteMarkerOnClick(){
	
	modifyJobAddressTextField.value = "";
	modifyJobLongitudeTextField.value = "";
	modifyJobLatitudeTextField.value = "";

	modifyAddressFilledIn = false;
	modifyLongFilledIn = false;
	modifyLatFilledIn = false;
	

	if(marker != null){
		marker.setMap(null);
		google.maps.event.clearInstanceListeners(modifyMap);
	}

	toggleModifyJobButton();
}



function addMarkerOnClick(){
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
		
		newJobLong = marker.getPosition().lng();
		newJobLat = marker.getPosition().lat();

		modifyJobLongitudeTextField.value = newJobLong;
		modifyJobLatitudeTextField.value = newJobLat;

		modifyLongFilledIn = true;
		mofidyLatFilledIn = true;
		
		toggleModifyJobButton();
		toggleSearchButton();
	});
}




// recentering the map //
function recenterOnClick(){

	// recenters the map on the original job //


	var address = "";
	var newJobLong;
	var newJobLat;
	if(address != "" && newJobLong != undefined && newJobLat != undefined){
		placeOnMapModify(newJobLong, newJobLat, address);	
	}else{
		placeOnMapModify(jobLoaded.long, jobLoaded.lat, jobLoaded.address);	
	}
	
}

