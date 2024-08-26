import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AnimeCard } from './components/AnimeCard/AnimeCard';
import { AnimeEditForm } from './components/AnimeEditForm/AnimeEditForm';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

/** Path to anime for url. */
export const ANIME_PATH = 'anime';

/** Path to anime details for url. */
export const ANIME_DETAILS_PATH = ':id';

/** Path to a anime editing for url. */
export const EDIT_ANIME_PATH = 'edit';

/** Route object for anime page. */
export const animeRoutes: readonly RouteObject[] = [
	{
		path: ANIME_PATH,
		element: <AnimePage />,
		children: [
			{
				path: ANIME_DETAILS_PATH,
				element: <AnimeCard />,
			},
			{
				path: `${ANIME_DETAILS_PATH}/${EDIT_ANIME_PATH}`,
				element: <AnimeEditForm />,
			},
		],
	},
];
