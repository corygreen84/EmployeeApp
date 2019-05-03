



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	console.log("im in here...");
	
}, false);


var map;
function initMap(){
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 37.984361, lng:-120.381767},
		zoom: 7
	});
}



