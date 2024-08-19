import { memo, FC } from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';

import { AnimeStudio } from '@js-camp/core/models/anime-studio';

type Props = {

	/** Studio. */
	readonly studio: AnimeStudio;
};

/** Studio card.  */
const StudioListItemComponent: FC<Props> = ({ studio }: Props) => (
	<Card
		sx={{
			display: 'flex',
			width: '100%',
			boxShadow: 'none',
			border: 'none',
			backgroundColor: 'transparent',
		}}
	>
		<Avatar sx={{ width: 80, height: 80 }} src={studio.image} alt={studio.name} />
		<CardContent sx={{ display: 'flex', alignItems: 'center' }}>
			<Typography variant="h5" fontSize={'1rem'}>
				{studio.name}
			</Typography>
		</CardContent>
	</Card>
);

/** Memorized studios list. */
export const StudioListItem = memo(StudioListItemComponent);
