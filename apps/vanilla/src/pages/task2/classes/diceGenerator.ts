import { Publisher } from './publisher';

const SIDES_COUNT = 6;

/**
 * PlayerTurnResult.
 */
class PlayerTurnResult {
	/**
	 * PlayerIndex.
	 */
	public readonly playerIndex: number;

	/**
	 * DiceResult.
	 */
	public readonly diceResult: number;

	public constructor(playerIndex: number, diceResult: number) {
		this.playerIndex = playerIndex;
		this.diceResult = diceResult;
	}
}

/**
 * DiceGenerator.
 */
export class DiceGenerator extends Publisher<number> {
	private readonly sidesCount: number;

	public constructor() {
		super();
		this.sidesCount = SIDES_COUNT;
	}

	/**
	 * Next.
	 */
	public next = (): number => 1 + Math.floor(Math.random() * this.sidesCount);

	/**
	 * Update.
	 * @param id - Number.
	 */
	public update(id: number): void {
		// this.notify(this.rollDice(id));
		this.notify(id);
	}

	/**
	 * Notify.
	 * @param id - Number.
	 */
	public override notify(id: number): void {
		const cast = this.rollDice(id);
		this.subscribers.forEach((sub, index) => {
			if (cast.playerIndex === index) {
				sub.update(cast.diceResult);
			}
		});
	}

	/**
	 * RollDice.
	 * @param id - Number.
	 * @returns PlayerTurnResult.
	 */
	public rollDice = (id: number): PlayerTurnResult => new PlayerTurnResult(id, this.next());
}
