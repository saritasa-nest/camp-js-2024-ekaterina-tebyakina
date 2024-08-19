import { StudioService } from '@js-camp/react/api/services/studio-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Function for fetch genres.
 */
export const getAllStudios = createAsyncThunk(
	'studio/getAll',
	() => StudioService.getAllStudios(),
);
