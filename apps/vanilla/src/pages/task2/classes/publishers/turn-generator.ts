import { Publisher } from './publisher';

const PLAYERS_COUNT = 2;

/** Determines whose turn is. */
export class TurnGenerator extends Publisher<number> {

	private readonly playersCount: number = PLAYERS_COUNT;

	/** Index of a player whose turn is. */
	public currentPlayerIndex = -1;

	/** Calculates an index of the next player in a queue. */
	private calcCurrentPlayerIndex = (): void => {
		if (this.currentPlayerIndex + 1 < this.playersCount) {
			this.currentPlayerIndex += 1;
			return;
		}

		this.currentPlayerIndex = 0;
	};

	/** Determines whose turn is and notifies all subscribers. */
	public next = (): void => {
		this.calcCurrentPlayerIndex();
		this.notify(this.currentPlayerIndex);
	};
}
