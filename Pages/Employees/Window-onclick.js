// closing the modal view //
window.onclick = function(event) {
	if (event.target == modifyEmployeeModal) {
		modifyEmployeeModal.style.display = "none";
		
		
	}else if(event.target == createEmployeeModal){
		createEmployeeModal.style.display = "none";
	}
} 