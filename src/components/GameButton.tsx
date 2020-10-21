import React from "react";
import { Turn } from "../contracts/Turn";

import "../styles/components/game-button.css";

interface GameButtonProps {
  value: Turn;
  disabled?: boolean;
  onClick: (turn: Turn) => void;
  type?: "primary" | "secondary";
}

export default function GameButton({ type = "primary", ...props }: GameButtonProps) {
  return (
    <button
      className={`game-button ${type}`}
      onClick={() => props.onClick(props.value)}
      disabled={props.disabled}
    >
      {props.value}
    </button>
  );
}
