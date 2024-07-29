import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class QueryParams extends Immerable {

	/** Offset. */
	public readonly page: string;

	/** Limit. */
	public readonly pageSize: string;

	/** Search. */
	public readonly search: string;

	/** Name. */
	public readonly type: string;

	/** Name. */
	public readonly ordering: string;

	public constructor(data: QueryParamsConstructorData) {
		super();
		this.page = data.page;
		this.pageSize = data.pageSize;
		this.search = data.search;
		this.type = data.type;
		this.ordering = data.ordering;
	}
}

type QueryParamsConstructorData = OmitImmerable<QueryParams>;
