import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

/** Path to anime for url. */
export const PATH_TO_ANIME = 'anime';

/** Route object for AnimePage. */
export const animeRoutes: readonly RouteObject[] = [
	{
		path: PATH_TO_ANIME,
		element: <AnimePage />,
	},
];
