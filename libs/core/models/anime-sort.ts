import { AnimeColumnsIndexes } from './anime-columns-indexes';

/** Direction of anime sort. */
export enum SortingDirection {
	Ascending = 'asc',
	Descending = 'desc',
	None = '',
}

/**
 * Sort settings for UI.
 * They are responsible for how the components should look according to the selected sorting settings.
 */
export type AnimeSort = {

	/** Selected field for sort. */
	readonly sortField: AnimeColumnsIndexes;

	/** Selected direction of sort. */
	readonly direction: SortingDirection;
};
