import { memo, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@mui/material';

import { PATH_TO_ANIME, PATH_TO_EDIT_ANIME } from '../../routes';

import styles from './AnimeCard.module.css';

/** Card with anime data. */
const AnimeCardComponent: FC = () => {

	const { id } = useParams<{ id: string; }>();

	const linkToEdit = `/${PATH_TO_ANIME}/${id}/${PATH_TO_EDIT_ANIME}`;

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

/** Memorized anime card. */
export const AnimeCard = memo(AnimeCardComponent);
