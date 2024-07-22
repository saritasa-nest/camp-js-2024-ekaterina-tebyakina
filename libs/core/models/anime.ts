// import { StatusModel } from '../dtos/anime.dto';
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
	public readonly titleEng: string;

	/** Title in Japanese. */
	public readonly titleJpn: string;

	/** Url to cover. */
	public readonly image: string;

	/** The dates on which aired started and ended. */
	public readonly aired: Aired;

	/** Anime type. */
	public readonly type: string;

	/** Anime status. */
	public readonly status: AnimeStatus;

	/** Calculated score. */
	public readonly score: number;

	/** User score. */
	public readonly userScore: number;

	/** List of studios. */
	public readonly studios: readonly number[];

	/** List of genres. */
	public readonly genres: readonly number[];

	public constructor(data: AnimeConstructorData) {
		super();
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.titleEng = data.titleEng;
		this.titleJpn = data.titleJpn;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}

/** The dates on which aired started and ended. */
export type Aired = {

	/** Date, when aired started. */
	start: Date | null;

	/** Date, when aired ended. */
	end: Date | null;
};

/** Anime status. */
export enum AnimeStatus {
	Airing = 'Airing',
	Finished = 'Finished',
	NotYetAired = 'Not yet aired',
}

/** Anime type. */
export enum AnimeType {
	Movie = 'Movie',
	Music = 'Music',
	ONA = 'ONA',
	OVA = 'OVA',
	Promotional = 'Promotional videos',
	Special = 'Special',
	TV = 'TV',
	Unknown = 'Unknown',
}

type AnimeConstructorData = OmitImmerable<Anime>;
