function colorPromise() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);

    })


}



async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {

    // dependency -> visited , dfsvisited 2d array
    console.log("here",cycleResponse)
    let [srcr, srcc] = cycleResponse;

    let visited = [];

    let dfsvisited = [];

    for (let i = 0; i < rows; i++) {

        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsVisitedRow);
    }

    //console.log(dfsvisited);

    let isCycle = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsvisited);

    if (isCycle == true) return Promise.resolve(true);
    return Promise.resolve(false);

}



//coloring celll for tracking

async function dfsCycleDetectionTracePath(graphComponentMatrix, i, j, visited, dfsvisited) {

    dfsvisited[i][j] = true;
    visited[i][j] = true;

    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

    
    cell.style.backgroundColor = 'lightblue';
    await colorPromise();


    //A1 -[[0,1],[1,0]]

    for (let children = 0; children < graphComponentMatrix[i][j].length; children++) {

        let [crid, ccid] = graphComponentMatrix[i][j][children];

        if (visited[crid][ccid] == false) {
            let isCycle = await dfsCycleDetectionTracePath(graphComponentMatrix, crid, ccid, visited, dfsvisited);
            if (isCycle === true) {


                cell.style.backgroundColor = 'transparent';
                await colorPromise();

                return Promise.resolve(true);
            }
        } else if (visited[crid][ccid] === true && dfsvisited[crid][ccid] === true) {

            let cyclicCell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`);

            
            cyclicCell.style.backgroundColor = 'lightsalmon';
            await colorPromise();

            
            cyclicCell.style.backgroundColor = 'transparent';
            await colorPromise();

            cell.style.backgroundColor = 'transparent';

            return Promise.resolve(true);
        }

    }

    dfsvisited[i][j] == false;

    return Promise.resolve(false);

}