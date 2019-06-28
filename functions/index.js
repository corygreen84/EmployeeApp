
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');


admin.initializeApp(functions.config().firebase);


// this is for file manipulation //
//const path = require('path');

let db = admin.firestore();

// .txt file creation //
var fs = require('fs');




// 0 23 * * * for every night at 11pm //
exports.scheduleEmployeeHistory = functions.pubsub.schedule('0 23 * * *').timeZone('America/Los_Angeles').onRun((context) => {

    let companiesRef = db.collection('companies');
    return companiesRef.get().then(snapshot => {
        snapshot.forEach((doc) => {

            // getting the company name //
            let companyData = doc.id;
    
            lookUpCompanyEmployees(companyData);
                
        });
        return null;
    }).catch(err =>{
        console.log("error", err);
    });
});



function lookUpCompanyEmployees(company){
    var employeeJobHistory = [];

    let employeesRef = db.collection('companies').doc(company).collection('employees');
    return employeesRef.get().then(snapshot =>{
        var totalEmployees = snapshot.size;
        snapshot.forEach((doc) => {

            var tempEmployeeHistory = [];
            // getting the employee ids and history // 
            var jobHistory = doc.data().jobHistory;
            for(var i in jobHistory){
                tempEmployeeHistory.push(jobHistory[i]);
            }
            

            var newEmployeeJobHistory = new EmployeeJobHistory();
            newEmployeeJobHistory.company = company;
            newEmployeeJobHistory.employee = doc.id;
            newEmployeeJobHistory.jobHistory = tempEmployeeHistory;


            employeeJobHistory.push(newEmployeeJobHistory);

            // if the employee array == the return size, then we go through and delete their data....//
            // or at least try to //
            if(employeeJobHistory.length === totalEmployees){

                deleteEmployeeData(company, employeeJobHistory);
            }
            
        });
        return null;
    }).catch(err => {
        console.log("error here... ", err);
    });
}









function deleteEmployeeData(company, companyJobHistory){

    for(var i in companyJobHistory){

        // if the user has a job history, then we need to grab the last history event //
        // and make sure its a 'Log out' event.  If it is then we delete the users data //
        // for the day because it has been archived //
        // If there is no 'Log Out' event, then we should notify the admin and do nothing //
        // with the users data.
        if(companyJobHistory[i].jobHistory.length !== 0){
            parseEmployeeHistory(companyJobHistory[i]);
        }   
    }   
}


function parseEmployeeHistory(history){

    var jobCompany = history.company;
    var jobEmployee = history.employee;
    var jobHistory = history.jobHistory;
    var batch = db.batch();
    for(var i in jobHistory){
        var searchString = String(jobHistory[i]).search("Logged Off");
        if(searchString !== -1){
            let employeeRef = db.collection('companies').doc(jobCompany).collection('employees').doc(jobEmployee);
            batch.update(employeeRef, {jobHistory: []});
        }else{

            // this section will be for messaging the admin that a user is still logged in through the next work //
            // day //
            console.log("does not contain logged off");
        }
    }
    batch.commit();
}


class EmployeeJobHistory{
    constructor(){
        var company;
        var employee;
        var jobHistory;
    }
}







// **** this function creates a new user **** //
exports.createUser = functions.firestore.document('users/{user}').onCreate((snapshot, context) => {

    const newValue = snapshot.data();

    const _email = newValue.email;
    const _password = newValue.password;

    return admin.auth().createUser({
        email: _email,
        emailVerified: true,
        password: _password,
        disabled: false

    }).then(userRecord =>{
        console.log('successfully created new user : ', userRecord.uid);
        return null;
    }).catch(error =>{
        console.log('error creating new user', error);
    });
    
});







exports.userLogOutFunction = functions.firestore.document('companies/{company}/{employees}/{employee}').onUpdate((snap, context) => {
    const newValue = snap.after.data();
    var jobHistory = newValue.jobHistory;
    var lastJob = jobHistory[jobHistory.length - 1];

    var arrayOfJobs = [];

    var company = context.params.company;
    var employee = context.params.employee;
    
    console.log("company -> ", company);


    if(lastJob.length !== 0){
        // getting the last job //
        var lastJobAsJSON = JSON.parse(lastJob);

        var jobName = lastJobAsJSON.jobName;

        if(jobName === "Logged Off"){

            // iterating in reverse, the job history //
            // we stop once we have a job name that is //
            // 'Logged In' //
            for(var i = jobHistory.length - 1; i >= 0; --i){

                var parsedJob = JSON.parse(jobHistory[i]);
                var nameOfParsedJob = parsedJob.jobName;
                arrayOfJobs.push('', jobHistory[i]);

                if(nameOfParsedJob === "Logged In"){
                    break;
                }
            }

            // reversing the array and adding it to a string //
            var tempString = '[';
            for(var j = arrayOfJobs.length - 1; j >= 0; --j){
                if(j !== 0){
                    //tempString = tempString.concat(arrayOfJobs[j], ',');
                    tempString = tempString.concat(arrayOfJobs[j]);
                }
            }


            tempString = tempString.concat("]");
            var finalString = tempString.replace(/}{/g, '},{');



            // writting this data to a temporary folder //
            fs.writeFile("/tmp/temp.txt", finalString, (err) => {
                if(err){
                    console.log(err);
                }else{

                    var date = new Date();
                    var offSet = date.getTimezoneOffset();

                    var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + '/' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                    var fileNameString = company + '/' + employee + '/' + date + '.txt';

                    const storage = new Storage();
                    const bucketName = 'gs://test-application-5cb08.appspot.com/';
                    storage.bucket(bucketName).upload("/tmp/temp.txt", {
                        gzip:false,
                        destination: fileNameString,
                        contentType: 'application/octet-stream'

                    });
                }
            });
        }
    }
    return null;
});



















