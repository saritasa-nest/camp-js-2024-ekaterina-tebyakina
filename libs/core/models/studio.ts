import { Immerable, OmitImmerable } from './immerable';

/** Studio. */
export class Studio extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Name. */
	public readonly name: string;

	/** Image url. */
	public readonly image: string;

	public constructor(data: StudioConstructorData) {
		super();
		this.id = data.id;
		this.name = data.name;
		this.image = data.image;
	}
}

type StudioConstructorData = OmitImmerable<Studio>;
