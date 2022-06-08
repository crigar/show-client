import { Component, OnInit } from '@angular/core';
import { Show } from 'src/app/interfaces/show';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  searchValue: string;
  searchFavorites: boolean;

  constructor(private showService: ShowService) {
    this.searchValue = '';
    this.searchFavorites = false;
  }

  ngOnInit(): void {
  }

  onKeyUpEvent() {
    this.showService.searchValueSubject.next(this.searchValue);
  }

  getFavorites() {
    this.searchFavorites = !this.searchFavorites;
    this.showService.favoritesSubject.next(this.searchFavorites);
  }

}
