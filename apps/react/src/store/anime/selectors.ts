import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all anime from store. */
export const selectAnimeList = createSelector(
	(state: RootState) => state.anime.list,
	list => list,
);

/** Selects anime loading state. */
export const selectAnimeListLoading = createSelector(
	(state: RootState) => state.anime.isLoading,
	isLoading => isLoading,
);
