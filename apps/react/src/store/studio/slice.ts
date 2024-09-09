import { createSlice, EntityState } from '@reduxjs/toolkit';

import { AnimeStudio } from '@js-camp/core/models/anime-studio';

import { initialState, studioAdapter } from './state';
import { getAllStudios } from './dispatchers';

/** Studio slice. */
export const studiosSlice = createSlice({
	name: 'studio',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getAllStudios.pending, state => {
				state.isLoading = true;
			})
			.addCase(getAllStudios.fulfilled, (state, action) => {
				const studioState = state as EntityState<AnimeStudio>;
				if (action.payload.previous != null) {
					studioAdapter.upsertMany(studioState, action.payload.results);
				} else {
					studioAdapter.setAll(studioState, action.payload.results);
				}
				state.next = action.payload.next;
				state.isLoading = false;
			})
			.addCase(getAllStudios.rejected, (state, action) => {
				if (action.error.message) {
					state.error = action.error.message;
				}
				state.isLoading = false;
			}),
});
