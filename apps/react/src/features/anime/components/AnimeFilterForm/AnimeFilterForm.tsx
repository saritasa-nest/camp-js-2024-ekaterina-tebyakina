import { memo, FC } from 'react';

import { AnimeSearchField } from '../AnimeSearchField/AnimeSearchField';
import { AnimeTypesField } from '../AnimeTypesField/AnimeTypesField';
import { AnimeSortField } from '../AnimeSortField/AnimeSortField';

import styles from './AnimeFilterForm.module.css';

/** Anime filter form. */
const AnimeFilterFormComponent: FC = () => (
	<form className={styles.form}>
		<div className={styles.row}>
			<AnimeSearchField />
			<AnimeTypesField />
		</div>
		<div className={styles.row}>
			<AnimeSortField />
		</div>
	</form>
);

/** Memoized filter form. */
export const AnimeFilterForm = memo(AnimeFilterFormComponent);
