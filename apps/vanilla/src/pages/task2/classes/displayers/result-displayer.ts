import { Subscriber } from '../../types/subscriber';

import { PlayerResult } from '../player';

/**
 * Displays the received data.
 */
export class ResultDisplayer implements Subscriber<PlayerResult> {

	/** HTMLElement for display. */
	protected readonly layout: HTMLElement;

	public constructor(element: HTMLElement) {
		this.layout = element;
	}

	/**
	 * Called by a publisher.
	 * Displays the received data in html element.
	 * @param playerResult - Result of a dice roll.
	 */
	public update(playerResult: PlayerResult): void {
		this.layout.innerText = `${this.layout.innerText} ${String(playerResult.diceResult)}`;
	}
}
