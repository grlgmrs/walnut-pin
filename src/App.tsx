import React, { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import BubbleMessage from "./components/BubbleMessage";
import GameButton from "./components/GameButton";
import Modal from "./components/Modal";

import ProgressionTimer from "./utils/ProgressionTimer";
import RoundDirectionArrows from "./utils/RoundDirectionArrows";

import { Turn, PlayerTurn, RoundDirection } from "./contracts/Turn";

import "./styles/global.css";
import "./styles/app.css";

import winSvg from "./assets/undraw_win.svg";
import loseSvg from "./assets/undraw_lose.svg";

function App() {
  const durationTurn = 2;
  const finishGameStyle = {
    win: {
      title: "Você ganhou!",
      image: winSvg,
      description: (r: number) =>
        `Parabéns, você derrotou o oponente Computador 1 no ${r}º round!`,
    },
    lose: {
      title: "Poxa! Você perdeu...",
      image: loseSvg,
      description: (r: number) => `Você perdeu no ${r}º round...`,
    },
  };

  const [currentRound, setCurrentRound] = useState<number>(0);
  const [rounds, setRounds] = useState<Turn[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<PlayerTurn>(
    choosePlayerWillStarts()
  );
  const [roundDirection, setRoundDirection] = useState<RoundDirection>("right");

  useEffect(() => {
    if (currentPlayerTurn === "computer" && !isGameOver) {
      // Computer's has 5% of chance to lose by timeout
      const timeToComputerChoose = durationTurn * Math.random() + durationTurn * 0.05;

      setTimeout(() => {
        handleComputerTurnsChoice();
      }, timeToComputerChoose * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayerTurn]);

  function getTurnsCorrectChoice(): Turn {
    const roundNumber = currentRound + 1;
    const isPin = roundNumber % 7 === 0 || roundNumber % 10 === 7;

    return isPin ? "PIN" : roundNumber;
  }

  function getTurnsIncorrectCoice(): Turn {
    const roundNumber = currentRound + 1;
    const isPin = roundNumber % 7 === 0 || roundNumber % 10 === 7;

    return isPin ? roundNumber : "PIN";
  }

  function choosePlayerWillStarts(): PlayerTurn {
    return Math.random() >= 0.5 ? "user" : "computer";
  }

  function chooseNextPlayer(): PlayerTurn {
    return currentPlayerTurn === "user" ? "computer" : "user";
  }

  function changeRoundDirection() {
    setRoundDirection(roundDirection === "left" ? "right" : "left");
  }

  function handleComputerTurnsChoice() {
    if (isGameOver) return;

    // Computer's has 5% of chance to lose by incorrect answer
    const computerChoice =
      Math.random() <= 0.05 ? getTurnsIncorrectCoice() : getTurnsCorrectChoice();

    checkChoiceAndMovesNextRound(computerChoice);
  }

  function handleUserTurnsChoice(turn: Turn) {
    if (isGameOver) return;

    checkChoiceAndMovesNextRound(turn);
  }

  function checkChoiceAndMovesNextRound(choice: Turn) {
    const correctChoice = getTurnsCorrectChoice();

    rounds.push(correctChoice);

    setRounds(rounds);

    if (choice !== correctChoice) {
      setIsGameOver(true);
      return;
    }

    if (correctChoice === "PIN") {
      changeRoundDirection();
    }

    setCurrentRound(currentRound + 1);
    setCurrentPlayerTurn(chooseNextPlayer());
  }

  function handlePlayAgain() {
    console.log("teste");

    setRounds([]);
    setCurrentRound(0);
    setIsGameOver(false);
  }

  return (
    <div id="game">
      <div className="top-area">
        <Sidebar items={rounds} className="top-area-sidebar" />
        <ProgressionTimer
          duration={durationTurn}
          onTimeIsOver={() => setIsGameOver(true)}
          timeIsOver={isGameOver}
          className="progression-timer-sidebar"
        />
      </div>

      <div className="controls-container">
        <BubbleMessage
          value={
            // Show incorrect answer instead round number if computer looses
            currentPlayerTurn === "computer" && isGameOver
              ? getTurnsIncorrectCoice()
              : rounds[rounds.length - 1]
          }
          active={currentPlayerTurn === "computer" && !isGameOver}
        />
        <RoundDirectionArrows direction={roundDirection} />

        <GameButton
          value={
            // Show the choice for current round or the latest users choice
            currentPlayerTurn !== "user" ? rounds[rounds.length - 1] : currentRound + 1
          }
          onClick={handleUserTurnsChoice}
          disabled={currentPlayerTurn !== "user"}
        />
        <GameButton
          value={"PIN"}
          onClick={handleUserTurnsChoice}
          type="secondary"
          disabled={currentPlayerTurn !== "user"}
        />
      </div>

      {isGameOver && (
        <Modal
          title={finishGameStyle[currentPlayerTurn === "user" ? "lose" : "win"].title}
          description={finishGameStyle[
            currentPlayerTurn === "user" ? "lose" : "win"
          ].description(currentRound + 1)}
          image={finishGameStyle[currentPlayerTurn === "user" ? "lose" : "win"].image}
          onClick={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;
