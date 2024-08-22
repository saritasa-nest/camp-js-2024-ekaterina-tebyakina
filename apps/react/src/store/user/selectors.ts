import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects current user from store. */
export const selectCurrentUser = createSelector(
	(state: RootState) => state.user.user,
	user => user,
);

/** Selects user loading state. */
export const selectIsCurrentUserLoading = createSelector(
	(state: RootState) => state.user.isLoading,
	isLoading => isLoading,
);
