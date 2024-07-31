import { Routes } from '@angular/router';

import { AnimeDashboardComponent } from './features/anime-dashboard/anime-dashboard.component';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		component: AnimeDashboardComponent,
	},
	{
		path: 'login',
		loadComponent: () => import('./features/login/login-form.component')
			.then(c => c.LoginFormComponent),
	},
	{
		path: 'registration',
		loadComponent: () => import('./features/registration/registration-form.component')
			.then(c => c.RegistrationFormComponent),
	},
];
