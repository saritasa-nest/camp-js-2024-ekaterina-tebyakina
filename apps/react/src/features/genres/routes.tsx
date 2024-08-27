import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { GenreCard } from './components/GenreCard';
import { GenreEditForm } from './components/GenreEditForm';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

/**
 * Route object for GenresPage.
 */
export const genresRoutes: RouteObject[] = [
	{
		path: 'genres',
		element: <GenresPage />,
		children: [
			{
				path: ':id',
				element: <GenreCard />,
			},
			{
				path: ':id/edit',
				element: <GenreEditForm />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to="GenresPage" />,
	},
];
