
var url = "https://maps.googleapis.com/maps/api/geocode/json?";
var key = "&key=AIzaSyAbrSfOKkZEFVCLYk254tLC3dNGX3k7yiU";

var httpRequest = new XMLHttpRequest();

var address = "";
var newJobLong;
var newJobLat;

var map;
var marker;

var longitudeTextField = document.getElementById("create-long-text");
var latitudeTextField = document.getElementById("create-lat-text");
var addressTextField = document.getElementById("create-address-text");



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	marker = null;
}, false);



function initMap(){
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 37.984361, lng:-120.381767},
		zoom: 7
	});

	
}

function searchForPlace(address, long, lat){

	if(address != "" && long != "" && lat != ""){
		let alertConfirm = confirm("Please enter either an Address or a Coordinate to search.  Not both.");
		if(alertConfirm){
			longitudeTextField.value = "";
			latitudeTextField.value = "";
			addressTextField.value = "";

			toggleCoordinatesFilled(false);

			return;
		}
	}else if(address != "" && long == "" && lat == ""){
		// address search //
		longitudeTextField.value = "";
		latitudeTextField.value = "";

		toggleCoordinatesFilled(false);

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
				parsePlaceByAddress(jsonParse);
			}
		}

	}else if(address == "" && long != "" && lat != ""){
		// long search //
		longitudeTextField.value = "";
		latitudeTextField.value = "";

		toggleCoordinatesFilled(false);

		this.address = address;

		// I should have a popup appear when both the address and long/lat fields are filled in //
		// that asks which set of data the user wants to use //
		var finalUrl = url + "latlng=" + lat + "," + long + key;
	
		httpRequest.open("GET", finalUrl);
		httpRequest.send();

		httpRequest.onreadystatechange = function(){
			if(httpRequest.readyState == 4 && httpRequest.status == 200){
				var jsonParse = JSON.parse(httpRequest.responseText);

				// this is coming up with multiple results //
				// need a way of presenting this data //
				parsePlaceByCoordinate(jsonParse);
			}
		}
	}
	toggleCreateButton();
}


function parsePlaceByAddress(json){
	
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
						
						// place on the map //
						placeOnMap(newJobLong, newJobLat);

						longitudeTextField.value = newJobLong;
						latitudeTextField.value = newJobLat;

						toggleCoordinatesFilled(true);
						
						toggleCreateButton();
					}
				}
			}
		}
	}
}

function parsePlaceByCoordinate(json){
	if(json["results"] != undefined){
		var results = json["results"];
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
						
							
							// place on the map //
							placeOnMap(newJobLong, newJobLat, formattedAddress);

							addressTextField.value = formattedAddress;
							longitudeTextField.value = newJobLong;
							latitudeTextField.value = newJobLat;
							
							toggleAddressFilled(true);
							toggleCoordinatesFilled(true);

							toggleCreateButton();
						}
					}
				}
				return;
			}
		}
	}
}


// placing on the map and putting a marker on //
function placeOnMap(long, lat, address){
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: lat, lng:long},
		zoom: 17
	});

	marker = new google.maps.Marker({
		position: {lat: lat, lng: long},
		map: map,
		animation: google.maps.Animation.DROP,
		title: address
	});
}



// erases the markers on the map //
function eraseButtonOnClick(){
	address = "";
	newJobLong = null;
	newJobLat = null;

	addressTextField.value = "";
	longitudeTextField.value = "";
	latitudeTextField.value = "";

	toggleCoordinatesFilled(false);

	if(marker != null){
		marker.setMap(null);
		google.maps.event.clearInstanceListeners(map);
	}

	toggleCreateButton();
	
}

// adds a marker to the map //
function addButtonOnClick(){
	var _ = map.addListener('click', function(event){
		if(marker != null){
			marker.setMap(null);
		}
		var location = event.latLng;
		marker = new google.maps.Marker({
			position: location,
			map: map,
			title: "Custom Marker"
		});
		newJobLong = marker.getPosition().lng();
		newJobLat = marker.getPosition().lat();

		longitudeTextField.value = newJobLong;
		latitudeTextField.value = newJobLat;

		toggleCoordinatesFilled(true);

		toggleCreateButton();
	});
}


function toggleCoordinatesFilled(filled){
	longitudeTextFilled = filled;
	latitudeTextFilled = filled;
}

function toggleAddressFilled(filled){
	addressTextFilled = filled;
}