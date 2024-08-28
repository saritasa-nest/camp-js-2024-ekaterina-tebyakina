import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/** Service for working with local storage. */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {

	/**
	 * Save property to local storage.
	 * @param name - Property name.
	 * @param value - Property value.
	 */
	public set<T>(name: string, value: T): void {
		localStorage.setItem(name, JSON.stringify(value));
	}

	/**
	 * Get property from local storage.
	 * @param name - Property name.
	 * @returns Property with specified name.
	 */
	public get<T>(name: string): Observable<T | null> {
		const value = localStorage.getItem(name);
		if (value) {
			try {
				return of(JSON.parse(value));
			} catch (parseError) {
				console.error(parseError);
				return of(null);
			}
		}
		return of(null);
	}

	/**
	 * Remove property from local storage.
	 * @param name - Property name.
	 */
	public remove(name: string): void {
		localStorage.removeItem(name);
	}
}
