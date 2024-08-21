import { memo, FC, useEffect, useRef, useState } from 'react';
import { selectGenres, selectAreGenresLoading } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { Link } from 'react-router-dom';
import { List, ListItem, IconButton, ListItemText, Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import styles from './GenresList.module.css';

/** Genres list.  */
const GenresListComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const isLoading = useAppSelector(selectAreGenresLoading);
	const containerIntersection = useRef<HTMLElement>(null);
	const anchorIntersection = useRef<HTMLDivElement>(null);
	const [pageNumber, setPageNumber] = useState(0);

	useEffect(() => {
		dispatch(fetchGenres(''));
	}, [dispatch]);

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				console.log('wow');
			}
		}, { root: containerIntersection.current, threshold: 1 });

		if (anchorIntersection.current) {
			observer.observe(anchorIntersection.current);
		}
	});

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<Box className={styles.section__list} ref={containerIntersection}>
			<List className={styles.list}>
				<button style={{ width: '200px', height: '50px' }} />
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
