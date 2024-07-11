import { Subscriber } from '../types/subscriber';

import { Publisher } from './publisher';

/**
 * PlayerTurnResult.
 */
export class PlayerResult {
	/**
	 * PlayerIndex.
	 */
	public readonly winStatus: boolean;

	/**
	 * DiceResult.
	 */
	public readonly diceResult: number;

	public constructor(winStatus: boolean, diceResult: number) {
		this.winStatus = winStatus;
		this.diceResult = diceResult;
	}
}

/**
 * Player.
 */
/** */
export class Player extends Publisher<PlayerResult> implements Subscriber<number> {

	/** Dice results. */
	public diceResults: number[];

	/**
	 * Win status.
	 * True, when the sum of points for dice rolls is
	 * greater or equal to 21.
	 */
	public winStatus: boolean;

	public constructor() {
		super();
		this.diceResults = [];
		this.winStatus = false;
	}

	private checkIsWin(): void {
		if (this.calcSumOfPoints() >= 21) {
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
	 * Notify.
	 * @param playerResult - Number.
	 */
	public override notify(playerResult: PlayerResult): void {
		this.subscribers.forEach(sub => sub.update(playerResult));
	}

	/**
	 * Update.
	 * @param diceResult - Message.
	 */
	public update(diceResult: number): void {
		this.diceResults.push(diceResult);
		this.checkIsWin();

		const playerResult = new PlayerResult(this.winStatus, diceResult);
		this.notify(playerResult);
	}
}
