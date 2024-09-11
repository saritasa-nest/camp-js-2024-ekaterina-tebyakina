import { FC, memo, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ANIME_PATH } from '@js-camp/react/features/anime/routes';
import { GENRES_PATH } from '@js-camp/react/features/genres/routes';
import { STUDIOS_PATH } from '@js-camp/react/features/studios/routes';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectCurrentUser, selectIsCurrentUserLoading } from '@js-camp/react/store/user/selectors';
import { REGISTER_PATH } from '@js-camp/react/features/registration/routes';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { LOGIN_PATH } from '@js-camp/react/features/login/routes';
import { logout } from '@js-camp/react/store/user/slice';
import { LocalStorageService } from '@js-camp/react/api/services/localStorageService';

import styles from './Header.module.css';

/** Header component. */
const HeaderComponent: FC = () => {

	const user = useAppSelector(selectCurrentUser);
	const isLoading = useAppSelector(selectIsCurrentUserLoading);
	const refreshToken = LocalStorageService.getRefreshToken();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isLoading) {
			dispatch(fetchUser());
		}
	}, [refreshToken]);

	const location = useLocation();

	const isCurrentPath = (path: string) => location.pathname.startsWith(path);

	const handleLogoutButtonClick = () => {
		dispatch(logout());
	};

	return (
		<AppBar
			position="static"
			className={styles.header}
		>
			<nav className={styles.nav}>
				<h1 className={styles.title}>Anime App</h1>
				<Stack direction="row" spacing={1}>
					<Chip
						label="Anime"
						variant={isCurrentPath(`/${ANIME_PATH}`) ? 'filled' : 'outlined'}
						component={Link}
						to={ANIME_PATH}
						clickable
					/>
					<Chip
						label="Genres"
						variant={isCurrentPath(`/${GENRES_PATH}`) ? 'filled' : 'outlined'}
						component={Link}
						to={GENRES_PATH}
						clickable
					/>
					<Chip
						label="Studios"
						variant={isCurrentPath(`/${STUDIOS_PATH}`) ? 'filled' : 'outlined'}
						component={Link}
						to={STUDIOS_PATH}
						clickable
					/>
				</Stack>
			</nav>
			<span className={styles.authorizationMenu}>
				{ user ?
					<>
						<span>{`Hi, ${user.firstName} ${user.lastName}!`}</span>
						<button
							type='button'
							className={styles.logoutButton}
							onClick={handleLogoutButtonClick}
						>
							Logout
						</button>
					</>	:
					<>
						<NavLink to={LOGIN_PATH} className={styles.link}>Login</NavLink>
						<NavLink to={REGISTER_PATH} className={styles.link}>Register</NavLink>
					</>
				}
			</span>
		</AppBar>
	);
};

/** Memoized header. */
export const Header = memo(HeaderComponent);
