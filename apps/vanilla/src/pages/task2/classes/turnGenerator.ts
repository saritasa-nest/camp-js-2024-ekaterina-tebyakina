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
		this.currentPlayerIndex = 0;
	}

	/**
	 * Next.
	 */
	// public next = (): number => Math.floor(Math.random() * this.playersCount);
	public next = (): void => {
		if (this.currentPlayerIndex === 0) {
			this.currentPlayerIndex = 1;
			return;
		}
		this.currentPlayerIndex = 0;
	};

	/**
	 * TurnChange.
	 * @param turn - Number.
	 */
	public onTurnChange(turn: number): void {
		this.notify(turn);
	}
}
