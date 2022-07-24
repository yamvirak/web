import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// openDialog
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './confirm.component.html'
})
export class ConfirmDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

  }
}
