import React, { useEffect } from "react";
import { Round } from "../contracts/Round";

import "../styles/components/sidebar.css";
import Arrow from "../utils/Arrow";

export default function Sidebar({ items }: { items: Round[] }) {
  const size = "24px";
  let flipped = false;

  useEffect(() => {
    const roundsContainer = document.querySelector(".rounds-container")!;

    if (roundsContainer.scrollWidth !== roundsContainer.clientWidth) {
      // It's necessary change justify-content: center to flex-start
      // to overflow properly works appropriately
      if (!roundsContainer.classList.contains("overflowed")) {
        roundsContainer.classList.add("overflowed");
      }

      // Jump to end of scroll
      roundsContainer.scrollLeft =
        roundsContainer.scrollWidth - roundsContainer.clientWidth;
    }
  });

  return (
    <div className="sidebar">
      <div className="rounds-container scroll-style">
        {items.map((item, index) => {
          if (item === "PIN") flipped = !flipped;

          return (
            <div className="number-arrow" key={index}>
              <div className="number" style={{ lineHeight: size }}>
                {item}
              </div>
              <Arrow
                size={size}
                color="#eee"
                className={`arrow ${flipped ? "left" : "right"}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
/*  */
