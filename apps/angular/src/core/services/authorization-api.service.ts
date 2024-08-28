import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegistrationData } from '@js-camp/core/models/registration-data';
import { RegistrationDataMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { AuthorizationTokensDto } from '@js-camp/core/dtos/authorization-tokens.dto';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { ServerErrorDto } from '@js-camp/core/dtos/server-error.dto';
import { ServerErrorMapper } from '@js-camp/core/mappers/server-error.mapper';
import { LoginData } from '@js-camp/core/models/login-data';
import { LoginDataMapper } from '@js-camp/core/mappers/login-data.mapper';
import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';
import { AuthorizationTokensMapper } from '@js-camp/core/mappers/authorization-tokens.mapper';
import { Router } from '@angular/router';
import { TokenKey } from '@js-camp/core/models/token-key';

import { UrlConfigService } from './url-config.service';
import { LocalStorageService } from './local-storage.service';

/** Authorization API access service. */
@Injectable({ providedIn: 'root' })
export class AuthorizationApiService {

	private readonly accessToken$ = new BehaviorSubject<string | null>(null);

	/** Observable to track the access token changes. */
	public readonly userSecret$ = this.accessToken$.asObservable();

	private readonly http = inject(HttpClient);

	private readonly urlConfigService = inject(UrlConfigService);

	private readonly localStorageService = inject(LocalStorageService);

	private readonly router = inject(Router);

	public constructor() {
		this.localStorageService.get<string>(TokenKey.Access).subscribe(token => {
			this.accessToken$.next(token);
		});
	}

	/**
	 * Registers a user.
	 * @param registrationData - Date about the user required to create a profile.
	 * @returns Authorization tokens.
	 */
	public register(registrationData: RegistrationData): Observable<AuthorizationTokens> {
		return this.http.post<AuthorizationTokensDto>(this.urlConfigService.authorization.register,
			RegistrationDataMapper.toDto(registrationData)).pipe(
			map(response => AuthorizationTokensMapper.fromDto(response)),
			tap(response => {
				this.localStorageService.set(TokenKey.Access, response.access);
				this.localStorageService.set(TokenKey.Refresh, response.refresh);
			}),
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					return this.handleError(error);
				}
				return throwError(() => error);
			}),
		);
	}

	/**
	 * Authorizes a user.
	 * @param loginData - Date about the user required to log in.
	 * @returns Authorization tokens.
	 */
	public login(loginData: LoginData): Observable<AuthorizationTokens> {
		return this.http.post<AuthorizationTokensDto>(this.urlConfigService.authorization.login,
			LoginDataMapper.toDto(loginData)).pipe(
			map(response => AuthorizationTokensMapper.fromDto(response)),
			tap(response => {
				this.localStorageService.set(TokenKey.Access, response.access);
				this.localStorageService.set(TokenKey.Refresh, response.refresh);
			}),
			tap(response => this.accessToken$.next(response.access)),
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					return this.handleError(error);
				}
				return throwError(() => error);
			}),
		);
	}

	/**
	 * Refresh access token with refresh token.
	 * @returns Authorization tokens.
	 */
	public refreshAccessToken(): Observable<AuthorizationTokens> {
		return this.localStorageService.get(TokenKey.Refresh).pipe(
			switchMap(refreshToken => {
				if (refreshToken) {
					return this.http.post<AuthorizationTokensDto>(this.urlConfigService.authorization.refresh,
						{ refresh: refreshToken });
				}
				this.logout();
				return throwError(() => new Error('Failed to refresh token'));
			}),
			map(response => AuthorizationTokensMapper.fromDto(response)),
			tap(response => {
				this.localStorageService.set(TokenKey.Access, response.access);
				this.localStorageService.set(TokenKey.Refresh, response.refresh);
			}),
			tap(response => this.accessToken$.next(response.access)),
		);
	}

	/** Remove user authorization data. */
	public logout(): void {
		this.localStorageService.remove(TokenKey.Access);
		this.localStorageService.remove(TokenKey.Refresh);
		this.accessToken$.next(null);
		this.router.navigate(['/login']);
	}

	private handleError(errorResponse: HttpErrorResponse): Observable<never> {
		const errors = errorResponse.error.errors.map((errorDto: ServerErrorDto) => ServerErrorMapper.fromDto(errorDto));
		return throwError(() => new HttpErrorResponse({
			error: { errors },
			headers: errorResponse.headers,
			status: errorResponse.status,
			statusText: errorResponse.statusText,
			...(errorResponse.url && { url: errorResponse.url }),
		}));
	}
}
