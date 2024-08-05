import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Registration } from '@js-camp/core/models/registration';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';
import { Login } from '@js-camp/core/models/login';
import { catchError, Observable, tap, throwError } from 'rxjs';

/** Authorization API access service. */
@Injectable({ providedIn: 'root' })
export class AuthorizationApiService {

	private readonly http = inject(HttpClient);

	/**
	 * Get page of anime list.
	 * @param registrationData - Params for request.
	 * @returns Page of anime list.
	 */
	public register(registrationData: Registration): Observable<AuthorizationTokens> {
		return this.http.post<AuthorizationTokens>('auth/register/', RegistrationMapper.toDto(registrationData)).pipe(
			catchError(error => this.handleError(error)),
		);
	}

	/**
	 * Get page of anime list.
	 * @param loginData - Params for request.
	 * @returns Page of anime list.
	 */
	public login(loginData: Login): Observable<AuthorizationTokens> {
		return this.http.post<AuthorizationTokens>('auth/login/', loginData).pipe(
			catchError(error => this.handleError(error)),
		);
	}

	/**
	 * Get page of anime list.
	 * @param tokens - Params for request.
	 * @returns Page of anime list.
	 */
	public saveTokens(tokens: AuthorizationTokens): void {
		localStorage.setItem('accessToken', tokens.access);
		localStorage.setItem('refreshToken', tokens.refresh);
	}

	public refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthorizationTokens>('auth/token/refresh', { refreshToken }).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.access);
      }),
      catchError(error => this.handleError(error))
    );
  }

  public logout(): void {
    // Your logout logic here
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

	/**
	 * Get page of anime list.
	 * @returns Page of anime list.
	 */
	public getAuthorizationToken(): string | null {
		const accessToken = localStorage.getItem('accessToken');
		return accessToken;
	}

	private handleError(error: HttpErrorResponse): Observable<never> {
		return throwError(() => error);
	}
}
