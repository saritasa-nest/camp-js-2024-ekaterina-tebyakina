import { memo, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@mui/material';

import { ANIME_PATH, EDIT_ANIME_PATH } from '../../routes';

import styles from './AnimeCard.module.css';

/** Card with anime data. */
const AnimeCardComponent: FC = () => {

	const { id } = useParams<{ id: string; }>();

	const linkToEdit = `/${ANIME_PATH}/${id}/${EDIT_ANIME_PATH}`;

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

/** Memoized anime card. */
export const AnimeCard = memo(AnimeCardComponent);
