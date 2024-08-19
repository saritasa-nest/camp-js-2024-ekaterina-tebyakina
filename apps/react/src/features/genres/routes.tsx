import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { GenreCard } from './components/GenreCard/GenreCard';
import { GenreEditForm } from './components/GenreEditForm/GenreEditForm';

const GenresPage = lazy(() => import('./pages/GenresPage/GenresPage').then(module => ({ default: module.GenresPage })));

/** Path to genres for url. */
export const PATH_TO_GENRES = 'genres';

/** Path to a genre for url. */
export const PATH_TO_GENRE = ':id';

/** Path to a genre editing for url. */
export const PATH_TO_EDIT_GENRE = 'edit';

/** Route object for GenresPage. */
export const genresRoutes: RouteObject[] = [
	{
		path: PATH_TO_GENRES,
		element: <GenresPage />,
		children: [
			{
				path: PATH_TO_GENRE,
				element: <GenreCard />,
			},
			{
				path: `${PATH_TO_GENRE}/${PATH_TO_EDIT_GENRE}`,
				element: <GenreEditForm />,
			},
		],
	},
];
