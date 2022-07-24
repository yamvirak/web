import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: 'template.html',
})

export class ViewReceiptDialogComponent implements OnInit{



  constructor(
    public _dialogRef: MatDialogRef<ViewReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
   //console.log(data); 
  }
  
  ngOnInit(){
    
  }


}
