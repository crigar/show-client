import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Show } from 'src/app/interfaces/show';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit {

  shows: Show[];
  showsPaginated: Show[];
  showsByGenres: any;
  genres: string[];
  genreSelected: string;
  showAll: boolean;
  loading: boolean;

  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  pageApi: number;

  private searchValueSub: Subscription;
  private searchFavoritesSub: Subscription;
  private schedulesSub: Subscription;
  private showAllSub: Subscription;

  constructor(private showService: ShowService) {
    this.shows = [];
    this.showsPaginated = [];
    this.showsByGenres = {};
    this.genres = [];
    this.genreSelected = '';
    this.showAll = true;
    this.loading = false;

    this.length = 0;
    this.pageSize = 10;
    this.pageSizeOptions  = [5, 10, 25, 100];
    this.pageApi = 0;

    this.searchValueSub = new Subscription();
    this.searchFavoritesSub = new Subscription();
    this.schedulesSub = new Subscription();
    this.showAllSub = new Subscription();
  }

  ngOnInit(): void {
    this.getShows();
    this.searchValueSub = this.showService.searchValueSubject.subscribe((searchValue: string) => {
      if (searchValue === '') {
        this.showService.showAllSubject.next(true);
      } else {
        this.cleanPageVariables();
        this.showAll = false;
        this.showService.searchShow(searchValue).subscribe((results: any) => {
          this.shows = results.map((result: any) => result.show );
          this.length = this.shows.length;
          this.showsPaginated = this.shows.slice(0, this.pageSize);
        });
      }
    });

    this.searchFavoritesSub = this.showService.favoritesSubject.subscribe((favorites: any[]) => {
      this.showAll = false;
      this.cleanPageVariables();
      for (const id in favorites) {
        this.showService.getShow(parseInt(id, 10)).subscribe((show: Show) => {
          this.shows.push(show);
          this.length = this.shows.length;
          this.showsPaginated = this.shows.slice(0, this.pageSize);
        });
      }
      this.showsPaginated = this.shows;
    });

    this.schedulesSub = this.showService.scheduleSubject.subscribe((data: any[]) => {
      this.loading = true;
      this.showAll = false;
      this.cleanPageVariables();
      this.showService.storeAndAnalyze(data).subscribe((data: any) => {
        this.showsByGenres = data;
        this.genres = Object.keys(data);
        this.filterByGenre(this.genres[0]);
        this.loading = false;
      });
    });

    this.showAllSub = this.showService.showAllSubject.subscribe((actived: boolean) => {
        this.showAll = actived;
        this.cleanPageVariables();
        this.getShows();
    });
  }

  ngOnDestroy(): void {
    this.searchValueSub.unsubscribe();
    this.searchFavoritesSub.unsubscribe();
    this.schedulesSub.unsubscribe();
    this.showAllSub.unsubscribe();
  }

  getShows() {
    this.showService.getShows(this.pageApi).subscribe((shows: Show[]) => {
      this.shows = this.shows.concat(shows);
      this.showsPaginated = this.shows.slice(this.length, this.length + this.pageSize);
      this.length = this.shows.length;
      this.pageApi ++;
    });
    
  }

  onPaginatorChange($event: PageEvent) {
    console.log($event)
    this.pageSize = $event.pageSize;
    const initIndex = $event.pageIndex * this.pageSize;
    this.showsPaginated = this.shows.slice(initIndex, initIndex + this.pageSize);
    if (($event.pageSize * ($event.pageIndex + 1)) > this.length && this.showAll) {
      this.getShows();
    }
  }

  private cleanPageVariables() {
    this.length = 0;
    this.shows = [];
    this.pageApi = 0;
    this.genres = [];
  }

  filterByGenre(genre: string) {
    this.shows = this.showsByGenres[genre];
    this.showsPaginated = this.showsByGenres[genre].slice(0, this.pageSize);
    this.length = this.shows.length;
    this.genreSelected = genre;
  }

}
