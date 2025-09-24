import React from "react";
import "./PlayIcon.css";

export default function PlayIcon({ size = 80 }) {
  return (
    <svg
      className="play-icon"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon 
        className="play-triangle"
        points="30,20 80,50 30,80"
        fill="none"
        stroke="white"
        strokeWidth="4"
      />
    </svg>
  );
}