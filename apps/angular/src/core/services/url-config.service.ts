import { Injectable } from '@angular/core';

/** Service for setup url config for requests to API. */
@Injectable({ providedIn: 'root' })
export class UrlConfigService {

	/** Object with parts of the url requests for anime endpoints. */
	public readonly anime = {
		getAnime: 'anime/anime/',
	};

	/** Object with parts of the url requests for authorization endpoints. */
	public readonly authorization = {
		register: 'auth/register/',
		login: 'auth/login/',
		refresh: 'auth/token/refresh/',
	};

	/** Object with parts of the url requests for user endpoints. */
	public readonly user = {
		getCurrentUser: 'users/profile/',
	};

	/** Object with parts of the url requests for authorization endpoints. */
	public readonly authorization = {
		register: 'auth/register/',
		login: 'auth/login/',
		refresh: 'auth/token/refresh/',
	};

	/** Object with parts of the url requests for user endpoints. */
	public readonly user = {
		getCurrentUser: 'users/profile/',
	};
}
