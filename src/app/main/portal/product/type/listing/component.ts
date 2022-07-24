// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// ===================================================================>> Third Library
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';

// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../service';

import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm.component';

import { CreateDialogComponent } from './create/component'; 
import { EditDialogComponent } from './edit/component'; 

@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    
    public key:string           = '';
    public type:number          = 0; 
    public types:any[]          = []; 
    public data:any[]           = [];
    public total:number         = 10;
    public limit:number         = 50;
    public page:number          = 1;
    public isSearching:boolean  = false; 

    constructor(

        private _service: Service,
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,

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
       //this.openCreateForm(); 

       
    }



    openCreateForm():void {

      const dialogRef = this._dialog.open(CreateDialogComponent, { data:{ types: this.types } });
      dialogRef.afterClosed().subscribe((result) => {
        
        //console.log(result); 

        if(result){
            
          this.listing(); 
        }
          
      });

    }

    openEditForm(row:any = null):void {

      const dialogRef = this._dialog.open(EditDialogComponent, { data: row });
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
        
        this.isSearching = true; 
        let params:any = { }
        
        if(this.key != ""){
            params.key = this.key; 
        }

        if(this.type != 0){
          params.type = this.type; 
        }

        //console.log(params); 

        this._service.listing(params).subscribe(res => {
            
            this.isSearching = false; 
            this.data = res;
        })
       
    }

   

  
  

}

