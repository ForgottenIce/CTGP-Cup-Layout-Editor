//Elements
const newButton = document.getElementById("newButton");
const importFile = document.getElementById("importFile");
const cupAmountInput = document.getElementById("cupAmount");
const cupPrevPage = document.getElementById("cupPrevPage");
const cupInputs = Array.from(document.getElementById("cups").querySelectorAll("input"));
const cupTitles = document.getElementById("cups").querySelectorAll("p");
const cupNextPage = document.getElementById("cupNextPage");
const pageNumber = document.getElementById("pageNumber");
const trackSearchInput = document.getElementById("trackSearchInput");
const trackSearchClear = document.getElementById("trackSearchClear");
const trackSearchMode = document.getElementById("trackSearchMode");
const downloadButton = document.getElementById("downloadButton");
const copyUrlButton = document.getElementById("copyUrlButton");

//Constants & Variables
var cupLayoutChanged = false;
const fileMagic = [0x43, 0x55, 0x50, 0x32]; // CUP2 in ASCII
let cupAmount; // Integer
let cupLayout = []; // Byte-array
const cupsPerPage = cupInputs.length / 4; // Amount of cups displayed on one page
let currentPage = 1;
let maxPages = Math.ceil(cupAmount / cups.length);

function init() {

    cupAmountInput.value = 54;
    cupAmount = cupAmountInput.value;

    defaultCupLayout();
    loadTracksFromURL();
    validateCupAmountInput();

    loadPage();
    loadTrackTable();
}

function defaultCupLayout() {
    cupLayoutChanged = false;
    cupLayout = [];
    for (let i = 0; i < CTGP_TRACK_SLOT_COUNT; i++) {
        cupLayout.push(0xFF);
    }
}

function loadTracksFromURL() {
    //Load cupLayout from URL query string
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const cups = params.get("ca");
    if (cups != null) cupAmountInput.value = parseInt(cups);
    const tracks = params.get("cl");
    if (tracks == undefined || tracks.length > CTGP_TRACK_SLOT_COUNT*2 || tracks % 2 == 1) {
        return;
    }
    for (let i = 0; i < tracks.length; i += 2) {
        const trackId = parseInt(tracks.substring(i, i + 2), 16);
        if (TRACKS.get(trackId) == undefined) {
            defaultCupLayout();
            return;
        }
        else {
            cupLayout[i / 2] = trackId;
        }
    }
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

function loadTrackTable(searchString) {
    if (typeof searchString != "string") {
        searchString = "";
    }
    const trackTableElement = document.createElement("table");
    trackTableElement.setAttribute("class", "table is-hoverable has-text-centered is-fullwidth is-bordered");
    trackTableElement.setAttribute("id", "trackTable");
    for (const [key, track] of TRACKS) {
        if (track.slice(0, searchString.length).toUpperCase() == searchString.toUpperCase() && key != 0xff) {
            //Table rows
            if (cupLayout.includes(key) && trackSearchMode.checked == false) continue;
            const tr = trackTableElement.insertRow();
            const td = tr.insertCell();
            const p = document.createElement("p");
            td.setAttribute("style", "padding:1px;");
            p.setAttribute("style", "padding:0.5em 0.75em;cursor:grab");
            p.setAttribute("draggable", "true");
            p.setAttribute("data-trackid", key);
            p.innerHTML = track;

            //Event listeners
            p.addEventListener("dragstart", function(e) {trackTableDragStart(e)});
            p.addEventListener("dragend", function(e) {trackTableDragEnd(e)});
            p.addEventListener("dblclick", function(e) {trackTableDoubleClick(e)});

            //Append
            td.appendChild(p);
        }
    }
    if (trackTableElement.rows.length == 0) {
        trackTableElement.appendChild(document.createTextNode("No tracks found"))
    }
    document.getElementById("trackTable").replaceWith(trackTableElement);
}

function trackTableDoubleClick(clickEvent) {
    cupLayoutOffset = (currentPage - 1) * cupInputs.length;
    for (let i = 0; i < cupInputs.length; i++) {
        if (cupLayout[cupLayoutOffset + i] == 0xff && !cupInputs[i].disabled) {
            lol = clickEvent;
            updateTrackFromCupInput(cupInputs[i], parseInt(clickEvent.target.dataset.trackid));
            return;
        }
    }
    // Uncomment this to make the function run again on the next page in case all inputs were already occupied by a track
    /*
    if (currentPage < maxPages) {
        nextPage();
        trackTableDoubleClick(clickEvent);
    }
    */
}

function clearTrackSearch() {
    trackSearchInput.value = "";
    loadTrackTable();
    trackSearchClear.disabled = true;
}

function updateTrackFromCupInput(cupInput, trackId) {
    cupLayoutOffset = (currentPage - 1) * cupInputs.length + cupInputs.indexOf(cupInput);
    cupLayout[cupLayoutOffset] = trackId;
    cupInput.value = TRACKS.get(trackId);
    loadTrackTable(trackSearchInput.value);
    cupLayoutChanged = true;
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
        a.download = "cuplayout.cup";
    
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

async function copyCupLayoutURL() {
    let trackString = "";
    for (let i = cupAmount*4 - 1; i >= 0; i--) {
        if (trackString.length == 0 && cupLayout[i] == 0xFF) {
            continue;
        }
        trackString = cupLayout[i].toString(16).toUpperCase() + trackString;
    }
    const loc = window.location;

    let cupLayoutURL;
    if (trackString.length == 0) cupLayoutURL = `${loc.protocol}//${loc.host}${loc.pathname}?ca=${cupAmount}`
    else cupLayoutURL = `${loc.protocol}//${loc.host}${loc.pathname}?ca=${cupAmount}&cl=${trackString}`

    navigator.clipboard.writeText(cupLayoutURL);
    copyUrlButton.innerText = "Copied!";
    await delay(2000);
    copyUrlButton.innerText = "Copy cuplayout URL";
}

function createNewCupLayout() {
    if (confirm("Create new cup layout?\nThe current cup layout will be lost.")) {
        cupAmount = 54;
        cupAmountInput.value = cupAmount;
        defaultCupLayout();
        loadPage();
    }
}

function importCupLayoutFromFile() {
    cupLayoutChanged = false;
    const cupFile = importFile.files[0];
    if (cupFile != undefined) {
        const fr = new FileReader();
        fr.readAsArrayBuffer(cupFile);
        fr.onload = function() {
            let cupFileBytes = new Uint8Array(fr.result);
            let fileMagic = "";
            for (let i = 0; i < 4; i++) {
                fileMagic += String.fromCharCode(cupFileBytes[i]);
            }
            if (fileMagic == "CUP2" && cupFileBytes.length == 224) {
                let cupAmountView = new DataView(cupFileBytes.buffer, 4, 4);
                cupAmount = cupAmountView.getUint32();
                cupAmountInput.value = cupAmount;
                let cupLayoutBytes = new Uint8Array(cupFileBytes.buffer, 8);
                cupLayout = [];
                for (let i = 0; i < cupLayoutBytes.length; i++) {
                    if (TRACKS.get(cupLayoutBytes[i]) == undefined) {
                        cupLayout[i] = 0xFF;
                    }
                    else {
                        cupLayout[i] = cupLayoutBytes[i];
                    }
                }
                currentPage = 1;
                loadPage();
            }
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function intToUint8Array (num) {
    //Source: https://github.com/AtishaRibeiro/TT-Rec-Tools/blob/dev/ghostmanager/Scripts/import_export.js
    arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
    view = new DataView(arr);
    view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false
    return new Uint8Array(arr);
}

//EventListeners
addEventListener("DOMContentLoaded", init);

newButton.addEventListener("click", createNewCupLayout);
importFile.addEventListener("click", function(e) {e.target.value = ""}); // Reset selected file so the same file can be selected twice
importFile.addEventListener("change", importCupLayoutFromFile);

cupPrevPage.addEventListener("click", previousPage);
cupNextPage.addEventListener("click", nextPage);

cupAmountInput.addEventListener("focusout", validateCupAmountInput);
cupAmountInput.addEventListener("keydown", function(e) {if (e.key == "Enter") validateCupAmountInput()});
cupAmountInput.addEventListener("focusin", function() {cupAmountInput.select();});

trackSearchInput.addEventListener("input", function(e) {
    loadTrackTable(e.target.value);
    if (e.target.value.length > 0) {
        trackSearchClear.disabled = false;
    }
    else {
        trackSearchClear.disabled = true;
    }
});
trackSearchClear.addEventListener("click", clearTrackSearch);
trackSearchMode.addEventListener("click", function() {loadTrackTable(trackSearchInput.value)});

downloadButton.addEventListener("click", downloadCupLayout);
copyUrlButton.addEventListener("click", copyCupLayoutURL)

// Add autocomplete functionality to input fields
for (let input of cupInputs) {
    autocomplete(input);
    input.addEventListener("dragover", function(e) {inputDragOver(e)});
    input.addEventListener("dragleave", function(e) {inputDragLeave(e)});
    input.addEventListener("drop", function(e) {inputDragDrop(e)});
    input.addEventListener("focusout", function(e) {
        cupLayoutOffset = (currentPage - 1) * cupInputs.length + cupInputs.indexOf(e.target);
        e.target.value = TRACKS.get(cupLayout[cupLayoutOffset]);
    });
}

window.addEventListener('beforeunload', function (e) {
    if (cupLayoutChanged) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to exit? Your cup layout will be lost!';
    }
});
