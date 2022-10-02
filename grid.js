let rows = 100;
let cols = 26;

//address-col-cont
let addressColCont = document.querySelector(".address-col-cont");

for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement('div');
    addressCol.setAttribute('class', 'address-col');
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol);
}

//address-row-cont

let addressrowCont = document.querySelector(".address-row-cont");

let cellsCont = document.querySelector(".cells-cont");

for (let i = 0; i < cols; i++) {
    let addressRow = document.createElement('div');
    addressRow.setAttribute('class', 'address-row');
    const letter = String.fromCharCode(65 + i)
    addressRow.innerText = letter;
    addressrowCont.appendChild(addressRow);
}

for (let i = 0; i < 100; i++) {

    let rowCont = document.createElement('div');
    rowCont.setAttribute("class",'row-cont');

    for (let j = 0; j < 26; j++) {

        let cell = document.createElement('div');
        cell.setAttribute('class',"cell");
        cell.setAttribute("contenteditable",true);
        //Attributes for cell and storage identification
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("spellcheck",false)
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell,i,j);
    }

    cellsCont.appendChild(rowCont);
}

//address-bar

let addressBar = document.querySelector('.address-bar');

function addListenerForAddressBarDisplay(cell,i,j){

    cell.addEventListener("click",(e)=>{

        let rowId=i+1;
        let colId = String.fromCharCode(65 + j);
        addressBar.value=`${colId}${rowId}`;
    });

}



//by default click on first cell via Dom

/*let firstCell=document.querySelector(".cell");

firstCell.click();*/

