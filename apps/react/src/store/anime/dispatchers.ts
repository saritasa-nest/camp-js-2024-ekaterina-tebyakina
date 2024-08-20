import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnimeFilterParams } from '@js-camp/react/models/animeFilterParams';

import { AnimeService } from '../../api/services/animeService';

/** Function for fetch anime list. */
export const fetchList = createAsyncThunk(
	'anime/fetchList',
	(params: AnimeFilterParams) => AnimeService.fetchList(params),
);

/** Function for fetch new page of anime list. */
export const fetchNewPage = createAsyncThunk(
	'anime/fetchNewPage',
	(url: string) => AnimeService.fetchNewPage(url),
);
