//storage
let collectedSheetDB = []; // contains all shhetDB
let sheetDB = [];

//Selectors for cell properties

{

    let addSheetBtn = document.querySelector('.sheet-add-icon');
    addSheetBtn.click();
}


let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let fontSize = document.querySelector('.font-size-prop');
let fontColor = document.querySelector('.font-color-prop');
let fontFamily = document.querySelector('.font-family-prop');
let BGColor = document.querySelector('.BGcolor-prop');
let alignment = document.querySelectorAll('.alignment');

let leftAlignment = alignment[0];
let centerAlignment = alignment[1];
let rightAlignment = alignment[2];


let activeColorProp = '#d1d8e0';
let inactiveColorProp = '#ecf0f1';

//Appilcation of two way binding 
//Attach property listeners

addressBar = document.querySelector('.address-bar');



bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //modification

    cellProp.bold = !cellProp.bold; // toggle //db data change
    cell.style.fontWeight = cellProp.bold ? 'bold' : "normal"; // ui  change 


    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;



});

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //modification

    cellProp.italic = !cellProp.italic; // toggle //db data change
    cell.style.fontStyle = cellProp.italic ? 'italic' : "normal"; // ui  change 
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
});

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //modification
    cellProp.underline = !cellProp.underline; // toggle //db data change
    cell.style.textDecoration = cellProp.underline ? 'underline' : "none"; // ui  change 
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
});

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //modification
    cellProp.fontSize = fontSize.value; // data change
    cell.style.fontSize = cellProp.fontSize + 'px'; // ui  change 
    fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //modification
    cellProp.fontFamily = fontFamily.value; // data change
    cell.style.fontFamily = cellProp.fontFamily; // ui  change 
    fontFamily.value = cellProp.fontFamily;
});



fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //modification
    cellProp.fontColor = fontColor.value; // data change
    cell.style.color = cellProp.fontColor; // ui  change 
    fontColor.value = cellProp.fontColor;
});

BGColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //modification
    cellProp.BGColor = BGColor.value; // data change
    cell.style.backgroundColor = cellProp.BGColor; // ui  change 
    BGColor.value = cellProp.BGColor;
});

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {

        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);

        let alignValue = e.target.classList[0];

        cellProp.alignment = alignValue //data change

        cell.style.textAlign = cellProp.alignment // ui change

        switch (alignValue) { // part 2 ui

            case "left":
                leftAlignment.style.backgroundColor = activeColorProp;
                centerAlignment.style.backgroundColor = inactiveColorProp;
                rightAlignment.style.backgroundColor = inactiveColorProp;
                break;

            case "center":
                leftAlignment.style.backgroundColor = inactiveColorProp;
                centerAlignment.style.backgroundColor = activeColorProp;
                rightAlignment.style.backgroundColor = inactiveColorProp;
                break;

            case "right":
                leftAlignment.style.backgroundColor = inactiveColorProp;
                centerAlignment.style.backgroundColor = inactiveColorProp;
                rightAlignment.style.backgroundColor = activeColorProp;
                break;
        }



    })

})

let allCells = document.querySelectorAll('.cell');

for (let i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {

    //work

    cell.addEventListener("click", (e) => {

        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        //cell properties
        cell.style.fontWeight = cellProp.bold ? 'bold' : "normal";
        cell.style.fontStyle = cellProp.italic ? 'italic' : "normal";
        cell.style.textDecoration = cellProp.underline ? 'underline' : "none";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.fontSize = cellProp.fontSize + 'px';
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGColor === "#000000" ? "transparent" : cellProp.BGColor;
        cell.style.textAlign = cellProp.alignment



        // aaply properties of ui container

        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGColor;
        switch (cellProp.alignment) { // part 2 ui

            case "left":
                leftAlignment.style.backgroundColor = activeColorProp;
                centerAlignment.style.backgroundColor = inactiveColorProp;
                rightAlignment.style.backgroundColor = inactiveColorProp;
                break;

            case "center":
                leftAlignment.style.backgroundColor = inactiveColorProp;
                centerAlignment.style.backgroundColor = activeColorProp;
                rightAlignment.style.backgroundColor = inactiveColorProp;
                break;

            case "right":
                leftAlignment.style.backgroundColor = inactiveColorProp;
                centerAlignment.style.backgroundColor = inactiveColorProp;
                rightAlignment.style.backgroundColor = activeColorProp;
                break;
        }

        let formulaBar = document.querySelector('.formula-bar');

        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;

    })
}

function activecell(address) {

    let [rid, cid] = decodeRIDCIDFromAddress(address);

    // access cell and storage object

    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);

    let cellProp = sheetDB[rid][cid];

    return [cell, cellProp];

}

function decodeRIDCIDFromAddress(address) {

    // address A1

    let rid = Number(address.slice(1)) - 1; // "1" to 0
    let cid = Number(address.charCodeAt(0)) - 65; // "A" to 0  a->65

    return [rid, cid];
}