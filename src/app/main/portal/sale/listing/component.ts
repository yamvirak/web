// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

// ===================================================================>> Third Library
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';

// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../service';

import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm.component';
import { FunctionService } from '../../../../helper/function.service';

import { ViewReceiptDialogComponent } from './view/component'; 

@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    
    public name:string          = '';
    public status:number        = 0; 
    public data:any[]           = [];
    public total:number         = 10;
    public limit:number         = 10;
    public page:number          = 1;
    public isSearching:boolean  = false; 

    constructor(

        private _service: Service,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,
        private _route: Router, 
        public fs: FunctionService,

    ){}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void
    {
       this.listing(); 
       //this.confirmCreate(); 
       
    }





    viewReceipt(row:any = null):void {

      const dialogRef = this._dialog.open(ViewReceiptDialogComponent, { data:row });
      dialogRef.afterClosed().subscribe((result) => {
        
        //console.log(result); 

        if(result){
            
          this.listing(); 
        }
          
      });

    }
   

    onDelete(row:any = null){

      //console.log(row);
      const dialogRef = this._dialog.open(ConfirmDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        //console.log(result); 
        if(result){
          
          this._service.delete(row.id).subscribe((res) => {

            if(res.status == 'success'){
                this.listing();
                this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
            }
          });
        }
      });

    }

    listing() {
        
        this.isSearching  = true; 
        let params:any = {
            limit: this.limit,
            page: this.page
        }
        
        if(this.name != ""){
            params.name = this.name; 
        }

        this._service.listing(params).subscribe(res => {
            
            this.isSearching = false; 
            this.data = res.data;

            //this.viewReceipt(this.data[0]); 
            
            this.total = res.total;
            this.page  = res.current_page;
            this.limit = res.per_page;
        })
       
    }

    onPageChanged(event) {
      if (event && event.pageSize) {
          this.limit = event.pageSize;
          this.page = event.pageIndex + 1;
          this.listing();
      }

    }

   

  
  

}

