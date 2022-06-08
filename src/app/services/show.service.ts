import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Show } from '../interfaces/show';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShowService {

  searchValueSubject: Subject<string>;
  favoritesSubject: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.searchValueSubject = new Subject<string>();
    this.favoritesSubject = new Subject<boolean>();
  }

  configUrl = 'https://api.tvmaze.com/';

  getShows(page: number) {
    return this.http.get<Show[]>(this.configUrl + 'shows?page=' + page);
  }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(this.configUrl + 'shows/' + id);
  }

  searchShow(searchValue: string) {
    return this.http.get<Show[]>(this.configUrl + 'search/shows?q=' + searchValue);
  }

  getShowFavorites() {
    let favoritesLocalStorage = localStorage.getItem('favorites');
    return favoritesLocalStorage ? JSON.parse(favoritesLocalStorage): {};
  }

}
