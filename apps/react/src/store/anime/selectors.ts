import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

/** Select anime loading state. */
export const selectAnimeListLoading = createSelector(
	(state: RootState) => state.anime.isLoading,
	isLoading => isLoading,
);

/** Select anime additional loading state. */
export const selectAdditionalAnimeLoading = createSelector(
	(state: RootState) => state.anime.isAdditionalLoading,
	isAdditionalLoading => isAdditionalLoading,
);

/** Select anime error state. */
export const selectAnimeListError = createSelector(
	(state: RootState) => state.anime.error,
	error => error,
);

/** Select all anime from store. */
export const selectAllAnime = animeAdapter.getSelectors<RootState>(state => state.anime).selectAll;

/** Select url to next page of anime list from store. */
export const selectNextPageUrl = createSelector(
	(state: RootState) => state.anime.nextPage,
	url => url,
);
