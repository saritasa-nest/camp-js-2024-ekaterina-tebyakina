import { memo, FC } from 'react';
import { List, ListItem, IconButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { AnimeStudio } from '@js-camp/core/models/anime-studio';

type Props = {

	/** Studios. */
	readonly studios: AnimeStudio[];
};

/** Studios list.  */
const StudiosListComponent: FC<Props> = ({ studios }: Props) => (
	<List
		sx={{
			height: '100%',
			overflowY: 'auto',
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: 'rgba(0 0 0 / 15%)',
		}}
		disablePadding
	>
		{studios.map(studio => (
			<ListItem
				key={studio.id}
				alignItems="center"
				sx={{
					'borderBottom': 1,
					'borderColor': 'rgba(0 0 0 / 15%)',
					':hover': {
						cursor: 'pointer',
						backgroundColor: 'rgba(0 0 0 / 15%)',
					},
				}}
				secondaryAction={
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon />
					</IconButton>
				}
			>
				<ListItemAvatar sx={{ marginRight: '16px' }}>
					<Avatar sx={{ width: 80, height: 80 }} alt={studio.name} src={studio.image} />
				</ListItemAvatar>
				<ListItemText primary={studio.name} />
			</ListItem>
		))}
	</List>
);

/** Memorized studios list. */
export const StudiosList = memo(StudiosListComponent);
