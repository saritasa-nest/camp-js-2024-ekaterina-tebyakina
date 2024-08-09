import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { Observable } from 'rxjs';
import { JsonPipe, AsyncPipe, DatePipe, NgOptimizedImage, Location } from '@angular/common';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { MatListModule } from '@angular/material/list';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ImageDialogComponent } from '@js-camp/angular/shared/components/image-dialog/image-dialog.component';

const PLAYER_WIDTH = 840;
const PLAYER_HEIGHT = 472;
const VIDEO_URL = 'https://www.youtube-nocookie.com/embed/';

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
		MatButtonModule,
		MatIconModule,
		DialogModule,
	],
})
export class AnimeDatailsComponent {

	/** Details about an anime. */
	protected readonly anime$: Observable<AnimeDetails>;

	/** Player width. */
	protected readonly playerWidth = PLAYER_WIDTH;

	/** Player height. */
	protected readonly playerHeight = PLAYER_HEIGHT;

	/** Anime trailer base url. */
	protected readonly videoUrl = VIDEO_URL;

	/** Helps preventing Cross Site Scripting Security bugs (XSS).*/
	protected readonly sanitizer = inject(DomSanitizer);

	private readonly location = inject(Location);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly animeApiService = inject(AnimeApiService);

	public constructor(public dialog: Dialog) {
		const animeId = this.activatedRoute.snapshot.params['id'];
		this.anime$ = this.animeApiService.getAnime(animeId);
	}

	/** Handle click on go back button. */
	public onGoBack(): void {
		this.location.back();
	}

	/**
	 * Handle click on anime cover.
	 * @param src - Url to image.
	 * @param alt - String for image alt.
	 */
	public onOpenDialog(src: string, alt: string): void {
		this.dialog.open<string>(ImageDialogComponent, {
			data: {
				src,
				alt,
			},
		});
	}
}
