import TextInput from "components/InputFields/TextInput";
import React, { useEffect, useState, Fragment } from "react";
import FilledPrimary from "components/Buttons/Filled-primary";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getAttributes, getLogicList } from "api";
import { Listbox } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";
import { get_certificate, mint_certificate } from "../../api/block";

export default function Mint() {
	const [details, setDetails] = useState({
		name: "",
	});

	const initialState = {};

	const [associated, setAssociated] = useState([]);
	const [attributes, setAttributes] = useState();
	const [logic, SetLogic] = useState();
	const [number, setNumber] = useState([{ attribute: "", value: "" }]);
	const [tempDetails, setTempDetails] = useState();

	const handleAttriChange = (index, e, val) => {
		let newFormValues = [...number];

		if (val === "attribute") {
			newFormValues[index] = {
				...newFormValues[index],
				selectedValue: e.name,
			};
			setNumber(newFormValues);
		} else if (val === "condition") {
			newFormValues[index] = {
				...newFormValues[index],
				selectedConditionValue: e.name,
			};
			setNumber(newFormValues);
		}
	};

	const handleAddCriteria = () => {
		setNumber((prevdata) => [...prevdata, tempDetails]);
		// setTempDetails({ attribute: null, value: null });
	};

	const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log("ASS:", details, associated, number);
		// mint_certificate({ ...details, number }, details.address);
		console.log("NUMBER:", number);
		let final = number.map((n, i) => {
			if (i !== 0) {
				let obj = {};
				obj[n.attribute] = n.value;
				return obj;
			}
		});
		const spreadObject = final.reduce(
			(acc, obj) => ({ ...acc, ...obj }),
			{}
		);
		const metadata = { ...spreadObject, name: details.name };
		console.log({ metadata }, details.address);
		await mint_certificate({ metadata }, details.address);
	};

	const handleAttribute = (e) => {
		setTempDetails({
			...tempDetails,
			attribute: e.target.value,
		});
	};
	const handleValue = (e) => {
		setTempDetails({
			...tempDetails,
			value: e.target.value,
		});
	};

	return (
		<>
			<div className="px-14 py-[50px] bg-primary-light min-h-screen">
				<div className="flex items-center justify-between">
					<div className="font-normal text-2xl">Mint Certificate</div>
				</div>
				<div className="mt-8">
					<form
						onSubmit={handleSubmit}
						className="bg-white rounded-lg p-8"
					>
						<div className="font-regular text-xl">Details</div>
						<div className="grid grid-cols-1 sm:gap-10 gap-4 sm:grid-cols-2 mt-8">
							<div className="font-bold text-2xl mt-4">Title</div>
							<div className="flex items-center">
								<TextInput
									name="name"
									handleChange={handleChange}
									placeholder={"Domicile Certificate"}
									border="all"
								/>
							</div>
							<div className="font-bold text-2xl mt-4">
								Address
							</div>
							<div className="flex items-center">
								<TextInput
									name="address"
									handleChange={handleChange}
									placeholder={"Domicile Certificate"}
									border="all"
								/>
							</div>
						</div>
						{number &&
							number?.length &&
							number.map((attri, index) => (
								<>
									<div className="grid grid-cols-1 sm:gap-10 gap-4 sm:grid-cols-2 mt-8">
										<TextInput
											label={"Attribute"}
											type="text"
											name="attribute"
											handleChange={handleAttribute}
											placeholder={"Result"}
											border="all"
										/>
										<TextInput
											label={"Value"}
											type="text"
											name="value"
											handleChange={handleValue}
											placeholder={"Pass/ Fail"}
											border="all"
										/>
									</div>
								</>
							))}
						<FilledPrimary
							className={"my-4 bg-primary-dark"}
							text={"Add Pairs"}
							handleClick={handleAddCriteria}
						/>
						<div className="mt-8 grid grid-col-3 gap-3">
							{/* <div
								onClick={() => {console.log("SEX"); mint_certificate()}
								style={{ cursor: "pointer" }}
							>
								<TextInput									
									value="Mint Certificate"
									text="Mint Certificate"
									className="font-bold text-white bg-purple-800 rounded-md text-bas"
								/>
							</div> */}

							<FilledPrimary
								className={"my-4 bg-primary-dark"}
								text={"Mint Certificate"}
								handleClick={(e) => handleSubmit(e)}
								// handleClick={() => mint_certificate()}
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
