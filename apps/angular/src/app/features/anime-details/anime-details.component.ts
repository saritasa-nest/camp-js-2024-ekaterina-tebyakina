import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { Observable } from 'rxjs';
import { JsonPipe, AsyncPipe, DatePipe, NgOptimizedImage, Location } from '@angular/common';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { SafePipe } from '@js-camp/angular/shared/pipes/safe.pipe';
import { MatListModule } from '@angular/material/list';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
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
		SafePipe,
		JsonPipe,
		NgOptimizedImage,
		MatListModule,
		MatButtonModule,
		MatIconModule,
		DialogModule,
		ProgressBarComponent,
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

	private readonly location = inject(Location);

	private readonly dialog = inject(Dialog);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly animeApiService = inject(AnimeApiService);

	public constructor() {
		const animeId = this.activatedRoute.snapshot.params['id'];
		this.anime$ = this.animeApiService.getAnime(animeId);
	}

	/** Handle click on go back button. */
	protected onGoBack(): void {
		this.location.back();
	}

	/**
	 * Handle click on anime cover.
	 * @param src - Url to image.
	 * @param alt - String for image alt.
	 */
	protected onOpenDialog(src: string, alt: string): void {
		this.dialog.open<string>(ImageDialogComponent, {
			data: {
				src,
				alt,
			},
		});
	}

	/**
	 * Handle opening image popup using the keyboard.
	 * @param event - Keydown event.
	 * @param src - Url to image.
	 * @param alt - String for image alt.
	 */
	protected onKeyDown(event: KeyboardEvent, src: string, alt: string): void {
		if (event.key === 'Enter') {
			this.onOpenDialog(src, alt);
		}
	}
}
