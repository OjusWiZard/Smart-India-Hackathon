// Icons imports
import { ReactComponent as FileIcon } from "assets/icons/file-icon.svg";
import { ReactComponent as Certisetu } from "assets/heading-vectors/CERTISETU.svg";
import { ReactComponent as GetAhead } from "assets/heading-vectors/get-ahead.svg";
import { ReactComponent as GetAScholarship } from "assets/heading-vectors/get-a-scholarship.svg";
import { ReactComponent as Tick } from "assets/icons/purple-tick.svg";
import Coin from "assets/icons/coin.svg";
import { Link } from "react-router-dom";
// Components imports
import TextInput from "components/InputFields/TextInput";

import { useState } from "react";
import { getOtp, registerUser, verifyOtp } from "api";
import { useNavigate } from "react-router-dom";

export default function Register() {
	let navigate = useNavigate();
	let [isOpen, setIsOpen] = useState(false);
	const [otp, setOtp] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [details, setDetails] = useState({
		email: "",
		password: "",
		full_name: "",
		contact_no: "",
	});

	const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.name]: e.target.value,
		});
	};

	// function closeModal(e) {
	// 	setIsOpen(false);
	// }

	// function openModal() {
	// 	setIsOpen(true);
	// }
	// const menuItems = [
	// 	{
	// 		text: "+91",
	// 	},
	// 	{
	// 		text: "+76",
	// 	},
	// ];

	const handleRegister = async (e) => {
		e.preventDefault();
		console.log(details);
		const formData = new FormData();
		const { email, full_name, password, contact_no } = details;
		formData.append("email", email);
		formData.append("full_name", full_name);
		formData.append("password", password);
		formData.append("contact_no", contact_no);
		const { data } = await registerUser(formData);
		if (data.id) {
			navigate("/login");
		}
		//data.id means true
		// openModal();
	};

	// const handleVerify = async () => {
	// 	await verifyOtp({
	// 		to: `+91${phno}`,
	// 		otp,
	// 		email,
	// 	});
	// 	localStorage.setItem("email", email);
	// 	localStorage.setItem("phone", phno);
	// 	navigate("/dashboard");
	// 	setIsVerified(true);
	// };

	return (
		<div className="grid min-h-screen grid-cols-1 xl:grid-cols-2">
			<div className="hidden bg-primary-dark xl:block ">
				<div className="pt-[90px] px-[100px]">
					<div className="flex items-center justify-start">
						<FileIcon />
						<Certisetu className="ml-3" />
					</div>
					<div className="mt-[120px]">
						<GetAhead />
						<GetAScholarship className="mt-4" />
					</div>
					<div className="mt-20">
						<div className="flex items-center justify-start mt-8">
							<Tick className="mr-5" />
							<div className="text-2xl font-normal text-white">
								Certificate verification now simplified
							</div>
						</div>
						<div className="flex items-center justify-start mt-8">
							<Tick className="mr-5" />
							<div className="text-2xl font-normal text-white">
								View dozens of scholarships
							</div>
						</div>
						<div className="flex items-center justify-start mt-8">
							<Tick className="mr-5" />
							<div className="text-2xl font-normal text-white">
								One click apply
							</div>
						</div>
					</div>
					<div className="flex items-center justify-end w-full">
						<img src={Coin} alt="coin_icon" />
					</div>
				</div>
			</div>

			<div className="flex-col items-center content-center justify-center xl:flex xl:bg-white bg-primary-dark overflow-hidden">
				<div className="flex items-center w-full justify-start h-[100px] pt-[0px] px-[50px] xl:px-[100px] xl:hidden">
					<FileIcon />
					<Certisetu className="ml-3" />
				</div>
				<div className="flex items-center justify-center py-10 h-[calc(100vh-130px)]">
					<div className="max-w-md">
						<form
							onSubmit={handleRegister}
							className="px-8 py-10 mx-5 bg-white shadow-xl border sm:min-w-[350px] min-w-[300px] rounded-2xl"
						>
							<div className="font-normal text-md">Welcome</div>
							<div className="text-3xl font-bold">
								Register now
							</div>
							<div className="form">
								<div className="mt-5">
									<TextInput
										label="Full Name"
										name={"full_name"}
										placeholder="John Snow"
										border="all"
										type="text"
										value={details.full_name}
										handleChange={handleChange}
										required
									/>
								</div>
								<div className="mt-5">
									<TextInput
										label="Email"
										name={"email"}
										placeholder="John.snow@gmail.com"
										border="all"
										type="email"
										value={details.email}
										handleChange={handleChange}
										required
									/>
								</div>
								<div className="mt-5">
									<TextInput
										label="Password"
										name={"password"}
										placeholder="xxxxxx"
										border="all"
										type="password"
										value={details.password}
										handleChange={handleChange}
										required
									/>
								</div>
								<div className="mt-3 mb-8">
									<TextInput
										label="Phone"
										name={"contact_no"}
										placeholder="Enter your phone number"
										border="all"
										type="text"
										value={details.contact_no}
										handleChange={handleChange}
										required
									/>
								</div>

								{/* ----- register button ---------  */}
								<TextInput
									type="submit"
									value="Register"
									// handleClick={handleRegister}
									text="Register"
									className="cursor-pointer text-base font-bold text-white bg-purple-800 rounded-md"
									// disabled={
									// 	phno.length < 10 &&
									// 	fullName.length < 0 &&
									// 	email.length < 0 &&
									// 	password.length < 6
									// }
								/>

								<div className="">
									Already Registered ?
									<Link to="/login">
										<span>Login</span>
									</Link>
								</div>
								{/* <Transition appear show={isOpen} as={Fragment}>
									<Dialog
										as="div"
										className="fixed inset-0 z-10 overflow-y-auto"
										onClose={closeModal}
									>
										<div className="min-h-screen px-4 text-center">
											<Transition.Child
												as={Fragment}
												enter="ease-out duration-300"
												enterFrom="opacity-0"
												enterTo="opacity-100"
												leave="ease-in duration-200"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
											</Transition.Child>

											<span
												className="inline-block h-screen align-middle"
												aria-hidden="true"
											>
												&#8203;
											</span>
											<Transition.Child
												as={Fragment}
												enter="ease-out duration-300"
												enterFrom="opacity-0 scale-95"
												enterTo="opacity-100 scale-100"
												leave="ease-in duration-200"
												leaveFrom="opacity-100 scale-100"
												leaveTo="opacity-0 scale-95"
											>
												<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
													<Dialog.Title
														as="h3"
														className="text-[30px] align-center font-medium leading-6 text-gray-900"
													>
														Enter OTP
													</Dialog.Title>
													<div className="mt-4">
														<TextInput
															label="OTP"
															value={otp}
															placeholder="82xx92"
															border="all"
															handleChange={(e) =>
																setOtp(
																	e.target
																		.value
																)
															}
														/>
													</div>
													<div className="mt-4">
														<button
															className={`bg-primary-dark opacity-90 hover:opacity-100 rounded-md w-full py-4 text-white flex justify-around items-start font-bold text-base`}
															onClick={(e) =>
																handleVerify(e)
															}
														>
															Submit OTP
														</button>
													</div>
												</div>
											</Transition.Child>
										</div>
									</Dialog>
								</Transition> */}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
