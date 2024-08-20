import { memo, FC, useEffect, useRef } from 'react';
import { List, ListItem, IconButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { AnimeStudio } from '@js-camp/core/models/anime-studio';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studio/selectors';
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
	const isLoading = useAppSelector(selectAreStudiosLoading);

	const containerRef = useRef(null);

	const options: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.5,
	};
	const callbackFn: IntersectionObserverCallback = entries => {
		const [entry] = entries;
		if (entry.isIntersecting) {
			console.log('hey i am in the view');
		}
	};

	useEffect(() => {
		dispatch(getAllStudios());
	}, [dispatch]);

	useEffect(() => {
		const observer = new IntersectionObserver(callbackFn, options);
		if (containerRef.current) {
			observer.observe(containerRef.current);
		}
		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, [containerRef, options]);

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
					return <StudioListItem ref={containerRef} key={studio.id} studio={studio} />;
				}
				return <StudioListItem key={studio.id} studio={studio} />;
			})}
		</List>
	);
};

/** Memorized studios list. */
export const StudiosList = memo(StudiosListComponent);
