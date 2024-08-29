import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

import { studioAdapter } from './state';

/** Selects all studio from store. */
export const selectStudios = studioAdapter.getSelectors<RootState>(state => state.studios).selectAll;

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
