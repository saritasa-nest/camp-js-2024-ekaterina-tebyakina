import { memo, FC, useEffect, useRef } from 'react';
import { selectGenres, selectGenresNext, selectQueryFilter } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { Link } from 'react-router-dom';
import { List, ListItem, IconButton, ListItemText, Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import styles from './GenresList.module.css';

/** Genres list.  */
const GenresListComponent: FC = () => {
	// const dispatch = useAppDispatch();
	// const filter = useAppSelector(selectQueryFilter);
	// const cursor = useAppSelector(selectGenresNext);
	const genres = useAppSelector(selectGenres);
	const containerIntersection = useRef<HTMLElement>(null);
	const anchorIntersection = useRef<HTMLDivElement>(null);

	// const parseCursor = (link: string | null): string => {
	// 	if (link == null) {
	// 		return '';
	// 	}
	// 	return link.split('/').at(-1);
	// };

	// useEffect(() => {
	// 	const observer = new IntersectionObserver(entries => {
	// 		if (cursor == null) {
	// 			observer.disconnect();
	// 		}

	// 		if (entries[0].isIntersecting) {
	// 			dispatch(fetchGenres(parseCursor(cursor)));
	// 			observer.disconnect();
	// 		}
	// 	}, { root: containerIntersection.current, threshold: 1 });

	// 	if (anchorIntersection.current) {
	// 		observer.observe(anchorIntersection.current);
	// 	}
	// }, [cursor]);

	return (

		<Box className={styles.section__list} ref={containerIntersection}>
			<List className={styles.list}>
				{genres.map(genre =>
					<ListItem
						key={genre.id}
						className={styles.list__item}
						secondaryAction={
							<IconButton edge="end" aria-label="delete">
								<DeleteIcon />
							</IconButton>
						}
						component={Link}
						to={`/genres/${genre.id}`}
					>
						<ListItemText primary={genre.name} />
						<ListItemText primary={genre.type} />
					</ListItem>)}
				<div ref={anchorIntersection}></div>
			</List>
		</Box>

	);
};

/** Memorized genres list. */
export const GenresList = memo(GenresListComponent);
