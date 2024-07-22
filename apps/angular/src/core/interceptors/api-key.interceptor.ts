import { HttpInterceptorFn } from '@angular/common/http';
import { AppConfig } from '../utils/app-config';

const appConfig = new AppConfig;

/** Adds header Api-Key to a request. */
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
	const reqWithApiKey = req.clone({
		headers: req.headers.set('Api-Key', appConfig.apiKey),
	});
  return next(reqWithApiKey);
};
