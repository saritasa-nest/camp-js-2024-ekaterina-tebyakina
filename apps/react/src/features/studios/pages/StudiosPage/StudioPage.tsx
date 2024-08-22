import { memo, FC } from 'react';
import { Outlet } from 'react-router-dom';

import { StudiosList } from '../../components/StudiosList';

import { StudioSearchBar } from '../../components/StudioSearchBar';

import { StudiosSort } from '../../components/StudioSort';

import styles from './StudioPage.module.css';

/** Studio page component. */
const StudiosPageComponent: FC = () => (
	<main className={styles.main}>
		<div className={styles.main__section}>
			<StudiosSort />
			<StudioSearchBar/>
			<StudiosList />
		</div>
		<div className={styles.main__details}>
			<Outlet />
		</div>
	</main>
);

/** Memorized studio page component. */
export const StudiosPage = memo(StudiosPageComponent);
