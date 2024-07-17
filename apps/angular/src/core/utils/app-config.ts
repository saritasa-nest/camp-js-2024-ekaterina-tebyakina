import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** */
@Injectable({
	providedIn: 'root',
})
export class AppConfig {
	/** */
	public readonly baseApiURL = environment.baseApiURL;

	/** */
	public readonly apiKey = environment.apiKey;
}
