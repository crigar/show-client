import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Show } from 'src/app/interfaces/show';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  @Input() show: Show;

  constructor(public dialog: MatDialog) {
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

}