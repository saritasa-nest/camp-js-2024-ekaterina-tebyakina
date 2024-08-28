import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenKey } from '@js-camp/core/models/token-key';

import { AuthorizationApiService } from '../services/authorization-api.service';
import { AppConfig } from '../utils/app-config';
import { UrlConfigService } from '../services/url-config.service';
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

	const appConfig = inject(AppConfig);

	const urlConfigService = inject(UrlConfigService);

	return localStorageService.get<string>(TokenKey.Access).pipe(
		switchMap(accessToken => {
			if (accessToken) {
				const reqWithToken = addToken(req, accessToken);
				return next(reqWithToken);
			}

			return next(req);
		}),
		catchError((error: unknown) => {
			if (req.url === `${appConfig.baseApiURL}/${urlConfigService.authorization.refresh}`) {
				return next(req);
			}
			if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
				return handleTokenExpired(req);
			}
			authorizationService.logout();
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
			switchMap(() => localStorageService.get<string>(TokenKey.Access)),
			switchMap(newAccessToken => {
				if (newAccessToken) {
					return next(addToken(request, newAccessToken));
				}
				return throwError(() => new Error('Error handling expired access token'));
			}),
			catchError((error: unknown) => {
				console.error('Error handling expired access token:', error);
				authorizationService.logout();
				return throwError(() => error);
			}),
		);
	}
}
