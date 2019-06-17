
var db = firebase.firestore();

function searchForJob(job, company){

	var jobRef = db.collection('companies').doc(company).collection('jobs').doc(job);
	jobRef.get().then(function(doc){
		if(doc.exists){
			console.log("data -> " + doc.data());
		}else{

		}
	});	

	
}

function parseJobInfo(){

}