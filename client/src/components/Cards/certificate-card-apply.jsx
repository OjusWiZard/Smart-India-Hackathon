import React, { useState } from "react";

const CertificateCardApply = ({ name, isPassed, logic, value }) => {
	const parseLogic = (opr) => {
		switch (opr) {
			case ">":
				return "is less than";
			case "<":
				return "is greater than";
			case "=":
				return "should not be as same as";
			case "!=":
				return "should not be equal to";
			default:
				return "";
		}
	};
	return (
		<div
			className={`py-4 px-4 rounded-lg border ${
				isPassed
					? "border-green-200 bg-green-100"
					: "border-red-200 bg-red-100"
			} bg-opacity-40`}
		>
			<span className="text-md font-semibold">
				{name} {parseLogic(logic)} {value}
			</span>
		</div>
	);
};

export default CertificateCardApply;
