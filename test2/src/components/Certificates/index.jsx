import React from "react";
import DownArrow from "../../assets/icons/DownArrow.js";
import styles from "../../pages/Dashboard/Dashboard.module.css";

const Certificate = ({ certificate }) => {
	const ColourConstants = {
		ews: "bg-[#5D5FEF]",
		caste: "bg-[#E86C37]",
		income: "bg-[#EF4F5F]",
		"10th": "bg-[#5D5FEF]",
		domicile: "bg-[#9FBB3A]",
	};
	return (
		<>
			{ColourConstants[certificate] && (
				<div
					className={`text-white rounded-lg py-5 px-4 mx-5 ${ColourConstants[certificate]} ${styles.certi_card} `}
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
