// Icons imports
import { ReactComponent as FileIcon } from "assets/icons/file-icon.svg";
import { ReactComponent as Certisetu } from "assets/heading-vectors/CERTISETU.svg";
import { ReactComponent as GetAhead } from "assets/heading-vectors/get-ahead.svg";
import { ReactComponent as GetAScholarship } from "assets/heading-vectors/get-a-scholarship.svg";
import { ReactComponent as Tick } from "assets/icons/purple-tick.svg";
import Coin from "assets/icons/coin.svg";

// Components imports
import FilledPrimary from "components/Buttons/Filled-primary";
import TextInput from "components/InputFields/TextInput";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { getOtp, verifyOtp } from "api";
import { useNavigate } from "react-router-dom";

export default function Register() {
	let navigate = useNavigate();
	let [isOpen, setIsOpen] = useState(false);
	const [phno, setPhno] = useState(0);
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [isVerified, setIsVerified] = useState(false);

	function closeModal(e) {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	const menuItems = [
		{
			text: "+91",
		},
		{
			text: "+76",
		},
	];

	const handleRegister = async () => {
		await getOtp(phno);
		openModal();
	};

	const handleVerify = async () => {
		await verifyOtp({
			to: `+91${phno}`,
			otp,
			email,
		});
		localStorage.setItem("email", email);
		localStorage.setItem("phone", phno);
		navigate("/dashboard");
		setIsVerified(true);
	};

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen">
			<div className="bg-primary-dark xl:block hidden">
				<div className="py-[90px] px-[100px]">
					<div className="flex items-center justify-start">
						<FileIcon />
						<Certisetu className="ml-3" />
					</div>
					<div className="mt-[120px]">
						<GetAhead />
						<GetAScholarship className="mt-4" />
					</div>
					<div className="mt-20">
						<div className="mt-8 flex items-center justify-start">
							<Tick className="mr-5" />
							<div className="font-normal text-white text-2xl">
								Certificate verification now simplified
							</div>
						</div>
						<div className="mt-8 flex items-center justify-start">
							<Tick className="mr-5" />
							<div className="font-normal text-white text-2xl">
								View dozens of scholarships
							</div>
						</div>
						<div className="mt-8 flex items-center justify-start">
							<Tick className="mr-5" />
							<div className="font-normal text-white text-2xl">
								One click apply
							</div>
						</div>
					</div>
					<div className="flex justify-end items-center w-full">
						<img src={Coin} alt="coin_icon" />
					</div>
				</div>
			</div>

			<div className="xl:bg-white bg-primary-dark content-center">
				<div className="py-[90px] px-[100px]">
					<div className="flex items-center justify-center xl:invisible">
						<FileIcon />
						<Certisetu className="ml-3" />
					</div>
				</div>
				<div className="flex justify-center items-center">
					<div className="max-w-md">
						<div className="py-10 px-8 shadow-md rounded-2xl bg-white mx-5">
							<div className="font-normal text-md">Welcome</div>
							<div className="font-bold text-3xl">
								Register now
							</div>
							<div className="form">
								<div className="mt-5">
									<TextInput
										label="Email"
										placeholder="John.snow@gmail.com"
										border="all"
										value={email}
										handleChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
								</div>
								<div className="mt-3 mb-8">
									<TextInput
										label="Phone"
										placeholder="Enter your phone number"
										value={phno}
										menuItems={menuItems}
										handleChange={(e) =>
											setPhno(e.target.value)
										}
										border="all"
										required
									/>
								</div>

								{/* ----- register button ---------  */}
								<FilledPrimary
									handleClick={handleRegister}
									text="Register"
									disabled={phno.length < 10}
								/>
								<Transition appear show={isOpen} as={Fragment}>
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
												{/* <Dialog.Overlay className="fixed inset-0" /> */}
												<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
											</Transition.Child>

											{/* This element is to trick the browser into centering the modal contents. */}
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
								</Transition>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
