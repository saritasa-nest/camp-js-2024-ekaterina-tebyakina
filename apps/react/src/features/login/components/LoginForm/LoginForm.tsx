import { FC, memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginData } from '@js-camp/core/models/login-data';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { useNavigate } from 'react-router-dom';
import { ANIME_PATH } from '@js-camp/react/features/anime/routes';
import { loginUser } from '@js-camp/react/store/user/dispatchers';
import { selectIsCurrentUserLoading } from '@js-camp/react/store/user/selectors';

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
	} = useForm<LoginData>({
		mode: 'onBlur',
		resolver: zodResolver(LoginSchema),
	});
	const onSubmit: SubmitHandler<LoginData> = (loginData: LoginData) => {
		if (!isLoading) {
			dispatch(loginUser(loginData));
			navigate(ANIME_PATH);
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
