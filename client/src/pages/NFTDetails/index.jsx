import React from "react";

const NFTDetails = () => {
	return (
		<div className="px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="font-normal text-2xl lg:mb-0 mb-3">
				Certificate - 1
			</div>
			<div className="mt-8">
				<div className="grid grid-cols-3 gap-x-8">
					<div className="bg-white col-span-2 p-5">
						<div className="flex flex-col">
							<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
									<div className="overflow-hidden">
										<table className="min-w-full">
											<thead className="bg-white border-b">
												<tr>
													<th
														scope="col"
														className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
													>
														#
													</th>
													<th
														scope="col"
														className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
													>
														KEY
													</th>
													<th
														scope="col"
														className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
													>
														VALUE
													</th>
												</tr>
											</thead>
											<tbody>
												<tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
														1
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														Mark
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														Otto
													</td>
												</tr>
												<tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
														2
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														Jacob
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														Thornton
													</td>
												</tr>
												<tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
														3
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														Larry
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														Wild
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col space-y-6">
						<div className="bg-white p-5">
							<div className="flex items-center justify-start">
								<div className="font-semibold text-md">
									Minted By:
								</div>
								<div className="text-base font-regular ml-2">
									x00796563xff3d
								</div>
							</div>
							<div className="flex items-center justify-start">
								<div className="font-semibold text-md">
									Minted On:
								</div>
								<div className="text-base font-regular ml-2">
									22 August 2019
								</div>
							</div>
							<div className="flex items-center justify-start">
								<div className="font-semibold text-md">
									Token ID:
								</div>
								<div className="text-base font-regular ml-2">
									69420
								</div>
							</div>
							<div className="flex items-center justify-start">
								<div className="font-semibold text-md">
									Contract Address:
								</div>
								<div className="text-base font-regular ml-2">
									0xff79469420
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NFTDetails;
