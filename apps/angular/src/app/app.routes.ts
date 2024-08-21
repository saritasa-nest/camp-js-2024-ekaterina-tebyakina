import { Routes } from '@angular/router';

import { RouterPaths } from '../core/model/router-paths';
import { authorizationGuard } from '../core/guards/authentication.guard';

import { AnimeDashboardComponent } from './features/anime-dashboard/anime-dashboard.component';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: RouterPaths.Main,
		children: [
			{ path: '', component: AnimeDashboardComponent },
			{
				path: ':id',
				canActivate: [authorizationGuard],
				loadComponent: () => import('./features/anime-details/anime-details.component')
					.then(c => c.AnimeDatailsComponent),
			},
		],
	},
	{
		path: RouterPaths.Login,
		loadComponent: () => import('./features/login-form/login-form.component')
			.then(c => c.LoginFormComponent),
	},
	{
		path: RouterPaths.Registration,
		loadComponent: () => import('./features/registration-form/registration-form.component')
			.then(c => c.RegistrationFormComponent),
	},
	{ path: '**', redirectTo: RouterPaths.Main },
];
