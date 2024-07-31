/** Type for subscribers which will subscribe to publishers. */
export type Subscriber<T> = {

	/**
	 * A method that a publisher will call when some event occurs.
	 * @param message - A message that a publisher will send to a subscriber.
	 */
	update: (message: T) => void;
};
