import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { User } from '@js-camp/core/models/user';
import { catchError, mergeMap, Observable, of, shareReplay, switchMap, throwError } from 'rxjs';

import { UrlConfigService } from './url-config.service';
import { AuthorizationApiService } from './authorization-api.service';

/** Users API access service. */
@Injectable({ providedIn: 'root' })
export class UserApiService {

	private readonly http = inject(HttpClient);

	private readonly urlConfigService = inject(UrlConfigService);

	private readonly authorizationService = inject(AuthorizationApiService);

	private readonly errorObject = {
		avatar: null,
	};

	/** Data about an authorized user. */
	public readonly user$ = this.initializeUser();

	/**
	 * Get the current user based on the stored token.
	 * @returns Observable of the current user.
	 */
	public getCurrentUser(): Observable<User> {

		return this.http.get<UserDto>(this.urlConfigService.user.getCurrentUser).pipe(
			mergeMap(result => {
				// When the server fails to retrieve a user, it does not send an error, but an object with an avatar field equal to null.
				// Therefore, we will throw an error when receiving such data.
				if (JSON.stringify(result) === JSON.stringify(this.errorObject)) {
					return throwError(() => new Error('Failed to get current user'));
				}
				return of(UserMapper.fromDto(result));
			}),
			catchError((error: unknown) => throwError(() => error)),
		);
	}

	private initializeUser(): Observable<User | null> {
		return this.authorizationService.userSecret$.pipe(
			switchMap(token => {
				if (token) {
					return this.getCurrentUser();
				}
				return of(null);
			}),
			shareReplay({ bufferSize: 1, refCount: true }),
		);
	}
}
