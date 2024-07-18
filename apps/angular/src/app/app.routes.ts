import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./features/dashboard/dashboard.component')
			.then(c => c.DashboardComponent),
	},
];
