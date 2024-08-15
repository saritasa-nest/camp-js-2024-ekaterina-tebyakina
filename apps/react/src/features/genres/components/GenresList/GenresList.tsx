import { memo, FC } from 'react';
import { Link } from 'react-router-dom';
import { Genre } from '@js-camp/core/models/genre';
import { List, ListItem, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './GenresList.module.css';

type Props = {

	/** Genres. */
	readonly genres: Genre[];
};

/** Genres list.  */
const GenresListComponent: FC<Props> = ({ genres }: Props) => (
	<List className={styles.list}>
		{ genres.map(genre =>
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
				<ListItemText
					primary={genre.name}
				/>
			</ListItem>) }
	</List>
);

/**
 * Memorized genres list.
 */
export const GenresList = memo(GenresListComponent);
