import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Show } from 'src/app/interfaces/show';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  searchValue: string;

  constructor(private showService: ShowService) {
    this.searchValue = '';
  }

  ngOnInit(): void {
  }

  onKeyUpEvent() {
    this.showService.searchValueSubject.next(this.searchValue);
  }

  celanSearch() {
    this.searchValue = '';
    this.showService.searchValueSubject.next(this.searchValue);
  }

  getFavorites() {
    this.showService.favoritesSubject.next(this.showService.getShowFavorites());
  }

  storeAndAnalyze() {
    this.showService.getLastSchedules();
  }

  showAll() {
    this.searchValue = '';
    this.showService.showAllSubject.next(true);
  }

}
 