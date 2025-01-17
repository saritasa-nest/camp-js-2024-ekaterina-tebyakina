import { Subscriber } from '../core/models/subscriber';

import { PlayerResult } from '../core/models/player-result';

/** Displays the received data. */
export class ResultDisplayer implements Subscriber<PlayerResult> {

	/**
	 * @param layout HTMLElement for display the data.
	 */
	public constructor(protected readonly layout: HTMLElement) {}

	/**
	 * Called by a publisher.
	 * Displays the received data in html element.
	 * @param playerResult - Result of a dice roll.
	 */
	public update(playerResult: PlayerResult): void {
		this.layout.innerText = `${this.layout.innerText} ${playerResult.diceResult.toString()}`;
	}
}
