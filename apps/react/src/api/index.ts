import axios from 'axios';

import { CONFIG } from './config';
import { LocalStorageService } from './services/localStorageService';
import { AuthorizationService } from './services/authorizationService';

/** Http const with base url. */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});

http.interceptors.request.use(request => {
	request.headers.set('Api-Key', CONFIG.apiKey);
	return request;
}, error => Promise.reject(error));

http.interceptors.request.use(request => {
	const accessToken = LocalStorageService.getAccessToken();
	if (accessToken) {
		request.headers.set('Authorization', `Bearer ${accessToken}`);
	}
	return request;
}, error => Promise.reject(error));

http.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const refreshToken = LocalStorageService.getRefreshToken();
				console.log('refreshToken', refreshToken);

				if (refreshToken) {
					const tokens = await AuthorizationService.refreshAccessToken(refreshToken);
					LocalStorageService.saveTokens(tokens);
					http.defaults.headers.common.Authorization = `Bearer ${tokens.access}`;
				}
				return http(originalRequest);
			} catch (refreshError) {
				console.error('Token refresh failed:', refreshError);
				LocalStorageService.removeTokens();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);
