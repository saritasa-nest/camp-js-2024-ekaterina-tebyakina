import { memo, FC, useEffect, useRef, useCallback } from 'react';
import { Box, CircularProgress, List } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAreStudiosLoading, selectStudioNextCursor, selectStudios } from '@js-camp/react/store/studio/selectors';
import { getAllStudios } from '@js-camp/react/store/studio/dispatchers';

import useQueryParams from '@js-camp/react/hooks/useQueryParam';

import { StudioQueryParams } from '@js-camp/core/mappers/studio-query-params.mapper';

import { ListItemSkeleton } from '@js-camp/react/components/skeleton';

import { StudioListItem } from '../StudioListItem';

/** Studios list.  */
const StudiosListComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studiosList = useAppSelector(selectStudios);
	const nextCursor = useAppSelector(selectStudioNextCursor);

	const { getQueryParamByKey } = useQueryParams<StudioQueryParams>();
	const search = getQueryParamByKey('search');
	const sort = getQueryParamByKey('sort');

	const wrapperElementRef = useRef<HTMLElement>(null);

	const isLoading = useAppSelector(selectAreStudiosLoading);

	useEffect(() => {
		wrapperElementRef.current?.scrollTo({ top: 0, behavior: 'instant' });
		dispatch(getAllStudios({ search, sort }));
	}, [search, sort]);

	const observer = useRef<IntersectionObserver>();

	const options: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.5,
	};

	const lastElementRef = useCallback(
		(node: HTMLLIElement | null) => {
			observer.current?.disconnect();

			if (node) {
				observer.current = new IntersectionObserver(entries => {
					if (entries[0].isIntersecting && nextCursor) {
						dispatch(getAllStudios({ nextCursor, search, sort }));
						observer.current?.disconnect();
					}
				}, options);

				observer.current.observe(node);
			}
		},
		[nextCursor],
	);

	return (
		<Box
			component='section'
			ref={wrapperElementRef}
			sx={{
				flex: '1 1 0',
				height: '100%',
				overflowY: 'auto',
				borderTop: '1px solid rgba(0 0 0 / 15%)',
			}}
		>
			<List disablePadding>
				{isLoading &&
					studiosList.length === 0 &&
					Array.from(new Array(10)).map((_, index) => <ListItemSkeleton key={index} />)}

				{studiosList.map((studio, index) => {
					if (studiosList.length === index + 1) {
						return (
							<StudioListItem
								ref={lastElementRef}
								key={studio.id}
								studio={studio}
							/>
						);
					}
					return (
						<StudioListItem
							key={studio.id}
							studio={studio}
						/>
					);
				})}

				{isLoading && studiosList.length > 0 && (
					<Box
						display='flex'
						justifyContent='center'
						marginBlock={2}
					>
						<CircularProgress />
					</Box>
				)}
			</List>
		</Box>
	);
};

/** Memorized studios list. */
export const StudiosList = memo(StudiosListComponent);
