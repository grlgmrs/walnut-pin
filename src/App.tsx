import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import ProgressionTimer from "./utils/ProgressionTimer";
import { Round } from "./contracts/Round";
// import Button from "./components/Button";

import "./styles/global.css";

function App() {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [timeIsOver, setTimeIsOver] = useState<boolean>(false);

  function handleOnStart() {
    setTimeIsOver(false);
  }

  function handleTimeIsOver(teste: string) {
    setTimeIsOver(true);
  }

  function handleAddRound() {
    handleOnStart();

    const nextRound = currentRound + 1;
    const isPin = nextRound % 7 === 0 || nextRound % 10 === 7;

    rounds.push(isPin ? "PIN" : nextRound);

    setCurrentRound(nextRound);
    setRounds(rounds);
  }

  return (
    <div id="game">
      <Sidebar items={rounds} />
      <ProgressionTimer
        duration={2.5}
        onTimeIsOver={handleTimeIsOver}
        start={!timeIsOver}
      />

      <button onClick={handleAddRound}>Add 1</button>
      {timeIsOver && <span style={{ color: "#686d76" }}>Time is over</span>}
    </div>
  );
}

export default App;
