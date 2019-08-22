
var newArrayToPushEdit = [];

// this will be a copy of the newArrayToPushEdit in json form to keep it //
// from keeping a reference to the original //
var tempCopyOfArraytoPushEdit;

var tempFirstDictionary = {};
var changeCountDictionary = {};
var errorDictionary = {};

var revertButton = document.getElementById("revert-button");
var saveButton = document.getElementById("save-button");

var addNewLineId = "";

// sorting the array of dictionaries based on most current to least //
function sortDictionaryOfeventsByDateEdit(){

    revertButton.disabled = true;
    saveButton.disabled = true;

    var arrayOfKeysEdit = [];
    newArrayToPushEdit = [];
    for(var i in dictionaryOfDatesToBeAdded){

        // going through and collecting the keys from the main arrayOfDictionaries //
        arrayOfKeysEdit.push(i);
    }

    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    var newArray = arrayOfKeysEdit.sort(collator.compare).reverse();

    for(var m in newArray){

        for(var n in dictionaryOfDatesToBeAdded){
            if(n == newArray[m]){
                var dictionaryObject = {};
                dictionaryObject[n] = dictionaryOfDatesToBeAdded[n];
                newArrayToPushEdit.push(dictionaryObject);
            }
        }
    }

    // creating a copy of the newArrayToPushEdit //
    // this is used for reverting back to the original //
    // data //


    //tempCopyOfArraytoPushEdit = newArrayToPushEdit.concat(0);
    tempCopyOfArraytoPushEdit = JSON.parse(JSON.stringify(newArrayToPushEdit));
    newArrayToPushEdit = JSON.parse(JSON.stringify(newArrayToPushEdit));

    createTableEdit(newArrayToPushEdit);    
}



function createTableEdit(_newArrayToPushEdit){

    changeCountDictionary = {};

    $("#edit-main-area ul").empty();

    for(var p in _newArrayToPushEdit){
        var firstLevel = _newArrayToPushEdit[p];
        for(var k in firstLevel){
            var firstLevelLi = $('<li>', {"id": "first-li-" + k});
            $('#edit-main-area-ul').append(firstLevelLi);

            // date container begin //
            var firstLevelDiv = $('<div>', {"id": "date-container"});
            firstLevelLi.append(firstLevelDiv);

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
            if(k === dateString){
                tempDateString = "Today (" + dateString + ")";
            }else{
                tempDateString = "" + k;
            }

            var dateLabel = $('<p id="date-p">' + tempDateString + '</p>');
            firstLevelDiv.append(dateLabel);
            // date container end //





            // start of table //
            var mainTableDiv = $('<div>', {"id": "edit-main-table-div"});
            firstLevelLi.append(mainTableDiv);

            var table = $('<table>', {"id": "report-table-" + k, "class": "table table-striped table-bordered", "width": "100%", "cellspacing": "0"});
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
            var blankTh = $('<th class="th-sm"></th>');
            tr.append(blankTh);
            
            // end of the table head //


            // start of the table body //
            var tableBody = $('<tbody>');
            table.append(tableBody);

            var individualEventArray = firstLevel[k];
            for(var l in individualEventArray){
                var trElement = $('<tr>');
                tableBody.append(trElement);

                // adding tr elements and giving them id's //
                var tdEventJob = $('<td contenteditable="true" id="'+ k + '--JobName--' + l + '" oninput="parseData(this.id)" onkeyup="onKeyUp(this.id)">' + individualEventArray[l].jobName + '</td>');
                var tdTime = $('<td contenteditable="true" id="'+ k + '--Time--' + l + '" oninput="parseData(this.id)" onkeyup="onKeyUp(this.id)">' + individualEventArray[l].time + '</td>');
                var tdEventAddress = $('<td contenteditable="true" id="'+ k + '--JobAddress--' + l + '" oninput="parseData(this.id)" onkeyup="onKeyUp(this.id)">' + individualEventArray[l].jobAddress + '</td>');

                var tdMinus = $('<button type="button" id="minus-button-' + k + '-row-' + l + '" class="buttons minus-buttons" onclick="minusButtonOnClick(this.id)">-</button>');

                trElement.append(tdEventJob);
                trElement.append(tdTime);
                trElement.append(tdEventAddress);
                trElement.append(tdMinus);
            }

            var plusDiv = $('<div>', {"id": "plus-div-" + k + ""});
            mainTableDiv.append(plusDiv);


            //<button type="button" id="save-button" class="buttons" onclick="saveOnClick()">Save</button>
            var plusButton = $('<button type="button" id="plus-button-' + k + '" class="buttons plus-buttons" onclick="plusButtonOnClick(this.id)">+</button>');
            plusDiv.append(plusButton);
        }
    }
    $('#edit-main-area ul').listview().listview('refresh');
}



// minus and plus button stuff //
function minusButtonOnClick(id){
    var splitId = id.split("-");
    var month = splitId[2];
    var day = splitId[3];
    var year = splitId[4];
    var row = splitId[6];

    for(var jk in tempCopyOfArraytoPushEdit){
        var firstLevelTemp = tempCopyOfArraytoPushEdit[jk];
        for(var kl in firstLevelTemp){
            var dateString = month + "-" + day + "-" + year;
            if(kl == dateString){
                var secondLevelArray = firstLevelTemp[kl];
                secondLevelArray.splice(row, 1);
                if(secondLevelArray.length == 0){

                    // if the array length is 0, then we can go ahead and just //
                    // remove the entire data object //
                    tempCopyOfArraytoPushEdit.splice(jk, 1);
                }
            }
        }
    }
    revertButton.disabled = false;
    saveButton.disabled = false;
    createTableEdit(tempCopyOfArraytoPushEdit);
}

function plusButtonOnClick(id){
    
    addNewLineId = id;
    var addNewPopup = document.getElementById("add-new-line-modal");
    addNewPopup.style.display = "inline-block";

    document.getElementById("create-new-event").innerHTML = "";
    document.getElementById("create-new-time").innerHTML = "";
    document.getElementById("create-new-address").innerHTML = "";

    /*
    var splitId = id.split("-");
    var month = splitId[2];
    var day = splitId[3];
    var year = splitId[4];
    
    var dateString = month + "-" + day + "-" + year;
    var idOfTable = "report-table-" + dateString;

    var reportTable = $(idOfTable);
    */
}






// add new cancel and save buttons //
function addNewCancelOnClick(){
    addNewLineId = "";
    var addNewPopup = document.getElementById("add-new-line-modal");
    addNewPopup.style.display = "none";
}




function addNewSaveOnClick(){

    var eventElement = removeBR(document.getElementById("create-new-event").innerHTML);
    var timeElement = removeBR(document.getElementById("create-new-time").innerHTML);
    var addressElement = removeBR(document.getElementById("create-new-address").innerHTML);

    if(checkForBlankString(eventElement) == false || checkForBlankString(timeElement) == false || checkForBlankString(addressElement) == false){
        alert("Please check your fields for missing information");
    }else{
        var addNewPopup = document.getElementById("add-new-line-modal");
        addNewPopup.style.display = "none";
    }

    
}


function removeBR(text){
    var tempString = text.replace("<br>", "");
    return tempString;
}



function checkForBlankString(text){
    if(text != ""){
        return true;
    }else{
        return false;
    }
}



// **** button on click handlers **** //
function cancelOnClick(){
    var addNewPopup = document.getElementById("add-new-line-modal");
    addNewPopup.style.display = "none";
    
    editModal.style.display = "none";
    $("#edit-main-area ul").empty();
}

function revertOnClick(){
    revertButton.disabled = true;
    saveButton.disabled = true;

    tempCopyOfArraytoPushEdit = JSON.parse(JSON.stringify(newArrayToPushEdit));
    newArrayToPushEdit = JSON.parse(JSON.stringify(newArrayToPushEdit));

    createTableEdit(newArrayToPushEdit);
}

function saveOnClick(){

    if(Object.keys(errorDictionary).length != 0){
        alert("Please correct all errors before saving.");
    }else{
        createTxtFileAndPushToServer();
        editModal.style.display = "none";
        $("#edit-main-area ul").empty();
    }
}




function onKeyUp(id){

    var elementValue = document.getElementById(id).innerHTML;
    var elementWithBrRemoved = elementValue.replace("<br>", "");
    if(elementWithBrRemoved == ""){
        document.getElementById(id).style.backgroundColor = "#FF6347";
        errorDictionary[id] = true;
    }else{
        document.getElementById(id).style.backgroundColor = "white";
        delete errorDictionary[id];
    }
}



// from here I need to split up and save the data based on date //
// then create seperate .txt files and push those to the server //
// I also need to make sure that the data entered isnt blank //
// and is the correct type //
function parseData(id){


    // idsplit - 0: date, 1: event/job, 2: row //
    var idSplit = id.split("--");
    var date = idSplit[0];
    var element = idSplit[1];
    var row = idSplit[2];

    for(var newArray in newArrayToPushEdit){
        var firstArray = newArrayToPushEdit[newArray];
        
        if(firstArray[date] != undefined){
            
            tempFirstDictionary = firstArray[date];
            
            var mainArray = firstArray[date];
            var mainElement = mainArray[row];

            var tdElement = document.getElementById(id);
            
            if(tdElement.innerHTML != ""){
 
                // setting up some variables //
                var _date = mainElement["date"];
                var _time = mainElement["time"];
                var _jobName = mainElement["jobName"];
                var _jobAddress = mainElement["jobAddress"];
                var _jobId = mainElement["jobId"];

                var tdElementwithBRRemoved = tdElement.innerHTML.replace("<br>", "");

                if(element == "JobAddress"){
                    if(_jobAddress != tdElementwithBRRemoved){
                        _jobAddress = tdElementwithBRRemoved;
                        changeCountDictionary[tdElement.id] = true;
                    }else{
                        delete changeCountDictionary[tdElement.id];
                    }

                    
                    
                }else if(element == "JobName"){
                    if(_jobName != tdElementwithBRRemoved){
                        _jobName = tdElementwithBRRemoved;
                        changeCountDictionary[tdElement.id] = true;
                    }else{
                        delete changeCountDictionary[tdElement.id];
                    }



                }else if(element == "Time"){
                    if(_time != tdElementwithBRRemoved){
                        _time = tdElementwithBRRemoved;
                        changeCountDictionary[tdElement.id] = true;
                    }else{
                        delete changeCountDictionary[tdElement.id];
                    }
                }


                
                
                
                // changing the revert and save buttons //
                if(Object.keys(changeCountDictionary).length != 0){
                    // enable the revert and save buttons //
                    revertButton.disabled = false;
                    saveButton.disabled = false;
                }else{
                    revertButton.disabled = true;
                    saveButton.disabled = true;
                }




                // pushing info into the tempCopyOfArrayToPushEdit //
                for(var tc in tempCopyOfArraytoPushEdit){
                    var firstLevelCopy = tempCopyOfArraytoPushEdit[tc];
                    for(var flc in firstLevelCopy){
                        if(flc == _date){
                            var objectSelected = firstLevelCopy[flc];
                            var objectRow = objectSelected[row];
                            objectRow.date = _date;
                            objectRow.jobAddress = _jobAddress;
                            objectRow.jobId = _jobId;
                            objectRow.jobName = _jobName;
                        }
                    }
                }
            }
        }
    }
}



function createTxtFileAndPushToServer(){

    var uploadCount = 0;

    var storageRef = firebase.storage().ref();

    for(var t in tempCopyOfArraytoPushEdit){
        var firstLevelPushEdit = tempCopyOfArraytoPushEdit[t];
        for(var s in firstLevelPushEdit){

            var dateArray = s.split("-");
            var day = dateArray[1];
            var month = dateArray[0];
            var year = dateArray[2];

            // this is valid json data //
            var jsonVersion = JSON.stringify(firstLevelPushEdit[s]);
            
            var uploadTask = storageRef.child('' + companyName + '/' + uniqueId + '/' + year + '/' + month + '/' + day + '/tempFile.txt').putString(jsonVersion);
            uploadTask.on('state_changed', function(snapshot){

            }, function(error){
                console.log(error);
            }, function(){
                console.log("success!");
                uploadCount++;

                if(uploadCount == Object.keys(tempCopyOfArraytoPushEdit).length){
                    goButtonOnClick();
                }
                
            });
        }
    }
}

