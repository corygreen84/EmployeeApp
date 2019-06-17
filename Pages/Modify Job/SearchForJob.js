
var db = firebase.firestore();

function searchForJob(job, company){

	var jobRef = db.collection('companies').doc(company).collection('jobs').doc(job);
	jobRef.get().then(function(doc){
		if(doc.exists){
			var data = doc.data();
			for(var i in data){
				console.log("data -> " + data[i]);
			}
		}else{

		}
	});	

	
}

function parseJobInfo(){

}