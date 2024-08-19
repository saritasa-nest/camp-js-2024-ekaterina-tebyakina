import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import { getAllStudios } from './dispatchers';

/** Studio slice. */
export const studiosSlice = createSlice({
	name: 'studio',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(getAllStudios.pending, state => {
			state.isLoading = true;
		})
		.addCase(getAllStudios.fulfilled, (state, action) => {
			state.studios = [...action.payload.results];
			state.isLoading = false;
		})
		.addCase(getAllStudios.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});
