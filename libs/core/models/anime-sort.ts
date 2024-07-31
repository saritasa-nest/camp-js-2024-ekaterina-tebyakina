import { ColumnsIndexes } from './columns-indexes';

/**
 * Sort settings for UI.
 * They are responsible for how the components should look according to the selected sorting settings.
 */
export type AnimeSort = {

	/** */
	active: ColumnsIndexes | '';

	/** */
	direction: '' | 'asc' | 'desc';
};
