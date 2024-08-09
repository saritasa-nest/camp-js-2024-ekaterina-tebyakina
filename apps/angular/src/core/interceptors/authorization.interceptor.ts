import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { ServerErrorStatus } from '@js-camp/core/models/server-error-status';

import { AuthorizationApiService } from '../services/authorization-api.service';
import { LocalStorageService } from '../services/local-storage.service';

/**
 * Add header Authorization to a request.
 * @param req - Request.
 * @param next - Request handler function.
 * @returns Request with Authorization header.
 */
export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

	const authorizationService = inject(AuthorizationApiService);

	const localStorageService = inject(LocalStorageService);

	return localStorageService.getAccessToken().pipe(
		switchMap(accessToken => {
			if (accessToken) {
				const reqWithToken = addToken(req, accessToken);
				return next(reqWithToken);
			}

			return next(req);
		}),
		catchError((error: unknown) => {
			if (error instanceof HttpErrorResponse && error.status === ServerErrorStatus.Unauthorized) {
				return handleTokenExpired(req);
			}
			return throwError(() => error);
		}),
	);

	/**
	 * Add access token as authorization header in request.
	 * @param request - Request.
	 * @param token - Access token.
	 * @returns Request with authorization header.
	 */
	function addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
		return request.clone({
			setHeaders: {
				// Disable eslint because this header should be written with a capital letter.
				// eslint-disable-next-line @typescript-eslint/naming-convention
				Authorization: `Bearer ${token}`,
			},
		});
	}

	/**
	 * Calls the access token update function and inserts the new token into the request.
	 * @param request - Request.
	 * @returns Request with authorization header with new access token.
	 */
	function handleTokenExpired(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {

		return authorizationService.refreshAccessToken().pipe(
			switchMap(() => localStorageService.getAccessToken()),
			switchMap(newAccessToken => {
				if (newAccessToken) {
					return next(addToken(request, newAccessToken));
				}
				return next(request);
			}),
			catchError((error: unknown) => {
				console.error('Error handling expired access token:', error);
				authorizationService.logout();
				return throwError(() => error);
			}),
		);
	}
}
