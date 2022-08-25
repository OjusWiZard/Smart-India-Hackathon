import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineSchool } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineForm } from "react-icons/ai";
import { ReactComponent as FileIcon } from "assets/icons/file-icon-red.svg";
import { UserTypeContext } from "../../context/userTypeContext";
import { FaCertificate } from "react-icons/fa";

const Sidebar = () => {
	const { isStudent } = useContext(UserTypeContext);
	const links = isStudent
		? [
				{
					link: "/scholarships",
					icon: <MdOutlineSchool className="mx-3 text-[26px]" />,
					name: "Scholarships",
				},
				{
					link: "/create-scholarship",
					icon: <AiOutlineForm className="mx-3 text-[26px]" />,
					name: "Create",
				},
				{
					link: "/nft",
					icon: <MdOutlineSchool className="mx-3 text-[26px]" />,
					name: "My Certificates	",
				},
				{
					link: "/mint",
					icon: <FaCertificate className="mx-3 text-[26px]" />,
					name: "Mint Certi	",
				},
		  ]
		: [
				{
					link: "/dashboard",
					icon: <BiHomeAlt className="mx-3 text-[26px]" />,
					name: "Dashboard",
				},
				{
					link: "/scholarships",
					icon: <MdOutlineSchool className="mx-3 text-[26px]" />,
					name: "Scholarships",
				},
				{
					link: "/profile",
					icon: <CgProfile className="mx-3 text-[26px]" />,
					name: "Profile",
				},
				{
					link: "/nft",
					icon: <MdOutlineSchool className="mx-3 text-[26px]" />,
					name: "My Certificates	",
				},
				{
					link: "/mint",
					icon: <FaCertificate className="mx-3 text-[26px]" />,
					name: "Mint Certi	",
				},
		  ];
	return (
		<aside className="w-60">
			<div className="fixed">
				<div className="h-[80px] py-6 px-9">
					<FileIcon />
				</div>
				<div className="overflow-hidden py-12 px-4">
					<ul className="space-y-2">
						{links.map((linkItem) => {
							const { link, icon, name } = linkItem;
							return (
								<NavLink
									as="li"
									to={link}
									className={({ isActive }) =>
										isActive
											? "flex items-center p-4 text-base font-normal text-primary-dark rounded-lg cursor-pointer bg-primary-light"
											: "flex items-center p-4 text-[#9C9C9C] text-base font-normal hover:text-primary-dark rounded-lg cursor-pointer hover:bg-primary-light"
									}
								>
									{icon}
									<span className="font-normal">{name}</span>
								</NavLink>
							);
						})}
					</ul>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
