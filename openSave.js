let downloadBtn = document.querySelector('.download');
let openBtn = document.querySelector('.open');

downloadBtn.addEventListener("click", (e) => {
    let data = JSON.stringify([sheetDB, graphComponentMatrix]);
    const file = new Blob([data], {
        type: "applicaion/json"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
});

openBtn.addEventListener('click', (e) => {

    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener('change', (e) => {

        let fr = new FileReader();

        let files = input.files

        let fileObj = files[0];

        fr.readAsText(fileObj);

        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);

            addSheetBtn.click(); // basic new sheet will be created

            //SheetDb , graphComponent
            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];

            collectedSheetDB[collectedSheetDB.length - 1] = sheetDB;
            collectedGraphComponent[collectedGraphComponent.length - 1] = graphComponentMatrix

            /*for (let i = 0; i < rows; i++) {

                for (let j = 0; j < cols; j++) {

                    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
                    cell.click();
                }
            }*/

            handleSheetProperties();
        })


    });




})