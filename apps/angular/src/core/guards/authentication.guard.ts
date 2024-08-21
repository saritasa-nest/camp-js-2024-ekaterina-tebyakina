import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';

import { AuthorizationApiService } from '../services/authorization-api.service';
import { RouterPaths } from '../model/router-paths';

/**
 * Guard checks if the user is logged in.
 * @returns True if user is logged in and false otherwise.
 */
export const authorizationGuard: CanActivateFn = () => {
	const authorizationService = inject(AuthorizationApiService);
	const router = inject(Router);

	return authorizationService.isAuthenticated().pipe(
		tap(isAuthenticated => {
			if (!isAuthenticated) {
				router.navigate([RouterPaths.Login]);
			}
		}),
		map(isAuthenticated => isAuthenticated),
	);
};
