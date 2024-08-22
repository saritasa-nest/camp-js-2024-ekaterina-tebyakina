import { createSlice, EntityState } from '@reduxjs/toolkit';
import { Anime } from '@js-camp/core/models/anime';

import { fetchList, fetchNewPage } from './dispatchers';
import { animeAdapter, initialState } from './state';

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
			const animeState = state as EntityState<Anime>;
			animeAdapter.setAll(animeState, action.payload.results);
			state.nextPage = action.payload.next;
			state.isLoading = false;
		})
		.addCase(fetchList.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		})

		.addCase(fetchNewPage.pending, state => {
			state.isLoadingNextPage = true;
		})
		.addCase(fetchNewPage.fulfilled, (state, action) => {
			const animeState = state as EntityState<Anime>;
			animeAdapter.upsertMany(animeState, action.payload.results);

			state.nextPage = action.payload.next;
			state.isLoadingNextPage = false;
		})
		.addCase(fetchNewPage.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoadingNextPage = false;
		}),
});
