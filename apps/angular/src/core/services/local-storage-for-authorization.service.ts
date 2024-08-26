import { inject, Injectable } from '@angular/core';
import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

/** Service for working with local storage. */
@Injectable({ providedIn: 'root' })
export class LocalStorageForAuthorizationService {

	private readonly localStorageService = inject(LocalStorageService);

	/**
	 * Save tokens to local storage.
	 * @param tokens - Access and refresh tokens.
	 */
	public saveTokens(tokens: AuthorizationTokens): void {
		this.localStorageService.setValue('accessToken', tokens.access);
		this.localStorageService.setValue('refreshToken', tokens.refresh);
	}

	/**
	 * Remove tokens from local storage.
	 * @param tokens - Access and refresh tokens.
	 */
	public removeTokens(): void {
		this.localStorageService.removeValue('accessToken');
		this.localStorageService.removeValue('refreshToken');
	}

	/**
	 * Get access token from local storage.
	 * @returns Access token.
	 */
	public getAccessToken(): Observable<string | null> {
		return this.localStorageService.getValue('accessToken');
	}

	/**
	 * Get refresh token from local storage.
	 * @returns Refresh token.
	 */
	public getRefreshToken(): Observable<string | null> {
		return this.localStorageService.getValue('refreshToken');
	}
}
