import { Publisher } from './publisher';

const PLAYERS_COUNT = 2;

/** Determines whose turn is. */
export class TurnGenerator extends Publisher<number> {

	public constructor(private readonly playersCount: number = PLAYERS_COUNT) {
		super();
	}

	/** Index of a player whose turn is. */
	public currentPlayerIndex = -1;

	/** Calculates an index of the next player in a queue. */
	private calculateCurrentPlayerIndex(): void {
		if (this.currentPlayerIndex + 1 < this.playersCount) {
			this.currentPlayerIndex += 1;
			return;
		}

		this.currentPlayerIndex = 0;
	}

	/** Determines whose turn is and notifies all subscribers. */
	public next(): void {
		this.calculateCurrentPlayerIndex();
		this.notify(this.currentPlayerIndex);
	}
}
