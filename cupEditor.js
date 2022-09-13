//Elements
const cupAmountInput = document.getElementById("cupAmount");
const cupPrevPage = document.getElementById("cupPrevPage");
const cupInputs = document.getElementById("cups").querySelectorAll("input");
const cupTitles = document.getElementById("cups").querySelectorAll("p");
const cupNextPage = document.getElementById("cupNextPage");
const pageNumber = document.getElementById("pageNumber");
const trackTable = document.getElementById("trackTable");
const downloadButton = document.getElementById("downloadButton");

//Constants & Variables
const fileMagic = [0x43, 0x55, 0x50, 0x32]; // CUP2 in ASCII
let cupAmount; // Integer
let cupLayout = []; // Byte-array
const cupsPerPage = cupInputs.length / 4; // Amount of cups displayed on one page
let currentPage = 1;
let maxPages;

function init() {

    //Init cupAmount
    cupAmountInput.value = 54;
    cupAmount = cupAmountInput.value;

    //Init maxPages
    maxPages = Math.ceil(cupAmount / cups.length);

    //Init new cupLayout
    cupLayout = TEST_CUP_LAYOUT;
    cupLayout[215] = 0xFF;
    loadPage();

    //Init trackTable
    loadTrackTable();
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadPage();
    }
}

function nextPage() {
    if (currentPage < maxPages) {
        currentPage++;
        loadPage();
    }
}

function loadPage() {
    // Update maxPages and set currentPage if necessary
    maxPages = Math.ceil(cupAmount / cupsPerPage);
    if (currentPage > maxPages) currentPage = maxPages;
    pageNumber.innerText = `Page ${currentPage}/${maxPages}`;

    // Load track names into into the cup inputs
    const cupLayoutOffset = (currentPage - 1) * cupInputs.length;
    const cupNumberOffset = currentPage + 5*(currentPage-1);
    for (let i = 0; i < cupTitles.length; i++) {
        cupTitles[i].innerText = `Cup ${cupNumberOffset + i}`;
    }
    for (let i = 0; i < cupInputs.length; i++) {
        cupInputs[i].value = TRACKS.get(cupLayout[cupLayoutOffset + i]);
        cupInputs[i].disabled = false;
    }

    //Disable inputs for cups not in use on the page
    if (cupAmount*4 - currentPage*cupInputs.length < 0) {
        const disabledInputs = Math.abs(cupAmount*4 - currentPage*cupInputs.length);
        for (let i = cupInputs.length - disabledInputs; i < cupInputs.length; i++) {
            cupInputs[i].disabled = true;
            cupInputs[i].value = "";
        }
    }
}

function loadTrackTable() {
    const trackTableElement = document.createElement("table");
    trackTableElement.setAttribute("class", "table is-hoverable is-fullwidth is-bordered");
    for (const [key, track] of TRACKS) {
        const tr = trackTableElement.insertRow();
        const td = tr.insertCell();
        const p = document.createElement("p");
        td.setAttribute("style", "padding:1px;");
        p.setAttribute("style", "padding:0.5em 0.75em;");
        p.setAttribute("draggable", "true");
        p.innerHTML = track;
        td.appendChild(p);
    }
    trackTable.replaceWith(trackTableElement);
}

function validateCupAmountInput() {
    const val = parseInt(cupAmountInput.value);
    if (val > 54) {
        cupAmountInput.value = 54;
    }
    else if (val < 1 || isNaN(val)) {
        cupAmountInput.value = cupAmount;
    }
    cupAmount = cupAmountInput.value;
    if (cupAmountInput === document.activeElement) cupAmountInput.select();
    loadPage();
}

function calcMaxPages() {
    return Math.ceil(cupAmount / cups.length);
}

function isCupLayoutLegal() {
    for (let i = 0; i < cupAmount*4; i++) {
        if (cupLayout[i] == 0xFF) {
            return false;
        }
    }
    return true;
}

function downloadCupLayout() {
    if (isCupLayoutLegal()) {
        let byteArray = [];
        fileMagic.forEach(byte => {
            byteArray.push(byte);
        });
    
        let cupAmountBytes = intToUint8Array(cupAmount);
        cupAmountBytes.forEach(byte => {
            byteArray.push(byte);
        });
        // cupLayout.forEach(byte => {
        //     byteArray.push(byte);
        // });
    
        for (let i = 0; i < cupAmount*4; i++) {
            byteArray.push(cupLayout[i]);
        }
        for (let i = 0; i < CTGP_TRACK_SLOT_COUNT - cupAmount * 4; i++) { // Fill the rest of the cupLayout (that is not in use) with no track
            byteArray.push(0xff);
        }
    
        //Source: https://stackoverflow.com/questions/27946228/file-download-a-byte-array-as-a-file-in-javascript-extjs/27963891
        let uint8Array = new Uint8Array(byteArray);
        let a = window.document.createElement('a');
    
        a.href = window.URL.createObjectURL(new Blob([uint8Array], { type: 'application/octet-stream' }));
        a.download = "cupLayout.cup";
    
        // Append anchor to body.
        document.body.appendChild(a)
        a.click();
    
    
        // Remove anchor from body
        document.body.removeChild(a)
    }
    else {
        alert("Error:\nOne or more cups contain no tracks\nAdd the missing tracks or reduce the amount of cups");
    }
}

function intToUint8Array (num) {
    //Source: https://github.com/AtishaRibeiro/TT-Rec-Tools/blob/dev/ghostmanager/Scripts/import_export.js
    arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
    view = new DataView(arr);
    view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false
    return new Uint8Array(arr);
}

//EventListeners
addEventListener("DOMContentLoaded", init);
cupPrevPage.addEventListener("click", previousPage);
cupNextPage.addEventListener("click", nextPage);
cupAmountInput.addEventListener("focusout", validateCupAmountInput);
cupAmountInput.addEventListener("keydown", function(e) {if (e.key == "Enter") validateCupAmountInput()});
cupAmountInput.addEventListener("focusin", function() {cupAmountInput.select();});
downloadButton.addEventListener("click", downloadCupLayout);

// Add autocomplete functionality to input fields
for (let input of cupInputs) {
    autocomplete(input);
}

// window.addEventListener('beforeunload', function (e) {
//     // Cancel the event and show alert that
//     // the unsaved changes would be lost
//     e.preventDefault();
//     e.returnValue = 'test';

// });
