import React from "react";

const DownArrow = ({ arrowColor }) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16.7143" cy="16.7143" r="16.7143" fill="white" />
      <path
        d="M10 14L17 21L24 14"
        stroke={arrowColor}
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownArrow;
