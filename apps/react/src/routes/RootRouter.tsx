import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { genresRoutes } from '../features/genres/routes';
import { animeRoutes, PATH_TO_ANIME } from '../features/anime/routes';
import { studiosRoutes } from '../features/studios/routes';

const routes: RouteObject[] = [
	{
		path: '*',
		element: <Navigate to={PATH_TO_ANIME} />,
	},
	...animeRoutes,
	...genresRoutes,
	...studiosRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
