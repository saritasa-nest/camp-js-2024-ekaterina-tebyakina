import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects avatar url from store. */
export const selectAvatarUrl = createSelector(
	(state: RootState) => state.avatar.url,
	url => url,
);

/** Selects avatar loading state. */
export const selectIsAvatarLoading = createSelector(
	(state: RootState) => state.avatar.isLoading,
	isLoading => isLoading,
);

/** Selects avatar error state. */
export const selectAvatarError = createSelector(
	(state: RootState) => state.avatar.error,
	error => error,
);
