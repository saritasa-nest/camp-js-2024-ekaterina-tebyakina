import { InternalAxiosRequestConfig } from 'axios';

import { CONFIG } from '../config';

/**
 * Sets the Api-Key header to request.
 * @param config - Request config.
 * @returns Request config with Api-Key header.
 */
export function apiKeyHeaderInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	config.headers.set('Api-Key', CONFIG.apiKey);
	return config;
}
