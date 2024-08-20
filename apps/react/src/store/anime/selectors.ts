import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Select anime loading state. */
export const selectAnimeListLoading = createSelector(
	(state: RootState) => state.anime.isLoading,
	isLoading => isLoading,
);

/** Select anime error state. */
export const selectAnimeListError = createSelector(
	(state: RootState) => state.anime.error,
	error => error,
);

/** Select all anime from store. */
export const selectAllAnime = createSelector(
	(state: RootState) => state.anime.animeList.allIds.map(id => state.anime.animeList.byId[id]),
	animeList => animeList,
);

/** Select url to next page of anime list from store. */
export const selectNextPageUrl = createSelector(
	(state: RootState) => state.anime.nextPage,
	url => url,
);
