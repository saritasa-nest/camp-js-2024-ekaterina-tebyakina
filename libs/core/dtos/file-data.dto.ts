import { FileConfigDto } from './file-config.dto';

/** Information about a file to be uploaded. */
export type FileDataDto = {

	/** Additional information about the purpose of the file. */
	readonly config: FileConfigDto;

	/** File name. */
	readonly filename: string;

	/** File type. */
	readonly content_type: string;

	/** File size. */
	readonly content_length: number;
};
