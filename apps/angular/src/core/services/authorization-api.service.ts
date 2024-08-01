// import { Observable, map, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Registration } from '@js-camp/core/models/registration';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';
import { Login } from '@js-camp/core/models/login';
import { catchError, Observable, throwError } from 'rxjs';

/** Authorization API access service. */
@Injectable({ providedIn: 'root' })
export class AuthorizationApiService {

	private readonly http = inject(HttpClient);

	/**
	 * Get page of anime list.
	 * @param registrationData - Params for request.
	 * @returns Page of anime list.
	 */
	public register(registrationData: Registration): void {
		this.http.post<AuthorizationTokens>('auth/register/', RegistrationMapper.toDto(registrationData))
			.subscribe(response => {
				console.log('registrationData:', response);
				this.saveTokens(response);
			});
	}

	/**
	 * Get page of anime list.
	 * @param loginData - Params for request.
	 * @returns Page of anime list.
	 */
	public login(loginData: Login): Observable<AuthorizationTokens> {
		// this.http.post<AuthorizationTokens>('auth/login/', loginData)
		// 	.subscribe(response => {
		// 		console.log('authData:', response);
		// 		this.saveTokens(response);
		// 	});
		return this.http.post<AuthorizationTokens>('auth/login/', loginData);
		// .subscribe({
		//     next: (response) => {
		//         console.log('authData:', response);
		//         this.saveTokens(response);
		//     },
		//     error: (err) => {
		//         console.error('AuthData failed:', err);
		//     }
		// });
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

	private handleError(error: HttpErrorResponse): void {
		// You can display a general error message to the user
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			console.error(`Backend returned code ${error.status}, body was: `, error.error);
		}

		// Assuming you want to set an error message in the form
		const serverErrorMessage = error.error.message || 'Authorization failed. Please try again.';

		// Set the error in a form control (you might want to create a separate control for errors)
		// this.registrationForm.setErrors({ serverError: serverErrorMessage });
	}
}
