import { DiceGenerator } from './core/dice-generator';
import { TurnGenerator } from './core/turn-generator';
import { Player } from './core/player';
import { ResultDisplayer } from './ui/result-displayer';
import { PlayerResultDisplayer } from './ui/player-result-displayer';

const turnGenerator = new TurnGenerator();
const diceGenerator = new DiceGenerator();
const firstPlayer = new Player();
const secondPlayer = new Player();

turnGenerator.subscribe(diceGenerator);
diceGenerator.subscribe(firstPlayer);
diceGenerator.subscribe(secondPlayer);

listenAndPrintToScreen();

const diceRollButton = document.querySelector('.dice-roll-button');
diceRollButton?.addEventListener('click', () => {
	turnGenerator.next();
});

/** Creates displayers and subscribe them on players. */
function listenAndPrintToScreen(): void {
	const firstPlayerSpan = document.querySelector('.first-player-results') as HTMLElement;
	const firstPlayerResultsDisplayer = new PlayerResultDisplayer(firstPlayerSpan);

	const secondPlayerSpan = document.querySelector('.second-player-results') as HTMLElement;
	const secondPlayerResultsDisplayer = new PlayerResultDisplayer(secondPlayerSpan);

	const allResultsSpan = document.querySelector('.all-results') as HTMLElement;
	const allResultsDisplayer = new ResultDisplayer(allResultsSpan);

	firstPlayer.subscribe(firstPlayerResultsDisplayer);
	secondPlayer.subscribe(secondPlayerResultsDisplayer);

	firstPlayer.subscribe(allResultsDisplayer);
	secondPlayer.subscribe(allResultsDisplayer);
}
