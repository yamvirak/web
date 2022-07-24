import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import { MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../service';

@Component({
  templateUrl: 'template.html',
})

export class StaffDialogComponent implements OnInit{


  public isSaving:boolean = false;

  constructor(
    private _service: Service,
    private _snackBar: MatSnackBar, 
    public _dialogRef: MatDialogRef<StaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
   console.log(data); 
  }
  
  ngOnInit(){
   
  }



}
