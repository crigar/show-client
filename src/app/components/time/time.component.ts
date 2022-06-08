import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Schedule } from 'src/app/interfaces/schedule';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Schedule) {}

  ngOnInit(): void {
  }

}
