import React, { useState, useEffect } from "react";
import Dropdown from "components/InputFields/Dropdown";
import { ReactComponent as WalletIcon } from "assets/icons/wallet.svg";
import { ReactComponent as NoFileIcon } from "assets/icons/no-file.svg";
import { ReactComponent as RightArrow } from "assets/icons/right-arrow.svg";
import FilledPrimary from "components/Buttons/Filled-primary";
import AddCertificateModal from "components/Modals/AddCertifcation";
import Certificate from "components/Certificates";
import styles from "./Dashboard.module.css";
import Earning from "components/Earning/Earning";
import { sendStatus, sendVerificationCode } from "api";

const Dashboard = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [certificate, setCertificate] = useState();
	const menuItems = [
		{
			text: "Domicile Certificate",
			value: "domicile",
			onClick: () => {
				setIsOpen(true);
				setCertificate("domicile");
			},
		},
		{
			text: "10th Marksheet",
			value: "10th",
			onClick: () => {
				setIsOpen(true);
				setCertificate("10th");
			},
		},
	];

	// useEffect(() => {
	// sendVerificationCode();
	// },[])
	return (
		<div className="px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<AddCertificateModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				certificate={certificate}
			/>
			<div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
				<div className="font-normal text-2xl lg:mb-0 mb-3">
					Hi Shruti
				</div>
				<Dropdown
					heading="Upload Ceriticates..."
					menuItems={menuItems}
				/>
			</div>

			<div className="mt-10">
				<div className="flex items-center overflow-x-scroll bg-white py-10 w-full">
					<Certificate certificate="ews" />
					<Certificate certificate="caste" />
					<Certificate certificate="income" />
					<Certificate certificate="domicile" />
					<Certificate certificate="ews" />
					<Certificate certificate="income" />
				</div>
			</div>

			<div className="mt-9">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
					<div className="w-full">
						<div className="font-semibold text-xl">
							Your Earnings
						</div>
						<div className="mt-5">
							<div className="px-10 flex h-[300pxx] justify-center items-center bg-white rounded-md pt-[60px] pb-[120px]">
								<div className="flex flex-col items-center">
									<WalletIcon />
									<div className="font-normal mt-5 text-lg text-[#828282]">
										Apply for scholarships to see your
										earnings here.
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full lg:mt-0 mt-9">
						<div className="font-semibold text-xl">
							Your Applications
						</div>
						<div className="mt-5">
							<div className="px-8 flex h-[300px] flex-col justify-start items-start bg-white rounded-md py-8">
								<div className="border-4  border-white border-l-red-500 pl-3 text-[#1C1C1C] font-bold text-[26px]">
									Uttar Pradesh Scholarship
									<br />
									<div className="text-[#9C9C9C] text-[15px] font-normal">
										Form Pending
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;