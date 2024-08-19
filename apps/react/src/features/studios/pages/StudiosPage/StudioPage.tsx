import { memo, useEffect, FC } from 'react';
import { Outlet } from 'react-router-dom';

import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studio/selectors';
import { getAllStudios } from '@js-camp/react/store/studio/dispatchers';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';

import { StudiosList } from '../../components/StudiosList';

import styles from './StudioPage.module.css';

/** Studio page component. */
const StudiosPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studios = useAppSelector(selectStudios);
	const isLoading = useAppSelector(selectAreStudiosLoading);

	useEffect(() => {
		dispatch(getAllStudios());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<main className={styles.main}>
			<div className={styles.main__section}>
				<StudiosList studios={studios} />
			</div>
			<div className={styles.main__details}>
				<Outlet />
			</div>
		</main>
	);
};

/** Memorized studio page component. */
export const StudiosPage = memo(StudiosPageComponent);
