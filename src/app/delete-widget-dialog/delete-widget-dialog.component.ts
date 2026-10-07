import { Component, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-delete-widget-dialog',
    templateUrl: './delete-widget-dialog.component.html',
    styleUrls: ['./delete-widget-dialog.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class DeleteWidgetDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
