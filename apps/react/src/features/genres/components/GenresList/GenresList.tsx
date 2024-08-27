import { memo, FC, useEffect, useRef } from 'react';
import { selectGenres, selectGenresNext } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { changeFilters } from '@js-camp/react/store/genre/slice';
import { Link } from 'react-router-dom';
import { List, ListItem, IconButton, ListItemText, Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import styles from './GenresList.module.css';

/** Genres list.  */
const GenresListComponent: FC = () => {
	const dispatch = useAppDispatch();
	const cursor = useAppSelector(selectGenresNext);
	const genres = useAppSelector(selectGenres);
	const containerIntersection = useRef<HTMLElement>(null);
	const anchorIntersection = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && cursor !== null) {
				const next = { next: cursor };
				dispatch(changeFilters(next));
				observer.disconnect();
			}
		}, { root: containerIntersection.current, threshold: 1 });

		if (anchorIntersection.current) {
			observer.observe(anchorIntersection.current);
		}
	}, [cursor]);

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
