import { memo, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@mui/material';

import { PATH_TO_EDIT_GENRE, PATH_TO_GENRES } from '../../routes';

import styles from './GenreCard.module.css';

/** Card with genre data. */
const GenreCardComponent: FC = () => {

	const { id } = useParams<{ id: string; }>();

	const linkToEdit = `/${PATH_TO_GENRES}/${id}/${PATH_TO_EDIT_GENRE}`;

	return (
		<Paper
			elevation={3}
			className={styles.card}
		>
			<h2 className={styles.card__title}>
				Item Name
			</h2>
			<div>
				<Typography className={styles.card__information}>
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

/** Memorized genre card. */
export const GenreCard = memo(GenreCardComponent);
