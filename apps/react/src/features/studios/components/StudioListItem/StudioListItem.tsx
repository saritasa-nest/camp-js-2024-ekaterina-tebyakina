import { memo, forwardRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { ListItem, ListItemText, IconButton, ListItemAvatar, Avatar } from '@mui/material';

import { AnimeStudio } from '@js-camp/core/models/anime-studio';

type Props = {

	/** Genre. */
	readonly studio: AnimeStudio;
};

const StudioListItemComponent = forwardRef<HTMLLIElement, Props>(({ studio }: Props, ref) => (
	<ListItem
		ref={ref}
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
));

/** Memoized GenreCard component. */
export const StudioListItem = memo(StudioListItemComponent);
