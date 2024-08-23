import { FC, memo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { RegistrationData } from '@js-camp/core/models/registration-data';
import { AuthorizationService } from '@js-camp/react/api/services/authorizationService';
import { LocalStorageService } from '@js-camp/react/api/services/localStorageService';
import { useAppDispatch } from '@js-camp/react/store/store';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ANIME_PATH } from '@js-camp/react/features/anime/routes';
import { Progress } from '@js-camp/react/components/Progress/Progress';

import { handleServerErrors } from '../../utils/handleServerErrorsUtil';

import styles from './RegistrationForm.module.css';

/** Schema for registration form validation. */
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
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm<RegistrationData>({
		mode: 'onBlur',
		resolver: zodResolver(RegistrationSchema),
	});

	const registerUser = async(registrationData: RegistrationData) => {
		setIsLoading(true);
		try {
			const tokens = await AuthorizationService.register(registrationData);
			LocalStorageService.saveTokens(tokens);
			dispatch(fetchUser());
			navigate(ANIME_PATH);
		} catch (fetchError: unknown) {
			handleServerErrors(fetchError, setError);
		}
		setIsLoading(false);
	};

	const onSubmit: SubmitHandler<RegistrationData> = (registrationData: RegistrationData) => {
		if (!isLoading && isValid) {
			registerUser(registrationData);
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
				{ isLoading ? <Progress/> : null}
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
