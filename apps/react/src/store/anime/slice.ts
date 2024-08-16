import { createSlice } from '@reduxjs/toolkit';

import { fetchList } from './dispatchers';
import { initialState } from './state';

/** Anime list slice. */
export const animeSlice = createSlice({
	name: 'anime',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(fetchList.pending, state => {
			state.isLoading = true;
		})
		.addCase(fetchList.fulfilled, (state, action) => {
			state.list = action.payload;
			state.isLoading = false;
		})
		.addCase(fetchList.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});
