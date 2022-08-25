import TextInput from "components/InputFields/TextInput";
import React, { useEffect, useState, Fragment } from "react";
import FilledPrimary from "components/Buttons/Filled-primary";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getAttributes, getLogicList } from "api";
import { Listbox } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";

export default function IssuerForm() {
	const [details, setDetails] = useState({
		name: "",
		amount: "",
		description: "",
	});

	const initialStateCondition = {
		condition: [
			{
				id: 1,
				name: "=",
			},
			{
				id: 2,
				name: "<",
			},
			{
				id: 3,
				name: ">",
			},
			{
				id: 4,
				name: "!=",
			},
			{
				id: 5,
				name: "<=",
			},
			{
				id: 6,
				name: ">=",
			},
		],
		value: "",
		selectedValue: "",
	};
	const initialState = {
		attribute: [
			{
				id: 1,
				name: "Name",
			},
			{
				id: 2,
				name: "DOB",
			},
			{
				id: 3,
				name: "Gender",
			},
			{
				id: 4,
				name: "Address",
			},
			{
				id: 5,
				name: "X-Board",
			},
			{
				id: 6,
				name: "X-Year",
			},
			{
				id: 7,
				name: "X-English",
			},
			{
				id: 8,
				name: "X-Mathematics",
			},
			{
				id: 9,
				name: "X-Science",
			},
			{
				id: 10,
				name: "X-Social Science",
			},
			{
				id: 11,
				name: "X-Result",
			},
			{
				id: 12,
				name: "XII-Board",
			},
			{
				id: 13,
				name: "XII-Year",
			},
			{
				id: 14,
				name: "XII-Computer Science",
			},
			{
				id: 15,
				name: "XII-English",
			},

			{
				id: 16,
				name: "XII-Mathematics",
			},
			{
				id: 17,
				name: "XII-Physics",
			},
			{
				id: 18,
				name: "XII-Chemistry",
			},
			{
				id: 19,
				name: "XII-Result",
			},

			{
				id: 20,
				name: "DL-Vehicle Type",
			},
			{
				id: 21,
				name: "DL-Date of Issue",
			},
		],
		condition: [
			{
				id: 1,
				name: "=",
			},
			{
				id: 2,
				name: "<",
			},
			{
				id: 3,
				name: ">",
			},
			{
				id: 4,
				name: "!=",
			},
			{
				id: 5,
				name: "<=",
			},
			{
				id: 6,
				name: ">=",
			},
		],
		value: "",
		selectedValue: "",
		selectedConditionValue: "",
	};

	const [associated, setAssociated] = useState([]);
	const [attributes, setAttributes] = useState();
	const [logic, SetLogic] = useState();
	const [number, setNumber] = useState([initialState]);

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

	const handleCondiChange = (index, e) => {
		let newFormValues = [...number];
		newFormValues[index] = {
			...newFormValues[index],
			selectedValue: e.name,
		};
		setNumber(newFormValues);
	};
	const handleAddCriteria = () => {
		setNumber((prevdata) => [...prevdata, initialState]);
	};

	const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const metadata = { ...details, associated };
	};
	return (
		<>
			<div className="px-14 py-[50px] bg-primary-light min-h-screen">
				<div className="flex items-center justify-between">
					<div className="font-normal text-2xl">
						Create Scholarship Form
					</div>
					<Link
						to="/create-scholarship"
						className="bg-primary-dark px-10 py-3 text-white text-base "
					>
						Import from
					</Link>
				</div>
				<div className="mt-8">
					<form
						onSubmit={handleSubmit}
						className="bg-white rounded-lg p-8"
					>
						<div className="font-regular text-xl">Details</div>
						<div className="grid grid-cols-1 sm:gap-10 gap-4 sm:grid-cols-2 mt-8">
							<TextInput
								label={"Name"}
								type="text"
								name="name"
								handleChange={handleChange}
								placeholder={"John"}
								border="all"
							/>
							<TextInput
								label={"Amount"}
								name="amount"
								handleChange={handleChange}
								placeholder={"1,00,000"}
								border="all"
							/>
						</div>
						<div className="mt-8 grid grid-col-3 gap-3">
							<div>Description</div>
							<textarea
								name={"description"}
								placeholder={"Description of the scholarship"}
								onChange={handleChange}
								className={
									"border border-secondary-border rounded-md block w-full font-regular px-5 py-4 bg-white text-sm placeholder-secondary-placeholder focus:outline-none"
								}
							/>
						</div>
						<div className="grid grid-cols-1 sm:gap-10 gap-4 sm:grid-cols-2 mt-8">
							<TextInput
								label={"Starting Date"}
								type="text"
								name="start-date"
								handleChange={handleChange}
								placeholder={"01-08-2022"}
								border="all"
							/>
							<TextInput
								label={"Ending Date"}
								name="end-date"
								handleChange={handleChange}
								placeholder={"20-08-2022"}
								border="all"
							/>
						</div>

						{number &&
							number?.length &&
							number.map((attri, index) => (
								<>
									<div className="mt-8 grid grid-col-3 gap-3">
										<div className="flex items-center">
											<div className="flex flex-col">
												<Listbox
													value={
														attri?.selectedValue !==
														""
															? "Select Attribute"
															: attri.selectedValue
													}
													onChange={(e) =>
														handleAttriChange(
															index,
															e,
															"attribute"
														)
													}
												>
													<Listbox.Label
														className={
															"block text-base font-regular text-primary-grey"
														}
													>
														Attribute:
													</Listbox.Label>
													<Listbox.Button
														className={
															"relative w-60 border border-secondary-border rounded-md py-1"
														}
													>
														{attri?.selectedValue ===
														""
															? "Select Attribute"
															: attri.selectedValue}
													</Listbox.Button>
													<Listbox.Options
														className={
															"absolute mt-14 text-center w-60 bg-white border p-2 max-h-28 overflow-y-scroll z-10"
														}
													>
														{attri?.attribute?.map(
															(data) => (
																<Listbox.Option
																	className={
																		"hover:bg-slate-100 cursor-pointer"
																	}
																	key={
																		data?.id
																	}
																	value={data}
																>
																	{data?.name}
																</Listbox.Option>
															)
														)}
													</Listbox.Options>
												</Listbox>
											</div>

											<div className="flex flex-col ml-4">
												<Listbox
													value={
														attri?.selectedConditionValue !==
														""
															? "Select Condition"
															: attri.selectedConditionValue
													}
													onChange={(e) =>
														handleAttriChange(
															index,
															e,
															"condition"
														)
													}
												>
													<Listbox.Label
														className={
															"block text-base font-regular text-primary-grey"
														}
													>
														Condition:
													</Listbox.Label>
													<Listbox.Button
														className={
															"relative w-60 border border-secondary-border rounded-md py-1"
														}
													>
														{attri?.selectedConditionValue ===
														""
															? "Select Condition"
															: attri.selectedConditionValue}
													</Listbox.Button>
													<Listbox.Options
														className={
															"absolute mt-14 text-center w-60 bg-white border p-2 max-h-28 overflow-y-scroll z-10"
														}
													>
														{attri?.condition?.map(
															(data) => (
																<Listbox.Option
																	className={
																		"hover:bg-slate-100 cursor-pointer"
																	}
																	key={
																		data?.id
																	}
																	value={data}
																>
																	{data?.name}
																</Listbox.Option>
															)
														)}
													</Listbox.Options>
												</Listbox>
											</div>

											<div className="flex flex-col ml-4">
												<TextInput
													label={"Student value:"}
													type="text"
													name="name"
													className={
														"py-2 mt-0 text-black"
													}
													handleChange={handleChange}
													placeholder={"Value"}
													border="all"
												/>
											</div>
										</div>
									</div>
								</>
							))}
						<FilledPrimary
							className={"my-4 bg-primary-dark"}
							text={"Add Eligibility Criteria"}
							handleClick={handleAddCriteria}
						/>
						<div className="mt-8 grid grid-col-3 gap-3">
							<TextInput
								type="submit"
								value="Create Scolarship"
								text="Create Scolarship"
								className="font-bold text-white bg-purple-800 rounded-md text-bas"
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
