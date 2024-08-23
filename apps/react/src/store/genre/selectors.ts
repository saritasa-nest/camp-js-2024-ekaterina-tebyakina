import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all genres from store. */
export const selectGenres = createSelector(
	(state: RootState) => state.genres.genres,
	genres => genres,
);

/** Selects genres loading state. */
export const selectAreGenresLoading = createSelector(
	(state: RootState) => state.genres.isLoading,
	isLoading => isLoading,
);

/** Select genres has more state. */
export const selectGenresNext = createSelector(
	(state: RootState) => state.genres.next,
	next => next,
);
