import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Pipe for bypass security trust resource url. */
@Pipe({
	standalone: true,
	name: 'safe',
})
export class SafePipe implements PipeTransform {

	/** Helps preventing Cross Site Scripting Security bugs (XSS).*/
	protected readonly sanitizer = inject(DomSanitizer);

	/**
	 * Transform url to safe.
	 * @param url - Url for bypass.
	 * @returns Safe resource url.
	 */
	public transform(
		url: string,
	): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
