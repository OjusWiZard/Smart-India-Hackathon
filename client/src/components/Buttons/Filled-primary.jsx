import React from "react";

const FilledPrimary = ({ text, disabled, icon, loading, className }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-primary-dark opacity-90 hover:opacity-100 rounded-md w-full py-4 
      text-white flex justify-around items-start 
      font-bold text-base ${className && className}`}
    >
      {icon && <img src={icon} alt="Icon" />}
      {loading ? "Loading..." : text}
    </button>
  );
};

export default FilledPrimary;
