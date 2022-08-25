import TextInput from "components/InputFields/TextInput";
import React, { useEffect } from "react";
// import { MdAddBox } from "react-icons/md";
import { useState } from "react";
import FilledPrimary from "components/Buttons/Filled-primary";
// import { mint_certificate } from "../../api/block";

import swal from "sweetalert";
import { getAttributes, getLogicList } from "api";
import { Listbox } from "@headlessui/react";

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

	const [associated, setAssociated] = useState([]);
	const [attributes, setAttributes] = useState();
	const [logic, SetLogic] = useState();
	const [number, setNumber] = useState([{}]);

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
		setNumber(() => [...number, {}]);
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
					<div className="font-normal text-2xl">
						Create Scholarship Form
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
								number.map(() => (
									<>
										<div className="mt-8 grid grid-col-3 gap-3">
											<div className="flex items-center">
												{/* attribute */}
												<div className="flex flex-col">
													<Listbox
														value={
															selectedAttribute.id
														}
														onChange={
															setSelectedAttribute
														}
													>
														<Listbox.Label
															className={
																"block text-base font-regular text-primary-grey"
															}
														>
															Criteria:
														</Listbox.Label>
														<Listbox.Button
															className={
																"relative w-60 border border-secondary-border rounded-md py-1"
															}
														>
															{
																selectedAttribute.name
															}
														</Listbox.Button>
														<Listbox.Options
															className={
																"absolute mt-14 text-center w-60 bg-white border p-2"
															}
														>
															{attributes?.map(
																(attribute) => (
																	<Listbox.Option
																		className={
																			"hover:bg-slate-100 cursor-pointer"
																		}
																		key={
																			attribute.id
																		}
																		value={
																			attribute
																		}
																	>
																		{
																			attribute.name
																		}
																	</Listbox.Option>
																)
															)}
														</Listbox.Options>
													</Listbox>
												</div>
												<div className="flex flex-col ml-4">
													<Listbox
														value={selectedLogic.id}
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
															{selectedLogic.name}
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
																			logic.id
																		}
																		value={
																			logic
																		}
																	>
																		{
																			logic.name
																		}
																	</Listbox.Option>
																)
															)}
														</Listbox.Options>
													</Listbox>
												</div>
												<div className="flex flex-col ml-4">
													<TextInput
														label={"Value:"}
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
