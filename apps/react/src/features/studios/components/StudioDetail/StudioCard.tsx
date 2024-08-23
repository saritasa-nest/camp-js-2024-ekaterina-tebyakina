import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

/** Card with anime data. */
const StudioCardComponent: FC = () => {
	const { id } = useParams<{ id: string; }>();

	return (
		<Paper
			elevation={3}
			sx={{
				padding: '16px',
				height: '100%',
			}}
		>
			<Typography
				component='h2'
				fontSize='1.5rem'
				fontWeight={700}
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
