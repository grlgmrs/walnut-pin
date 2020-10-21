import React from "react";
import Arrow from "./Arrow";

import "../styles/utils/round-direction-arrows.css";
import { RoundDirection } from "../contracts/Turn";

interface RoundDirectionArrowsProps {
  direction: RoundDirection;
}

export default function RoundDirectionArrows(props: RoundDirectionArrowsProps) {
  return (
    <div className={`round-direction ${props.direction}`}>
      <Arrow size="32px" color="#373a40" className="round-direction-arrow" />
      <Arrow size="32px" color="#373a40" className="round-direction-arrow" />
      <Arrow size="32px" color="#373a40" className="round-direction-arrow" />
    </div>
  );
}
