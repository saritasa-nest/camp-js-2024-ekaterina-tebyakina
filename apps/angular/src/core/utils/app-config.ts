import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Provides access to the environment. */
@Injectable({
	providedIn: 'root',
})
export class AppConfig {

	/** The beginning of the api url. */
	public readonly baseApiURL = environment.baseApiURL;

	/** Key for api access. */
	public readonly apiKey = environment.apiKey;
}
