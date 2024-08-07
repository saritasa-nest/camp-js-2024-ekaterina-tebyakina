import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { inject } from '@angular/core';

import { AppConfig } from '../utils/app-config';

/**
 * Add base url to a request.
 * @param request - Request.
 * @param next - Request handler function.
 * @returns Request with base url.
 */
export function baseUrlInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const appConfig = inject(AppConfig);
	const reqWithBaseUrl = request.clone({ url: `${appConfig.baseApiURL}/${request.url}` });
	return next(reqWithBaseUrl);
}
