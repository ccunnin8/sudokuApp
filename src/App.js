import { useState, useEffect } from "react"

const sudoku = require("./playSudoko")
const { testBoard, chooseGame, isSolved, solveBoard, generateBoard  } = sudoku


function App() {
  const [board, setBoard] = useState([])
  const [colorMap, setColormap] = useState([])
  const [difficulty, setDifficulty] = useState(2)


  useEffect(() => {
    const game = chooseGame(difficulty, testBoard)
    console.log(game.board)
    setBoard(game.board)
    setColormap(game.colorMap)
  }, [difficulty])

  const checkInput = (e, i, j) => {
    if (colorMap[i][j] === "r") {
      return false;
    }
    
    if (e.which === 69) {
      e.preventDefault()
    } else {
      const input = Number(String.fromCharCode(e.which))
      const newBoard = Array.from(board)
      newBoard[i][j] = input
      setBoard(newBoard)
    }
   
  }
  const solvePuzzle = () => {
    setBoard(solveBoard(board))
  }

  const checkSolution = () => {
    // check to see if solution is correct 
    if (isSolved(board)) {
      alert("Yes you correctly solved the game!")
    } else{
      alert("No, that is not correct")
    }
  }

  const handleDifficultyChange = e => {
    setDifficulty(e.target.value)
  }
  
  const newGame = () => {
    const game = chooseGame(difficulty, generateBoard())
    setBoard(game.board)
    setColormap(game.colorMap)
  }

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <div>
        <div>
            {
              board.map((row, i) => {
                return <p key={`row${i}`}>
                  {
                  row.map((x, j) => <input 
                    key={`piece${i}${j}`} 
                    type="number" 
                    min={0} 
                    max={9}
                    readOnly={colorMap[i][j] === "r"}
                    value={board[i][j] === 0 ? "" : board[i][j]} 
                    onChange={e => console.log(e.target.value)}
                    onKeyDown={e => checkInput(e, i, j)}
                    style={{ "color": `${colorMap[i][j] === "r" ? "red" : "blue"}`}}
                    className={`boardPiece ${(i + 1) % 3 === 0 ? "bottomBorder" : ""} ${(j + 1) % 3 === 0 ? "rightBorder" : ""}`} />)
                }</p>
              })
            }
        </div>
        <div>
          <select onChange={e => handleDifficultyChange(e) }>
            <option value={1}>Easy</option>
            <option value={2}>Medium</option>
            <option value={3}>Hard</option>
          </select>
        </div>
      </div>
      <div>
        <button onClick={() => checkSolution() }>Check</button>
        <button onClick={() => newGame() } style={{"marginLeft": "3px", "backgroundColor": "#FA6"}}>New Game</button>
        <button style={{"marginLeft": "3px", "backgroundColor": "#A22", "color": "white"}} onClick={() => solvePuzzle()}>Solve</button>
      </div>
    </div>
  );
}

export default App;
