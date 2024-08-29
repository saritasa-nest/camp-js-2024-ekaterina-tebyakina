import { ListItem, Skeleton, Stack } from '@mui/material';
import { memo } from 'react';

const ListItemSkeletonComponent = () => (
	<ListItem
		alignItems='center'
		sx={{
			borderBottom: 1,
			borderColor: theme => theme.palette.divider,
		}}
	>
		<Skeleton
			sx={{
				marginRight: 2,
			}}
			variant='circular'
			width={80}
			height={80}
		/>
		<Stack
			flex='1 1 0'
			direction='column'
			gap={1}
		>
			<Skeleton />
			<Skeleton width='60%' />
		</Stack>
	</ListItem>
);

/** Memoized ListItemSkeletonComponent. */
export const ListItemSkeleton = memo(ListItemSkeletonComponent);
