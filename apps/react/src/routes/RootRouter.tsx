import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { genresRoutes } from '../features/genres/routes';
import { animeRoutes } from '../features/anime/routes';
import { studiosRoutes } from '../features/studios/routes';

const routes: RouteObject[] = [
	{
		path: '*',
		element: <Navigate to="/anime" />,
	},
	...animeRoutes,
	...genresRoutes,
	...studiosRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);