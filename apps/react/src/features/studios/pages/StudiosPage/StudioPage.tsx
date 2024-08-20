import { memo, FC } from 'react';
import { Outlet } from 'react-router-dom';

import { StudiosList } from '../../components/StudiosList';

import styles from './StudioPage.module.css';

/** Studio page component. */
const StudiosPageComponent: FC = () => (
	<main className={styles.main}>
		<div className={styles.main__section}>
			<StudiosList />
		</div>
		<div className={styles.main__details}>
			<Outlet />
		</div>
	</main>
);

/** Memorized studio page component. */
export const StudiosPage = memo(StudiosPageComponent);
