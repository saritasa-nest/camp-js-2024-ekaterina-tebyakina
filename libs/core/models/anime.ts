import { Aired } from './aired';
import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';
import { Immerable, OmitImmerable } from './immerable';

/** Anime model. */
export class Anime extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Date of creation. */
	public readonly created: Date;

	/** Date of last modification. */
	public readonly modified: Date;

	/** Title in English. */
	public readonly englishTitle: string;

	/** Title in Japanese. */
	public readonly japaneseTitle: string;

	/** Url to cover. */
	public readonly image: string;

	/** The dates on which aired started and ended. */
	public readonly aired: Aired;

	/** Anime type. */
	public readonly type: AnimeType;

	/** Anime status. */
	public readonly status: AnimeStatus;

	/** Calculated score. */
	public readonly score: number;

	/** User score. */
	public readonly userScore: number;

	public constructor(data: AnimeConstructorData) {
		super();
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.englishTitle = data.englishTitle;
		this.japaneseTitle = data.japaneseTitle;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
	}
}

type AnimeConstructorData = OmitImmerable<Anime>;
