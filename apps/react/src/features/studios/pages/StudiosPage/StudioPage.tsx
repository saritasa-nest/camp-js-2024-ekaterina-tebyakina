import { memo, FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { StudiosList } from '../../components/StudiosList';

import { StudioSearchBar } from '../../components/StudioSearchBar';

import { StudiosSort } from '../../components/StudioSort';

/** Studio page component. */
const StudiosPageComponent: FC = () => (
	<Box
		component='main'
		sx={{
			display: 'flex',
			flexDirection: 'row',
			width: '100%',
			height: 'calc(100vh - var(--header-height))',
		}}
	>
		<Box
			component='section'
			display='flex'
			flexDirection='column'
			sx={{
				width: '380px',
				border: '1px solid rgba(0 0 0 / 15%)',
			}}
		>
			<Box
				display='flex'
				flexDirection='column'
				padding={2}
				gap={2}
			>
				<StudioSearchBar />
				<StudiosSort />
			</Box>
			<StudiosList />
		</Box>
		<Box
			component='section'
			padding={3}
			sx={{
				width: '100%',
			}}
		>
			<Outlet />
		</Box>
	</Box>
);

/** Memorized studio page component. */
export const StudiosPage = memo(StudiosPageComponent);
