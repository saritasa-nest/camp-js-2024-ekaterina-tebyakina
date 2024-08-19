import { AnimeStudio } from '@js-camp/core/models/anime-studio';

export namespace AppUrls {

	/** Anime-related routes. */
	export const anime = {
		list: 'anime/anime/',
		studio: {
			list: 'anime/studios/',
			listCursor: 'anime/studios/list-cursor',
			id: (id: AnimeStudio['id']) => `anime/studios/${id}/`,
		},
	};

}
