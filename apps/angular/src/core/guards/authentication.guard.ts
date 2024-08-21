import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

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
		map(isAuthenticated => {
			if (!isAuthenticated) {
				return router.parseUrl(RouterPaths.Login);
			}
			return true;
		}),
	);
};
