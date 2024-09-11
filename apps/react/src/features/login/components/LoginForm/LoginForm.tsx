import { FC, memo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginData } from '@js-camp/core/models/login-data';
import { useAppDispatch } from '@js-camp/react/store/store';
import { useNavigate } from 'react-router-dom';
import { ANIME_PATH } from '@js-camp/react/features/anime/routes';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { AuthorizationService } from '@js-camp/react/api/services/authorizationService';
import { LocalStorageService } from '@js-camp/react/api/services/localStorageService';
import { Progress } from '@js-camp/react/components/Progress/Progress';
import { handleServerErrors } from '@js-camp/react/utils/handleServerErrors';

import styles from './LoginForm.module.css';

/** Schema for login form validation. */
export const LoginSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'This field is required' })
			.email('Please provide a valid email'),
		password: z
			.string()
			.min(1, { message: 'This field is required' }),
	});

/** Login form component. */
const LoginFormComponent: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm<LoginData>({
		mode: 'onBlur',
		resolver: zodResolver(LoginSchema),
	});

	const loginUser = async(loginData: LoginData) => {
		setIsLoading(true);
		try {
			const tokens = await AuthorizationService.login(loginData);
			LocalStorageService.saveTokens(tokens);
			dispatch(fetchUser());
			navigate(ANIME_PATH);
		} catch (fetchError: unknown) {
			handleServerErrors(fetchError, setError, loginData);
		}
		setIsLoading(false);
	};

	const onSubmit: SubmitHandler<LoginData> = (loginData: LoginData) => {
		if (!isLoading && isValid) {
			loginUser(loginData);
		}
	};

	return (
		<div className={styles.formWrapper}>
			<h2 className={styles.header}>Log in</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<TextField
					label="Email"
					type="email"
					variant="outlined"
					fullWidth
					placeholder="ivan.pupkin@gmail.com"
					{...register('email', { required: true })}
					error={!!errors.email}
					helperText={errors.email ? errors.email.message : ''}
				/>
				<TextField
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					placeholder="veryStrongPassW0rd"
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password ? errors.password.message : ''}
				/>
				{errors.root ? <span className={styles.errorMessage}>{errors.root.message}</span> : ''}
				{ isLoading ? <Progress/> : null}
				<Button
					type="submit"
					variant="outlined"
				>
					Login
				</Button>
			</form>
		</div>
	);
};

/** Memoized login form. */
export const LoginForm = memo(LoginFormComponent);
