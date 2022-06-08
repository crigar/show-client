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
  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  pageApi: number;

  private searchValueSub: Subscription;
  private searchFavoritesSub: Subscription;

  constructor(private showService: ShowService) {
    this.shows = [];
    this.showsPaginated = [];
    this.length = 0;
    this.pageSize = 10;
    this.pageSizeOptions  = [5, 10, 25, 100];
    this.pageApi = 0;
    this.searchValueSub = new Subscription();
    this.searchFavoritesSub = new Subscription();
  }

  ngOnInit(): void {
    this.getShows();
    this.searchValueSub = this.showService.searchValueSubject.subscribe((searchValue: string) => {
      if (searchValue === '') {
        this.length = 0;
        this.shows = [];
        this.pageApi = 0;
        this.getShows();
      } else {
        this.showService.searchShow(searchValue).subscribe((results: any) => {
          this.shows = results.map((result: any) => result.show );
          this.length = this.shows.length;
          this.showsPaginated = this.shows.slice(0, this.length + this.pageSize);
        });
      }
    });

    this.searchFavoritesSub = this.showService.favoritesSubject.subscribe((showFavorites: boolean) => {
      this.length = 0;
      this.shows = [];
      this.pageApi = 0;
      if (showFavorites) {
        let favorites = this.showService.getShowFavorites();
        for (const id in favorites) {
          this.showService.getShow(parseInt(id, 10)).subscribe((show: Show) => {
            this.shows.push(show);
          });
        }
        this.showsPaginated = this.shows;
      } else {
        this.getShows();
      }
    });
  }

  ngOnDestroy(): void {
    this.searchValueSub.unsubscribe();
    this.searchFavoritesSub.unsubscribe();
  }

  getShows() {
    this.showService.getShows(this.pageApi).subscribe((shows: Show[]) => {
      this.shows = this.shows.concat(shows);
      this.showsPaginated = this.shows.slice(this.length, this.length + this.pageSize);
      this.length = this.shows.length;
    });
    this.pageApi ++;
  }

  newPage($event: PageEvent) {
    this.pageSize = $event.pageSize;
    const initIndex = $event.pageIndex * this.pageSize;
    this.showsPaginated = this.shows.slice(initIndex, initIndex + this.pageSize);
    if (($event.pageSize * ($event.pageIndex + 1)) > this.length) {
      this.getShows();
    }
  }

}
