import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects anime loading state. */
export const selectAnimeListLoading = createSelector(
	(state: RootState) => state.anime.isLoading,
	isLoading => isLoading,
);

/** Selects all anime from store. */
export const selectAllAnime = createSelector(
	(state: RootState) => state.anime.animeList.allIds.map(id => state.anime.animeList.byId[id]),
	animeList => animeList,
);

/** Selects url to next page of anime list from store. */
export const selectNextPageUrl = createSelector(
	(state: RootState) => state.anime.nextPage,
	url => url,
);
