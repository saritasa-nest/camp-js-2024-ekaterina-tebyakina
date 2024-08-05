import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

/**
 * Add header Api-Key to a request.
 * @param req - Request.
 * @param next - Request handler function.
 * @returns Request with Api-Key.
 */
export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

	const accessToken = localStorage.getItem('accessToken');

	if (accessToken) {
		const reqWithToken = req.clone({
			headers: req.headers.set('Authorization', accessToken),
		});

		// return next(reqWithToken);
	}

	return next(req);
}
