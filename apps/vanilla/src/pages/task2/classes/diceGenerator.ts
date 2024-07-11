import { Subscriber } from '../types/subscriber';

import { Publisher } from './publisher';

const SIDES_COUNT = 6;

// /**
//  * PlayerTurnResult.
//  */
// class PlayerTurnResult {
// 	/**
// 	 * PlayerIndex.
// 	 */
// 	public readonly playerIndex: number;

// 	/**
// 	 * DiceResult.
// 	 */
// 	public readonly diceResult: number;

// 	public constructor(playerIndex: number, diceResult: number) {
// 		this.playerIndex = playerIndex;
// 		this.diceResult = diceResult;
// 	}
// }

/**
 * DiceGenerator.
 */
export class DiceGenerator extends Publisher<number> implements Subscriber<number> {

	private readonly sidesCount: number;

	public constructor() {
		super();
		this.sidesCount = SIDES_COUNT;
	}

	/**
	 * Update.
	 * @param currentPlayerIndex - Number.
	 */
	public update(currentPlayerIndex: number): void {
		this.notify(currentPlayerIndex);
	}

	/**
	 * Notify.
	 * @param currentPlayerIndex - Number.
	 */
	public override notify(currentPlayerIndex: number): void {
		const diceResult = this.rollDice();

		this.subscribers.forEach((sub, index) => {
			if (currentPlayerIndex === index) {
				sub.update(diceResult);
			}
		});
	}

	/**
	 * RollDice.
	 * @param id - Number.
	 * @returns PlayerTurnResult.
	 */
	public rollDice = (): number => 1 + Math.floor(Math.random() * this.sidesCount);
}
