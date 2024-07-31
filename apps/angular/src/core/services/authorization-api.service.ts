// import { Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Registration } from '@js-camp/core/models/registration';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';

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

		// console.log(RegistrationMapper.toDto(registrationData));

		this.http.post<AuthorizationTokens>('auth/register/', RegistrationMapper.toDto(registrationData))
			.subscribe(response => {
			// console.log('registrationData:', response);
				this.saveTokens(response);
			});
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
}
