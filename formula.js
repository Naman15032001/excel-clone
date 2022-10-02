for (let i = 0; i < rows; i++) {

    for (let j = 0; j < cols; j++) {

        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

        cell.addEventListener("blur", (e) => {

            let address = addressBar.value;

            let [activeCell, cellProp] = activecell(address);

            let enteredData = activeCell.innerText;

            if (enteredData === cellProp.value) return;


            cellProp.value = enteredData;
            //hard codeded data modify
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);

            // console.log(cellProp);
        })

    }



}

let formulaBar = document.querySelector('.formula-bar');

formulaBar.addEventListener("keydown", async (e) => {

    let inputFormula = formulaBar.value;

    if (e.key === "Enter" && inputFormula) {



        let address = addressBar.value;

        //if formula change remove old pc children and evaluate new relation

        let [cell, cellProp] = activecell(address);

        if (cellProp.formula !== inputFormula) {
            removeChildFromParent(cellProp.formula);
        }

        addChildToGraphComponent(inputFormula, address);

        //check formula is cyclic or not then only eval
        // console.log(graphComponentMatrix);
        let cycleResponse = isGraphCyclic(graphComponentMatrix);

        if (cycleResponse) {
            //alert('Your formula is cyclic');
            let response = confirm("Your formula is cylic do you want to trace your path");
            while (response === true) {
                // keep on tracking color until user is satisfied
                await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse);
                response = confirm("Your formula is cylic do you want to trace your path");
            }
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }

        let evaluatedValue = evaluateFormula(inputFormula);




        // to update ui and cell prop in db

        setCellUIAndCellProp(evaluatedValue, inputFormula, address);

        addChildToParent(inputFormula);

        updateChildrenCells(address);

        //console.log(sheetDB);


    }
});

function addChildToGraphComponent(formula, childAddress) {

    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);

    let encodedFormula = formula.split(' ');

    for (let i = 0; i < encodedFormula.length; i++) {

        let asciiValue = encodedFormula[i].charCodeAt(0);

        if (asciiValue >= 65 && asciiValue <= 90) {

            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);

            graphComponentMatrix[prid][pcid].push([crid, ccid]);

        }

    }

}

function removeChildFromGraphComponent(formula, childAddress) {

    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);

    let encodedFormula = formula.split(' ');

    for (let i = 0; i < encodedFormula.length; i++) {

        let asciiValue = encodedFormula[i].charCodeAt(0);

        if (asciiValue >= 65 && asciiValue <= 90) {

            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);

            graphComponentMatrix[prid][pcid].pop();

        }

    }


}

function updateChildrenCells(parentAddress) {

    let [parentCell, parentCellProp] = activecell(parentAddress);

    let children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {

        let childAddress = children[i];

        let [childCell, childCellProp] = activecell(childAddress);

        let childFormula = childCellProp.formula;

        let childEvaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(childEvaluatedValue, childFormula, childAddress);

        updateChildrenCells(childAddress);
    }



}

function addChildToParent(formula) {

    let childAddress = addressBar.value;

    let encodedFormula = formula.split(' ');

    for (let i = 0; i < encodedFormula.length; i++) {

        let asciiValue = encodedFormula[i].charCodeAt(0);

        if (asciiValue >= 65 && asciiValue <= 90) {

            let [parentCell, parentCellProp] = activecell(encodedFormula[i]);

            parentCellProp.children.push(childAddress);

            //console.log(parentCellProp);

        }

    }

}

function removeChildFromParent(formula) {

    let childAddress = addressBar.value;

    let encodedFormula = formula.split(' ');

    for (let i = 0; i < encodedFormula.length; i++) {

        let asciiValue = encodedFormula[i].charCodeAt(0);

        if (asciiValue >= 65 && asciiValue <= 90) {

            let [parentCell, parentCellProp] = activecell(encodedFormula[i]);

            let idx = parentCellProp.children.indexOf(childAddress);

            parentCellProp.children.splice(idx, 1);

            // console.log(parentCellProp);

        }

    }


}

function evaluateFormula(formula) {

    let encodedFormula = formula.split(' ');

    for (let i = 0; i < encodedFormula.length; i++) {

        let asciiValue = encodedFormula[i].charCodeAt(0);

        if (asciiValue >= 65 && asciiValue <= 90) {

            let [cell, cellProp] = activecell(encodedFormula[i]);

            encodedFormula[i] = cellProp.value;


        }

    }

    let decodedFormula = encodedFormula.join(' ');
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {

    let [cell, cellProp] = activecell(address);

    cell.innerText = evaluatedValue; //ui update

    cellProp.value = evaluatedValue; //db update

    cellProp.formula = formula;



}