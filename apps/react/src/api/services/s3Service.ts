import { FileData } from '@js-camp/core/models/file-data';
import { FileDataMapper } from '@js-camp/core/mappers/file-data.mapper';

import { ImageDataToUploadingDto } from '@js-camp/core/dtos/image-data-to-uploading.dto';

import { http } from '..';

const s3Url = 's3/get-params/';

export namespace s3Service {

	/**
	 * SaveFile.
	 * @param fileData - File data.
	 * @param file - File data.
	 */
	export async function saveFile(fileData: FileData, file: File): Promise<string> {
		const data = await getParams(fileData);
		const imageUrl = await uploadImage(data, file);
		return imageUrl;
	}

	/**
	 * Get the current user based on the stored token.
	 * @param fileData - File data.
	 * @returns Current user.
	 */
	export async function getParams(fileData: FileData): Promise<ImageDataToUploadingDto> {
		const { data } = await http.post<ImageDataToUploadingDto>(s3Url, FileDataMapper.toDto(fileData));
		return data;
	}

	/**
	 * Get the current user based on the stored token.
	 * @param fileData - File data.
	 * @param file - File data.
	 * @returns Current user.
	 */
	export async function uploadImage(fileData: ImageDataToUploadingDto, file: File): Promise<string> {
		const formData = new FormData();
		for (const [key, value] of Object.entries(fileData.params)) {
			formData.append(key, value);
		}
		formData.append('file', file);
		const { data } = await http.post(fileData.url, formData);

		// Parse the XML response
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(data, 'text/xml');

		// Extract the 'Location' element
		const locationElement = xmlDoc.getElementsByTagName('Location')[0];
		const locationUrl = locationElement?.textContent ?? '';

		return locationUrl;
	}

}
