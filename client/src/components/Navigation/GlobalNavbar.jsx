import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const GlobalNavbar = ({ children }) => {
	return (
		<div>
			<div className="flex w-full items-start">
				<Sidebar />
				<div className="w-[calc(100%-240px)]">
					<Navbar />
					{children}
				</div>
			</div>
		</div>
	);
};

export default GlobalNavbar;
