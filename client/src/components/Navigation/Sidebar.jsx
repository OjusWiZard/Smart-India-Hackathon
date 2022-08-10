import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ScholarshipIcon } from "../../assets/icons/scholarship-icon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-icon.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";

const Sidebar = () => {
	return (
		<aside className="w-72 pt-16" aria-label="Sidebar">
			<div className="overflow-y-auto py-4 px-3 bg-white">
				<ul className="space-y-2">
					<Link as="li" to="/dashboard">
						<div className="flex items-center p-4 text-base font-normal hover:text-primary-dark hover:border-l-4 hover:border-secondary-dark rounded-lg cursor-pointer hover:bg-primary-light">
							<HomeIcon className="mr-3" />
							<span className="font-normal">Dashboard</span>
						</div>
					</Link>
					<Link as="li" to="/scholarships">
						<div className="flex items-center p-4 text-base font-normal hover:text-primary-dark hover:border-l-4 hover:border-secondary-dark rounded-lg cursor-pointer hover:bg-primary-light">
							<ScholarshipIcon className="mr-3" />
							<span className="flex-1 font-normal">
								Scholarship
							</span>
						</div>
					</Link>
					<Link as="li" to="/scholarships">
						<div className="flex items-center p-4 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
							<ProfileIcon className="mr-3" />
							<span className="flex-1 whitespace-nowrap">
								Profile
							</span>
						</div>
					</Link>
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
