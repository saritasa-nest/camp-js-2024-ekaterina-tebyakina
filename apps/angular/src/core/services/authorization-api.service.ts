import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Registration } from '@js-camp/core/models/registration';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';
import { Login } from '@js-camp/core/models/login';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { UrlConfigService } from './url-config.service';

/** Authorization API access service. */
@Injectable({ providedIn: 'root' })
export class AuthorizationApiService {

	private readonly http = inject(HttpClient);

	private readonly urlConfigService = inject(UrlConfigService);

	private readonly localStorageService = inject(LocalStorageService);

	/**
	 * Registers a user.
	 * @param registrationData - Date about the user required to create a profile.
	 * @returns Authorization tokens.
	 */
	public register(registrationData: Registration): Observable<AuthorizationTokens> {
		console.log(RegistrationMapper.toDto(registrationData));
		return this.http.post<AuthorizationTokens>(this.urlConfigService.authorization.register,
			RegistrationMapper.toDto(registrationData)).pipe(
			tap(response => this.localStorageService.saveTokens(response)),
			catchError(error => this.handleError(error)),
		);
	}

	/**
	 * Authorizes a user.
	 * @param loginData - Date about the user required to log in.
	 * @returns Authorization tokens.
	 */
	public login(loginData: Login): Observable<AuthorizationTokens> {
		return this.http.post<AuthorizationTokens>(this.urlConfigService.authorization.login, loginData).pipe(
			tap(response => this.localStorageService.saveTokens(response)),
			catchError(error => this.handleError(error)),
		);
	}

	public refreshAccessToken(): Observable<AuthorizationTokens> {
    return this.localStorageService.getRefreshToken().pipe(
			switchMap(refreshToken => {
				if (refreshToken) {
					return this.http.post<AuthorizationTokens>(this.urlConfigService.authorization.refresh, { refresh: refreshToken }).pipe(
						tap(response => this.localStorageService.saveTokens(response)),
						catchError(error => this.handleError(error))
					);
				}
				return throwError(() => new Error('Failed to refresh token'));
			}),
			catchError(error => this.handleError(error)),
		);
  }

  public logout(): void {
    this.localStorageService.removeTokens();
  }

	private handleError(errorResponse: HttpErrorResponse): Observable<never> {
		return throwError(() => errorResponse);
	}
}
