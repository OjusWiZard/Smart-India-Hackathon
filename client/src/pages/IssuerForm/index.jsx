import TextInput from "components/InputFields/TextInput";
import React, { useEffect } from "react";
// import { MdAddBox } from "react-icons/md";
import { useState, Fragment } from "react";
import FilledPrimary from "components/Buttons/Filled-primary";
// import { mint_certificate } from "../../api/block";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getAttributes, getLogicList } from "api";
import { Listbox, Transition } from "@headlessui/react";

import { HiSelector } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";

export default function IssuerForm() {
	const [details, setDetails] = useState({
		name: "",
		amount: "",
		description: "",
	});

	const people = [
		{ id: 1, name: "Durward Reynolds", unavailable: false },
		{ id: 2, name: "Kenton Towne", unavailable: false },
		{ id: 3, name: "Therese Wunsch", unavailable: false },
		{ id: 4, name: "Benedict Kessler", unavailable: true },
		{ id: 5, name: "Katelyn Rohan", unavailable: false },
	];

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
		],
		condition: [
			{
				id: 1,
				name: "=",
				id: 2,
				name: ">",
				id: 3,
				name: "<",
				id: 4,
				name: "Address",
			},
		],
		value: "",
		selectedValue: "",
	};

	const [associated, setAssociated] = useState([]);
	const [attributes, setAttributes] = useState();
	const [logic, SetLogic] = useState();
	const [number, setNumber] = useState([initialState]);
	const [selected, setSelected] = useState(people[0]);

	useEffect(() => {
		(async () => {
			const logic = await getLogicList();
			const attr = await getAttributes();
			SetLogic(logic.data);
			setAttributes(attr.data);
			setSelectedLogic(logic.data[0]);
			setSelectedAttribute(attr.data[0]);
		})();
	}, []);

	const [selectedLogic, setSelectedLogic] = useState();
	const [selectedAttribute, setSelectedAttribute] = useState();

	const handleAddCriteria = () => {
		setNumber((prevdata) => [...prevdata, initialState]);
	};
	console.log(attributes);

	const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(details);
		const metadata = { ...details, associated };
		// await mint_certificate(metadata["address"], metadata);
	};
	console.log(selectedAttribute);
	return (
		<>
			{logic && attributes && (
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
									placeholder={"xx"}
									border="all"
								/>
							</div>
							<div className="mt-8 grid grid-col-3 gap-3">
								<div>Description</div>
								<textarea
									name={"description"}
									placeholder={
										"Description of the scholarship"
									}
									onChange={handleChange}
									className={
										"border border-secondary-border rounded-md block w-full font-regular px-5 py-4 bg-white text-sm placeholder-secondary-placeholder focus:outline-none"
									}
								/>
							</div>
							<FilledPrimary
								className={"my-4 bg-primary-dark"}
								text={"Add Eligibility Criteria"}
								handleClick={handleAddCriteria}
							/>
							{number &&
								number?.length &&
								number.map((attri, index) => (
									<>
										<div className="mt-8 grid grid-col-3 gap-3">
											<div className="flex items-center">
												<div className="flex flex-col">
													<Listbox
														value={
															attri.selectedValue !==
															""
																? "Select Attribute"
																: attri.selectedValue
														}
														onChange={(e) => {
															console.log(
																e.target
															);
															return [
																...number,
																{
																	...number[
																		index
																	],
																	selectedValue:
																		e.target
																			.value,
																},
															];
														}}
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
															Select Attribute
														</Listbox.Button>
														<Listbox.Options
															className={
																"absolute mt-14 text-center w-60 bg-white border p-2 max-h-20 overflow-y-scroll z-10"
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
																		value={
																			data
																		}
																	>
																		{
																			data?.name
																		}
																	</Listbox.Option>
																)
															)}
														</Listbox.Options>
													</Listbox>

													{/* <div className="flex flex-col">
														<Listbox
															value={selected}
															onChange={
																setSelected
															}
														>
															<div className="relative mt-1">
																<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
																	<span className="block truncate">
																		{
																			selected.name
																		}
																	</span>
																	<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																		<HiSelector
																			className="h-5 w-5 text-gray-400"
																			aria-hidden="true"
																		/>
																	</span>
																</Listbox.Button>
																<Transition
																	as={
																		Fragment
																	}
																	leave="transition ease-in duration-100"
																	leaveFrom="opacity-100"
																	leaveTo="opacity-0"
																>
																	<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-index-1">
																		{people.map(
																			(
																				person,
																				personIdx
																			) => (
																				<Listbox.Option
																					key={
																						personIdx
																					}
																					className={({
																						active,
																					}) =>
																						`relative cursor-default select-none py-2 pl-10 pr-4 ${
																							active
																								? "bg-amber-100 text-amber-900"
																								: "text-gray-900"
																						}`
																					}
																					value={
																						person
																					}
																				>
																					{({
																						selected,
																					}) => (
																						<>
																							<span
																								className={`block truncate ${
																									selected
																										? "font-medium"
																										: "font-normal"
																								}`}
																							>
																								{
																									person.name
																								}
																							</span>
																							{selected ? (
																								<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																									<AiOutlineCheck
																										className="h-5 w-5"
																										aria-hidden="true"
																									/>
																								</span>
																							) : null}
																						</>
																					)}
																				</Listbox.Option>
																			)
																		)}
																	</Listbox.Options>
																</Transition>
															</div>
														</Listbox> 
													</div>*/}
												</div>
												<div className="flex flex-col ml-4">
													<Listbox
														value={
															selectedLogic?.id
														}
														onChange={
															setSelectedLogic
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
																"relative w-8 border border-secondary-border rounded-md py-1"
															}
														>
															{
																selectedLogic?.name
															}
														</Listbox.Button>
														<Listbox.Options
															className={
																"absolute mt-14 text-center w-20 bg-white border p-2"
															}
														>
															{logic?.map(
																(logic) => (
																	<Listbox.Option
																		className={
																			"hover:bg-slate-100 cursor-pointer"
																		}
																		key={
																			logic?.id
																		}
																		value={
																			logic
																		}
																	>
																		{
																			logic?.name
																		}
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
														handleChange={
															handleChange
														}
														placeholder={"Value"}
														border="all"
													/>
												</div>
											</div>
										</div>
									</>
								))}

							<div className="mt-8 grid grid-col-3 gap-3">
								<div>Description</div>
								<textarea
									name={"description"}
									placeholder={
										"Description of the scholarship"
									}
									onChange={handleChange}
									className={
										"border border-secondary-border rounded-md block w-full font-regular px-5 py-4 bg-white text-sm placeholder-secondary-placeholder focus:outline-none"
									}
								/>
							</div>
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
			)}
		</>
	);
}
