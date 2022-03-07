import axios from "axios";

const API = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`
})

API.interceptors.request((req) => {
    if (localStorage.getItem("jwt-token")) {
        req.header.Authorization = "Bearer " + localStorage.getItem("jwt-token")
    }
    return req;
})

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const getOtp = async (phno) => {
    try {
        const res = await API.post("/auth/get", { to: phno }, config)
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const verifyOtp = async (formData) => {
    try {
        const res = await API.post("/auth/verify", formData, config);
        return res;
    } catch (error) {
        console.log(error);
    }
}