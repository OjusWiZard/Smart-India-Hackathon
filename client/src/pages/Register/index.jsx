import React from "react";
import { ReactComponent as FileIcon } from "../../assets/icons/file-icon.svg";
import { ReactComponent as Certisetu } from "../../assets/heading-vectors/CERTISETU.svg";
import { ReactComponent as GetAhead } from "../../assets/heading-vectors/get-ahead.svg";
import { ReactComponent as GetAScholarship } from "../../assets/heading-vectors/get-a-scholarship.svg";
import { ReactComponent as Tick } from "../../assets/icons/purple-tick.svg";
import Coin from "../../assets/icons/coin.svg";
import FilledPrimary from "../../components/Buttons/Filled-primary";
import TextInput from "../../components/InputFields/TextInput";
import Dropdown from "../../components/InputFields/Dropdown";

export default function Register() {
  const menuItems = [
    {
      text: "+91",
    },
    {
      text: "+76",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="bg-primary-dark">
        <div className="py-[90px] px-[100px]">
          <div className="flex items-center justify-start">
            <FileIcon />
            <Certisetu className="ml-3" />
          </div>
          <div className="mt-[140px]">
            <GetAhead />
            <GetAScholarship className="mt-4" />
          </div>
          <div className="mt-20">
            <div className="mt-8 flex items-center justify-start">
              <Tick className="mr-5" />
              <div className="font-normal text-white text-2xl">
                Certificate verification now simplified
              </div>
            </div>
            <div className="mt-8 flex items-center justify-start">
              <Tick className="mr-5" />
              <div className="font-normal text-white text-2xl">
                View dozens of scholarships
              </div>
            </div>
            <div className="mt-8 flex items-center justify-start">
              <Tick className="mr-5" />
              <div className="font-normal text-white text-2xl">
                One click apply
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center w-full">
            <img src={Coin} alt="coin_icon" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="max-w-md">
          <div className="w-full">
            <div className="py-10 px-8 shadow-md rounded-2xl">
              <div className="font-normal text-md">Welcome</div>
              <div className="font-bold text-3xl">Register now</div>
              <div className="form">
                <div className="mt-5">
                  <TextInput label="Name" placeholder="John.snow@gmail.com" />
                </div>
                <div className="mt-3">
                  <TextInput
                    label="Phone"
                    placeholder="John.snow@gmail.com"
                    menuItems={menuItems}
                  />
                </div>
                <div className="mt-8">
                  <div className="flex items-center justify-start">
                    <input type="checkbox" className="mr-3" />
                    <div className="text-sm font-normal">Remember Me</div>
                  </div>
                </div>
                <FilledPrimary text="Register" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
