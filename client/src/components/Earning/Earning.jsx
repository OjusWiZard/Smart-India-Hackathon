import React from "react";
import { ReactComponent as RightArrow } from "../../assets/icons/right-arrow.svg";

export default function Earning({ name, amount }) {
  return (
    <div className="mt-5 px-5 flex h-[106px] justify-between items-center bg-white rounded-md py-8">
      <div className="ml-2">
        <div className="font-regular text-[#828282] text-[16px] ">{name}</div>
        <div className="font-bold text-[#11142D] text-[32px] ">₹{amount}</div>
      </div>
      <div className="mr-2">
        <RightArrow />
      </div>
    </div>
  );
}
