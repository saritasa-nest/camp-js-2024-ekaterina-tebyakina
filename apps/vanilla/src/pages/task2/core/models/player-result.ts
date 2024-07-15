/** Data about a dice roll and whether it became a winning one. */
export type PlayerResult = Readonly<{

	/** Win status. True if a player won. */
	winStatus: boolean;

	/** Result of a dice roll. Number of points. */
	diceResult: number;
}>;
