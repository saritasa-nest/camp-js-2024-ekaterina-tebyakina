
/**
 * Subscriber.
 */
export type Subscriber<M> = {

	/**
	 * Update method.
	 * @param message - Message.
	 */
	update: (message: M) => void;
};
