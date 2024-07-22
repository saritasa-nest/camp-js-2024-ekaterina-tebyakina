import { HttpInterceptorFn } from '@angular/common/http';
import { AppConfig } from '../utils/app-config';

const appConfig = new AppConfig;

/**
 * Adds header Api-Key to a request.
 * @param req - Request.
 * @param next - Request handler function.
 * @returns Request with Api-Key.
 */
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
	const reqWithApiKey = req.clone({
		headers: req.headers.set('Api-Key', appConfig.apiKey),
	});
  return next(reqWithApiKey);
};
