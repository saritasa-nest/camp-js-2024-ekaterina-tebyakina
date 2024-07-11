import { Subscriber } from '../../types/subscriber';

/**
 * The base publisher class.
 * Stores a list of subscribers.
 * Allows to subscribe.
 * Sends messages to subscribers.
 */
export class Publisher<T> {

	/** Subscribers list. */
	protected readonly subscribers: Subscriber<T>[] = [];

	/**
	 * Allows to subscribe to a publisher.
	 * @param subscriber - Subscriber object.
	 */
	public subscribe = (subscriber: Subscriber<T>): void	=> {
		const index = this.getSubscriberIndex(subscriber);
		if (index === -1) {
			this.subscribers.push(subscriber);
		}
	};

	/**
	 * Allows to unsubscribe from a publisher.
	 * @param subscriber - Subscriber object.
	 */
	public unsubscribe = (subscriber: Subscriber<T>): void	=> {
		const index = this.getSubscriberIndex(subscriber);
		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	};

	/**
	 * Sends messages to all publisher subscribers.
	 * @param message - Message for subscribers.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(sub => sub.update(message));
	}

	/**
	 * Gets an index of a subscriber in the list.
	 * @param subscriber - Subscriber object.
	 */
	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}
}
