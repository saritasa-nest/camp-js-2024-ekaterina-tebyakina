import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorizationService } from '@js-camp/react/api/services/authorizationService';
import { RegistrationData } from '@js-camp/core/models/registration-data';
import { LocalStorageService } from '@js-camp/react/api/services/localStorageService';
import { UserService } from '@js-camp/react/api/services/userService';
import { LoginData } from '@js-camp/core/models/login-data';

/** Function for getting a current user. */
export const fetchUser = createAsyncThunk(
	'genres/fetchUser',
	() => UserService.getCurrentUser(),
);

/** Function for register. */
export const registerUser = createAsyncThunk(
	'genres/register',
	async(registrationData: RegistrationData, { dispatch }) => {
		const tokens = await AuthorizationService.register(registrationData);
		LocalStorageService.saveTokens(tokens);
		dispatch(fetchUser());
	},
);

/** Function for login. */
export const loginUser = createAsyncThunk(
	'genres/login',
	async(loginData: LoginData, { dispatch }) => {
		const tokens = await AuthorizationService.login(loginData);
		LocalStorageService.saveTokens(tokens);
		dispatch(fetchUser());
	},
);
