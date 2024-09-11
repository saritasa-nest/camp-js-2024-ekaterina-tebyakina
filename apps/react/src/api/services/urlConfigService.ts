
export namespace UrlConfigService {

	/** Object with parts of the authorization url requests. */
	export const authorizationUrls = {
		login: 'auth/login/',
		register: 'auth/register/',
		refreshToken: 'auth/token/refresh/',
	};

	/** Object with parts of the user url requests. */
	export const userUrls = {
		profile: 'users/profile/',
	};
}
