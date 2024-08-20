import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AnimeCard } from './components/AnimeCard/AnimeCard';
import { AnimeEditForm } from './components/AnimeEditForm/AnimeEditForm';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

/** Path to anime for url. */
export const PATH_TO_ANIME = 'anime';

/** Path to anime details for url. */
export const PATH_TO_ANIME_DETAILS = ':id';

/** Path to a anime editing for url. */
export const PATH_TO_EDIT_ANIME = 'edit';

/** Route object for AnimePage. */
export const animeRoutes: readonly RouteObject[] = [
	{
		path: PATH_TO_ANIME,
		element: <AnimePage />,
		children: [
			{
				path: PATH_TO_ANIME_DETAILS,
				element: <AnimeCard />,
			},
			{
				path: `${PATH_TO_ANIME_DETAILS}/${PATH_TO_EDIT_ANIME}`,
				element: <AnimeEditForm />,
			},
		],
	},
];
