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

  constructor(private showService: ShowService) {
    this.shows = [];
    this.showsPaginated = [];
    this.length = 0;
    this.pageSize = 10;
    this.pageSizeOptions  = [5, 10, 25, 100];
    this.pageApi = 0;
    this.searchValueSub = new Subscription();
  }

  ngOnInit(): void {
    this.getShows();
    this.searchValueSub = this.showService.searchValeSubject.subscribe((searchValue: string) => {
      console.log(searchValue);
      if (searchValue === '') {
        this.length = 0;
        this.shows = [];
        this.pageApi = 0;
        this.getShows();
      } else {
        this.showService.searchShow(searchValue).subscribe((results: any) => {
          this.shows = results.map((result: any) => result.show);
          this.length = this.shows.length;
          this.showsPaginated = this.shows.slice(0, this.length + this.pageSize);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.searchValueSub.unsubscribe();
  }

  getShows() {
    this.showService.getShows(this.pageApi).subscribe((shows: Show[]) => {
      console.log(shows)
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
