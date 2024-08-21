import { createSlice } from '@reduxjs/toolkit';

import { fetchList, fetchNewPage } from './dispatchers';
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
			state.animeList.byId = {};
			state.animeList.allIds = [];

			action.payload.results.forEach(item => {
				state.animeList.byId[item.id] = item;
				state.animeList.allIds.push(item.id);
			});

			state.nextPage = action.payload.next;
			state.previousPage = action.payload.previous;
			state.isLoading = false;
		})
		.addCase(fetchList.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		})

		.addCase(fetchNewPage.pending, state => {
			state.isAdditionalLoading = true;
		})
		.addCase(fetchNewPage.fulfilled, (state, action) => {
			const { byId, allIds } = state.animeList;

			action.payload.results.forEach(item => {
				byId[item.id] = item;
				if (!allIds.find(id => id === item.id)) {
					allIds.push(item.id);
				}
			});

			state.nextPage = action.payload.next;
			state.previousPage = action.payload.previous;
			state.isAdditionalLoading = false;
		})
		.addCase(fetchNewPage.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isAdditionalLoading = false;
		}),
});
