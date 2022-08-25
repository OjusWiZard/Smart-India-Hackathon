import React from "react";
import moment from "moment";

const ScholarshipRow = ({
	scholarship: { name, amount, starting, max_claims, isPassed, desc },
}) => {
	return (
		<div
			className={`px-8 py-3 min-h-24 mb-1.5 bg-white border ${
				isPassed ? "border-red-200 " : "border-gray-200"
			}`}
		>
			<div>
				<div className="font-semibold text-xl">{name}</div>
				<div className="text-sm font-normal text-gray-600 mt-1">
					Amount : {amount}
				</div>
				<div className="flex justify-between items-center">
					{/* <div className="text-sm font-normal text-gray-600">
						Claims - {max_claims}
					</div> */}

					<div className="text-sm font-normal text-gray-600 mt-3">
						{desc}
					</div>
					<div className="text-sm whitespace-nowrap font-normal text-gray-400">
						{moment(starting).format("MMM do YYYY")}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScholarshipRow;
