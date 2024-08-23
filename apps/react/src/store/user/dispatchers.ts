import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '@js-camp/react/api/services/userService';

/** Function for getting a current user. */
export const fetchUser = createAsyncThunk(
	'genres/fetchUser',
	() => UserService.getCurrentUser(),
);
