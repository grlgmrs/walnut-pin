import React from "react";
import { Turn } from "../contracts/Turn";

import "../styles/components/bubble-message.css";

interface BubbleMessageProps {
  value: Turn;
  active: boolean;
}

export default function BubbleMessage(props: BubbleMessageProps) {
  console.log("bubble message", props);

  return (
    <div className={`bubble-message ${props.active && "active"}`}>
      {props.active ? (
        <div className="loader">
          <div className="loader-1" />
          <div className="loader-2" />
          <div className="loader-3" />
        </div>
      ) : (
        props.value
      )}
    </div>
  );
}
