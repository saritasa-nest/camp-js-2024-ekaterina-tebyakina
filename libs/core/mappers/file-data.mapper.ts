import { FileDataDto } from '../dtos/file-data.dto';
import { FileData } from '../models/file-data';

import { FileConfigMapper } from './file-config.mapper';

export namespace FileDataMapper {

	/**
	 * Maps data about file from model to DTO.
	 * @param fileData - Information about a file to be uploaded.
	 * @returns Information DTO.
	 */
	export function toDto(fileData: FileData): FileDataDto {
		// Disable eslint because these properties must be written in snake case.
		return {
			config: FileConfigMapper.toDto(fileData.config),
			filename: fileData.filename,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			content_type: fileData.contentType,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			content_length: fileData.contentLength,
		};
	}
}
