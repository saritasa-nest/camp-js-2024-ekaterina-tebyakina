import { memo, FC } from 'react';
import { TextField } from '@mui/material';

import styles from './AnimeFilterForm.module.css';

/** Anime filter form. */
const AnimeFilterFormComponent: FC = () => (
	<form className={styles.form}>
		<TextField
			className={styles.form__field}
			label="Search"
			variant="outlined"
		/>
	</form>
);

/** Memorized filter form. */
export const AnimeFilterForm = memo(AnimeFilterFormComponent);
