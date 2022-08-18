import React from "react";

const ScholarshipRow = ({
	scholarship: { title, description, startingDate, endingDate, link },
}) => {
	return (
		<div className="border-gray-200 border-b h-24">
			<div className="px-8 py-7">
				<div className="font-semibold text-lg">{title}</div>
				<div className="flex justify-between items-center">
					<div className="text-sm font-normal text-gray-400">
						{description}
					</div>
					<div className="text-sm font-normal text-gray-400">
						{startingDate} - {endingDate}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScholarshipRow;
