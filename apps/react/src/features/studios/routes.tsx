import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const StudiosPage = lazy(() => import('./pages/StudiosPage').then(module => ({ default: module.StudiosPage })));

/** Path to studios for url. */
export const STUDIOS_PATH = 'studios';

/** Route object for studios page. */
export const studiosRoutes: readonly RouteObject[] = [
	{
		path: STUDIOS_PATH,
		element: <StudiosPage />,
	},
];
