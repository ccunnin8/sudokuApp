/**
 * Name: Corey Cunningham
 * Class: CS 325
 * Assignment: Portfolio Project
 * Description: Implementation of command line sudoku, sudoku board solver, verifier, and 
 * board generator 
 */
const prompt = require("prompt-sync")({ signint: true })

// colors for console 
const red = "\x1b[31m"
const blue = "\x1b[34m"
const white = "\x1b[37m"


//  *********** TEST BOARDS  *******************
const testBoard = [
    [4, 3, 5, 2, 6, 9, 7, 8, 1],
    [6, 8, 2, 5, 7, 1, 4, 9, 3],
    [1, 9, 7, 8, 3, 4, 5, 6, 2],
    [8, 2, 6, 1, 9, 5, 3, 4, 7],
    [3, 7, 4, 6, 8, 2, 9, 1, 5],
    [9, 5, 1, 7, 4, 3, 6, 2, 8],
    [5, 1 ,9, 3, 2, 6, 8, 7, 4],
    [2, 4, 8, 9, 5, 7, 1, 3, 6],
    [7, 6, 3, 4, 1, 8, 2, 5, 9],
]

const testSolveBoard = [
    [4, 3,  5,  "X",  6, "X", 7, 8, 1],
    [6, 8, "X", "X", "X", 1, "X", 9, 3],
    [1, 9,  7,   8,   3,  4,  5,  6, 2],
    [8, 2, "X",  1,   9,  5,  "X",  4, 7],
    [3, 7,  4,   6,   "X",  "X",  9,  1, 5],
    [9, 5, "X", "X",  "X",  "X",  "X",  2, 8],
    [5,"X", "X",   3,   2,  "X",  8,  7, 4],
    [2, 4,  "X",   9,   5,  "X",  1,  3, 6],
    [7, 6,  "X",   4,   1,  8,  2,  5, 9],
]

const testHard = [
[8, "X", "X", "X", "X", "X", "X", "X", "X"],
["X", "X", 3, 6, "X", "X", "X", "X", "X"],
["X", 7, "X", "X", 9, "X", 2, "X", "X"],
["X", 5, "X", "X", "X", 7, "X", "X", "X"],
["X", "X", "X", "X", 4, 5, 7, "X", "X"],
["X", "X", "X", 1, "X", "X", "X", 3, "X"],
["X", "X", 1, "X", "X", "X", "X", 6, 8],
["X", "X", 8, 5, "X", "X", "X", 1, "X"],
["X", 9, "X", "X", "X", "X", 4, "X", "X"]
]

const blankBoard = [
    ["X","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X","X"],
]

// ************************************************

function generateBoard() {
    // generates a completed board generated randomly 
    let count = 0
    let blankCopy = JSON.parse(JSON.stringify(blankBoard))

    // fill 10 spaces on a board randommly (ensure that it doesn't violate)
    while (count <= 10) {
        let row = Math.floor(Math.random() * 8)
        let col = Math.floor(Math.random() * 8)
        if (blankCopy[row][col] === "X") {
            for (let i = 1; i <= 9; i++) {
                if (numberIsPossible(blankCopy, row, col, i)) {
                    blankCopy[row][col] = i 
                    count += 1
                    break;
                }
            }
        }
    }
    return solveBoard(blankCopy)
}


function numberIsPossible(board, row, col, target) {
    const innerSquareSize = Math.sqrt(board.length)
    // checks row/col/square to see if theres a duplicate 

    // check if target in row 
    for (let x of board[row]) {
        if (x === target) { 
            return false 
        }
    }

    // check if target in column
    for (let i = 0; i < board.length; i++) {
        if (board[i][col] === target) {
            return false 
        }
    }
    const squareRow = Math.floor(row / innerSquareSize) * innerSquareSize
    const squareCol = Math.floor(col / innerSquareSize) * innerSquareSize
    
    // loop through all inner squares (3x3 for board of 9x9)
    for (let i = squareRow; i < squareRow + innerSquareSize; i++) {
        for (let j = squareCol; j < squareCol + innerSquareSize; j++) {
            if (board[i][j] === target) {
                return false 
            }
        }
    }
   return true 
}

function solveBoardRec(Board) {
    // backtracking algorithm 
    // finds an empty space on board, fills it with all possible solutions until
    // it finds a complete board 
    const nextLocation = findNextLocation(Board)
    if (nextLocation.length === 0) {
       return Board 
    }
    const [row, column] = nextLocation
   
    // loop through all possible numbers (1-9) insert into board at row, col if possible 
    for (let i = 1; i <= 9; i ++) {
        if (numberIsPossible(Board, row, column, i)) {
            Board[row][column] = i
            solveBoardRec(Board)
        }
    } 
    
    // if no valid locations erase last number inserted into board and check next number in same coord
    if (findNextLocation(Board).length !== 0 ){
        Board[row][column] = "X"
    }
    return Board 
}

function findNextLocation(Board) {
    // loops through board to find the next "X" space 
    for (let i = 0; i < Board.length; i++ ){
        for (let j = 0; j < Board.length; j++) {
            if (!Number.isInteger(Board[i][j])) {
                return [i, j]
            }
        }
    }
    return [] 
}

function solveBoard(board) {
    // creates a copy of the board and uses it solve the board 
    const boardCopy = JSON.parse(JSON.stringify(board))
    
    return solveBoardRec(boardCopy)
}

function checkRows(board) { 
    // loops through all rows and ensures that a row has valid input (1-9) and 9 unique numbers
    // returns boolean 
    for (let row of board) {
        const rowSet = new Set()
        for (let x of row){ 
            if (!Number.isInteger(x) || x < 1 || x > 9) {
                return false
            } 
            if (rowSet.has(x)) {
                return false
            }
            rowSet.add(x)
        }
        if (rowSet.size !== 9) {
            return false 
        }
    }
    return true 
}

function checkColumns(board) {
    // loops through every column and determines if all columns have valid input (1-9) and unique 
    // input, returns boolean 
    const maxInput = board.length
    for (let col = 0; col < maxInput; col++) {
        const colSet = new Set()
        for (let row = 0; row < maxInput; row++) {
            const x = board[row][col]
            if (!Number.isInteger(x) || x < 1 || x > maxInput) {
                return false
            } 
            if (colSet.has(x)) {
                return false 
            }
            colSet.add(x)
        }  
        if (colSet.size !== maxInput) {
            return false 
        }
    }
    return true 
}

function checkSquares(board) {
    // loops through all squareSize squares and determines if 
    // every square has valid input (1-9) and 9 unqiue numbers
    // returns boolean
    
    const squareSize = Math.sqrt(board.length) 

    for (let row = 0; row < board.length; row += squareSize) {
        for (let col = 0; col < board.length; col += squareSize) {
            let squareSet = new Set()
            for (let i = 0; i < squareSize; i++) {
                for (let j = 0; j < squareSize; j++) {
                    let x = board[row + i][col + j]
                    if (squareSet.has(x)) {
                        return false 
                    }
                    squareSet.add(x)
                }
            }
            if (squareSet.size !== squareSize * squareSize) {
                return false 
            }
        }
    }
    return true 
}

function isSolved(board) {
    // returns true if board is complete and solved, otherwise returns false
    return checkRows(board) && checkColumns(board) && checkSquares(board)
}

function chooseGame(difficulty, board) {
    // takes a solved board and returns an object with
    // a) a board where several pieces are Xs
    // b) a 2d array map of colors to display to player 

    let boardCopy = JSON.parse(JSON.stringify(board))
    let colors = new Array(9).fill(null).map(x => new Array(9).fill("r"))
  
    // remove pieces from completed board and replace with X, update color 2d array
    let numToDelete = difficulty * 10
    for (let i = 0; i < numToDelete; i ++) {
        const row = Math.floor(Math.random() * 8)
        const col = Math.floor(Math.random() * 8)
        boardCopy[row][col] = "X"
        colors[row][col] = "b"
    }
    return {
        board: boardCopy,
        colorMap: colors 
    }
}

function initializeGame() {
    // allows command line game play 
    let difficulty
    let error = ""
    while (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 3) {
        process.stdout.write('\033c')
        console.log(`
        \nWelcome to My Command Line Sudoko Game!
        \nPlease choose you're level of difficulty
        \n\t1. Difficult
        \n\t2. Medium
        \n\t3. Easy\n`)
        difficulty = Number(prompt("Level (1-3): "))
    }
    let game = chooseGame(difficulty, testBoard);
    const header = ["A","B","C","D","E","F","G","H","I"]
    while (!isSolved(game.board)) {
        process.stdout.write('\033c')
        console.error(error.toLocaleUpperCase())
        console.log("   " + header.map(x => " " + x).join(" "))
        for (let row = 0; row < game.board.length; row++) {
            let output = `${row + 1} |`
            for (let col = 0; col < game.board.length; col++) {
                if (game.colorMap[row][col] === "r") {
                    output += ` ${red}${game.board[row][col]} ${white}`
                } else {
                    output += ` ${blue}${game.board[row][col]} ${white}`
                }
            }
            console.log(output)
        }
        

        let row = Number(prompt("Row: "))
        if (!Number.isInteger(row) || row < 1 || row > 9) {
            error = "please provide a valid input"
            continue 
        }

        let col = prompt("Column: ")
        if (col.length !== 1 || col.charCodeAt(0) < 65 || col.charCodeAt(0) > 73) {
            error = "please provide a valid input"
            continue 
        }
        let colConvertedToNum = header.indexOf(col)
        if (game.colorMap[row - 1][colConvertedToNum] !== "b") {
            error = "you can't change that input!"
            continue 
        }
        let ans = Number(prompt("Number: "))
        if (!Number.isInteger(ans) || ans < 1 || ans > 9) {
            error = "that's not a valid choice"
            continue 
        }
      
        let quit = prompt("Quit: (y o n): ")
        if (quit === "y") {
            break 
        }
        error = ""
        game.board[row - 1][colConvertedToNum] = ans 
    }
    if (isSolved(game.board)) {
        console.log("Congratulations you solved the puzzle!")
    }
}

if (typeof require !== "undefined" && require.main === module) {
    initializeGame()
}
