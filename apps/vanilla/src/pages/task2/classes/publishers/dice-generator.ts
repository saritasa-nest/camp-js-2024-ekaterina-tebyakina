import { Subscriber } from '../../types/subscriber';

import { Publisher } from './publisher';

const SIDES_COUNT = 6;

/**
 * Turn generator subscriber.
 * Generates a die roll and notifies a player of a result.
 */
export class DiceGenerator extends Publisher<number> implements Subscriber<number> {

	private readonly sidesCount: number = SIDES_COUNT;

	/**
	 * Called by a publisher.
	 * Calls the subscribers notification method.
	 * @param currentPlayerIndex - Index of a player whose turn is.
	 */
	public update(currentPlayerIndex: number): void {
		this.notify(currentPlayerIndex);
	}

	/**
	 * Generates a dice roll and notifies a player of a result.
	 * @param currentPlayerIndex - Index of a player whose turn is.
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
	 * Roll a dice.
	 * Randomly determines the result.
	 * @returns The number of points.
	 */
	public rollDice = (): number => 1 + Math.floor(Math.random() * this.sidesCount);
}
