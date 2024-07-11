import { Subscriber } from './subscriber';

/**
 * Publisher.
 */
export type Publisher<T> = {

	/**
	 * Subscribers.
	 */
	// readonly subscribers: Subscriber<T>[];

	/**
	 * Subscribe.
	 * @param subscriber - Subscriber.
	 */
	subscribe: (subscriber: Subscriber<T>) => void;

	/**
	 * Unsubscribe.
	 * @param subscriber - Subscriber.
	 */
	unsubscribe: (subscriber: Subscriber<T>) => void;

	/**
	 * Notify.
	 * @param message - Message.
	 */
	notify: (message: T) => void;

};

// /**
//  * Notify.
//  * @param message - Message.
//  */
// public notify(message: T): void {
// 	this.subscribers.forEach(sub => sub.update(message));
// }

// /**
//  * Function for get subscribe index.
//  * @param subscriber - Subscribe.
//  */
// private getSubscriberIndex(subscriber: Subscriber<T>): number {
// 	return this.subscribers.findIndex(sub => sub === subscriber);
// }
