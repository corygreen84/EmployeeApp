// closing the modal view //
window.onclick = function(event) {
	if (event.target == modifyJobModal) {
		modifyJobModal.style.display = "none";
		
	}else if(event.target == createJobModal){
		createJobModal.style.display = "none";
	}
} 