import { Routes } from '@angular/router';

import { RouterPaths } from '../core/model/router-paths';

import { DashboardComponent } from './features/dashboard/dashboard.component';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: RouterPaths.Main,
		component: DashboardComponent,
	},
	{
		path: RouterPaths.Login,
		loadComponent: () => import('./features/login/login-form.component')
			.then(c => c.LoginFormComponent),
	},
	{
		path: RouterPaths.Registration,
		loadComponent: () => import('./features/registration/registration-form.component')
			.then(c => c.RegistrationFormComponent),
	},
];
