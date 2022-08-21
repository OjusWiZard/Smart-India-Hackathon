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
import { getOtp, registerUser, verifyOtp } from "api";
import { useNavigate } from "react-router-dom";
import { loginUser } from "api";

export default function Login() {
	let navigate = useNavigate();
	let [isOpen, setIsOpen] = useState(false);
	const [otp, setOtp] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [details, setDetails] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		const { email, password } = details;
		formData.append("email", email);
		formData.append("password", password);
		const { data } = await loginUser(formData);
		if (data.access) {
			navigate("/dashboard");
		}
	};

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
							onSubmit={handleLogin}
							className="px-8 py-10 mx-5 bg-white shadow-xl border sm:min-w-[350px] min-w-[300px] rounded-2xl"
						>
							<div className="font-normal text-md">
								Welcome Back
							</div>
							<div className="text-3xl font-bold">Login</div>
							<div className="form">
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
								<div className="mt-5 mb-8">
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

								{/* ----- register button ---------  */}
								<TextInput
									type="submit"
									value="Login"
									text="Login"
									className="font-bold text-white bg-purple-800 rounded-md text-bas"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
