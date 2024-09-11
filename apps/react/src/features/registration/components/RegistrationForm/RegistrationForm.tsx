import { FC, memo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { RegistrationData } from '@js-camp/core/models/registration-data';
import { AuthorizationService } from '@js-camp/react/api/services/authorizationService';
import { LocalStorageService } from '@js-camp/react/api/services/localStorageService';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ANIME_PATH } from '@js-camp/react/features/anime/routes';
import { Progress } from '@js-camp/react/components/Progress/Progress';
import { handleServerErrors } from '@js-camp/react/utils/handleServerErrors';
import { selectAvatarUrl } from '@js-camp/react/store/avatar/selectors';
import { AvatarPicker } from '@js-camp/react/components/AvatarPicker/AvatarPicker';

import styles from './RegistrationForm.module.css';

/** Schema for registration form validation. */
export const RegistrationSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'This field is required' })
			.email('Please provide a valid email'),
		firstName: z
			.string()
			.min(1, { message: 'This field is required' }),
		lastName: z
			.string()
			.min(1, { message: 'This field is required' }),
		password: z
			.string()
			.min(1, { message: 'This field is required' }),
		retypedPassword: z
			.string()
			.min(1, { message: 'This field is required' }),
	})
	.refine(data => data.password === data.retypedPassword, {
		message: 'Passwords do not match',
		path: ['retypedPassword'],
	});

/** Registration form component. */
const RegistrationFormComponent: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const avatarUrl = useAppSelector(selectAvatarUrl);
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
			const tokens = await AuthorizationService.register({
				...registrationData,
				...(avatarUrl && { avatar: avatarUrl }),
			});
			LocalStorageService.saveTokens(tokens);
			dispatch(fetchUser());
			navigate(ANIME_PATH);
		} catch (fetchError: unknown) {
			handleServerErrors(fetchError, setError, registrationData);
		}
		setIsLoading(false);
	};

	const onSubmit: SubmitHandler<RegistrationData> = registrationData => {
		if (!isLoading && isValid) {
			registerUser(registrationData);
		}
	};

	return (
		<div className={styles.formWrapper}>
			<h2 className={styles.header}>Register</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<AvatarPicker/>
				<TextField
					label="Email"
					type="email"
					variant="outlined"
					fullWidth
					placeholder="ivan.pupkin@gmail.com"
					{...register('email', { required: true })}
					error={errors.email != null}
					helperText={errors.email ? errors.email.message : ''}
				/>
				<TextField
					label="First name"
					type="text"
					variant="outlined"
					fullWidth
					placeholder="Ivan"
					{...register('firstName')}
					error={errors.firstName != null}
					helperText={errors.firstName ? errors.firstName?.message : ''}
				/>
				<TextField
					label="Last name"
					type="text"
					variant="outlined"
					fullWidth
					placeholder="Pupkin"
					{...register('lastName')}
					error={errors.lastName != null}
					helperText={errors.lastName ? errors.lastName.message : ''}
				/>
				<TextField
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					placeholder="veryStrongPassW0rd"
					{...register('password')}
					error={errors.password != null}
					helperText={errors.password ? errors.password.message : ''}
				/>
				<TextField
					label="Confirm the password"
					type="password"
					variant="outlined"
					fullWidth
					placeholder="veryStrongPassW0rd"
					{...register('retypedPassword')}
					error={errors.retypedPassword != null}
					helperText={errors.retypedPassword ? errors.retypedPassword.message : ''}
				/>
				{ isLoading ? <Progress/> : null}
				<Button
					type="submit"
					variant="outlined"
					disabled={isLoading}
				>
					Register
				</Button>
			</form>
		</div>
	);
};

/** Memoized registration form. */
export const RegistrationForm = memo(RegistrationFormComponent);
