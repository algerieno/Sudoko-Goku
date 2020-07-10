console.log("recursività")
let grid =Array(9).fill().map(()=> Array(9).fill(0))  

function possible(row, col, k) {
    for (let i= 0; i<9; i++) {
        let m = 3 * Math.floor(row/3) + Math.floor(i/3)
        let n = 3 * Math.floor(col/3) + i%3
        if ( grid[row][i] === k || grid[i][col] === k || grid[m][n] === k) {
            return false;
        } 
    }
    return true;
}
function solve() {
    //debugger;
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            if (grid[i][j] === 0) {
                for (let k=1; k<=9; k++) {
                    if (possible(i, j, k)) {
                        grid[i][j] = k;
                        if (solve()) {
                            return true;
                        } else {
                            grid[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

//solve();
//console.log(grid);

let solvebtn = document.querySelector(".solvebtn");
solvebtn.addEventListener("click", getBoardValues);

let board = document.querySelectorAll("input");


function getBoardValues() {
    let allitems = [];
    board.forEach((item) =>  allitems.push(item.value));
    fillGrid(allitems);
}

function fillGrid(items) {
    let index = 0;
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                // grid[i][j] = items[index];
                if (items[index] == "") {
                    grid[i][j] = 0;
                } else {
                    grid[i][j] = parseInt(items[index]);
                }
                index++;
            }
        }
    solve();
    printBoard();
}

function printBoard() {
    let index = 0;
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            board[index].value = grid[i][j];
            index++;
        }
    }
}