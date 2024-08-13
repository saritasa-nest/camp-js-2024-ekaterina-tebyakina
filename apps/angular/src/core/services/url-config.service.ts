import { Injectable } from '@angular/core';

/** Service for setup url config for requests to API. */
@Injectable({ providedIn: 'root' })
export class UrlConfigService {

	/** Object with parts of the url requests. */
	public readonly anime = {
		getPage: 'anime/anime/',
	};
}
