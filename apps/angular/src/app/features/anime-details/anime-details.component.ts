import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { Observable } from 'rxjs';
import { JsonPipe, AsyncPipe } from '@angular/common';

/** Component with details for an anime. */
@Component({
	selector: 'camp-anime-details',
	standalone: true,
	templateUrl: './anime-details.component.html',
	styleUrl: './anime-details.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AsyncPipe, JsonPipe],
})
export class AnimeDatailsComponent {

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly animeApiService = inject(AnimeApiService);

	/** */
	protected readonly anime$: Observable<unknown>;

	public constructor() {
		const animeId = this.activatedRoute.snapshot.params['id'];
		this.anime$ = this.animeApiService.getAnime(animeId);
		// console.log(animeId);
	}
}
