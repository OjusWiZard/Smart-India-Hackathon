import React from "react";
import { ReactComponent as FileIcon } from "../../assets/icons/file-icon.svg";
import { ReactComponent as Certisetu } from "../../assets/heading-vectors/CERTISETU.svg";

export default function Register() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="bg-primary-400">
        <div className="py-[90px] px-[100px]">
          <div className="flex items-center justify-start">
            <FileIcon />
            <Certisetu className="ml-3" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">1</div>
    </div>
  );
}
