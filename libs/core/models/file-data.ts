import { FileConfig } from './file-config';

/** Data about file. */
export type FileData = {

	/** */
	readonly config: FileConfig;

	/** File name. */
	readonly filename: string;

	/**  */
	readonly contentType: string;

	/**  */
	readonly contentLength: number;
};
