import React from "react";
import DownArrow from "../../assets/icons/DownArrow.js";
import styles from "../../pages/Dashboard/Dashboard.module.css";
import CertificatePopver from "../Popover/certificate-popover";

const Certificate = ({ certificateName, doc }) => {
	const ColourConstants = {
		ews: "bg-[#5D5FEF]",
		caste: "bg-[#E86C37]",
		income: "bg-[#EF4F5F]",
		"10th": "bg-[#5D5FEF]",
		domicile: "bg-[#9FBB3A]",
		"Aadhar Card": "bg-[#EF4F5F]",
	};
	const popoverItem = doc.values;
	return (
		<>
			{ColourConstants[certificateName] && (
				<div
					className={`text-white rounded-lg py-5 px-4 mx-5 relative ${ColourConstants[certificateName]} ${styles.certi_card} `}
				>
					<div className="font-bold text-2xl capitalize">
						{certificateName}
						<br />
						Certificate
					</div>
					<div className="mt-3">1234 56789</div>
					<div className="mt-7">
						<div className="flex justify-end pr-5 cursor-pointer">
							<CertificatePopver
								popoverButton={
									<DownArrow
										arrowColor={ColourConstants[
											certificateName
										].substring(4, 11)}
									/>
								}
								popoverItem={popoverItem.map((item) => {
									return {
										info: `${item.attribute}: ${item.option}`,
									};
								})}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Certificate;
