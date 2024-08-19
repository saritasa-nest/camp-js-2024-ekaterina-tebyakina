import { memo, FC } from 'react';
import { Link } from 'react-router-dom';
import { Genre } from '@js-camp/core/models/genre';
import { List, ListItem, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { PATH_TO_GENRES } from '../../routes';

import styles from './GenresList.module.css';

type Props = {

	/** Genres. */
	readonly genres: readonly Genre[];
};

/** Genres list.  */
const GenresListComponent: FC<Props> = ({ genres }) => (
	<List className={styles.list}>
		{ genres.map(genre =>
			<ListItem
				key={genre.id}
				className={styles.item}
				secondaryAction={
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon />
					</IconButton>
				}
				component={Link}
				to={`/${PATH_TO_GENRES}/${genre.id}`}
			>
				<ListItemText primary={genre.name} />
			</ListItem>) }
	</List>
);

/** Memoized genres list. */
export const GenresList = memo(GenresListComponent);
