import { Component, OnInit, Input, ViewEncapsulation, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
    selector     : 'admin-sale-view-dialog',
    templateUrl  : './view.dialog.component.html',
    styleUrls    : ['./view.dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ViewDialogComponent implements OnInit, AfterViewInit
{


    constructor(
        public dialogRef: MatDialogRef<ViewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){
        console.log(data); 
    }

    ngAfterViewInit(): void {

    }


    ngOnInit(): void
    {
       
        
    }

   

}