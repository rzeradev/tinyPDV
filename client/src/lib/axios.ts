import type { Cookies } from "@sveltejs/kit";
import axios from "axios";

const baseURL = "http://localhost:9091/";

export const axiosInstance = () => {
	return axios.create({
		baseURL: baseURL,
		headers: {
			Accept: "application/json",
		},
	});
};

export const apiInstance = (cookies: Cookies) => {
	return axios.create({
		baseURL: baseURL,
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${cookies.get("token")}`,
		},
	});
};
