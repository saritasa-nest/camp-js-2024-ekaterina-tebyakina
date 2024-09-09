import { FileConfigDto } from '../dtos/file-config.dto';
import { FileConfig } from '../models/file-config';

export namespace FileConfigMapper {
	const FILE_CONFIG_MAP_TO_DTO: Readonly<Record<FileConfig, FileConfigDto>> = {
		[FileConfig.AnimeImages]: FileConfigDto.AnimeImages,
		[FileConfig.StudioImages]: FileConfigDto.StudioImages,
		[FileConfig.UserAvatars]: FileConfigDto.UserAvatars,
	};

	/**
	 * Map model to dto.
	 * @param config  - File config dto.
	 * @returns File config model.
	 */
	export function toDto(config: FileConfig): FileConfigDto {
		return FILE_CONFIG_MAP_TO_DTO[config];
	}
}
