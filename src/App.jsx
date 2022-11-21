import { useState } from 'react'
import './App.css'
import Square from './components/Square.jsx'

// Convert symbol index to symbol  
function getText(num) {
  if (num === 0) {
    return ""
  }
  if (num === 1) {
    return "x"
  }
  else {
    return "o"
  }
}

function WinnerDisplay({ winner }) {

  // Show the winner or announce that the game ended
  // in a draw.
  // If the game is still running, don't show anything.

  let text = "The player with " + getText(winner) + " won!";

  if (winner === -1) {
    text = "";
  }

  if (winner === 0) {
    text = "It's a draw!";
  }
  return <div>{text}</div>
}

export default function App() {

  // "turn" represents the current turn.
  // It is initialized to 1, because the player
  // using "x" goes first, and 1 corresponds to "x".
  const [turn, setTurn] = useState(1);

  // The game state represents the content of all squares on the board. 
  const [gameState, setGameState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);


  // Determine if there is a winner currently
  const winner = checkWinner();

  // Squares are rendered react components. 
  // For each value in the game state there
  // has to be one square with the corresponding
  // value.
  const squares =
    gameState.map((val, i) => (<Square callback={() => handleClick(i)} text={getText(val)} key={i} />));

  // This is called when the player clicks on 
  // one of the squares.
  function handleClick(clickedIndex) {

    // If the winner is not -1 that means that the game is over.
    // The game should then become "frozen" and not allow
    // any more moves to be made after that.
    if (winner === -1) {

      // Now, we need to ensure that the square the 
      // user clicked on is still empty because
      // you cannot erase a previous symbol in tic tac toe.
      if (gameState[clickedIndex] === 0) {

        // Below we make sure that the current turn is updated.
        // That means switching the "turn" variable to the 
        // "opposite" of who is currently placing down a symbols
        if (turn === 1) {
          setTurn(2);
        } else {
          setTurn(1);
        }
      }

      // Finally, we need to update the game state
      // to reflect the player clicking 
      setGameState(gameState.map((val, index) => {
        if (index === clickedIndex && val === 0) {
          return turn;
        }
        return val;
      }));

    }
  }

  function checkWinner() {

    // loop through rows
    for (let y = 0; y < 3; y++) {

      // Last keeps track of the last encountered symbol. It is intialized to the content of the first square in the current row (y-th row). 
      let last = gameState[y * 3];
      let won = true;

      for (let x = 1; x < 3; x++) {
        let current = gameState[x + y * 3];
        console.log(current)
        if (current !== last) {
          won = false;
          break;
        }
        last = current;
      }
      if (won && last !== 0) return last;
    }

    // TODO:
    // - Implement column and diagonal wins.

    // Loop through all squares to see if there is any empty space.
    // If there is no empty space and there is also no winner, it's a draw!
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === 0) {
        // There is an empty square!
        return -1; // No draw.
      }
    }
    return 0; // Draw
  }

  // TODO:
  // - Implement a restart button to resets the game.
  // - Add an AI that the player can play against.

  return (
    <main>
      <h2>Play Tic Tac Toe</h2>
      <div className="board">
        {squares}
      </div>
      <WinnerDisplay winner={checkWinner()} />
    </main>
  );
}
