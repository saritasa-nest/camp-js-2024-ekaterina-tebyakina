/** Genre filters. */
export type GenreFilters = Readonly<Partial<{

	/** Search event value. */
	search: string;

	/** Select event value. */
	select: string[];

	/** Sort event value. */
	sort: string;

	/** Cursor next. */
	next: string | null;
}>>;
