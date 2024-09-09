import { Immerable, OmitImmerable } from './immerable';

/** Pagination meta info. */
export class Pagination<T> extends Immerable {
	/** Total count of items. */
	public readonly count: number;

	/** Next page of items. */
	public readonly next: string;

	/** Previous page of items. */
	public readonly previous: string;

	/** Array of items requested. */
	public readonly results: readonly T[];

	public constructor(data: PaginationConstructorData<T>) {
		super();
		this.count = data.count;
		this.next = data.next;
		this.previous = data.previous;
		this.results = data.results;
	}
}

/** Pagination list cursor. */
export class PaginationListCursor<T> extends Immerable {

	/** Next page of items. */
	public readonly next: string | null;

	/** Previous page of items. */
	public readonly previous: string | null;

	/** Array of items requested. */
	public readonly results: readonly T[];

	public constructor(data: PaginationListCursorConstructorData<T>) {
		super();
		this.next = data.next;
		this.previous = data.previous;
		this.results = data.results;
	}
}

type PaginationConstructorData<T> = OmitImmerable<Pagination<T>>;
type PaginationListCursorConstructorData<T> = OmitImmerable<PaginationListCursor<T>>;
