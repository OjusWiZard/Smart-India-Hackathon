import axios from "axios";
import swal from "sweetalert";

const API = axios.create({
	// baseURL: `http://localhost:5000/`,
	baseURL: `https://sih-a-normal-team.herokuapp.com`,
});

API.interceptors.request.use((req) => {
	if (localStorage.getItem("jwt-token")) {
		req.headers.Authorization =
			"Bearer " + localStorage.getItem("jwt-token");
	}
	return req;
});

const config = {
	headers: {
		"Content-Type": "application/json",
	},
};

export const getOtp = async (phno) => {
	console.log(phno);
	try {
		const res = await API.post("/auth/get", { to: `+91${phno}` }, config);
		// swal("Success", "OTP sent", "success");
		return res;
	} catch (error) {
		console.log(error);
		swal("Error", "OTP not sent", "error");
	}
};

export const verifyOtp = async (formData) => {
	try {
		const res = await API.post("/auth/verify", formData, config);
		localStorage.setItem("jwt-token", res.data.token);
		// swal("Success", "OTP verified", "success");
		return res;
	} catch (error) {
		console.log(error);
		swal("Error", "OTP not verified", "error");
	}
};
