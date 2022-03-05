import React from "react";
import { ReactComponent as DownArrow } from "../../assets/icons/down-arrow.svg";

const Certificate = ({ certificate }) => {
  const CERTIFICATE = {
    EWS: "#119199",
    CASTE: "#256FEF",
    INCOME: "#EF5DA8",
    "10th": "#5D5FEF",
  };

  return (
    <div className={`text-white rounded-lg py-5 bg-[#EF5DA8] w-[220px]`}>
      <div className="font-bold text-2xl pl-5">EWS Certificate</div>
      <div className="mt-3 pl-5">123456789</div>
      <div className="mt-7">
        <div className="flex justify-end pr-5">
          <DownArrow />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
