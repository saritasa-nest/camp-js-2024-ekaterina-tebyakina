import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class Genre extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Name. */
	public readonly name: string;

	/** Type. */
	public readonly type: string;

	public constructor(data: GenreConstructorData) {
		super();
		this.id = data.id;
		this.name = data.name;
		this.type = data.type;
	}
}

type GenreConstructorData = OmitImmerable<Genre>;
