import axios from 'axios';
import { ServerErrorStatus } from '@js-camp/core/models/server-error-status';

import { http } from '..';
import { LocalStorageService } from '../services/localStorageService';
import { AuthorizationService } from '../services/authorizationService';

/**
 * Refresh access token and sets it as the Authorization header to request.
 * @param error - Request error.
 * @returns Request config with new Authorization header.
 */
export function refreshTokenInterceptor(error: unknown) {
	if (axios.isAxiosError(error)) {
		const originalRequest = error.config;
		if (error.response?.status === ServerErrorStatus.Unauthorized && originalRequest) {
			const refreshToken = LocalStorageService.getRefreshToken();

			if (refreshToken) {
				AuthorizationService.refreshAccessToken(refreshToken)
					.then(tokens => {
						LocalStorageService.saveTokens(tokens);
						http.defaults.headers.common.Authorization = `Bearer ${tokens.access}`;
						originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
						return http(originalRequest);
					})
					.catch(refreshError => {
						console.error(refreshError);
						LocalStorageService.removeTokens();
						return Promise.reject(refreshError);
					});
			}
		}
	}

	LocalStorageService.removeTokens();
	return Promise.reject(error);
}
