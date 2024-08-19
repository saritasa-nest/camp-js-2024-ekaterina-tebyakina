import { memo, FC } from 'react';
import { List, ListItem, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { AnimeStudio } from '@js-camp/core/models/anime-studio';

import styles from './StudiosList.module.css';

type Props = {

	/** Studios. */
	readonly studios: AnimeStudio[];
};

/** Studios list.  */
const StudiosListComponent: FC<Props> = ({ studios }: Props) => (
	<List className={styles.list}>
		{ studios.map(studio =>
			<ListItem
				key={studio.id}
				className={styles.list__item}
				secondaryAction={
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon />
					</IconButton>
				}
			>
				<ListItemText primary={studio.name} />
			</ListItem>) }
	</List>
);

/** Memorized studios list. */
export const StudiosList = memo(StudiosListComponent);
