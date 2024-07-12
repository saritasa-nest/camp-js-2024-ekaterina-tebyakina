import { PlayerResult } from './models/player-result';
import { Subscriber } from './models/subscriber';

import { Publisher } from './publisher';

const WINNING_POINTS_COUNT = 21;

/** Represents a player. */
export class Player extends Publisher<PlayerResult> implements Subscriber<number> {

	/** Dice results. */
	public diceResults: number[] = [];

	/**
	 * Win status.
	 * True, when the sum of points for dice rolls is greater or equal to WINNING_POINTS_COUNT.
	 */
	public winStatus = false;

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

		this.notify({ winStatus: this.winStatus, diceResult });
	}
}
