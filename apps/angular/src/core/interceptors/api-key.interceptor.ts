import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable } from 'rxjs';

import { AppConfig } from '../utils/app-config';

/**
 * Add header Api-Key to a request.
 * @param req - Request.
 * @param next - Request handler function.
 * @returns Request with Api-Key.
 */
export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const appConfig = inject(AppConfig);
	const reqWithApiKey = req.clone({
		headers: req.headers.set('Api-Key', appConfig.apiKey),
	});

	return next(reqWithApiKey);
}
