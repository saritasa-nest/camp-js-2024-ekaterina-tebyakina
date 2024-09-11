import { FC, memo } from 'react';
import { Box, CircularProgress } from '@mui/material';

/** Component to show the loading process.  */
const ProgressComponent: FC = () => (
	<Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
		<CircularProgress />
	</Box>
);

/** Memoized progress component. */
export const Progress = memo(ProgressComponent);
