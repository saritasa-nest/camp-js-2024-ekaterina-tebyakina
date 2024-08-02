/** */
export type SortDirection = '' | 'asc' | 'desc';

/**
 * Sort settings for UI.
 * They are responsible for how the components should look according to the selected sorting settings.
 */
export type AnimeSort = {

	/** Selected field for sort. */
	readonly sortField: string;

	/** Selected direction of sort. */
	readonly direction: SortDirection;
};
