import { memo, FC } from 'react';
import { Box } from '@mui/material';

import { GenresSearch } from '../../components/GenresSearch';
import { GenresSelect } from '../GenresSelect';
import { GenresSort } from '../GenresSort';

import styles from './GenresFIlterForm.module.css';

/** Genres filter form. */
const GenresFilterFormComponent: FC = () => (
	<Box className={styles.form}>
		<GenresSearch />
		<GenresSort />
		<GenresSelect />
	</Box>
);

/** Memorized filter form. */
export const GenresFilterForm = memo(GenresFilterFormComponent);
