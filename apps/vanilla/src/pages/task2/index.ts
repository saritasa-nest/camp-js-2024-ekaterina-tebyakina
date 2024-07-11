import { DiceGenerator } from './classes/diceGenerator';
import { TurnGenerator } from './classes/turnGenerator';
import { Player } from './classes/player';
import { ResultDisplayer } from './classes/resultDisplayer';

/** App. */
class App {
	private readonly turnGenerator = new TurnGenerator();

	private readonly diceGenerator = new DiceGenerator();

	private readonly firstPlayer = new Player();

	private readonly secondPlayer = new Player();

	public constructor() {

		this.turnGenerator.subscribe(this.diceGenerator);
		this.diceGenerator.subscribe(this.firstPlayer);
		this.diceGenerator.subscribe(this.secondPlayer);

		this.listenAndPrintToScreen();

		const btn = document.querySelector('.button');
		btn?.addEventListener('click', () => {
			this.turnGenerator.next();
		});
	}

	private listenAndPrintToScreen(): void {
		const firstPlayerDisplay = document.querySelector('.first-player-results') as HTMLElement;
		const firstPlayerResultsDisplayer = new ResultDisplayer(firstPlayerDisplay);

		const secondPlayerDisplay = document.querySelector('.second-player-results') as HTMLElement;
		const secondPlayerResultsDisplayer = new ResultDisplayer(secondPlayerDisplay);

		this.firstPlayer.subscribe(firstPlayerResultsDisplayer);
		this.secondPlayer.subscribe(secondPlayerResultsDisplayer);

	}
}

const app = new App();
