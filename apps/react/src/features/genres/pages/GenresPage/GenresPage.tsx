import { memo, useEffect, FC, useState } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres, selectAreGenresLoading } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

import { GenresList } from '../../components/GenresList';

import styles from './GenresPage.module.css';

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const isLoading = useAppSelector(selectAreGenresLoading);

	const location = useLocation();
	const hasChildRoute = location.pathname !== '/genres';

	const [value, setValue] = useState('First');

	const handleChange = (event: SelectChangeEvent) => {
		setValue(event.target.value as string);
	};

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.list__container}>
					<Box className={styles.filter__form}>
						<TextField
							className={styles.form__field}
							label="Search"
							variant="outlined"
						/>
						<FormControl
							fullWidth
							className={styles.form__field}
						>
							<InputLabel id="property-field-label">Property</InputLabel>
							<Select
								labelId="property-field-label"
								id="property-field"
								value={value}
								label="Property"
								onChange={handleChange}
							>
								<MenuItem value={'First'}>First</MenuItem>
								<MenuItem value={'Second'}>Second</MenuItem>
								<MenuItem value={'Third'}>Third</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box className={styles.list}>
						<GenresList genres={genres} />
					</Box>
				</Box>
				<Box className={styles.details}>
					<Paper
						elevation={3}
						className={styles.details__card}
					>
						{hasChildRoute ? (
							<Outlet />
						) : (
							<Typography variant="h6" align="center">
								Select an item from the list to see detailed information about it c:
							</Typography>
						)}
					</Paper>
				</Box>
			</Box>
		</>
	);
};

/**
 * Memorized GenresPageComponent.
 */
export const GenresPage = memo(GenresPageComponent);
