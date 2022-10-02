let addSheetBtn = document.querySelector('.sheet-add-icon');
let sheetsFolderCont = document.querySelector('.sheets-folder-cont');


addSheetBtn.addEventListener("click", (e) => {

    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFolders = document.querySelectorAll('.sheet-folder');
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `
    <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>
    `;

    sheetsFolderCont.appendChild(sheet);
    sheet.scrollIntoView();
    // db 
    createSheetDB();
    createGraphComponentMatrix();
    handeleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();


    // sheets-folder-cont


});

function handleSheetRemoval(sheet) {
    sheet.addEventListener("mousedown", (e) => {
        if (e.button !== 2) { //right click
            return;
        }

        let allSheetFolders = document.querySelectorAll('.sheet-folder');
        if (allSheetFolders.length === 1) {
            alert("1 sheet needed");
            return;
        }

        let response = confirm("Your sheet will be removed permanently are you sure")
        let sheetIdx = Number(sheet.getAttribute("id"));

        if (response === false) {
            return;
        }

        collectedSheetDB.splice(sheetIdx, 1);
        collectedGraphComponent.splice(sheetIdx, 1);

        handleSheetUIRemoval(sheet)

        //by default sheet 1 to active

        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetProperties();

    });
}

function handleSheetUIRemoval(sheet) {

    sheet.remove();
    let allSheetFolders = document.querySelectorAll('.sheet-folder');
    console.log(allSheetFolders.length);
    for (let i = 0; i < allSheetFolders.length; i++) {
        console.log(allSheetFolders[i]);
        allSheetFolders[i].setAttribute("id", i);
        let sheetContent = allSheetFolders[i].querySelector('.sheet-content');
        sheetContent.innerText = `Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor = "transparent";
    }

    allSheetFolders[0].style.backgroundColor = "#ced6e0";
}

function handleSheetProperties() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();

        }
    }
    let firstCell = document.querySelector(".cell");

    firstCell.click();

}

function handleSheetDB(sheetIdx) {
    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];

}

function handleSheetUI(sheet) {

    let allSheetsFolder = document.querySelectorAll('.sheet-folder');

    for (let i = 0; i < allSheetsFolder.length; i++) {

        allSheetsFolder[i].style.backgroundColor = "transparent";

    }
    sheet.style.backgroundColor = "#ced6e0";
}

function handeleSheetActiveness(sheet) {

    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties()
        handleSheetUI(sheet);
    });


}


function createSheetDB() {

    let sheetDB = [];
    for (let i = 0; i < rows; i++) {

        let sheetRow = [];
        for (let j = 0; j < cols; j++) {
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: 'left',
                fontFamily: 'monospace',
                fontSize: "14",
                fontColor: "#0000000",
                BGColor: "#000000", //Default values indication purpoe
                value: "",
                formula: "",
                children: []
            };
            sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow)
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {


    // storage 2d matrix

    let graphComponentMatrix = [];


    for (let i = 0; i < rows; i++) {

        let row = [];

        for (let j = 0; j < cols; j++) {

            // more than one child relation (dependency)

            row.push([]);


        }

        graphComponentMatrix.push(row);
    }
    collectedGraphComponent.push(graphComponentMatrix);
}