import { AnimeStatus, AnimeType } from '../dtos/anime.dto';

import { Immerable, OmitImmerable } from './immerable';

/** Anime model. */
export class Anime extends Immerable {

	/** Id. */
	public readonly id: number;

	/** */
	public readonly created: Date;

	/** */
	public readonly modified: Date;

	/** */
	public readonly titleEng: string;

	/** */
	public readonly titleJpn: string;

	/** */
	public readonly image: string;

	/** */
	public readonly aired: {
		start: Date;
		end: Date;
	};

	/** */
	public readonly type: AnimeType;

	/** */
	public readonly status: AnimeStatus;

	/** */
	public readonly score: number;

	/** */
	public readonly userScore: number;

	/** */
	public readonly studios: readonly number[];

	/** */
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

type AnimeConstructorData = OmitImmerable<Anime>;
