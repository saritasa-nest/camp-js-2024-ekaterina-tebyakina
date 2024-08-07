/** Type for error from server. */
export type ServerErrorDto = {

	/** Error's attribute. The form field whose value caused the error. */
	readonly attr: string | null;

	/** The error code. Provides brief information about the error. */
	readonly code: string;

	/** Details about the error in the form of a message. */
	readonly detail: string;
};
