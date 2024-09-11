import { FileData } from '@js-camp/core/models/file-data';
import { FileDataMapper } from '@js-camp/core/mappers/file-data.mapper';
import { FileUploadingSettingsDto } from '@js-camp/core/dtos/file-uploading-settings.dto';

import { http } from '..';

const s3Url = 's3/get-params/';

/** Service for uploading files to s3 bucket. */
export namespace s3Service {

	/**
	 * Upload file to S3 bucket and get URL to the file.
	 * @param fileData - Information about a file to be uploaded.
	 * @param file - File to be uploaded.
	 */
	export async function getUploadedFileUrl(fileData: FileData, file: File): Promise<string> {
		const data = await getParams(fileData);
		const fileUrl = await uploadImage(data, file);
		return fileUrl;
	}

	/**
	 * Get parameters for upload to S3 bucket.
	 * @param fileData - Information about a file to be uploaded.
	 * @returns Parameters and url for upload the file to S3 bucket.
	 */
	export async function getParams(fileData: FileData): Promise<FileUploadingSettingsDto> {
		const { data } = await http.post<FileUploadingSettingsDto>(s3Url, FileDataMapper.toDto(fileData));
		return data;
	}

	/**
	 * Upload a file to S3 bucket.
	 * @param uploadingSettings - Settings for upload a file to S3 bucket.
	 * @param file - File to be uploaded.
	 * @returns Url of an uploaded file.
	 */
	export async function uploadImage(uploadingSettings: FileUploadingSettingsDto, file: File): Promise<string> {
		const uploadingData = new FormData();
		for (const [key, value] of Object.entries(uploadingSettings.params)) {
			uploadingData.append(key, value);
		}
		uploadingData.append('file', file);

		const { data } = await http.post(uploadingSettings.url, uploadingData);

		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(data, 'text/xml');
		const locationElement = xmlDoc.getElementsByTagName('Location')[0];
		const locationUrl = locationElement?.textContent ?? '';

		return locationUrl;
	}
}
