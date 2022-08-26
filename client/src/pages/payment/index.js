import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const Payment = () => {
	const [state, setState] = useState({
		name: "",
		acc_number: "",
		ifsc: "",
	});
	const handleInputFocus = (e) => {
		this.setState({ focus: e.target.name });
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({ [name]: value });
	};

	return (
		<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="font-normal text-2xl">Payment Details</div>

			{/* <div id="PaymentForm">
				<Cards
					cvc={state.cvc}
					expiry={state.expiry}
					focused={state.focus}
					name={state.name}
					number={state.number}
				/>
				<form>
					<input
						type="tel"
						name="number"
						placeholder="Card Number"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
					...
				</form>
			</div> */}
		</div>
	);
};

export default Payment;
