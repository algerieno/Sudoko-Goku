console.log("recursività")
let grid =Array(9).fill().map(()=> Array(9).fill(0))  
let board = document.querySelectorAll("input");
let solvebtn = document.querySelector(".solvebtn");
let resetbtn = document.querySelector(".resetbtn");

solvebtn.addEventListener("click", getBoardValues);
resetbtn.addEventListener("click", resetBoard);

board.forEach((input, index) => input.addEventListener("input", () => playInput(input, index)))
board.forEach((input) => input.addEventListener("focus", () => input.classList.toggle("selectedInput")))
board.forEach((input) => input.addEventListener("focusout", () => input.classList.toggle("selectedInput")))



function playInput(input, index) {
    let i = Math.floor(index/9);
    let j = index % 9;
    grid[i][j] = input.value;
    //console.log(`i= ${i}, j= ${j}, input= ${input}`)
    if (isValid()) {
        console.log("allgood")
        board.forEach((input) => {
            if (input.className.includes("wrongInput")) input.classList.toggle("wrongInput")
        })
    } else {
        console.log("nah bruh")
        board.forEach((input) => input.classList.toggle("wrongInput"))
    }
}


function disableBoard() {
    board.forEach((input) => {
        input.disabled = true;
        input.className = "disabled"
    })
}

function isValid() {
    for (let row =0; row <9; row++) {
        for (let col=0; col<9; col++) {
            let k = grid[row][col];
            let occur = 0;
            for (let i= 0; i<9; i++) {
                let m = 3 * Math.floor(row/3) + Math.floor(i/3)
                let n = 3 * Math.floor(col/3) + i%3
                if (grid[row][i] === k) if (k!=0) occur ++;
                 if (grid[i][col] === k) if (k!=0) occur ++;
                 if (grid[m][n] === k) if (k!=0) occur ++;
            }
            if (occur > 3) {
                return false;
            }
        }
    }
    return true;
}

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

function getBoardValues() {
    console.log(grid);
    let allitems = [];
    board.forEach((item) =>  {
        allitems.push(item.value);
    });
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
    if (!isValid()) {
        alert("Board is not valid");
        //resetBoard();
    } else {
        disableBoard();
        solve();
        printBoard();
    }
    
}

function printBoard() {
    let index = 0;
    solvebtn.className = "disabledbtn"
    solvebtn.disabled = true
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            board[index].value = grid[i][j];
            index++;
        }
    }
}
function resetBoard() {
    let index = 0;
    solvebtn.className = "solvebtn"
    solvebtn.disabled = false
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            board[index].value = "";
            grid[i][j] = 0;
            index++;
        }
    }
    document.querySelectorAll("input").forEach((item) => {
        item.disabled = false
        item.className = ""
    });
}