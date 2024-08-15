import { memo, FC } from 'react';
import { TextField } from '@mui/material';

import styles from './GenresFilterForm.module.css';

/** Genres filter form. */
const GenresFilterFormComponent: FC = () => (
	<form className={styles.form}>
		<TextField
			className={styles.form__field}
			label="Search"
			variant="outlined"
		/>
	</form>
);

/**
 * Memorized filter form.
 */
export const GenresFilterForm = memo(GenresFilterFormComponent);
