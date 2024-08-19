import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all genres from store. */
export const selectStudios = createSelector(
	(state: RootState) => state.studios.studios,
	genres => genres,
);

/** Selects genres loading state. */
export const selectAreStudiosLoading = createSelector(
	(state: RootState) => state.studios.isLoading,
	isLoading => isLoading,
);
