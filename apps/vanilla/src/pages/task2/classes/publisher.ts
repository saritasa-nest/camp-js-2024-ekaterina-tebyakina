import { Subscriber } from './subscriber';

/**
 * Publisher.
 */
export class Publisher<T> {
	/**
	 * Subscribers.
	 */
	protected readonly subscribers: Subscriber<T>[] = [];

	public constructor() {
		// externalTemperatureGenerator((val) => this.onTemperaturChange(val));
		// externalGenerator();
	}

	/**
	 * Subscribe.
	 * @param subscriber - Subscriber.
	 */
	public subscribe(subscriber: Subscriber<T>): void {

		const subIdx = this.getSubscriberIndex(subscriber);
		if (subIdx === -1) {
			this.subscribers.push(subscriber);
		}
	}

	/**
	 * Unsubscribe.
	 * @param subscriber - Subscriber.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);
		if (subIdx !== -1) {
			this.subscribers.splice(subIdx, 1);
		}
	}

	/**
	 * Notify.
	 * @param message - Message.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(sub => sub.update(message));
	}

	/**
	 * Function for get subscribe index.
	 * @param subscriber - Subscribe.
	 */
	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}
}
