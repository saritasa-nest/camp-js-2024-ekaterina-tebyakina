import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { Observable } from 'rxjs';
import { JsonPipe, AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { MatListModule } from '@angular/material/list';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubePlayerComponent } from 'ngx-youtube-player';

import { DialogComponent } from '../dialog/dialog.component';

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
		DialogModule,
		YoutubePlayerComponent,
	],
})
export class AnimeDatailsComponent {

	/** Details about an anime. */
	protected readonly anime$: Observable<AnimeDetails>;

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly animeApiService = inject(AnimeApiService);

	/** */
	protected readonly sanitizer = inject(DomSanitizer);

	public constructor(public dialog: Dialog) {
		const animeId = this.activatedRoute.snapshot.params['id'];
		this.anime$ = this.animeApiService.getAnime(animeId);
	}

	/**
	 * DialogComponent.
	 * @param imageUrl - Url to image.
	 * @param alt - Url to image.
	 */
	public openDialog(imageUrl: string, alt: string): void {
		this.dialog.open<string>(DialogComponent, {
			data: {
				src: imageUrl,
				alt,
			},
		});
	}
}
