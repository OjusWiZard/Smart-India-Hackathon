import React from "react";

const CertificateCardApply = ({ name, isPassed }) => {
	return (
		<div
			className={`py-4 px-4 rounded-lg border ${
				isPassed
					? "border-green-200 bg-green-100"
					: "border-red-200 bg-red-100"
			} bg-opacity-40`}
		>
			<span className="text-md font-semibold">{name}</span>
		</div>
	);
};

export default CertificateCardApply;
