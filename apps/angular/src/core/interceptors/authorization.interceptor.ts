import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthorizationApiService } from '../services/authorization-api.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ServerErrorStatus } from '@js-camp/core/models/server-error-status';

/**
 * Add header Authorization to a request.
 * @param req - Request.
 * @param next - Request handler function.
 * @returns Request with Authorization header.
 */
export function authorizationInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

	const authService = inject(AuthorizationApiService);

	const localStorageService = inject(LocalStorageService);

	return localStorageService.getAccessToken().pipe(
    switchMap((accessToken) => {
      if (accessToken) {
        const reqWithToken = addToken(request, accessToken);
        return next(reqWithToken);
      }

      return next(request);
    }),
		catchError((error) => {
			if (error.status == ServerErrorStatus.Unauthorized) {
				return handleTokenExpired(request, next);
			}
			return throwError(() => error);
		})
  );

	function addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

	function handleTokenExpired(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

		return authService.refreshAccessToken().pipe(
      switchMap(() => localStorageService.getAccessToken()),
      switchMap((newAccessToken) => {
        if (newAccessToken) {
          return next(addToken(request, newAccessToken));
        }
        return next(request);
      }),
      catchError((error) => {
        console.error('Error handling expired access token:', error);
        return throwError(() => error);
      })
    );
  }
}
