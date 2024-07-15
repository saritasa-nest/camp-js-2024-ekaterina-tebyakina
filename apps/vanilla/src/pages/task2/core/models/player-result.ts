/** Data about a player's result. It contains information about the number of points
 *  received for a throw and whether a player has become a winner. */
export type PlayerResult = Readonly<{

	/** Win status. True if a player won. */
	winStatus: boolean;

	/** Result of a dice roll. Number of points. */
	diceResult: number;
}>;
