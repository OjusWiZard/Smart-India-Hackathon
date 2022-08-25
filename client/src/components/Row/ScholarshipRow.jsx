import React from "react";

const ScholarshipRow = ({
	scholarship: { name, amount, starting, max_claims, isPassed },
}) => {
	return (
		<div
			className={`px-8 py-3 h-24 border ${
				isPassed ? "border-red-200 " : "border-gray-200"
			}`}
		>
			<div>
				<div className="font-semibold text-xl">{name}</div>
				<div className="text-sm font-normal text-gray-600 mt-1">
					Amount : {amount}
				</div>
				<div className="flex justify-between items-center">
					<div className="text-sm font-normal text-gray-600">
						Claims - {max_claims}
					</div>
					<div className="text-sm font-normal text-gray-400">
						{starting}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScholarshipRow;
