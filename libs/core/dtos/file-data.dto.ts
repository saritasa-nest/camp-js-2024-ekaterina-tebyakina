import { FileConfigDto } from './file-config.dto';

/** Data about file. */
export type FileDataDto = {

	/** */
	readonly config: FileConfigDto;

	/** File name. */
	readonly filename: string;

	/**  */
	readonly content_type: string;

	/**  */
	readonly content_length: number;
};
