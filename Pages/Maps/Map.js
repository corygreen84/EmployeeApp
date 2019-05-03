
var addressTextField = document.getElementById("create-address-text");
var longTextField = document.getElementById("create-long-text");
var latTextField = document.getElementById("create-lat-text");



// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
	addressTextField.onkeyup = function(event){
		console.log("address changed " + event);
	}
}, false);


var map;
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 37.984361, lng:-120.381767},
		zoom: 7
	});
}



