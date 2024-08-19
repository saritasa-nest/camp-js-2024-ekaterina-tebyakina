import { memo, FC } from 'react';
import { TextField } from '@mui/material';

import styles from './GenresFilterForm.module.css';

/** Genres filter form. */
const GenresFilterFormComponent: FC = () => (
	<form className={styles.form}>
		<TextField
			className={styles.field}
			label="Search"
			variant="outlined"
		/>
	</form>
);

/** Memoized filter form. */
export const GenresFilterForm = memo(GenresFilterFormComponent);
