import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

/** Card with studio data. */
const StudioCardComponent: FC = () => {
	const { id } = useParams<{ id: string; }>();

	return (
		<Paper
			elevation={3}
			sx={{
				padding: 2,
				height: '100%',
			}}
		>
			<Typography
				component='h2'
				variant='h2'
				marginBlock={1}
			>
				Studio Detail
			</Typography>
			<div>
				<Typography component='p'>Information about studio with id = {id}</Typography>
			</div>
		</Paper>
	);
};

/** Memoized studio card. */
export const StudioCard = memo(StudioCardComponent);
