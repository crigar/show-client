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

  constructor(private showService: ShowService) {
    this.searchValue = '';
  }

  ngOnInit(): void {
  }

  onKeyUpEvent() {
    console.log(this.searchValue)
    this.showService.searchValeSubject.next(this.searchValue);
  }

}
