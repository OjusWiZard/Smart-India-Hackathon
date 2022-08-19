import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const TextInput = ({
	name = null,
	label = "",
	type = "text",
	placeholder = "",
	menuItems = [],
	border = "",
	className,
	handleChange = () => {},
}) => {
	return (
		<div>
			<label className="block">
				<span className="block text-base font-regular text-primary-grey">
					{label}
				</span>
				{menuItems.length > 0 ? (
					<div className="flex items-center justify-around">
						<div className="w-[45%] h-[50px] text-sm">
							<Menu
								as="div"
								className="relative inline-block w-full text-left"
							>
								<div>
									<Menu.Button className="inline-flex justify-center w-full px-4 py-4 mt-1 text-sm font-normal bg-white border rounded-md text-secondary-placeholder hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
										+91
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white border divide-y divide-gray-100 rounded-lg border-primary-light focus:outline-none">
										<div className="">
											{menuItems.map((item) => (
												<Menu.Item key={item.text}>
													{({ active }) => (
														<button
															className={`${
																active
																	? "bg-primary-extra-light"
																	: "text-gray-900"
															} group flex rounded-md items-center w-full px-9 pt-8 pb-6 text-sm`}
														>
															{item.text}
														</button>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>

						<input
							type="text"
							name={name}
							placeholder={placeholder}
							onChange={handleChange}
							className={`mt-2 ml-3 ${
								className && className
							} block w-full font-regular px-5 py-4 bg-white border border-secondary-border rounded-md text-sm shadow-sm placeholder-secondary-placeholder
              focus:outline-none`}
						/>
					</div>
				) : (
					<input
						type={type}
						name={name}
						placeholder={placeholder}
						onChange={handleChange}
						className={`mt-2 ${className && className} ${
							border === "all"
								? "border border-secondary-border rounded-md"
								: "border border-white border-b-secondary-border"
						} block w-full font-regular px-5 py-4 bg-white text-sm placeholder-secondary-placeholder
            focus:outline-none`}
					/>
				)}
			</label>
		</div>
	);
};

export default TextInput;
