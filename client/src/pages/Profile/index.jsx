import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import TextInput from "components/InputFields/TextInput";
import { addBankAccount } from "api";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const isAdmin = localStorage.getItem("isAdmin");
	const { contact_no, email, full_name } = user;
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState({
		bank_name: "",
		bank_account_no: "",
		bank_ifsc_code: "",
	});
	// useEffect(() => {
	// 	if (user.id) {
	// 		setLoading(false);
	// 		console.log(user.id);
	// 	}
	// }, [user]);

	const handleRegister = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		const { bank_name, bank_account_no, bank_ifsc_code } = state;
		formData.append("bank_name", bank_name);
		formData.append("bank_account_no", bank_account_no);
		formData.append("bank_ifsc_code", bank_ifsc_code);
		let { data } = await addBankAccount(formData);
		console.log(data);
	};

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			{loading ? (
				<div className="flex justify-center items-center px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
					<BounceLoader color="#6C42C1" loading={loading} size={50} />
				</div>
			) : (
				<>
					<div className="px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
						<div className="px-8 py-10 mx-5 bg-white shadow-xl border rounded-2xl">
							<div className="font-bold text-xl mb-4">
								User Details :
							</div>
							<div className="font-regular flex justify-between items-center">
								<div className="">Full Name</div>
								<div>{full_name}</div>
							</div>
							<div className="font-regular flex justify-between items-center mt-2">
								<div className="">Email</div>
								<div>{email}</div>
							</div>
							<div className="font-regular flex justify-between items-center mt-2">
								<div className="">Contact No</div>
								<div>{contact_no}</div>
							</div>
						</div>

						{!isAdmin && (
							<div className="py-5">
								<div className="">
									<form
										onSubmit={handleRegister}
										className="px-8 py-10 mx-5 bg-white shadow-xl border rounded-2xl"
									>
										<div className="font-bold text-xl mb-4">
											User Account Details :
										</div>
										<div className="form">
											<div className="mt-5">
												<TextInput
													label="Account Holder's Name"
													name={"bank_name"}
													placeholder="John Snow"
													border="all"
													type="text"
													value={state.bank_name}
													handleChange={handleChange}
													required
												/>
											</div>
											<div className="mt-5">
												<TextInput
													label="Account Number"
													name={"bank_account_no"}
													placeholder="xxx xx x x89"
													border="all"
													type="text"
													value={
														state.bank_account_no
													}
													handleChange={handleChange}
													required
												/>
											</div>
											<div className="mt-3 mb-8">
												<TextInput
													label="IFSC Code"
													name={"bank_ifsc_code"}
													placeholder="93xxUy34"
													border="all"
													type="text"
													value={state.bank_ifsc_code}
													handleChange={handleChange}
													required
												/>
											</div>

											<TextInput
												type="submit"
												value="Save"
												// handleClick={handleRegister}
												text="Save"
												className="cursor-pointer text-base font-bold text-white bg-purple-800 rounded-md"
											/>
										</div>
									</form>
								</div>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
