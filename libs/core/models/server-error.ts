import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class ServerError extends Immerable {

	/** Attribute. */
	public readonly attribute: string | null;

	/** Detail. */
	public readonly detail: string;

	public constructor(data: ServerErrorConstructorData) {
		super();
		this.attribute = data.attribute;
		this.detail = data.detail;
	}
}

type ServerErrorConstructorData = OmitImmerable<ServerError>;
