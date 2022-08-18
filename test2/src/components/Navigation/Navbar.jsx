import React from "react";
import Img from "../../assets/icons/coin.svg";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between px-14 h-[80px] w-full">
			<div className="text-2xl font-bold text-[#5C5C5C]">Dashboard</div>
			<div className="flex items-center justify-start">
				<div id="google_translate_element"></div>
				<img
					src={Img}
					alt="profile_icon"
					className="w-9 h-9 rounded-full"
				/>
				<div className="ml-3 text-[#959595]">Shruti Agarwal</div>
			</div>
		</div>
	);
};

export default Navbar;
