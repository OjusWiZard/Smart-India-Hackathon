import React from "react";
import DownArrow from "../../assets/icons/DownArrow.js";
import styles from "../../pages/Dashboard/Dashboard.module.css";

const Certificate = ({ certificate }) => {
	const ColourConstants = {
		ews: "bg-[#119199]",
		caste: "bg-[#256FEF]",
		income: "bg-[#EF5DA8]",
		"10th": "bg-[#5D5FEF]",
	};
	return (
		<>
			{ColourConstants[certificate] && (
				<div
					className={`text-white rounded-lg py-5 px-4 ${ColourConstants[certificate]} ${styles.certi_card} `}
				>
					<div className="font-bold text-2xl capitalize">
						{certificate}
						<br />
						Certificate
					</div>
					<div className="mt-3">1234 56789</div>
					<div className="mt-7">
						<div className="flex justify-end pr-5">
							<DownArrow
								arrowColor={ColourConstants[
									certificate
								].substring(4, 11)}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Certificate;
