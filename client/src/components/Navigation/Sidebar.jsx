import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as FileIconRed } from "../../assets/icons/file-icon-red.svg";
import { ReactComponent as ScholarshipIcon } from "../../assets/icons/scholarship-icon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-icon.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";

const Sidebar = () => {
  return (
    <>
      <div className="max-w-xs min-h-screen border-r border-[#FBF8FE]">
        <div className="pt-9 pl-12">
          <FileIconRed />
        </div>
        <div className="space-y-7 mt-16">
          <Link as="div" to="/dashboard">
            <div className="px-4 hover:text-primary-dark hover:border-l-4 hover:border-secondary-dark">
              <div className="rounded-lg cursor-pointer hover:bg-primary-light py-2">
                <div className="flex items-center justify-start pr-20">
                  <HomeIcon className="ml-8 mr-3" />
                  <div className="font-normal ">Home</div>
                </div>
              </div>
            </div>
          </Link>
          <Link as="div" to="/scholarships">
            <div className="px-4 hover:text-primary-dark hover:border-l-4 hover:border-secondary-dark">
              <div className="rounded-lg cursor-pointer hover:bg-primary-light py-2">
                <div className="flex items-center justify-start pr-20">
                  <ScholarshipIcon className="ml-8 mr-3" />
                  <div className="font-normal ">Scholarship</div>
                </div>
              </div>
            </div>
          </Link>
          <div className="px-4 hover:text-primary-dark hover:border-l-4 hover:border-secondary-dark">
            <div className="rounded-lg cursor-pointer hover:bg-primary-light py-2 ">
              <div className="flex items-center justify-start pr-20">
                <ProfileIcon className="ml-8 mr-3" />
                <div className="font-normal ">Profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
