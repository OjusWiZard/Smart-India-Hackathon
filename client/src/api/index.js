import axios from "axios";
import swal from "sweetalert";

const API = axios.create({
	baseURL: `http://3.110.67.226:8000/`,
	// baseURL: `http://localhost:5000/`,
	// baseURL: `https://sih-a-normal-team.herokuapp.com`,
});

// const accountSid = "AC1380334613562247835c13f1fcf358b2";
// const authToken = "d5bb4d459e1cd78f065be7b3f220ce80";
// const client = require("twilio")(accountSid, authToken);

// export const sendVerificationCode = async () => {
// 	client.validationRequests
// 		.create({
// 			friendlyName: localStorage.getItem("email"),
// 			statusCallback:
// 				"https://somefunction.twil.io/caller-id-validation-callback",
// 			phoneNumber: localStorage.getItem("phno"),
// 		})
// 		.then((validation_request) => {
// 			console.log(validation_request.friendlyName);
// 		})
// 		.catch((err) => console.log(err));
// };

API.interceptors.request.use((req) => {
	if (localStorage.getItem("jwt-token")) {
		req.headers.authorization =
			"Bearer " + localStorage.getItem("jwt-token");
	}
	return req;
});

const config = {
	headers: {
		"Content-Type": "application/json",
	},
};

export const getLogicList = async () => {
	try {
		const res = await API.get("/scholarships/logic/", config);
		return res;
	} catch (err) {
		const { response } = err;
		console.log(response);
		swal("Error", Object.values(response.data)[0][0], "error");
		return response;
	}
};

export const getAttributes = async () => {
	try {
		const res = await API.get("/documents/attributes/", config);
		return res;
	} catch (err) {
		const { response } = err;
		console.log(response);
		swal("Error", Object.values(response.data)[0][0], "error");
		return response;
	}
};

export const registerUser = async (formData) => {
	try {
		const res = await API.post("/accounts/users/", formData, config);
		swal("Success", res.statusText, "success");
		console.log(res);
		return res;
	} catch (err) {
		const { response } = err;
		swal("Error", Object.values(response.data)[0], "error");
		return response;
	}
};

export const loginUser = async (formData) => {
	try {
		const res = await API.post("/accounts/jwt/create/", formData, config);
		localStorage.setItem("jwt-token", res.data.access);
		return res;
	} catch (err) {
		const { response } = err;
		console.log(response);
		swal("Error", Object.values(response.data)[0], "error");
		return response;
	}
};

export const getMyDocument = async () => {
	try {
		const res = await API.get("/documents/", config);
		return res;
	} catch (err) {
		const { response } = err;
		console.log(response);
		swal("Error", Object.values(response.data)[0][0], "error");
		return response;
	}
};

export const getScholarships = async () => {
	try {
		const res = await API.get("/scholarships/scholarship/", config);
		return res;
	} catch (err) {
		const { response } = err;
		console.log(response);
		swal("Error", Object.values(response.data)[0][0], "error");
		return response;
	}
};

export const getScholarshipDetails = async (id) => {
	try {
		const res = await API.get(`/scholarships/scholarship/${id}`, config);
		return res;
	} catch (err) {
		const { response } = err;
		console.log(response);
		swal("Error", Object.values(response.data)[0][0], "error");
		return response;
	}
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

export const sendStatus = async (body) => {
	try {
		const res = await API.post("/auth/status", { body }, config);
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error);
		swal("Error", "Message not sent", "error");
	}
};
