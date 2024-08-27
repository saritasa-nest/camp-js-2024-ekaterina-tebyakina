import { memo, FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { QueryService } from '@js-camp/react/api/services/queryService';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectQueryFilter } from '@js-camp/react/store/genre/selectors';

import { GenresList } from '../../components/GenresList';
import { GenresFilterForm } from '../GenresFilterForm';

import styles from './GenresSidebar.module.css';

/** Genres sidebar.  */
const GenresSidebarComponent: FC = () => {
	const dispatch = useAppDispatch();
	const filter = useAppSelector(selectQueryFilter);

	useEffect(() => {
		dispatch(fetchGenres(QueryService.filter(filter)));
	}, [filter]);

	return (
		<Box className={styles.sidebar}>
			<GenresFilterForm />
			<GenresList />
		</Box>
	);
};

/** Memorized genres sidebar. */
export const GenresSidebar = memo(GenresSidebarComponent);
