import { FileConfig } from './file-config';

/** Information about a file to be uploaded. */
export type FileData = {

	/** Additional information about the purpose of the file. */
	readonly config: FileConfig;

	/** File name. */
	readonly filename: string;

	/** File type. */
	readonly contentType: string;

	/** File size. */
	readonly contentLength: number;
};
