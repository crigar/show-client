import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Show } from '../interfaces/show';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  searchValueSubject: Subject<string>;
  favoritesSubject: Subject<any[]>;
  scheduleSubject: Subject<any[]>;
  showAllSubject: Subject<any>;

  constructor(private http: HttpClient) {
    this.searchValueSubject = new Subject<string>();
    this.favoritesSubject = new Subject<any[]>();
    this.scheduleSubject = new Subject<any[]>();
    this.showAllSubject = new Subject();
  }

  tvmazeApiUrl = 'https://api.tvmaze.com/';
  showApiUrl = 'api/';

  getShows(page: number) {
    return this.http.get<Show[]>(this.tvmazeApiUrl + 'shows?page=' + page);
  }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(this.tvmazeApiUrl + 'shows/' + id);
  }

  searchShow(searchValue: string) {
    return this.http.get<Show[]>(this.tvmazeApiUrl + 'search/shows?q=' + searchValue);
  }

  getShowFavorites() {
    let favoritesLocalStorage = localStorage.getItem('favorites');
    return favoritesLocalStorage ? JSON.parse(favoritesLocalStorage): {};
  }

  getSchedulePerDate(date: string) {
    return this.http.get<any>(this.tvmazeApiUrl + `schedule/web?date=${date}&country=US`); 
  }

  storeAndAnalyze(data: any[]): Observable<any> {
    return this.http.post<any>(this.showApiUrl + 'store-and-analyze', JSON.stringify({ data })); 
  }

  getLastSchedules(): void {
    let days = 10;
    let schedules: any[] = [];
    for (let index = 0; index < days; index++) {
      let today = new Date();
      today.setDate(today.getDate() - index);
      let dayFormat = today.toISOString().split('T')[0];
      this.getSchedulePerDate(dayFormat).subscribe((data: any) => {
        schedules = schedules.concat(data);
        if (index === days - 1) this.scheduleSubject.next(schedules);
      });
    }
  }
}