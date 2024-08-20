import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

/** Selects all studio from store. */
export const selectStudios = createSelector(
	(state: RootState) => state.studios.studios,
	studios => studios,
);

/** Selects all studio from store. */
export const selectStudioNextCursor = createSelector(
	(state: RootState) => state.studios.next,
	next => next,
);

/** Selects studio next cursor. */
export const selectAreStudiosLoading = createSelector(
	(state: RootState) => state.studios.isLoading,
	isLoading => isLoading,
);
