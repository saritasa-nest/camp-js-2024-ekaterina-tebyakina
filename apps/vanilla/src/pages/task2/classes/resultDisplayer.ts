import { Subscriber } from '../types/subscriber';

import { PlayerResult } from './player';

/**
 * PlayerObserverDOM.
 */
export class ResultDisplayer implements Subscriber<PlayerResult> {

	private readonly layout: HTMLElement;

	public constructor(element: HTMLElement) {
		this.layout = element;
	}

	/**
	 * Update.
	 * @param playerResult - Val.
	 */
	public update(playerResult: PlayerResult): void {
		this.layout.innerText = `${this.layout.innerText} ${String(playerResult.diceResult)}`;

		if (playerResult.winStatus) {
			const parentLayout = this.layout.parentNode as HTMLElement;
			parentLayout.style.backgroundColor = '#e0baba';
		}
	}
}
