import { Publisher } from './publisher';

const PLAYERS_COUNT = 2;

/**
 * TurnGenerator.
 */
export class TurnGenerator extends Publisher<number> {

	private readonly playersCount: number;

	/**
	 * CurrentPlayerIndex.
	 */
	public currentPlayerIndex: number;

	public constructor() {
		super();
		this.playersCount = PLAYERS_COUNT;
		this.currentPlayerIndex = -1;
	}

	private calcCurrentPlayerIndex = (): void => {
		if (this.currentPlayerIndex + 1 < this.playersCount) {
			this.currentPlayerIndex += 1;
			return;
		}

		this.currentPlayerIndex = 0;
	};

	/**
	 * Next.
	 */
	public next = (): void => {
		this.calcCurrentPlayerIndex();
		this.notify(this.currentPlayerIndex);
	};
}

// // => {

// // 	const subIdx = this.getSubscriberIndex(subscriber);
// // 	if (subIdx === -1) {
// // 		this.subscribers.push(subscriber);
// // 	}
// // }

// // {
// // 	const subIdx = this.getSubscriberIndex(subscriber);
// // 	if (subIdx !== -1) {
// // 		this.subscribers.splice(subIdx, 1);
// // 	}
// // }

// /**
//  * TurnGenerator.
//  */
// export class TurnGenerator implements Publisher<number> {

// 	/** Subscribers. */
// 	public readonly subscribers: Subscriber<number>[] = [];

// 	private readonly playersCount: number;

// 	/**
// 	 * CurrentPlayerIndex.
// 	 */
// 	public currentPlayerIndex: number;

// 	public constructor() {
// 		this.playersCount = PLAYERS_COUNT;
// 		this.currentPlayerIndex = 0;
// 	}

// 	/**
// 	 * Subscribe.
// 	 * @param subscriber - Subscriber.
// 	 */
// 	public subscribe = (subscriber: Subscriber<number>): void	=> {

// 		const subIdx = this.getSubscriberIndex(subscriber);
// 		if (subIdx === -1) {
// 			this.subscribers.push(subscriber);
// 		}
// 	};

// 	/**
// 	 * Subscribe.
// 	 * @param subscriber - Subscriber.
// 	 */
// 	public unsubscribe = (subscriber: Subscriber<number>): void	=> {
// 		const subIdx = this.getSubscriberIndex(subscriber);
// 		if (subIdx !== -1) {
// 			this.subscribers.splice(subIdx, 1);
// 		}
// 	}

// 	/**
// 	 * Notify.
// 	 * @param message - Message.
// 	 */
// 	public notify(message: T): void {
// 		this.subscribers.forEach(sub => sub.update(message));
// 	}

// 	/**
// 	 * Next.
// 	 */
// 	// public next = (): number => Math.floor(Math.random() * this.playersCount);
// 	public next = (): void => {
// 		if (this.currentPlayerIndex === 0) {
// 			this.currentPlayerIndex = 1;
// 			return;
// 		}
// 		this.currentPlayerIndex = 0;
// 	};

// 	/**
// 	 * TurnChange.
// 	 * @param turn - Number.
// 	 */
// 	public onTurnChange(turn: number): void {
// 		this.notify(turn);
// 	}

// 	/**
// 	 * Function for get subscribe index.
// 	 * @param subscriber - Subscribe.
// 	 */
// 	private getSubscriberIndex(subscriber: Subscriber<number>): number {
// 		return this.subscribers.findIndex(sub => sub === subscriber);
// 	}
// }
