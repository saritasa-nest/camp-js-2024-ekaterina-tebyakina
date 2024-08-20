
/** Studio filter params DTO. */
export namespace StudioFilterParamsDto {

	/** Sort. */
	export type Sort = {

		/** Order. */
		readonly ordering?: string;
	};

	/** Pagination. */
	export type Pagination = {

		/** Order. */
		readonly cursor?: string;
	};

	/** Search. */
	export type Search = {

		/** Order. */
		readonly search?: string;
	};

	/** Studio query params dto. */
	export type Combined = Sort & Pagination & Search;
}
