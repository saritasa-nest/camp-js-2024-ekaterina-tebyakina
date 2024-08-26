import axios from 'axios';

import { CONFIG } from './config';

/** Http const with base url. */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
