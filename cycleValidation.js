let collectedGraphComponent=[];

let graphComponentMatrix = [];

// true - cycle
// 
function isGraphCyclic(graphComponentMatrix) {

    // dependency -> visited , dfsvisited 2d array

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

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            if (visited[i][j] === false) {

                let isCycle = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsvisited);

                if (isCycle === true) {
                    return [i, j];
                }

            }

        }
    }

    return null;


}

function dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsvisited) {

    dfsvisited[i][j] = true;
    visited[i][j] = true;

    //A1 -[[0,1],[1,0]]

    for (let children = 0; children < graphComponentMatrix[i][j].length; children++) {

        let [crid, ccid] = graphComponentMatrix[i][j][children];

        if (visited[crid][ccid] == false) {
            let isCycle = dfsCycleDetection(graphComponentMatrix, crid, ccid, visited, dfsvisited);
            if (isCycle === true) {
                return true;
            }
        } else if (visited[crid][ccid] === true && dfsvisited[crid][ccid] === true) {
            return true;
        }

    }

    dfsvisited[i][j] == false;

    return false;

}