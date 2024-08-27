import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const StudiosPage = lazy(() => import('./pages/StudiosPage').then(module => ({ default: module.StudiosPage })));

/**
 * Route object for StudiosPage.
 */
export const studiosRoutes: RouteObject[] = [
	{
		path: 'studios',
		element: <StudiosPage />,
	},
	{
		path: '*',
		element: <Navigate to="StudiosPage" />,
	},
];
