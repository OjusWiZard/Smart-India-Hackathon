import React from "react";
import UserDropdown from "components/Dropdown/user-dropdown";

const Navbar = () => {
	return (
		<div className="flex items-center justify-end px-14 h-[80px] w-full sticky top-0 bg-white z-10">
			{/* <div className="text-2xl font-bold text-[#5C5C5C]">Dashboard</div> */}
			<div className="flex items-center justify-start">
				<div id="google_translate_element"></div>
				<UserDropdown />
			</div>
		</div>
	);
};

export default Navbar;
