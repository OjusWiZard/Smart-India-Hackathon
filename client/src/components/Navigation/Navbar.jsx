import React, { useContext } from "react";
import { connectWallet } from "../../api/block";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import UserDropdown from "components/Dropdown/user-dropdown";
import { UserTypeContext } from "../../context/userTypeContext";

const Navbar = () => {
	const isAdmin = localStorage.getItem("isAdmin");
	const user = JSON.parse(localStorage.getItem("user"));
	const wallet = localStorage.getItem("wallet");
	const { isStudent, toggleUserType } = useContext(UserTypeContext);
	useEffect(() => {});
	return (
		<div className="flex items-center justify-between px-7 h-[80px] w-full sticky top-0 bg-white z-10">
			{/* <div className="text-2xl font-bold text-[#5C5C5C]">Dashboard</div> */}
			<div className="mt-5 font-regular flex items-center">
				{wallet ? (
					<div
						onClick={() => {
							localStorage.removeItem("wallet");
							window.location.reload();
						}}
						className="border border-gray-400 py-2 px-4 bg-gradient-to-r from-blue-500 rounded-lg cursor-pointer to-primary-dark text-white font-semibold text-sm"
					>
						{wallet}
					</div>
				) : (
					<div
						onClick={async () => {
							await connectWallet();
						}}
						className="border border-gray-400 py-2 px-4 bg-gradient-to-r from-blue-500 rounded-lg cursor-pointer to-primary-dark text-white font-semibold text-sm"
					>
						Connect Wallet
					</div>
				)}

				{!isAdmin && (
					<>
						<div className="ml-8">Student</div>
						<Switch
							checked={!isStudent}
							onChange={() => toggleUserType(isStudent)}
							className={`${
								isStudent ? "bg-blue-600" : "bg-green-700"
							} relative inline-flex h-6 mx-5 w-11 items-center rounded-full`}
						>
							<span className="sr-only ">
								Enable notifications
							</span>
							<span
								className={`${
									isStudent
										? "translate-x-6"
										: "translate-x-1"
								} inline-block h-4 w-4 transform rounded-full bg-white`}
							/>
						</Switch>
						<div>Scholarship Creator</div>
					</>
				)}
			</div>
			<div className="flex items-center justify-start">
				<div className="flex items-center">
					<div id="google_translate_element"></div>
					<UserDropdown user={user} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
