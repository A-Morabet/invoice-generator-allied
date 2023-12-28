// JavaScript file for Invoice Generator for Allied Health Professionals

// Imports from calendar.js and event.js

import {eventHandler,formatCurrency,clearInputs,openPrint} from './event.js';
import {checkCalendar,startCalendar,setDropdownValue,setCalendarBox,checkEnabledDays} from './calendar.js';

// Var Init

    // Input field init

let inputSessAmount = document.getElementById("sessionAmount");
let inputFee = document.getElementById("feeAmount");
let inputTotal = document.getElementById("totalAmount");
let selectDrop = document.getElementById("currencyDrop");
setCalendarBox(); // Sets calendar toggle on init
setDropdownValue(); // Sets dropdown value on init
checkEnabledDays(); // Sets checked days on init


    // Buttons, checkboxes and table init

let clearAllButton = document.getElementById("clearButton");
let calendarBox = document.getElementById("schedule");
let calendarButton = document.getElementById("calendarButton");
let printButton = document.getElementById("prButton");

// Event Listeners

inputFee.addEventListener('keydown', (event) => {if (event.key === 'Enter') {eventHandler(event,'floatEvent');}});
inputFee.addEventListener('focusout', (event) => eventHandler(event,'floatEvent'));
inputTotal.addEventListener('keydown', (event) => {if (event.key === 'Enter') {eventHandler(event,'floatEvent');}});
inputTotal.addEventListener('focusout', (event) => eventHandler(event,'floatEvent'));
inputSessAmount.addEventListener('keydown', (event) => {if (event.key === 'Enter') {eventHandler(event, 'sessAmount');}});
inputSessAmount.addEventListener('focusout', (event) => eventHandler(event,'sessAmount'));
selectDrop.addEventListener('change', (event) => formatCurrency(event,event.target.value));
clearAllButton.addEventListener('click', function() {clearInputs();});
calendarBox.addEventListener('change', function() {checkCalendar()})
calendarButton.addEventListener('click', function() {startCalendar();});
printButton.addEventListener('click', function() {openPrint();});



