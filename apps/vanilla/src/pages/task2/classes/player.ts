import { Subscriber } from '../types/subscriber';

import { Publisher } from './publishers/publisher';

const WINNING_POINTS_COUNT = 21;

/** Data about a dice roll and whether it became a winning one. */
export class PlayerResult {

	/** Win status. True if a player won. */
	public readonly winStatus: boolean;

	/** Result of a dice roll. */
	public readonly diceResult: number;

	public constructor(winStatus: boolean, diceResult: number) {
		this.winStatus = winStatus;
		this.diceResult = diceResult;
	}
}

/** Represents a player. */
export class Player extends Publisher<PlayerResult> implements Subscriber<number> {

	/** Dice results. */
	public diceResults: number[];

	/**
	 * Win status.
	 * True, when the sum of points for dice rolls is greater or equal to WINNING_POINTS_COUNT.
	 */
	public winStatus: boolean;

	public constructor() {
		super();
		this.diceResults = [];
		this.winStatus = false;
	}

	private checkIsWin(): void {
		if (this.calcSumOfPoints() >= WINNING_POINTS_COUNT) {
			this.winStatus = true;
		}
	}

	private calcSumOfPoints(): number {
		let sumOfPoints = 0;
		this.diceResults.forEach(item => {
			sumOfPoints += item;
		});
		return sumOfPoints;
	}

	/**
	 * Notifies subscribers about a dice roll.
	 * @param playerResult - Result of a dice roll.
	 */
	public override notify(playerResult: PlayerResult): void {
		this.subscribers.forEach(sub => sub.update(playerResult));
	}

	/**
	 * Called by a publisher the player is subscribed to.
	 * Notifies subscribers about a dice roll results.
	 * @param diceResult - The number of points.
	 */
	public update(diceResult: number): void {
		this.diceResults.push(diceResult);
		this.checkIsWin();

		const playerResult = new PlayerResult(this.winStatus, diceResult);
		this.notify(playerResult);
	}
}
