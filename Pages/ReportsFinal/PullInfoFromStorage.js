
var db = firebase.firestore();
var storage = firebase.storage();

var monthDropDown = document.getElementById("month");
var yearDropDown = document.getElementById("year");

var mainAreaUl = document.getElementById("main-area");

var selectAllButton = document.getElementById("select-all-button");
var editButton = document.getElementById("edit-button");
var exportButton = document.getElementById("export-button");


var arrayOfDictionaries = [];
var newArrayToPush = [];

// this keeps track of all the iterations through each file //
var count = 0;

// keeping track of all the files that exist //
var fileExists = 0;

var isDone = false;

var uniqueId;

  
function goButtonOnClick(){

    var today = new Date();

    var month = monthDropDown.options[monthDropDown.selectedIndex].value;
    var year = yearDropDown.options[yearDropDown.selectedIndex].value;

    uniqueId = selectedEmployee.uniqueId;
    var daysUpToToday = 31;

    count = 0;
    fileExists = 0;
    isDone = false;

    selectAllButton.innerHTML = "Select All";
    editButton.disabled = true;
    exportButton.disabled = true;
    
    
    for(var i = 1; i < daysUpToToday + 1; i++){
        var gsReference = storage.refFromURL('gs://test-application-5cb08.appspot.com/' + companyName + '/' + uniqueId + '/' + year + '/' + month + '/' + i + '/tempFile.txt');

        $("#main-area ul").empty();
        arrayOfDictionaries = [];

        gsReference.getDownloadURL().then(function(url){

            // get the document url and now we can actually download it //
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.onload = function(event){

                count++;
                fileExists++;
                isDoneLoading(count, fileExists, daysUpToToday);

                // success! //
                var info = xhr.responseText;
                parseResponse(info);
            };
            xhr.open('GET', url);
            xhr.send();

    
        }).catch(function(error){
            switch (error.code) {
                case 'storage/object-not-found':
                  // File doesn't exist
                  count++;
                  isDoneLoading(count, fileExists, daysUpToToday);
                  break;
            
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  count++;
                  isDoneLoading(count, fileExists, daysUpToToday);
                  break;
            
                case 'storage/canceled':
                  // User canceled the upload
                  count++;
                  isDoneLoading(count, fileExists, daysUpToToday);
                  break;
            
                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  count++;
                  isDoneLoading(count, fileExists, daysUpToToday);
                  break;
              }
        });   
    }
}


function isDoneLoading(count, exists, daysUpToToday){
    if(count == daysUpToToday){
        isDone = true;
        if(exists == 0){
            selectAllButton.disabled = true;
            alert("No record for this month.");
        }else{
            selectAllButton.disabled = false;
        }
    }
}


function parseResponse(data){

    var jsonResponse = JSON.parse(data);

    var arrayOfNewEvents = [];
    var dictionaryOfEvents = {};

    var eventDate = "";

    for(var j in jsonResponse){
        var events = jsonResponse[j];
        var newEvent = new Event();

        newEvent.date = events.date;
        newEvent.time = events.time;
        newEvent.jobName = events.jobName;
        newEvent.jobAddress = events.jobAddress;
        newEvent.jobId = events.jobId;

        eventDate = newEvent.date;

        arrayOfNewEvents.push(newEvent);
        
    }

    dictionaryOfEvents[eventDate] = arrayOfNewEvents;

    //createTableHeader(dictionaryOfEvents);
    sortDictionaryOfeventsByDate(dictionaryOfEvents);
}


// sorting the array of dictionaries based on most current to least //
function sortDictionaryOfeventsByDate(dictionaryOfEvents){

    arrayOfDictionaries.push(dictionaryOfEvents);

    if(isDone){

        var arrayOfKeys = [];
        newArrayToPush = [];
        for(var i in arrayOfDictionaries){

            // this gives me the elements of the array which are dictionaries //
            // I want to now sort them based on their dictionary keys //
            var mainObject = arrayOfDictionaries[i];
            for(var j in mainObject){

                // going through and collecting the keys from the main arrayOfDictionaries //
                arrayOfKeys.push(j);

            }
        }

        var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
        var newArray = arrayOfKeys.sort(collator.compare).reverse();

        for(var m in newArray){
            for(var n in arrayOfDictionaries){
                var _object = arrayOfDictionaries[n];
                for(var ob in _object){
                    if(ob == newArray[m]){

                        var dictionaryObject = {};
                        dictionaryObject[ob] = _object[ob];
                        newArrayToPush.push(dictionaryObject);
                    }
                }
            }
        }
        
        createTable(newArrayToPush);
    }
}


function createTable(newArrayToPush){

    for(var k in newArrayToPush){
        var data = newArrayToPush[k];
        for(var j in data){
            //console.log(j);
            // start of the list item //
            var firstLevelLi = $('<li>', {"id": "first-li-" + j});
            $('#main-area ul').append(firstLevelLi);

            // checkbox container begin //
            var checkboxDiv = $('<div>', {"id": "checkbox-date-container"});
            firstLevelLi.append(checkboxDiv);


            // date container begin //
            var firstLevelDiv = $('<div>', {"id": "date-container"});
            checkboxDiv.append(firstLevelDiv);




            // need to see if j (the date) is today //
            var today = new Date();

            // i need to insert a 0 if the month is less than 10 here //
            var month = today.getMonth() + 1;
            var _month = "";
            if(month < 10){
                _month = "0" + month;
            }else{
                _month = "" + month;
            }

            // i need to insert a 0 if the day is less than 10 here //
            var day = today.getDate();
            var _day = "";
            if(day < 10){
                _day = "0" + day;
            }else{
                _day = "" + day;
            }

            
            var dateString = _month + '-' + _day + '-' + today.getFullYear();

            var tempDateString = "";
            if(j === dateString){
                tempDateString = "Today (" + dateString + ")";
            }else{
                tempDateString = "" + j;
            }

            var dateLabel = $('<p id="date-p">' + tempDateString + '</p>');
            firstLevelDiv.append(dateLabel);
            // date container end //

            // checkmark selection div begin //
            var checkMarkDiv = $('<div>', {"id": "checkmark-selection-div"});
            checkboxDiv.append(checkMarkDiv);

            var regDiv = $('<div>', {"class": "ui-checkbox"});
            checkMarkDiv.append(regDiv);


            var labelForCheckmark = $('<label for="checkbox-1" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">Add to Edit/Export</label>');
            regDiv.append(labelForCheckmark);
            

            var checkboxInput = $('<input type="checkbox" class="check-box" name="checkbox-1" id="' + j + '" date-cacheval="false" onChange="checkmarkChanged(this)">');
            regDiv.append(checkboxInput);
            
            // end of checkmark selection //

            // end of checkbox container //


        
            // start of table //
            var mainTableDiv = $('<div>', {"id": "main-table-div"});
            firstLevelLi.append(mainTableDiv);

            var table = $('<table>', {"id": "report-table", "class": "table table-striped table-bordered", "width": "100%", "cellspacing": "0"});
            mainTableDiv.append(table);

            var column1Width = $('<col width="150">');
            var column2Width = $('<col width="60">');
            
            table.append(column1Width);
            table.append(column2Width);
            

            // start of the table head //
            var tableHead = $('<thead>');
            table.append(tableHead);

            var tr = $('<tr>');
            tableHead.append(tr);

            var jobTh = $('<th class="th-sm">Event/Job</th>');
            tr.append(jobTh);
            var timeTh = $('<th class="th-sm">Time</th>');
            tr.append(timeTh);
            var addressTh = $('<th class="th-sm">Address</th>');
            tr.append(addressTh);
            
            // end of the table head //

            // start of the table body //
            var tableBody = $('<tbody>');
            table.append(tableBody);

            var individualEventArray = data[j];
            for(var i in individualEventArray){

                var trElement = $('<tr>');
                tableBody.append(trElement);

                var tdEventJob = $('<td>' + individualEventArray[i].jobName + '</td>');
                var tdTime = $('<td>' + individualEventArray[i].time + '</td>');
                var tdEventAddress = $('<td>' + individualEventArray[i].jobAddress + '</td>');

                trElement.append(tdEventJob);
                trElement.append(tdTime);
                trElement.append(tdEventAddress);
            }
        }
    }

    $('#main-area ul').listview().listview('refresh');
}




class Event{
    constructor(){
        var date;
        var time;
        var jobName;
        var jobAddress;
        var jobId;
    }
}