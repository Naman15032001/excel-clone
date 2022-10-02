let ctrlKey;

let copyBtn = document.querySelector('.copy');
let cutBtn = document.querySelector('.cut');
let pasteBtn = document.querySelector('.paste');

document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})

document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
});

for (let i = 0; i < rows; i++) {

    for (let j = 0; j < cols; j++) {

        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
    }
}

let rangeStorage = [];

function handleSelectedCells(cell) {

    cell.addEventListener("click", (e) => {

        //selects range work

        if (!ctrlKey) return;

        if (rangeStorage.length >= 2) {
            handleSelectedCellsUI();
            rangeStorage = [];
        }

        cell.style.border = "3px solid #218c74"

        let rid = Number(cell.getAttribute("rid"));

        let cid = Number(cell.getAttribute("cid"));

        rangeStorage.push([rid, cid]);

    })

}

function handleSelectedCellsUI() {

    for (let i = 0; i < rangeStorage.length; i++) {

        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey"
    }

}

let copyData = [];
copyBtn.addEventListener("click", (e) => {

    if (rangeStorage.length < 2) return;

    copyData = [];
    // console.log("yo",rangeStorage);
    for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {

        let copyRow = [];
        //console.log("here",rangeStorage);
        for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {

            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp)
            console.log("hello");

        }

        copyData.push(copyRow);
    }
    console.log(copyData);
    handleSelectedCellsUI();
});

let cutData = [];
cutBtn.addEventListener("click", (e) => {

    if (rangeStorage.length < 2) return;

    cutData = [];
    for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {

        let cutRow = [];
        for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {
            let cellProp = sheetDB[i][j];
            let temp= Object.assign({}, cellProp);
            cutRow.push(temp);

            cellProp.value = "";
            cellProp.bold = false
            cellProp.italic = false
            cellProp.underline = false
            cellProp.fontFamily = "monospace";
            cellProp.fontSize = 14
            cellProp.fontColor = "#0000000";
            cellProp.BGColor = "#0000000"
            cellProp.alignment = "left";

            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }

        cutData.push(cutRow);
    }
    console.log("naman",cutData);
    handleSelectedCellsUI();
})

pasteBtn.addEventListener("click", (e) => {

    if (rangeStorage.length < 2) return;

    let rowDiff = Math.abs(rangeStorage[1][0] - rangeStorage[0][0]);
    let colDiff = Math.abs(rangeStorage[1][1] - rangeStorage[0][1]);

    //paste cells data work

    let address = addressBar.value;
    let [strow, stcol] = decodeRIDCIDFromAddress(address);

    let erow = strow + rowDiff;
    let ecol = stcol + colDiff;

    console.log(copyData);
    if(copyData.length===0){
        console.log("hello");
        console.log(cutData);
        copyData=cutData
    }

    for (let i = strow, r = 0; i <= erow; i++, r++) {
        for (let j = stcol, c = 0; j <= ecol; j++, c++) {

            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if (!cell) continue;
            //db change

            let data = copyData[r][c]
            let cellProp = sheetDB[i][j];
            cellProp.value = data.value;
            cellProp.bold = data.bold
            cellProp.italic = data.italic
            cellProp.underline = data.underline
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontSize = data.fontSize
            cellProp.fontColor = data.fontColor;
            cellProp.BGColor = data.BGColor
            cellProp.alignment = data.alignment;

            //ui
            cell.click();

        }
    }




});