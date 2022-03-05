import React from "react";
import { ReactComponent as FileIconRed } from "../../assets/icons/file-icon-red.svg";

const Sidebar = () => {
  return (
    <div>
      <div className="pt-9 pl-12">
        <FileIconRed />
      </div>
      <div className="space-y-9">
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </div>
  );
};

export default Sidebar;
