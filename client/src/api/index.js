import axios from "axios";

const API = axios.create({
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
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const verifyOtp = async (formData) => {
	try {
		const res = await API.post("/auth/verify", formData, config);
		localStorage.setItem("token", res.data.token);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getAllCerts = async () => {
	try {
		const res = await API.get("/cert", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt-token"),
			},
		});
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getCert = async (sid) => {
	try {
		const res = await API.get("/cert/" + sid, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt-token"),
			},
		});
		return res;
	} catch (error) {
		console.log(error);
	}
};
