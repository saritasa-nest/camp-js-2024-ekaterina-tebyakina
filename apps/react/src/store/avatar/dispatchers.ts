import { createAsyncThunk } from '@reduxjs/toolkit';
import { s3Service } from '@js-camp/react/api/services/s3Service';
import { FileData } from '@js-camp/core/models/file-data';

type FilePayload = {

	/** Information about a file to be uploaded. */
	fileData: FileData;

	/** File to be uploaded. */
	file: File;
};

/** Function for getting a avatar URL. */
export const fetchAvatarUrl = createAsyncThunk(
	'avatar/fetchUrl',
	({ fileData, file }: FilePayload) => s3Service.getUploadedFileUrl(fileData, file),
);
