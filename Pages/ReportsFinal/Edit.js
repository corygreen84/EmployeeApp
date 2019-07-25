

function cancelOnClick(){
    editModal.style.display = "none";
    $("#edit-main-area ul").empty();
}

function revertOnClick(){
    createTableEdit();
}

function saveOnClick(){
    editModal.style.display = "none";
    $("#edit-main-area ul").empty();
}




// need to go through this and parse out what I need //

function createTableEdit(){

    $("#edit-main-area ul").empty();

    for(var k in dictionaryOfDatesToBeAdded){
        

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
            tempDateString = "Today";
        }else{
            tempDateString = "" + k;
        }

        var dateLabel = $('<p id="date-p">' + tempDateString + '</p>');
        firstLevelDiv.append(dateLabel);
        // date container end //





        // start of table //
        var mainTableDiv = $('<div>', {"id": "edit-main-table-div"});
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

        var individualEventArray = dictionaryOfDatesToBeAdded[k];
        for(var l in individualEventArray){

            var trElement = $('<tr>');
            tableBody.append(trElement);

            var tdEventJob = $('<td contenteditable="true">' + individualEventArray[l].jobName + '</td>');
            var tdTime = $('<td contenteditable="true">' + individualEventArray[l].time + '</td>');
            var tdEventAddress = $('<td contenteditable="true">' + individualEventArray[l].jobAddress + '</td>');

            trElement.append(tdEventJob);
            trElement.append(tdTime);
            trElement.append(tdEventAddress);
        }

    }
    $('#edit-main-area ul').listview().listview('refresh');
    
}





