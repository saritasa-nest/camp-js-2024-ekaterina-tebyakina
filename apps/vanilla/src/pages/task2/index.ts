// import { Subscriber } from './utils/subscriber';
import { DiceGenerator } from './classes/diceGenerator';
import { TurnGenerator } from './classes/turnGenerator';
import { Subscriber } from './classes/subscriber';
import { Player } from './classes/player';

/**
 * PlayerObserverDOM.
 */
class PlayerObserverDOM implements Subscriber<number> {
	private readonly layout: HTMLElement;

	private readonly player: Player;

	public constructor(el: HTMLElement, player: Player) {
		this.layout = el;
		this.player = player;
	}

	/**
	 * Update.
	 * @param val - Val.
	 */
	public update(val: number): void {
		this.layout.innerText = `${this.layout.innerText} ${String(val)}`;
		const allScore = document.querySelector(".all-results");
		allScore.innerHTML = `${allScore.innerText} ${String(val)}`;
		this.player.update(val);

		if (this.player.winStatus) {
			this.layout.parentNode.style.backgroundColor = '#e0baba';
		}
	}
}

/** App. */
class App {
	private readonly turnGenerator = new TurnGenerator();

	private readonly diceGenerator = new DiceGenerator();

	private readonly firstPlayer = new Player();

	private readonly secondPlayer = new Player();

	public constructor() {

		this.turnGenerator.subscribe(this.diceGenerator);

		this.listenAndPrintToScreen();

		// this.handleClick();

		const btn = document.querySelector('.button');
		btn?.addEventListener('click', () => {
			this.turnGenerator.onTurnChange(this.turnGenerator.next());
		});
	}

	// private handleClick(): void {
	// 	const btn = document.querySelector('.button');
	// 	btn?.addEventListener('click', () => {
	// 		this.turnGenerator.onTurnChange(this.turnGenerator.next());
	// 	});
	// }

	private listenAndPrintToScreen(): void {
		const firstPlayerObserver = new PlayerObserverDOM(document.querySelector('.first-player-results') as HTMLElement, this.firstPlayer);
		const secondPlayerObserver = new PlayerObserverDOM(document.querySelector('.second-player-results') as HTMLElement,
			this.secondPlayer);
		this.diceGenerator.subscribe(firstPlayerObserver);
		this.diceGenerator.subscribe(secondPlayerObserver);

		// setTimeout(() => this.diceGenerator.unsubscribe(observer), 5000);
	}
}

const app = new App();
