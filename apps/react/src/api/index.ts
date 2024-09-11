import axios from 'axios';

import { CONFIG } from './config';
import { apiKeyHeaderInterceptor } from './interceptors/apiKeyHeaderInterceptor';
import { authorizationHeaderInterceptor } from './interceptors/authorizationTokenInterceptor';
import { refreshTokenInterceptor } from './interceptors/refreshTokenInterceptor';

/** Http const with base url. */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});

http.interceptors.request.use(apiKeyHeaderInterceptor, error => Promise.reject(error));

http.interceptors.request.use(authorizationHeaderInterceptor, error => Promise.reject(error));

http.interceptors.response.use(response => response, refreshTokenInterceptor);
