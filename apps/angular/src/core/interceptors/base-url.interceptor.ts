import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../utils/app-config';

/**
 * Add base url to a request.
 * @param req - Request.
 * @param next - Request handler function.
 * @returns Request with base url.
 */
export function baseUrlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const appConfig = inject(AppConfig);
	const reqWithBaseUrl = req.clone({ url: `${appConfig.baseApiURL}/${req.url}` });
	return next(reqWithBaseUrl);
}
