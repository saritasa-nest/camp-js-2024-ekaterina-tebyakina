import { memo, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@mui/material';

import { EDIT_GENRE_PATH, GENRES_PATH } from '../../routes';

import styles from './GenreCard.module.css';

/** Card with genre data. */
const GenreCardComponent: FC = () => {

	const { id } = useParams<{ id: string; }>();

	const linkToEdit = `/${GENRES_PATH}/${id}/${EDIT_GENRE_PATH}`;

	return (
		<Paper
			elevation={3}
			className={styles.card}
		>
			<h2 className={styles.title}>
				Item Name
			</h2>
			<div>
				<Typography className={styles.information}>
					Information about item with id = {id}
				</Typography>
				<Button
					variant="outlined"
					component={Link}
					to={linkToEdit}
				>
					Edit
				</Button>
			</div>
		</Paper>
	);

};

/** Memoized genre card. */
export const GenreCard = memo(GenreCardComponent);
