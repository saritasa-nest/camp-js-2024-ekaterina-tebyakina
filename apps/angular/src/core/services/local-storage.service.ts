import { Injectable } from '@angular/core';
import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';
import { Observable, of, Subject } from 'rxjs';

/** Service for working with local storage. */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {

	/**
	 * Save tokens to local storage.
	 * @param tokens - Access and refresh tokens.
	 */
	public saveTokens(tokens: AuthorizationTokens): void {
		localStorage.setItem('accessToken', tokens.access);
		localStorage.setItem('refreshToken', tokens.refresh);
	}

	/**
	 * Remove tokens from local storage.
	 * @param tokens - Access and refresh tokens.
	 */
	public removeTokens(): void {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	}

	/**
	 * Get access token from local storage.
	 * @returns Access token.
	 */
	public getAccessToken(): Observable<string | null> {
		const accessToken = localStorage.getItem('accessToken');
		return of(accessToken);
	}

	/**
	 * Get refresh token from local storage.
	 * @returns Refresh token.
	 */
	public getRefreshToken(): Observable<string | null> {
		const refreshToken = localStorage.getItem('refreshToken');
		return of(refreshToken);
	}
}
