import React, { useState, useEffect } from "react";
import css from "./App.css"
import Snake from "./Snake";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  function startGame() {
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    document.getElementById("start").style.display = "none";
  }
  return (
    <div className="App">
      {gameOver && <h1>Game Over</h1>}
      <button id="start" onClick={startGame}>Start game</button>
      <h2>Score: {score}</h2>
      {gameStarted && gameOver===false && <Snake setGameOver={setGameOver} setScore={setScore} score={score}/>}
    </div>
  );
}

export default App;
