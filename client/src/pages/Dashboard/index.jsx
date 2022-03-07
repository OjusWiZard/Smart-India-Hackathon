import React, { useState } from "react";
import Dropdown from "components/InputFields/Dropdown";
import { ReactComponent as WalletIcon } from "assets/icons/wallet.svg";
import { ReactComponent as NoFileIcon } from "assets/icons/no-file.svg";
import FilledPrimary from "components/Buttons/Filled-primary";
import AddCertificateModal from "components/Modals/AddCertifcation";
import Certificate from "components/Certificates";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [certificate, setCertificate] = useState();
  const menuItems = [
    {
      text: "Domicile Certificate",
      value: "domicile",
      onClick: () => {
        setIsOpen(true);
        setCertificate("domicile");
      },
    },
    {
      text: "10th Marksheet",
      value: "10th",
      onClick: () => {
        setIsOpen(true);
        setCertificate("10th");
      },
    },
  ];
  return (
    <div>
      <AddCertificateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        certificate={certificate}
      />
      <div className="px-14 py-[50px] bg-primary-light min-h-screen">
        {/* -------- */}

        <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
          <div className="font-normal text-2xl lg:mb-0 mb-3">Hi Vaibhav</div>
          <Dropdown heading="Upload Ceriticates..." menuItems={menuItems} />
        </div>

        {/* -------- */}

        <div className="mt-8">
          {/* <div className="flex items-center justify-center bg-white py-[115px] px-[110px] rounded-md">
            Your certificates will appear here
          </div> */}
          <div
            className="flex items-center justify-start overflow-x-scroll w-full
          bg-white px-8 py-10 rounded-md space-x-7 example"
          >
            <Certificate certificate="ews" />
            <Certificate certificate="caste" />
            <Certificate certificate="income" />
            <Certificate certificate="ews" />
            <Certificate certificate="ews" />
          </div>
        </div>

        {/* -------- */}

        <div className="mt-9">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
            <div className="w-full ">
              <div className="font-semibold text-xl">Your Earnings</div>
              <div className="mt-5">
                <div className="px-10 flex h-[350px] justify-center items-center bg-white rounded-md pt-[60px] pb-[120px]">
                  <div className="flex flex-col items-center">
                    <WalletIcon />
                    <div className="font-normal mt-5 text-lg text-[#828282]">
                      Apply for scholarships to see your earnings here.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:mt-0 mt-9">
              <div className="font-semibold text-xl">Your Applications</div>
              <div className="mt-5">
                <div className="px-10 flex h-[350px] justify-center items-center bg-white rounded-md pt-[60px] pb-10">
                  <div className="flex flex-col items-center w-full">
                    <NoFileIcon />
                    <div className="font-normal mt-5 text-lg text-[#828282]">
                      No applications to show
                    </div>
                    <FilledPrimary
                      text="Click here to apply"
                      className="w-full mt-6"
                      loading={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
