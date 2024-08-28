import { Immerable, OmitImmerable } from './immerable';

/** Type for error from server. */
export class ServerError extends Immerable {

	/** Error's attribute. The form field whose value caused the error. */
	public readonly attribute: string | null;

	/** Details about the error in the form of a message. */
	public readonly detail: string;

	public constructor(data: ServerErrorConstructorData) {
		super();
		this.attribute = data.attribute;
		this.detail = data.detail;
	}
}

type ServerErrorConstructorData = OmitImmerable<ServerError>;
