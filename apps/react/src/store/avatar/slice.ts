import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import { fetchAvatarUrl } from './dispatchers';

/** Avatar slice. */
export const avatarSlice = createSlice({
	name: 'avatar',
	initialState,
	reducers: {
		resetError(state) {
			state.error = null;
		},
	},
	extraReducers: builder => builder
		.addCase(fetchAvatarUrl.pending, state => {
			state.isLoading = true;
		})
		.addCase(fetchAvatarUrl.fulfilled, (state, action) => {
			state.url = action.payload;
			state.isLoading = false;
		})
		.addCase(fetchAvatarUrl.rejected, (state, action) => {
			state.url = null;
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});

/** Function for resetting an error. */
export const { resetError } = avatarSlice.actions;