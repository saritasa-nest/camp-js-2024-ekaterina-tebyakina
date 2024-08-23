import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageService } from '@js-camp/react/api/services/localStorageService';

import { initialState } from './state';
import { fetchUser } from './dispatchers';

/** User slice. */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout(state) {
			LocalStorageService.removeTokens();
			state.user = null;
		},
	},
	extraReducers: builder => builder
		.addCase(fetchUser.pending, state => {
			state.isLoading = true;
		})
		.addCase(fetchUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
		})
		.addCase(fetchUser.rejected, (state, action) => {
			state.user = null;
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});

/** Function for log out. */
export const { logout } = userSlice.actions;
