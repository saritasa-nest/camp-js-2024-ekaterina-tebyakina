import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

/** Path to anime for url. */
export const ANIME_PATH = 'anime';

/** Route object for anime page. */
export const animeRoutes: readonly RouteObject[] = [
	{
		path: ANIME_PATH,
		element: <AnimePage />,
	},
];
