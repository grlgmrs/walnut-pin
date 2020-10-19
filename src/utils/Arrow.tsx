import React from "react";

export interface ArrowBase {
  className?: string;
  color: string;
  size: string;
}

export default function Arrow(args: ArrowBase) {
  return (
    <svg
      className={args.className}
      width={args.size}
      height={args.size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.25 6.33494C15.9167 7.29719 15.9167 9.70281 14.25 10.6651L4.5 16.2942C2.83333 17.2565 0.75 16.0537 0.75 14.1292L0.75 2.87084C0.75 0.946335 2.83333 -0.25648 4.5 0.705771L14.25 6.33494Z"
        fill={args.color}
      />
    </svg>
  );
}
