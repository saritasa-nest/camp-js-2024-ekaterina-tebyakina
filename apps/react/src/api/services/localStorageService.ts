import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';

export namespace LocalStorageService {

	/**
	 * Save tokens to local storage.
	 * @param tokens - Access and refresh tokens.
	 */
	export function saveTokens(tokens: AuthorizationTokens): void {
		localStorage.setItem('accessToken', tokens.access);
		localStorage.setItem('refreshToken', tokens.refresh);
	}

	/**
	 * Remove tokens from local storage.
	 * @param tokens - Access and refresh tokens.
	 */
	export function removeTokens(): void {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	}

	/**
	 * Get access token from local storage.
	 * @returns Access token.
	 */
	export function getAccessToken(): string | null {
		return localStorage.getItem('accessToken');
	}

	/**
	 * Get refresh token from local storage.
	 * @returns Refresh token.
	 */
	export function getRefreshToken(): string | null {
		return localStorage.getItem('refreshToken');
	}
}
