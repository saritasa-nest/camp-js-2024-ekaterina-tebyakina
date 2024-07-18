import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '@js-camp/angular/core/services/api.service';
import { AsyncPipe, JsonPipe, NgOptimizedImage, DatePipe, KeyValuePipe } from '@angular/common';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';

// import { Observable } from 'rxjs';
// import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

// import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

/** */
export enum ColumnsHeaders {
	Image = 'Image',
	TitleEng = 'English title',
	TitleJpn = 'Japanese title',
	AiredStart = 'Aired starts with',
	Type = 'type',
	Status = 'status',
}

/** */
export type ColumnTitle = 'image' | 'titleEng' | 'titleJpn' | 'airedStart'	| 'type' | 'status';

/** Dashboard component. */
@Component({
	selector: 'camp-dashboard',
	standalone: true,
	imports: [MatTableModule, AsyncPipe, JsonPipe, DatePipe, NgOptimizedImage, KeyValuePipe, EmptyPipe],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

	private readonly apiService = inject(ApiService);

	/** */
	protected readonly anime$ = this.apiService.getAnime();

	/** */
	public get columnsHeaders(): typeof ColumnsHeaders {
		return ColumnsHeaders;
	}

	/** */
	protected readonly columnsToDisplay = Object.values(ColumnsHeaders);

}
