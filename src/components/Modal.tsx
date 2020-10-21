import React from "react";

import "../styles/components/modal.css";

import GameButton from "./GameButton";

interface ModalProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

export default function Modal(props: ModalProps) {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="image-modal">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="title-modal">{props.title}</div>
        <div className="description-modal">{props.description}</div>
        <GameButton
          className="play-again-modal"
          text="Jogar novamente!"
          type="secondary"
          onClick={props.onClick}
        />
      </div>
    </div>
  );
}
