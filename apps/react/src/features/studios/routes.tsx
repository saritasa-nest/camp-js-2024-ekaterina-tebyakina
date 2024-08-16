import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const StudiosPage = lazy(() => import('./pages/StudiosPage').then(module => ({ default: module.StudiosPage })));

/** Path to studios for url. */
export const PATH_TO_STUDIOS = 'studios';

/** Route object for StudiosPage. */
export const studiosRoutes: RouteObject[] = [
	{
		path: PATH_TO_STUDIOS,
		element: <StudiosPage />,
	},
];
