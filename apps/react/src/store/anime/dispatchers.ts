import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeParams } from '@js-camp/react/models/animeParams';

import { AnimeService } from '../../api/services/animeService';

/** Function for fetch anime list. */
export const fetchList = createAsyncThunk(
	'anime/fetch',
	(params: AnimeParams) => AnimeService.fetchList(params),
);
