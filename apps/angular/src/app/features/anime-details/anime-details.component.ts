import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { Observable } from 'rxjs';
import { JsonPipe, AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { MatListModule } from '@angular/material/list';

/** Component with details for an anime. */
@Component({
	selector: 'camp-anime-details',
	standalone: true,
	templateUrl: './anime-details.component.html',
	styleUrl: './anime-details.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		AsyncPipe,
		DatePipe,
		EmptyPipe,
		JsonPipe,
		NgOptimizedImage,
		MatListModule,
	],
})
export class AnimeDatailsComponent {

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly animeApiService = inject(AnimeApiService);

	/** Details about an anime. */
	protected readonly anime$: Observable<AnimeDetails>;

	public constructor() {
		const animeId = this.activatedRoute.snapshot.params['id'];
		this.anime$ = this.animeApiService.getAnime(animeId);
	}
}
