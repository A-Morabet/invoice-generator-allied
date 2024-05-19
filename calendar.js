import {formatTotal} from './event.js';

// Var init for calendar

let inputSessAmount = document.getElementById("sessionAmount");
let inputFName = document.getElementById("fName");
let inputFee = document.getElementById("feeAmount");
let selectDrop = document.getElementById("currencyDrop");
let divDaysWeek = document.getElementById("daysWeek");
let calendarBox = document.getElementById("schedule");
let inputSDate = document.getElementById("startingDate");
let startingDateLabel = document.getElementById("sDateLabel");
let tableCalDiv = document.getElementById("tableDivId");
let calendarButton = document.getElementById("calendarButton");
let printButton = document.getElementById("prButton");
let canRunCalendar = false;
let dayCheckboxes = document.querySelectorAll("input[type=checkbox][name=dayWeek]")
let enabledDays = []
let hideSpin;
let genTable;
let tableDivHid = document.getElementById("tableDivHide");




// Sets default value from dropdown

function setDropdownValue(){
    selectDrop.value = "MAD";
    
}

// Listens for days checked for calendar and adds them to Array

function checkEnabledDays(){
    enabledDays = Array.from(dayCheckboxes)
        .filter(i => i.checked)
        .map(i => i.value)
        console.log(enabledDays);
}

// Error and Spinner Hiding

let pErrors = document.getElementsByClassName("pError");
let pErrorsV = Object.values(pErrors);
document.querySelectorAll(".pError").forEach(el => el.hidden = true);
let spinner = document.getElementById("spinnerDiv");
spinner.style.display = "none";


// Listens to checkbox changes and stores them in Array

dayCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        enabledDays = Array.from(dayCheckboxes)
        .filter(i => i.checked)
        .map(i => i.value)
    })
});

// Checks if calendar is included or not

function checkCalendar(event) {

    if (!calendarBox.checked){
        turnOffSettings();
    }
    else{
        turnOnSettings();
    }   
    }

// Sets calendar option on init

function setCalendarBox(){
    if(!calendarBox.checked)
    {turnOffSettings();}
    else{
        turnOnSettings();
    }
}

// Toggles on calendar options

function turnOffSettings(){
    divDaysWeek.style.visibility = "hidden";
    calendarButton.hidden = true;
    startingDateLabel.hidden = true;
    inputSDate.hidden = true;
    tableCalDiv.hidden = true;

    //Adds class for smaller phones responsiveness

    calendarButton.classList.remove("mobile");
    printButton.classList.remove("mobile");
}

// Toggles off calendar options

function turnOnSettings(){
    divDaysWeek.style.visibility = "visible";
    calendarButton.hidden = false;
    startingDateLabel.hidden = false; 
    inputSDate.hidden = false;
    tableCalDiv.hidden = false;

    //Adds class for smaller phones responsiveness

    calendarButton.classList.add("mobile");
    printButton.classList.add("mobile");

}

// Triggers the calendar creation process

function startCalendar(){
    errorCheck();
    if(canRunCalendar){
    let strDate = inputSDate.value;
    const dateParts = strDate.split('/');
    console.log(dateParts);
    getDates(new Date(inputSDate.value));
 }
}

// Checks if input is missing and calls function showError if needed

function errorCheck(){

    const sAmountValue = document.getElementById('sessionAmount').value;
    let willGenerate = false;
    if (!sAmountValue){
        showError('errorSAmount',inputSessAmount.id)
        if(!willGenerate){
            willGenerate = true;
        }
    }

    const fNameValue = inputFName.value;
    if (!fNameValue)
    {
        showError('errorFName',inputFName.id);
        if(!willGenerate){
            willGenerate = true;
        }
    }

    const sFeeValue = inputFee.value;
    if (!sFeeValue)
    {
        showError('errorSFee', inputFee.id);
        if(!willGenerate){
            willGenerate = true;
        }
        
    }

    const sDateValue = inputSDate.value;
    if (!sDateValue)
    {
        showError('errorSDate', inputSDate.id);
        console.log("error on the date")
        if(!willGenerate){
            willGenerate = true;
        }
    }

    const checkDaysNum = enabledDays.length;
    if (!checkDaysNum)
    {
        showError('errorCheckDays', 'daysWeek');
        if(!willGenerate){
            willGenerate = true;
        }
    }

    if(willGenerate)
    {generateTableError();}

    if (sAmountValue&&fNameValue&&sFeeValue&&sDateValue&&checkDaysNum){canRunCalendar = true}
}


// Shows error beneath input field

function showError(errorToShow,assocId) {
    if (errorToShow){
        for (let i = 0; i < pErrorsV.length; i++) {
            if (pErrorsV[i].id == errorToShow)
            {
                if (errorToShow == 'daysWeek')
                {
                    dayCheckboxes.forEach(function(checkbox) {
                        checkbox.addEventListener('change', function() {
                            hideError(errorToShow);
                        })})
                        return;
                }
    
                let inputAddEvent = document.getElementById(assocId);
                inputAddEvent.addEventListener('change',function(){hideError(errorToShow);});
                if (pErrorsV[i].className == "pError opa"){
                pErrorsV[i].hidden = false;
                pErrorsV[i].classList.add('show');
                console.log(pErrorsV[i].className);
                setTimeout(function(){pErrorsV[i].classList.remove('opa');},2500);
                }
                
            }
            else{
                // do nothing
            }   
        }
    }
    }

// Hides error if input length changes on keydown

function hideError(errorId){

    for (let i = 0; i < pErrorsV.length; i++) {
        if (pErrorsV[i].id == errorId){
            pErrorsV[i].hidden = true;
        }  
    }
}

// Obtains the day name in short format, p.ex. "Thu"

function getDayName(date, locale = 'en-GB')
{
    return date.toLocaleDateString(locale, {weekday: 'short'});
}

    function generateTableError(){

        let calTable =  document.getElementById("calTable");
            let bodyTable = document.getElementById("tableBodyData");
    
            calTable.removeChild(bodyTable);
            bodyTable = null;
    
            bodyTable = document.createElement('tbody');
            bodyTable.setAttribute("id", "tableBodyData");
            calTable.appendChild(bodyTable);
    
            for (let i = 0; i < 1; i++) 
        {
             
            let r = bodyTable.insertRow();  
            let c1 = r.insertCell(0);  
            let c2 = r.insertCell(1);  
            let c3 = r.insertCell(2);  
            let c4 = r.insertCell(3); 
            let name;
            
            name = document.createTextNode('N/A'); 
            let date = document.createTextNode('N/A');
            let sessAmountRow = document.createTextNode('N/A');
            let fee = document.createTextNode('N/A'); 
            c1.appendChild(name);  
            c2.appendChild(date);  
            c3.appendChild(sessAmountRow);  
            c4.appendChild(fee);
        }
        let rt = calTable.insertRow();
        let c1 = rt.insertCell(0); 
        c1.setAttribute('class','lastCLeft totalCell');  
        let c2 = rt.insertCell(1);  
        let c3 = rt.insertCell(2);  
        let c4 = rt.insertCell(3);
        c4.setAttribute('class','lastCRight totalCell');
        let noNA = document.createElement('span');
        noNA.innerText = '';
        noNA.setAttribute("class","totalCell");
        let empty = document.createElement('span');
        empty.innerText = "N/A";
        empty.setAttribute("class", "totalCell");
        let total = document.createElement('span');
        total.innerText = "Total";
        total.setAttribute("class", "totalCell");
        
        c1.appendChild(noNA); 
        c2.appendChild(noNA);
        c3.appendChild(total);
        c4.appendChild(empty);
    
    }

// Advances the starting date

Date.prototype.addDays = function(days){
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// Checks dates per day and cross-checks them with checkbox Array, 
// then stores them in new Array and calls format function.

function getDates(startDate) {

    const sAmountValue = document.getElementById('sessionAmount').value;
    let dateArray = [];
    let currentDate = startDate;
    if(enabledDays.length != 0)
    {
    while (dateArray.length < sAmountValue) {
        if(enabledDays.find((e) => e == getDayName(currentDate)))
        {
        dateArray.push(new Date (currentDate));
        }
        currentDate = currentDate.addDays(1);
    }

    // Passes Array to format function
    formatDates(dateArray);
    }

    else
    {
        //Exit function
        return;
    }   
}

// Formats the dates, then calls table generation function

function formatDates(finalArray)
{
        finalArray = finalArray.map((element) => {
            let date = new Date(element);
            return `${date.getDate() <= 9 ? '0': ''}${date.getDate()}/${date.getMonth() < 9 ? '0': ''}${date.getMonth()+1}/${date.getFullYear()}`;
          })

    // Passes Array to table generation
    pleaseWait();
    genTable = setInterval(function() {generateTables(finalArray);},1100);
    
}

// Shows a loading spinner before generating the table

function pleaseWait()
{
    hideTable();
    showSpinner();
    hideSpin = setInterval(hideSpinner,1100)
}

function showSpinner(){
    spinner.style.display = "flex";
    
}

function hideSpinner(){
    spinner.style.display = "none";
    clearInterval(hideSpin);
}

function hideTable(){
    tableDivHid.style.display = "none";
}

function showTable(){
    tableDivHid.style.display = "grid";
}


// Cleans table, then creates rows containing the information provided

function generateTables (datesArray){
    
    const sessAmountTable = document.getElementById('sessionAmount').value;
    const fNameValue = inputFName.value;
    const sFeeValue = inputFee.value;
    let rValue;
    let feeArray = [];

        let calTable =  document.getElementById("calTable");
        let bodyTable = document.getElementById("tableBodyData");

        calTable.removeChild(bodyTable);
        bodyTable = null;

        bodyTable = document.createElement('tbody');
        bodyTable.setAttribute("id", "tableBodyData");
        calTable.appendChild(bodyTable);

        let isName = false;  
        
    // Loop for creating rows   

    for (let i = 0; i < datesArray.length; i++) 
    {
        
        let r = bodyTable.insertRow();  
        let c1 = r.insertCell(0);  
        let c2 = r.insertCell(1);  
        let c3 = r.insertCell(2);  
        let c4 = r.insertCell(3); 
        let name;
        
        if (!isName)
        {name = document.createTextNode(fNameValue);
            isName = true;
        }
        else{
        name = document.createTextNode(''); 
        }
        let date = document.createTextNode(datesArray[i]);
        let sessAmountRow = document.createTextNode('1');
        let fee = document.createTextNode(sFeeValue); 
        c1.appendChild(name);  
        c2.appendChild(date);  
        c3.appendChild(sessAmountRow);  
        c4.appendChild(fee);

        if(sFeeValue.match(/^\$/)){
            rValue = sFeeValue.replace(/\$/,'') 
        }

        else if(sFeeValue.match(/^\£/)){
            rValue = sFeeValue.replace(/\£/,'')
        }

        else{rValue = sFeeValue;}

        feeArray.push(parseInt(rValue,10));
    
    }
    // Final row which includes the total amount
    let totalParse = 0;
    let rt = calTable.insertRow();
    let c1 = rt.insertCell(0);
    c1.setAttribute('class','lastCLeft totalCell'); 
    let c2 = rt.insertCell(1);  
    let c3 = rt.insertCell(2);  
    let c4 = rt.insertCell(3);
    c4.setAttribute('class','lastCRight totalCell');    
    let empty = document.createTextNode('');
    let total = document.createElement('span');
        total.innerText = "Total";
        total.setAttribute("class", "totalCell");
    
    c1.appendChild(empty); 
    c2.appendChild(empty);
    c3.appendChild(total);
    for (let i = 0; i < feeArray.length; i++) {
        totalParse += feeArray[i];
    }
    let totalVal = parseFloat(totalParse).toFixed(2);
    console.log(totalVal);
    totalVal = formatTotal(totalVal,selectDrop.value);
    console.log('totalval is now ' + totalVal);
    let totalValNode = document.createElement('span');
        totalValNode.innerText = totalVal;
        totalValNode.setAttribute("class", "totalCell");
    c4.appendChild(totalValNode);

    // Restarts calendar check
    canRunCalendar = false;
    
    clearInterval(genTable);
    showTable();
}

export {checkCalendar,startCalendar,setDropdownValue,setCalendarBox,checkEnabledDays};