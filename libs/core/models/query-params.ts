import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class QueryParams extends Immerable {

	/** Offset. */
	public readonly offset: number;

	/** Limit. */
	public readonly limit: number;

	/** Search. */
	public readonly search: string;

	/** Name. */
	public readonly type: string;

	/** Name. */
	public readonly ordering: string;

	public constructor(data: QueryParamsConstructorData) {
		super();
		this.offset = data.offset;
		this.limit = data.limit;
		this.search = data.search;
		this.type = data.type;
		this.ordering = data.ordering;
	}
}

type QueryParamsConstructorData = OmitImmerable<QueryParams>;
