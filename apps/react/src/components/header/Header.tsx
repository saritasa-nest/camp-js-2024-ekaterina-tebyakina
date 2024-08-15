import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import styles from './Header.module.css';

/** Header component. */
const HeaderComponent = () => {

	const location = useLocation();

	const isActive = (path: string) => location.pathname.startsWith(path);

	return (
		<AppBar
			position="static"
			className={styles.appbar}
		>
			<Box className={styles.header}>
				<h1 className={styles.header__title}>Anime App</h1>
				<Box>Authorization menu</Box>
			</Box>
			<Box className={styles.toolbar}>
				<Stack direction="row" spacing={1}>
					<Chip
						label="Anime"
						variant={isActive('/anime') ? 'filled' : 'outlined'}
						component={Link}
						to="/anime"
						clickable
					/>
					<Chip
						label="Genres"
						variant={isActive('/genres') ? 'filled' : 'outlined'}
						component={Link}
						to="/genres"
						clickable
					/>
					<Chip
						label="Studios"
						variant={isActive('/studios') ? 'filled' : 'outlined'}
						component={Link}
						to="/studios"
						clickable
					/>
				</Stack>
			</Box>
		</AppBar>
	);
};

/**
 * Memorized header.
 */
export const Header = memo(HeaderComponent);
