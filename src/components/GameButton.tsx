import React from "react";
import { Turn } from "../contracts/Turn";

import "../styles/components/game-button.css";

interface GameButtonProps {
  text?: string;
  value?: Turn;
  disabled?: boolean;
  onClick: Function;
  type?: "primary" | "secondary";
  className?: string;
}

export default function GameButton({ type = "primary", ...props }: GameButtonProps) {
  return (
    <button
      className={`game-button ${type} ${props.className}`}
      onClick={() => props.onClick(props.value)}
      disabled={props.disabled}
    >
      {props.text ? props.text : props.value}
    </button>
  );
}
