import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const { contact_no, email, full_name } = user;
	console.log(user);
	const [loading, setLoading] = useState(false);
	// useEffect(() => {
	// 	if (user.id) {
	// 		setLoading(false);
	// 		console.log(user.id);
	// 	}
	// }, [user]);

	return (
		<>
			{loading ? (
				<div className="flex justify-center items-center px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
					<BounceLoader color="#6C42C1" loading={loading} size={50} />
				</div>
			) : (
				<div className="px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
					<div className="px-7 py-4 bg-white rounded-md">
						<div className="font-regular flex justify-between items-center">
							<div className="font-bold">Full Name</div>
							<div>{full_name}</div>
						</div>
						<div className="font-regular flex justify-between items-center mt-2">
							<div className="font-bold">Email</div>
							<div>{email}</div>
						</div>
						<div className="font-regular flex justify-between items-center mt-2">
							<div className="font-bold">Contact No</div>
							<div>{contact_no}</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
