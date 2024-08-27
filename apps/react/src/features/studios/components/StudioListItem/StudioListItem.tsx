import { memo, forwardRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { ListItem, ListItemText, IconButton, ListItemAvatar, Avatar } from '@mui/material';

import { AnimeStudio } from '@js-camp/core/models/anime-studio';
import { useNavigate } from 'react-router-dom';

import { STUDIOS_PATH } from '../../routes';

type Props = {

	/** Studio. */
	readonly studio: AnimeStudio;
};

const StudioListItemComponent = forwardRef<HTMLLIElement, Props>(({ studio }: Props, ref) => {
	const navigate = useNavigate();

	/** Navigate to studio detail. */
	function handleNavigate() {
		navigate(`/${STUDIOS_PATH}/${studio.id}`);
	}

	return (
		<ListItem
			ref={ref}
			alignItems='center'
			onClick={handleNavigate}
			sx={{
				'borderBottom': 1,
				'borderColor': 'rgba(0 0 0 / 15%)',
				':hover': {
					cursor: 'pointer',
					backgroundColor: 'rgba(0 0 0 / 15%)',
				},
			}}
			secondaryAction={
				<IconButton
					edge='end'
					aria-label='delete'
				>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemAvatar
				sx={{
					marginRight: '16px',
				}}
			>
				<Avatar
					sx={{
						width: 80,
						height: 80,
						border: '1px solid rgba(0 0 0 / 15%)',
					}}
					alt={studio.name}
					src={studio.image}
				/>
			</ListItemAvatar>
			<ListItemText primary={studio.name} />
		</ListItem>
	);
});

/** Memoized StudioListItemComponent. */
export const StudioListItem = memo(StudioListItemComponent);
