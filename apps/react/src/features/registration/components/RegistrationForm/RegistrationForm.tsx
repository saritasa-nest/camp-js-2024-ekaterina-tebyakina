import { FC, memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationData } from '@js-camp/core/models/registration-data';
import { registerUser } from '@js-camp/react/store/user/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { useNavigate } from 'react-router-dom';
import { ANIME_PATH } from '@js-camp/react/features/anime/routes';
import { selectIsCurrentUserLoading } from '@js-camp/react/store/user/selectors';

import styles from './RegistrationForm.module.css';

/** */
export const RegistrationSchema: ZodType<RegistrationData> = z
	.object({
		email: z.string({ required_error: 'This field is required' }).email('Please provide a valid email'),
		firstName: z.string({ required_error: 'This field is required' }),
		lastName: z.string({ required_error: 'This field is required' }),
		password: z.string({ required_error: 'This field is required' }),
		retypedPassword: z.string({ required_error: 'This field is required' }),
	})
	.refine(data => data.password === data.retypedPassword, {
		message: 'Passwords do not match',
		path: ['retypedPassword'],
	});

/** Registration form component. */
const RegistrationFormComponent: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isLoading = useAppSelector(selectIsCurrentUserLoading);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationData>({
		mode: 'onBlur',
		resolver: zodResolver(RegistrationSchema),
	});
	const onSubmit: SubmitHandler<RegistrationData> = (registrationData: RegistrationData) => {
		if (!isLoading) {
			dispatch(registerUser(registrationData));
			navigate(ANIME_PATH);
		}
	};

	return (
		<div className={styles.formWrapper}>
			<h2 className={styles.header}>Register</h2>
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
					label="First name"
					type="text"
					variant="outlined"
					fullWidth
					placeholder="Ivan"
					{...register('firstName')}
					error={!!errors.firstName}
					helperText={errors.firstName ? errors.firstName?.message : ''}
				/>
				<TextField
					label="Last name"
					type="text"
					variant="outlined"
					fullWidth
					placeholder="Pupkin"
					{...register('lastName')}
					error={!!errors.lastName}
					helperText={errors.lastName ? errors.lastName.message : ''}
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
				<TextField
					label="Confirm the password"
					type="password"
					variant="outlined"
					fullWidth
					placeholder="veryStrongPassW0rd"
					{...register('retypedPassword')}
					error={!!errors.retypedPassword}
					helperText={errors.retypedPassword ? errors.retypedPassword.message : ''}
				/>
				<Button
					type="submit"
					variant="outlined"
				>
					Register
				</Button>
			</form>
		</div>
	);
};

/** Memoized registration form. */
export const RegistrationForm = memo(RegistrationFormComponent);
