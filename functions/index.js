const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


// -- when we get a write to the employees section of the job, we need to also update the employee with the job data -- //
// -- user modifies the employees on the job, the job then notifies the employees as to what job they have -- //
exports.updateUser = functions.firestore.document('companies/{company}/{jobs}/{job}').onUpdate((change, context) =>{
    //var email = change.after.data().email;
    
    var company = context.params.company;
    var job = context.params.job;

    var employeeChange = change.after.data();
    for(var key in employeeChange.employees){
        console.log("employees " + employeeChange.employees[key]);
    }

    //console.log("change " + employeeChange.employees);
    //admin.firestore.collection('companies').document(company).collection('employees').document(email).
});
