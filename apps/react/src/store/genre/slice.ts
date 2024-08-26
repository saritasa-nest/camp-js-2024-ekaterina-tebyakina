import { createSlice } from '@reduxjs/toolkit';

import { fetchGenres } from './dispatchers';
import { initialState } from './state';

/** Genre slice. */
export const genresSlice = createSlice({
	name: 'genres',
	initialState,
	reducers: {
		changeFilters(state, action): void {
			state.filter = { ...state.filter, ...action.payload };
		},
	},
	extraReducers: builder => builder
		.addCase(fetchGenres.pending, state => {
			state.isLoading = true;
		})
		.addCase(fetchGenres.fulfilled, (state, action) => {
			const isScrolled = action.payload.previous != null;
			state.genres = [...(isScrolled ? state.genres : []), ...action.payload.results];
			state.next = action.payload.next;
			state.isLoading = false;
		})
		.addCase(fetchGenres.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});

/** Action change filters. */
export const { changeFilters } = genresSlice.actions;
