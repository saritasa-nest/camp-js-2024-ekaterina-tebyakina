import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { GenreCard } from './components/GenreCard/GenreCard';
import { GenreEditForm } from './components/GenreEditForm/GenreEditForm';

const GenresPage = lazy(() => import('./pages/GenresPage/GenresPage').then(module => ({ default: module.GenresPage })));

/** Path to genres for url. */
export const GENRES_PATH = 'genres';

/** Path to a genre for url. */
export const GENRE_PATH = ':id';

/** Path to a genre editing for url. */
export const EDIT_GENRE_PATH = 'edit';

/** Route object for GenresPage. */
export const genresRoutes: readonly RouteObject[] = [
	{
		path: GENRES_PATH,
		element: <GenresPage />,
		children: [
			{
				path: GENRE_PATH,
				element: <GenreCard />,
			},
			{
				path: `${GENRE_PATH}/${EDIT_GENRE_PATH}`,
				element: <GenreEditForm />,
			},
		],
	},
];
