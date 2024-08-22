import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const RegistrationPage = lazy(
	() => import('./pages/RegistrationPage')
		.then(module => ({ default: module.RegistrationPage })),
);

/** Path to registration for url. */
export const REGISTER_PATH = 'register';

/** Route object for registration page. */
export const registrationRoutes: readonly RouteObject[] = [
	{
		path: REGISTER_PATH,
		element: <RegistrationPage />,
	},
];
