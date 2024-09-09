import { AnimeStudio } from '@js-camp/core/models/anime-studio';

export namespace AppUrls {

	/** Anime-related routes. */
	export const anime = {
		list: 'anime/',
		studio: {
			list: 'studios/',
			listCursor: 'studios/list-cursor/',
			id: (id: AnimeStudio['id']) => `studios/${id}/`,
		},
	};

}
