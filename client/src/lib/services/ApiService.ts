import axios from "axios";
import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from "axios";
import Cookies from "js-cookie";
import { toast } from "svelte-sonner";

const baseURL = "http://localhost:9091/";

class ApiService {
	private axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: baseURL,
			headers: {
				Accept: "application/json",
				"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") || "", // Get CSRF token from cookies
			},
			withCredentials: true,
		});

		this.initializeResponseInterceptor();
	}

	private initializeResponseInterceptor() {
		this.axiosInstance.interceptors.response.use(
			this.handleResponse,
			this.handleError
		);
	}

	private handleResponse(response: AxiosResponse) {
		// You can add custom logic for successful responses here
		return response;
	}

	private handleError(error: AxiosError) {
		// Handle network errors
		if (!error.response) {
			console.error("Network error: Please check your internet connection.");
			toast.error("Network error: Please check your internet connection.");
		}

		// Handle specific error codes
		if (error.response) {
			switch (error.response.status) {
				case 401:
					console.error("Unauthorized: Please log in again.");
					localStorage.removeItem("user");
					window.location.href = "/login";
					break;
				case 403:
					console.error(
						"Forbidden: You do not have permission to access this resource."
					);
					toast.error(
						"Forbidden: You do not have permission to access this resource."
					);
					break;
				case 404:
					console.error(
						"Not Found: The requested resource could not be found."
					);
					toast.error("Not Found: The requested resource could not be found.");
					break;
				// Add more cases as needed
				default:
					console.error(
						"An error occurred: " + (error.response.data as any).message
					);
					toast.error(
						"An error occurred: " + (error.response.data as any).message
					);
			}
		}

		return Promise.reject(error);
	}

	private async getCSRFToken() {
		await this.axiosInstance.get("sanctum/csrf-cookie");
	}

	public async get<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		await this.getCSRFToken();
		return this.axiosInstance.get<T>(url, config);
	}

	public async post<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		await this.getCSRFToken();
		return this.axiosInstance.post<T>(url, data, config);
	}

	public async put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		await this.getCSRFToken();
		return this.axiosInstance.put<T>(url, data, config);
	}

	public async delete<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		await this.getCSRFToken();
		return this.axiosInstance.delete<T>(url, config);
	}

	public async uploadFile<T = any>(
		url: string,
		formData: FormData,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		const uploadConfig = {
			...config,
			headers: {
				...config?.headers,
				"Content-Type": "multipart/form-data",
			},
		};
		return this.axiosInstance.post<T>(url, formData, uploadConfig);
	}
}

export const apiService = new ApiService();
