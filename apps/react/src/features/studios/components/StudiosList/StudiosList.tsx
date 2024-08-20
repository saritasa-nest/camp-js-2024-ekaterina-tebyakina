import { memo, FC, useEffect, useRef, useCallback } from 'react';
import { List } from '@mui/material';

import { AnimeStudio } from '@js-camp/core/models/anime-studio';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAreStudiosLoading, selectStudioNextCursor, selectStudios } from '@js-camp/react/store/studio/selectors';
import { getAllStudios } from '@js-camp/react/store/studio/dispatchers';

import { StudioListItem } from '../StudioListItem/StudioListItem';

type Props = {

	/** Studios. */
	readonly studios: AnimeStudio[];
};

/** Studios list.  */
const StudiosListComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studiosList = useAppSelector(selectStudios);
	const nextCursor = useAppSelector(selectStudioNextCursor);

	const isLoading = useAppSelector(selectAreStudiosLoading);

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
						console.log('i am in the view');
						observer.current?.disconnect();
					}
				}, options);

				observer.current.observe(node);
			}
		},
		[nextCursor],
	);

	useEffect(() => {
		dispatch(getAllStudios());
	}, []);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<List
			sx={{
				height: '100%',
				overflowY: 'auto',
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: 'rgba(0 0 0 / 15%)',
			}}
			disablePadding
		>
			{studiosList.map((studio, index) => {
				if (studiosList.length === index + 1) {
					return <StudioListItem ref={lastElementRef} key={studio.id} studio={studio} />;
				}
				return <StudioListItem key={studio.id} studio={studio} />;
			})}
		</List>
	);
};

/** Memorized studios list. */
export const StudiosList = memo(StudiosListComponent);
