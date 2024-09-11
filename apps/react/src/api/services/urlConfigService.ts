
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

	/** Object with parts of the s3 url requests. */
	export const s3Urls = {
		getParams: 's3/get-params/',
	};
}
