import React from "react";

const FilledPrimary = ({
	text,
	disabled,
	icon,
	loading,
	className,
	handleClick,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={handleClick}
			className={`bg-primary-dark opacity-90 ${
				!disabled && "hover:opacity-100"
			} rounded-md w-full py-4 
      text-white flex justify-around items-start 
      
      font-bold text-base ${className && className} ${
				disabled && "opacity-25 cursor-not-allowed"
			}`}
		>
			{icon && <img src={icon} alt="Icon" />}
			{loading ? "Loading..." : text}
		</button>
	);
};

export default FilledPrimary;
