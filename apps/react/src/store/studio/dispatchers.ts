import { StudioQueryParams } from '@js-camp/core/mappers/studio-query-params.mapper';
import { StudioService } from '@js-camp/react/api/services/studioService';
import { createAsyncThunk } from '@reduxjs/toolkit';

/** Function for fetch studios.*/
export const getAllStudios = createAsyncThunk(
	'studio/getAll',
	(queryParams?: StudioQueryParams) => StudioService.getAllStudios(queryParams),
);
