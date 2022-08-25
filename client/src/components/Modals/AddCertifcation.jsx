import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import FilledPrimary from "../Buttons/Filled-primary";
import BounceLoader from "react-spinners/BounceLoader";

export default function AddCertificateModal({
	isOpen,
	setIsOpen,
	certificate,
	importElement,
}) {
	function closeModal() {
		setIsOpen(false);
	}
	const [referenceId, setReferenceId] = useState("");
	useEffect(() => {
		return () => {
			setReferenceId("");
		};
	}, []);
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen bg-black bg-opacity-60 px-8 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen bg-black align-middle"
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
							<div className="inline-block w-30 max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<BounceLoader
									color="#6C42C1"
									loading={importElement}
									size={50}
								/>
								{/* <Dialog.Title
									as="h3"
									className="text-2xl font-bold leading-6 text-gray-900"
								>
									Add Certificate
								</Dialog.Title>
								<div className="mt-5">
									<div className="font-normal text-xs">
										Reference ID
									</div>
									<input
										type="text"
										value={referenceId}
										name="referenceId"
										className="border w-full mt-3 border-gray-200 rounded-md outline-none py-4 px-5"
										onChange={(e) =>
											setReferenceId(e.target.value)
										}
									/>
								</div>

								<div className="mt-9">
									<FilledPrimary
										text="Add"
										disabled={referenceId.length === 0}
									/>
								</div> */}
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
