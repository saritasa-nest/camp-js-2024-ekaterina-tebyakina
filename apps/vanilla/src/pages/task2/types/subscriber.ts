
/**
 * Subscriber.
 */
export type Subscriber<T> = {

	/**
	 * Update method.
	 * @param message - Message.
	 */
	update: (message: T) => void;
};
