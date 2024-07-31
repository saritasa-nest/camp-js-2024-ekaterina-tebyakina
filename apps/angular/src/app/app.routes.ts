import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
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
