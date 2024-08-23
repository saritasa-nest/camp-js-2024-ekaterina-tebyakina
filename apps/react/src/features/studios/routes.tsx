import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { StudioCard } from './components/StudioDetail';

const StudiosPage = lazy(() => import('./pages/StudiosPage').then(module => ({ default: module.StudiosPage })));

/** Path to studios for url. */
export const STUDIOS_PATH = 'studios';

/** Path to anime details for url. */
export const STUDIO_DETAILS_PATH = ':id';

/** Route object for studios page. */
export const studiosRoutes: readonly RouteObject[] = [
	{
		path: STUDIOS_PATH,
		element: <StudiosPage />,
		children: [
			{
				path: STUDIO_DETAILS_PATH,
				element: <StudioCard />,
			},
		],
	},
];
