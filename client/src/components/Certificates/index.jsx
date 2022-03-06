import React from "react";
import DownArrow from "../../assets/icons/DownArrow.js";

const Certificate = ({ certificate }) => {
  const ColourConstants = {
    ews: "#119199",
    caste: "#256FEF",
    income: "#EF5DA8",
    "10th": "#5D5FEF",
  };  
  return (
    <div
      className={`text-white rounded-lg py-5 px-4 bg-[${ColourConstants[certificate]}] w-[220px]`}
    >
      <div className="font-bold text-2xl capitalize">
        {certificate} Certificate
      </div>
      <div className="mt-3">123456789</div>
      <div className="mt-7">
        <div className="flex justify-end pr-5">
          <DownArrow arrowColor={ColourConstants[certificate]} />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
