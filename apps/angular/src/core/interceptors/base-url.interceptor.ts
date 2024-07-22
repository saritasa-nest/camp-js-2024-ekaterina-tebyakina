import { HttpInterceptorFn } from '@angular/common/http';
import { AppConfig } from '../utils/app-config';

const appConfig = new AppConfig;

/**
 * Adds base url to a request.
 * @param req - Request.
 * @param next - Request handler function.
 * @returns Request with base url.
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
	const reqWithBaseUrl = req.clone({url: `${appConfig.baseApiURL}/${req.url}`});
  return next(reqWithBaseUrl);
};
