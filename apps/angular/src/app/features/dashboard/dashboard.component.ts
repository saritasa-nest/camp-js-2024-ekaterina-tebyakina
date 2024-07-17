import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '@js-camp/angular/core/services/api.service';
import { AsyncPipe, JsonPipe, NgOptimizedImage, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

// import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

/** Dashboard component. */
@Component({
	selector: 'camp-dashboard',
	standalone: true,
	imports: [MatTableModule, AsyncPipe, JsonPipe, DatePipe, NgOptimizedImage],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

	/** */
	public anime$: Observable<AnimeDto[]> ;

	/** */
	protected readonly columnsToDisplay = ['image', 'title_eng', 'title_jpn', 'aired.start',	'type', 'status'];

	public constructor(private readonly apiService: ApiService) {
		this.anime$ = apiService.getAnime();
		// apiService.getAnime()?.subscribe(item => console.log(item));
	}

}
