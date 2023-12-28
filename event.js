// Vars for event execution control
    
const delay = 500;
let lastExecution = 0;

// Dropdown variable

let selectDrop = document.getElementById("currencyDrop");

// Event for blur on keydown for rest of inputs
let inputFields = document.getElementsByClassName("fields");
let inputFieldsV = Object.values(inputFields);
inputFieldsV.map((element) => {element.addEventListener('keydown', (event) => {if (event.key === 'Enter') {element.blur();}})});

// Event for logo input
let logoInputVar = document.getElementById("logoInput");
logoInputVar.addEventListener('change', function() {logoChange()});

// Handles logo updating

function logoChange() {
    const logoInput = document.getElementById('logoInput');
    const uploadedLogo = document.getElementById('uploadedLogo');

    const file = logoInput.files[0];

    if (file) {
      // Use FileReader to read the selected file
      const reader = new FileReader();

      reader.onload = function (e) {
        // Set the source of the image to the base64-encoded content of the file
        uploadedLogo.src = e.target.result;
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }


// Listens to fee and session amount and proceeds to format if need be

function eventHandler(event, stringDirection)
{
    if (stringDirection == 'sessAmount')
    {
        if(event.target.value == 0)
        {
            event.target.value = '';

            if(event.key === 'Enter')
            {
                event.target.blur();
            }
            return;
            
        }
            
        if (event.target.value)
        {
        let noZeroNum = parseInt(event.target.value,10);
        event.target.value = noZeroNum;
        }

        if(event.key === 'Enter')
        {
            event.target.blur();
        }
        return;
    }

    if((lastExecution + delay) < Date.now())
        {

        if (stringDirection == 'floatEvent')
        {
            console.log(event.target.value);
                let targetNum = event.target.value;
            if (targetNum)
            {
                if (targetNum.match(/^\$/)){
                    
                    let targetValue = targetNum;
                    let replacedTargetValue = targetValue.replace(/\$/,'')
                    console.log('now is ' + replacedTargetValue);
                    targetNum = replacedTargetValue;
                }

                else if (targetNum.match(/^\£/)){
                    
                    let targetValue = targetNum;
                    let replacedTargetValue = targetValue.replace(/\£/,'')
                    console.log('now is ' + replacedTargetValue);
                    targetNum = replacedTargetValue;
                }

            if (event.type == 'keydown'){
                console.log('keydown called');
                targetNum = targetNum.replace(',','.');
                targetNum = targetNum.replace(/[.](?=.*[.])/g, "");
                let parsedTarget = parseFloat(targetNum).toFixed(2);
                targetNum = parsedTarget;
                let noZeroNum = formatTotal(targetNum,selectDrop.value);
                console.log(noZeroNum);
                event.target.value = noZeroNum;
            }

            if (event.type == 'focusout'){
                console.log('focusout called');
                targetNum = targetNum.replace(',','.');
                targetNum = targetNum.replace(/[.](?=.*[.])/g, "");
                let parsedTarget = parseFloat(targetNum).toFixed(2);
                targetNum = parsedTarget;
                let noZeroNum = formatTotal(targetNum,selectDrop.value);
                event.target.value = noZeroNum;
            }
    lastExecution = Date.now();
        }

        }

        if(event.key === 'Enter')
        {
            event.target.blur();
        }
        return;
    }
}

// Handles formatting on calendar table

function formatCurrency(event,dropdownValue){

    let currentIFee = document.getElementById('feeAmount');
    let currentITotal = document.getElementById('totalAmount');
    let currency;
    console.log(dropdownValue);

    if (dropdownValue == "MAD"){
            currency = new Intl.NumberFormat('de-DE',
            { style: 'currency', currency: 'MAD'});
        }
        
    if (dropdownValue == "USD"){
            currency = new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD'});
            
        }

    if (dropdownValue == "EUR"){
        currency = new Intl.NumberFormat('de-DE',
        { style: 'currency', currency: 'EUR'});
        
        }

    if (dropdownValue == "GBP"){
            currency = new Intl.NumberFormat('en-GB',
            { style: 'currency', currency: 'GBP'});
        }


            if(currentIFee.value){
                let currentFee = currentIFee.value;
                if (currentFee.match(/^\$/)){
                
                    let targetValue = currentFee;
                    let replacedTargetValue = targetValue.replace(/\$/,'')
                    console.log('now is ' + replacedTargetValue);
                    currentFee = replacedTargetValue;
                }
    
                else if (currentFee.match(/^\£/)){
                    
                    let targetValue = currentFee;
                    let replacedTargetValue = targetValue.replace(/\£/,'')
                    console.log('now is ' + replacedTargetValue);
                    currentFee = replacedTargetValue;
                }
                currentFee = currentFee.replace(',','.');
                currentFee = currentFee.replace(/[.](?=.*[.])/g, "");
                let parsedFee = parseFloat(currentFee).toFixed(2);
                currentIFee.value = currency.format(parsedFee);
            }
            if(currentITotal.value){
                let currentTotal = currentITotal.value;
                if (currentTotal.match(/^\$/)){
                
                    let targetValue = currentTotal;
                    let replacedTargetValue = targetValue.replace(/\$/,'')
                    console.log('now is ' + replacedTargetValue);
                    currentTotal = replacedTargetValue;
                }
    
                else if (currentTotal.match(/^\£/)){
                    
                    let targetValue = currentTotal;
                    let replacedTargetValue = targetValue.replace(/\£/,'')
                    console.log('now is ' + replacedTargetValue);
                    currentTotal = replacedTargetValue;
                }
                currentTotal = currentTotal.replace(',','.');
                currentTotal = currentTotal.replace(/[.](?=.*[.])/g, "");
                let parsedTotal = parseFloat(currentTotal).toFixed(2);
                currentITotal.value = currency.format(parsedTotal);
            }  
        
}

// Handles fee and session amount formatting on keydown and focusout 

function formatTotal(totalValue,dropdownValue){

    let currency;

    if (dropdownValue == "MAD"){
        currency = new Intl.NumberFormat('de-DE',
        { style: 'currency', currency: 'MAD'});
    }
    
    if (dropdownValue == "USD"){
        currency = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD'});
        
    }

    if (dropdownValue == "EUR"){
    currency = new Intl.NumberFormat('de-DE',
    { style: 'currency', currency: 'EUR'});
    
    }

    if (dropdownValue == "GBP"){
        currency = new Intl.NumberFormat('en-GB',
        { style: 'currency', currency: 'GBP'});
    }

    return currency.format(totalValue);
}

// Clears all Input fields

let allInputs = document.getElementsByClassName('all');
let allInputsV = Object.values(allInputs);

function clearInputs(){
    for (let i = 0; i < allInputsV.length; i++) {
        allInputsV[i].value = '';
    }
}

// Handles button hiding when print window is open

function openPrint(){
    let calendarDivision = document.getElementById("calendarDiv");
    let calendarButton = document.getElementById("calendarButton");
    let printButton = document.getElementById("prButton");
    let logoButton = document.getElementById("logoLabel");
    let clearButton = document.getElementById("clearButton");

    const buttonArray = [calendarDivision,logoButton,clearButton];
    buttonArray.forEach((buttonElement) => {
        buttonElement.style.display = "none";
    });

    print();
    onfocus = returnButtons;
}

// Handles button showing when print window is closed

function returnButtons(){

    let calendarDivision = document.getElementById("calendarDiv");
    let calendarButton = document.getElementById("calendarButton");
    let printButton = document.getElementById("prButton");
    let logoButton = document.getElementById("logoLabel");
    let clearButton = document.getElementById("clearButton");

    const buttonArray = [calendarDivision,logoButton,clearButton];
buttonArray.forEach((buttonElement) => {
        buttonElement.style.display = "grid";
        buttonElement.style.justifyContent = "center";
        buttonElement.style.alignItems = "center";
    });
}

export{eventHandler,formatTotal,formatCurrency,clearInputs,openPrint};