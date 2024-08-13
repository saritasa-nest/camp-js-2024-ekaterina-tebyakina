import { Aired } from './aired';
import { AnimeSource } from './anime-source';
import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';
import { AnimeRating } from './anime-rating';
import { Immerable, OmitImmerable } from './immerable';
import { Season } from './season';
import { Genre } from './genre';
import { Studio } from './studio';

/** Anime model. */
export class AnimeDetails extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Date of creation. */
	public readonly created: Date;

	/** Date of last modification. */
	public readonly modified: Date;

	/** Url to cover. */
	public readonly image: string;

	/** Id the trailer on YouTube. */
	public readonly trailerYoutubeId: string;

	/** Title in English. */
	public readonly englishTitle: string;

	/** Title in Japanese. */
	public readonly japaneseTitle: string;

	/** Calculated score. */
	public readonly score: number;

	/** User score. */
	public readonly userScore: number;

	/** Anime type. */
	public readonly type: AnimeType;

	/** Anime status. */
	public readonly status: AnimeStatus;

	/** Anime source. */
	public readonly source: AnimeSource;

	/** Status showing is anime airing. */
	public readonly airing: boolean;

	/** The dates on which aired started and ended. */
	public readonly aired: Aired;

	/** Anime rating. */
	public readonly rating: AnimeRating;

	/** Season. */
	public readonly season: Season;

	/** Synopsis. */
	public readonly synopsis: string;

	/** Background. */
	public readonly background: string;

	/** Broadcast day. */
	public readonly broadcastDay: number;

	/** Broadcast time. */
	public readonly broadcastTime: string;

	/** Broadcast timezone. */
	public readonly broadcastTimezone: string;

	/** Studios. */
	public readonly studios: readonly number[];

	/** Studios data. */
	public readonly studiosData: readonly Studio[];

	/** Genres. */
	public readonly genres: readonly number[];

	/** Genres data. */
	public readonly genresData: readonly Genre[];

	public constructor(data: AnimeDetailsConstructorData) {
		super();
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.englishTitle = data.englishTitle;
		this.japaneseTitle = data.japaneseTitle;
		this.image = data.image;
		this.trailerYoutubeId = data.trailerYoutubeId;
		this.airing = data.airing;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.source = data.source;
		this.score = data.score;
		this.userScore = data.userScore;
		this.rating = data.rating;
		this.season = data.season;
		this.synopsis = data.synopsis;
		this.background = data.background;
		this.broadcastDay = data.broadcastDay;
		this.broadcastTime = data.broadcastTime;
		this.broadcastTimezone = data.broadcastTimezone;
		this.studios = data.studios;
		this.studiosData = data.studiosData;
		this.genres = data.genres;
		this.genresData = data.genresData;
	}
}

type AnimeDetailsConstructorData = OmitImmerable<AnimeDetails>;
