import { Publisher } from './publisher';
import { Subscriber } from './subscriber';

/**
 * Player.
 */
/** */
export class Player extends Publisher<number> implements Subscriber<number> {

	public diceResults: number[];

	/**
	 * Win.
	 */
	public winStatus: boolean;

	public constructor() {
		super();
		this.diceResults = [];
		this.winStatus = false;
	}

	private checkIsWin(): void {
		let totalScore = 0;
		this.diceResults.forEach(item => {
			totalScore = item + totalScore;
		});

		if (totalScore >= 21) {
			this.winStatus = true;
		}
	}

	/**
	 * Notify.
	 * @param id - Number.
	 */
	public override notify({diceResults: number, winStatus: boolean}): void {
		this.subscribers.forEach((sub, index) => sub.update({diceResults, winStatus});
	}

	/**
	 * Update.
	 * @param diceResult - Message.
	 */
	public update(diceResult: number): void {
		this.diceResults.push(diceResult);
		this.checkIsWin();
		this.notify(this);
	}
}
