import { StudioQueryParams } from '@js-camp/core/mappers/studio-query-params.mapper';
import { StudioService } from '@js-camp/react/api/services/studio-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Function for fetch genres.
 */
export const getAllStudios = createAsyncThunk(
	'studio/getAll',
	(queryParams?: StudioQueryParams) => StudioService.getAllStudios(queryParams),
);
