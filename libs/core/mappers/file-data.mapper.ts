import { FileDataDto } from '../dtos/file-data.dto';
import { FileData } from '../models/file-data';

import { FileConfigMapper } from './file-config.mapper';

/** Map information about a file to be uploaded. */
export namespace FileDataMapper {

	/**
	 * Maps data about file from model to DTO.
	 * @param fileData - Information about a file to be uploaded.
	 * @returns Information DTO.
	 */
	export function toDto(fileData: FileData): FileDataDto {
		return {
			config: FileConfigMapper.toDto(fileData.config),
			filename: fileData.filename,
			content_type: fileData.contentType,
			content_length: fileData.contentLength,
		};
	}
}
