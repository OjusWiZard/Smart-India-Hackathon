import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import Img from "../../assets/icons/coin.svg";

const UserDropdown = ({ user }) => {
	// const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const logoutUser = () => {
		localStorage.clear();
		navigate("/login");
	};
	return (
		<div className="text-right">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						<img
							src={Img}
							alt="profile_icon"
							className="w-9 h-9 rounded-full"
						/>
						<div className="ml-3 text-[#959595]">
							{user?.full_name}
						</div>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() => logoutUser()}
										className={`${
											active
												? "bg-violet-500 text-white"
												: "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										Logout
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

export default UserDropdown;
