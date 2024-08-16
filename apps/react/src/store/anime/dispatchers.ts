import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

/** Function for fetch anime list. */
export const fetchList = createAsyncThunk(
	'anime/fetch',
	() => AnimeService.fetchList(),
);
