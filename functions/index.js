
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

exports.scheduleEmployeeHistory = functions.pubsub.schedule('every 2 minutes').onRun((context) => {
    let companiesRef = db.collection('companies');
    companiesRef.get().then(snapshot => {
        snapshot.forEach((doc) =>{
            console.log(doc.id, '=>', doc.data());
        });
        return "";
    }).catch(err => {
        console.log("error ", err);
    });

    
    /*
    let allCompanies = companiesRef.get().then(snapshot => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
        return "";
    }).catch(err => {
        console.log("error -> ", err);
    });
    */
});





























/*
const path = require('path');
const os = require('os');
const fs = require('fs');

const pdfDocument = require('pdfkit');

exports.logOffFunction = functions.firestore.document('companies/{company}/{employees}/{employee}').onUpdate((change, context) =>{
    
    // in coming parameters //
    var company = context.params.company;
    var employee = context.params.employee;
    var propertyChanged = change.after.data();

    // gs:// //
    const path = 'gs://test-application-5cb08.appspot.com';


    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();
    const bucket = storage.bucket('test-application-5cb08.appspot.com');


    // constructing a pdf //
    const doc = new pdfDocument;

    doc.text('Hey there!');
    doc.pipe(fs.createWriteStream('/file.pdf'));
    
    doc.end();

    
    bucket.exists().then(data =>{

        bucket.upload('/file.pdf', (err, file, apiresponse =>{
            if(!err){
                console.log("upload complete!");
            }else{
                console.log("there was an error " + err);
            }
        }));
        console.log("bucket exists");

        return data[0];
    }).catch(error => {
        console.log("error");
        return "";
    });

    

    

    const {Storage} = require('@google-cloud/storage');
             * const storage = new Storage();
             * const bucket = storage.bucket('albums');
             *
             * bucket.exists(function(err, exists) {});
             *
             * //-
             * // If the callback is omitted, we'll return a Promise.
             * //-
             * bucket.exists().then(function(data) {
             *   const exists = data[0];
             * });
             * 
             * 
             * bucket.upload('/local/path/image.png', function(err, file, apiResponse) {
     *   // Your bucket now contains:
     *   // - "image.png" (with the contents of `/local/path/image.png')
     *
     *   // `file` is an instance of a File object that refers to your new file.
     * });

    




    //const bucket = storage.bucket(path);


    
    bucket.upload('sample.txt', function(err, file){
        if(!err){
            console.log("good!");
        }else{
            console.log("No good!");
        }
    });
    console.log("bucket file -> " + bucket.file.name);
    






    //if(propertyChanged.status === false){
        // cloud storage stuff //
        //var storagebucket = 'gs://test-application-5cb08.appspot.com';

        //const {Storage} = require('@google-cloud/storage');
        //const storage = new Storage();

        //var bucket = storage.bucket(storagebucket);
        


        //const bucket = storage.bucket(filePath);

        
        bucket.upload("Hey there", {
            destination: "/csv-folder/temp.csv"
        }, function(error, file){
            if(!error){
                console.log("good to go");
            }
        });
    

        

        // uploading the file to bucket //


        
        
//});
*/