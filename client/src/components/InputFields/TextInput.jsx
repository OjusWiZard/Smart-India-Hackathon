import React from "react";

const TextInput = ({ label = "", placeholder = "" }) => {
  return (
    <div>
      <div className="mt-5 flex flex-col ">
        <div className="font-regular text-grey font-12 text-shadow pl-1">
          {label}
        </div>
        <input
          type="text"
          name="email"
          placeholder={placeholder}
          className={`rounded-lg focus:outline-none`}
        />
      </div>
    </div>
  );
};

export default TextInput;
