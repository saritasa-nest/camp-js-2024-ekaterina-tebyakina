/** Data about a dice roll and whether it became a winning one. */
export type PlayerResult = {

	/** Win status. True if a player won. */
	readonly winStatus: boolean;

	/** Result of a dice roll. Number of points. */
	readonly diceResult: number;
};
