/** Studio filter params. */
export namespace StudioFilterParams {

	/** Sort. */
	export type Sort = {

		/** Order. */
		readonly ordering: string;
	};

	/** Pagination. */
	export type Pagination = {

		/** Order. */
		readonly nextCursor: string | null;
	};

	/** Search. */
	export type Search = {

		/** Order. */
		readonly search: string | null;
	};

	/** Studio query params. */
	export type Combined = Sort & Pagination & Search;
}
