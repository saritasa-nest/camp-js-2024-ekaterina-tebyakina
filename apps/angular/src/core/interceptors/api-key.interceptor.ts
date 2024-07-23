import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AppConfig } from '../utils/app-config';

const appConfig = new AppConfig();

/**
 * Add header Api-Key to a request.
 * @param req - Request.
 * @param next - Request handler function.
 * @returns Request with Api-Key.
 */
export const apiKeyInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const reqWithApiKey = req.clone({
		headers: req.headers.set('Api-Key', appConfig.apiKey),
	});

	return next(reqWithApiKey);
};
