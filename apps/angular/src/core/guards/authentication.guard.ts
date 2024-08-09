import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthorizationApiService } from '../services/authorization-api.service';
import { RouterPaths } from '../model/router-paths';

/**
 * Guard checks if the user is logged in.
 * @returns True if user is logged in and false otherwise.
 */
export const authorizationGuard: CanActivateFn = () => {
	const authorizationService = inject(AuthorizationApiService);
	const router = inject(Router);

	if (authorizationService.isAuthenticated()) {
		return true;
	}

	router.navigate([RouterPaths.Login]);
	return false;

};
