import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm.component';
import { MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../service';

@Component({
  templateUrl: 'template.html',
})

export class StaffDialogComponent implements OnInit{


  public isSaving:boolean = false;
  public dataHasChanged:boolean = false; 

  constructor(
    private _service: Service,
    private _snackBar: MatSnackBar, 
    private _dialog: MatDialog,
    public _dialogRef: MatDialogRef<StaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
    
  }
  
  ngOnInit(){
    //console.log(this.data);
  }


  onDelete(row:any = null){

    //console.log(row);
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result); 
      if(result){
        
        this._service.deleteStaff(row.admin_id).subscribe((res) => {

          if(res.status == 'success'){
              this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
              window.location.reload();
            }
        });
      }
    });

  }
}
