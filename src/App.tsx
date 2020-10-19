import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import { Round } from "./contracts/Round";
// import Button from "./components/Button";

import "./styles/global.css";

function App() {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [rounds, setRounds] = useState<Round[]>([]);

  function handleAddRound() {
    const nextRound = currentRound + 1;
    const isPin = nextRound % 7 === 0 || nextRound % 10 === 7;

    rounds.push(isPin ? "PIN" : nextRound);

    setCurrentRound(nextRound);
    setRounds(rounds);
  }

  return (
    <div id="game">
      <Sidebar items={rounds} />

      <button onClick={handleAddRound}>Add 1</button>
    </div>
  );
}

export default App;
