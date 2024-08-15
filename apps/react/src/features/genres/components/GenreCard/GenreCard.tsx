import { memo, FC } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';

import styles from './GenreCard.module.css';

/** Card with genre data. */
const GenreCardComponent: FC = () => {

	const location = useLocation();
	const linkToEdit = `${location.pathname}/edit`;
	const { id } = useParams<{ id: string; }>();

	return (
		<Paper
			elevation={3}
			className={styles.card}
		>
			<h2 className={styles.title}>
				Item Name
			</h2>
			<Box>
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
			</Box>
		</Paper>
	);

};

/**
 * Memorized genre card.
 */
export const GenreCard = memo(GenreCardComponent);
