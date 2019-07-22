
var dictionaryOfDatesToBeAdded = {};

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {
    selectAllButton.disabled = true;
}, false);


function checkmarkChanged(checkmark){

    var checkmarkId = checkmark.id;
    var checkboxElement = document.getElementById(checkmarkId);

    // gathering data based on the checkmark noted //
    for(var i in newArrayToPush){
        var element = newArrayToPush[i];
        for(var j in element){
            if(j == checkmarkId){
                if(checkboxElement.checked){
                    dictionaryOfDatesToBeAdded[checkmarkId] = element[j];
                }else{
                    delete dictionaryOfDatesToBeAdded[checkmarkId];
                }
            }
        }
    }
    console.log(Object.keys(dictionaryOfDatesToBeAdded).length);
}

function selectAllOnClick(){
    if(selectAllButton.innerHTML == "Select All"){
        $(".check-box").prop('checked', true);
        selectAllButton.innerHTML = "Deselect All";

        for(var m in newArrayToPush){
            var newElement = newArrayToPush[m];
            for(var n in newElement){
                dictionaryOfDatesToBeAdded[n] = newElement[n];
            }
        }
    }else{
        $(".check-box").prop('checked', false);
        
        dictionaryOfDatesToBeAdded = {};

        selectAllButton.innerHTML = "Select All";
    }

    
}



function editOnClick(){
    if(Object.keys(dictionaryOfDatesToBeAdded).length != 0){
        editValues();
    }else{
        alert("No records selected.  Please check one or more records for exporting.");
    }
}


function exportOnClick(){
    console.log("export on click");
    if(Object.keys(dictionaryOfDatesToBeAdded).length != 0){
        exportParse();
    }else{
        alert("No records selected.  Please check one or more records for exporting.");
    }
}




function editValues(){

}


function exportParse(){
    var mainString = "Date, Time, Job Name, Job Address, Job Id";
    for(var k in dictionaryOfDatesToBeAdded){
        var secondLevelObject = dictionaryOfDatesToBeAdded[k];
        for(var l in secondLevelObject){
            var thirdLevelObject = secondLevelObject[l];
            for(var m in thirdLevelObject){
                
                mainString = mainString + "," + thirdLevelObject[m];
            }
        }
    }
    saveToCSV(mainString);
}

function saveToCSV(fileString){

    var date = new Date();
    var formattedDate = "" + date.getDay() + "-" + (date.getDate() + 1) + "-" + date.getFullYear() + ".csv";

    var fileName = formattedDate;
    var blob = new Blob([fileString], {type: 'text/csv;charset=utf-8'});

    var link = document.createElement('a');
    if(link.download !== undefined){
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
