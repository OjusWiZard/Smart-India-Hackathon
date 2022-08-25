import React, { useContext } from "react";
import { Switch } from "@headlessui/react";
import UserDropdown from "components/Dropdown/user-dropdown";
import { UserTypeContext } from "../../context/userTypeContext";

const Navbar = () => {
	const { isStudent, toggleUserType } = useContext(UserTypeContext);
	console.log("FIRST: ", isStudent);
	return (
		<div className="flex items-center justify-between px-7 h-[80px] w-full sticky top-0 bg-white z-10">
			{/* <div className="text-2xl font-bold text-[#5C5C5C]">Dashboard</div> */}
			<div className="mt-5 flex font-regular">
				<div className="">Student</div>
				<Switch
					checked={!isStudent}
					onChange={() => toggleUserType(isStudent)}
					className={`${
						isStudent ? "bg-blue-600" : "bg-green-700"
					} relative inline-flex h-6 mx-5 w-11 items-center rounded-full`}
				>
					<span className="sr-only ">Enable notifications</span>
					<span
						className={`${
							isStudent ? "translate-x-6" : "translate-x-1"
						} inline-block h-4 w-4 transform rounded-full bg-white`}
					/>
				</Switch>
				<div>Scholarship Creator</div>
			</div>
			<div className="flex items-center justify-start">
				<div className="flex items-center">
					<div id="google_translate_element"></div>
					<UserDropdown />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
