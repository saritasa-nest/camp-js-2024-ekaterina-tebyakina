import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LoginPage = lazy(
	() => import('./pages/LoginPage')
		.then(module => ({ default: module.LoginPage })),
);

/** Path to login for url. */
export const LOGIN_PATH = 'login';

/** Route object for authorization page. */
export const loginRoutes: readonly RouteObject[] = [
	{
		path: LOGIN_PATH,
		element: <LoginPage />,
	},
];
