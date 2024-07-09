import axios from 'axios';

import { CONFIG } from './config';

/**
 * Http const with baseUrl.
 */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
