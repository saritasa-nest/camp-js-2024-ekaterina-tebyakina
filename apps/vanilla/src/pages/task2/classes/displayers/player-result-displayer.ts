import { PlayerResult } from '../../types/player-result';

import { ResultDisplayer } from './result-displayer';

const BACKGROUND_COLOR = '#e0baba';

/**
 * Subscriber.
 * Displays the received data and changes page styles according to it.
 */
export class PlayerResultDisplayer extends ResultDisplayer {

	/**
	 * Called by a publisher.
	 * Displays the received data in html element.
	 * Changes page styles if player wins.
	 * @param playerResult - Result of a dice roll.
	 */
	public override update(playerResult: PlayerResult): void {
		this.layout.innerText = `${this.layout.innerText} ${String(playerResult.diceResult)}`;

		if (playerResult.winStatus) {
			const parentLayout = this.layout.parentNode as HTMLElement;
			parentLayout.style.backgroundColor = BACKGROUND_COLOR;
		}
	}
}
