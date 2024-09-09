import { memo, FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Stack } from '@mui/material';

import { StudiosList } from '../../components/StudiosList';

import { StudioSearchBar } from '../../components/StudioSearchBar';

import { StudiosSort } from '../../components/StudioSort';

/** Studio page component. */
const StudiosPageComponent: FC = () => (
	<Stack
		component='main'
		direction='row'
		sx={{
			width: '100%',
			height: 'calc(100vh - var(--header-height))',
		}}
	>
		<Stack
			component='section'
			direction='column'
			sx={{
				width: '380px',
				border: theme => `1px solid ${theme.palette.divider}`,
			}}
		>
			<Stack
				direction='column'
				padding={2}
				gap={2}
			>
				<StudioSearchBar />
				<StudiosSort />
			</Stack>
			<StudiosList />
		</Stack>
		<Box
			component='section'
			padding={3}
			sx={{
				width: '100%',
			}}
		>
			<Outlet />
		</Box>
	</Stack>
);

/** Memorized studio page component. */
export const StudiosPage = memo(StudiosPageComponent);
