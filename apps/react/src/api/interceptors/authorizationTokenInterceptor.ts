import { InternalAxiosRequestConfig } from 'axios';

import { LocalStorageService } from '../services/localStorageService';

/**
 * Sets the Authorization header to request.
 * @param config - Request config.
 * @returns Request config with Authorization header.
 */
export function authorizationHeaderInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	const accessToken = LocalStorageService.getAccessToken();
	if (accessToken) {
		config.headers.set('Authorization', `Bearer ${accessToken}`);
	}
	return config;
}
