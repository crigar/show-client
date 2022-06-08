import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Show } from 'src/app/interfaces/show';
import { Favorite } from 'src/app/interfaces/favorite';
import { TimeComponent } from '../time/time.component';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  @Input() show: Show;

  constructor(public dialog: MatDialog, private showService: ShowService) {
    this.show = {} as Show;
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(TimeComponent, {
      width: '400px',
      data: this.show.schedule
    });
  }

  setFavorite(id: number): void {
    let favorites = this.showService.getShowFavorites();
    if (favorites[id]) {
      delete favorites[id];
    } else {
      favorites[id] = true;
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  isFavorite(id: number): boolean {
    let favorites = this.showService.getShowFavorites();
    return favorites && favorites[id] ? true: false;
  }

}