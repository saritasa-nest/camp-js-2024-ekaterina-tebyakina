import { FC, memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginData } from '@js-camp/core/models/login-data';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { useNavigate } from 'react-router-dom';
import { ANIME_PATH } from '@js-camp/react/features/anime/routes';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectIsCurrentUserLoading } from '@js-camp/react/store/user/selectors';
import { AuthorizationService } from '@js-camp/react/api/services/authorizationService';
import { LocalStorageService } from '@js-camp/react/api/services/localStorageService';
import { isAxiosError } from 'axios';
import { ServerErrorDto } from '@js-camp/core/dtos/server-error.dto';
import { ServerErrorMapper } from '@js-camp/core/mappers/server-error.mapper';
import { ServerError } from '@js-camp/core/models/server-error';

import styles from './LoginForm.module.css';

/** */
export const LoginSchema: ZodType<LoginData> = z
	.object({
		email: z.string({ required_error: 'This field is required' }).email('Please provide a valid email'),
		password: z.string({ required_error: 'This field is required' }),
	});

/** Login form component. */
const LoginFormComponent: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isLoading = useAppSelector(selectIsCurrentUserLoading);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginData>({
		mode: 'onBlur',
		resolver: zodResolver(LoginSchema),
	});

	const login = async(loginData: LoginData) => {
		try {
			const tokens = await AuthorizationService.login(loginData);
			LocalStorageService.saveTokens(tokens);
			dispatch(fetchUser());
			navigate(ANIME_PATH);
		} catch (fetchError: unknown) {
			if (isAxiosError(fetchError) && fetchError.response) {
				const loginErrors: ServerError[] = fetchError.response.data.errors.map(
					(errorDto: ServerErrorDto) => ServerErrorMapper.fromDto(errorDto),
				);
				loginErrors.forEach(error => {
					if (error.attribute) {
						setError(

							// TODO type assertion for attribute.
							error.attribute as 'email' | 'password',
							{
								type: 'serverError',
								message: error.detail,
							},
						);
						return;
					}
					setError(
						'root',
						{
							type: 'serverError',
							message: error.detail,
						},
					);
				});
				return;
			}
			console.warn('Failed to register');
			setError(
				'root',
				{
					type: 'serverError',
					message: 'Failed to register',
				},
			);
		}
	};

	const onSubmit: SubmitHandler<LoginData> = (loginData: LoginData) => {
		if (!isLoading) {
			login(loginData);
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
