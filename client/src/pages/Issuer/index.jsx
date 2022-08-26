import React, { useState } from "react";
import DatamapsIndia from "react-datamaps-india";

const STATES = {
	Maharashtra: {
		issuers: 20,
		approved: 10000,
	},
	Delhi: {
		issuers: 20,
		approved: 10000,
	},
	Goa: {
		issuers: 20,
		approved: 10000,
	},
	Gujarat: {
		issuers: 15,
		approved: 20000,
	},
	"Arunachal Pradesh": {
		issuers: 20,
		approved: 30000,
	},
	Jharkhand: {
		issuers: 20,
		approved: 30000,
	},
	Karnataka: {
		issuers: 20,
		approved: 30000,
	},
	Kerala: {
		issuers: 20,
		approved: 30000,
	},
	Lakshadweep: {
		issuers: 2,
		approved: 300,
	},
	Maharashtra: {
		issuers: 20,
		approved: 10000,
	},
	Manipur: {
		issuers: 20,
		approved: 10000,
	},
	Meghalaya: {
		issuers: 20,
		approved: 10000,
	},
	Mizoram: {
		issuers: 20,
		approved: 10000,
	},
	Nagaland: {
		issuers: 20,
		approved: 10000,
	},
	Odisha: {
		issuers: 20,
		approved: 10000,
	},
	Puducherry: {
		issuers: 20,
		approved: 10000,
	},
	Punjab: {
		issuers: 20,
		approved: 10000,
	},
	Rajasthan: {
		issuers: 20,
		approved: 10000,
	},
	Sikkim: {
		issuers: 20,
		approved: 10000,
	},
	Tripura: {
		issuers: 20,
		approved: 10000,
	},
	"Uttar Pradesh": {
		issuers: 40,
		approved: 50000,
	},
	"West Bengal": {
		issuers: 35,
		approved: 40000,
	},
	"Madhya Pradesh": {
		issuers: 25,
		approved: 25000,
	},
	"Andhra Pradesh": {
		issuers: 40,
		approved: 50000,
	},
	"Tamil Nadu": {
		issuers: 40,
		approved: 50000,
	},
};

const Issuer = () => {
	const [activeState, setactiveState] = useState({
		data: STATES.Gujarat,
		name: "India",
	});

	const [stateLists, setStateLists] = useState(STATES);

	const stateOnClick = (data, name) => {
		setactiveState({ data, name });
	};
	return (
		<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="flex md:flex-row flex-col md:items-center items-start justify-between">
				<div className="font-normal text-2xl">
					Number of Issuers and Approved Scholarships in different
					states
				</div>
				<div
					style={{
						width: "1000px",
						position: "fixed",
						top: "10%",
						left: "30%",
					}}
				>
					<DatamapsIndia
						regionData={stateLists}
						hoverComponent={({ value }) => {
							return (
								<>
									<p>{value.name}</p>
									{value?.issuers ? (
										<>
											<p>Issuers: {value?.issuers}</p>
											<p>
												Scholarship Grants:{" "}
												{value?.approved}
											</p>
										</>
									) : (
										"No issuer and scholarship grants in this state"
									)}
								</>
							);
						}}
						style={{ top: "60px", maxHeight: "400px" }}
						mapLayout={{
							startColor: "#f5ecfe",
							endColor: "#f5ecfe",
							noDataColor: "#eee",
							borderColor: "#6e53c1",
							hoverBorderColor: "green",
							hoverColor: "#c4f2c5",
						}}
						onClick={stateOnClick}
						activeState={activeState}
					/>
				</div>
			</div>
		</div>
	);
};

export default Issuer;
