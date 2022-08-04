// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

// ===================================================================>> Third Library
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';

// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../service';
import jsreport from '@jsreport/browser-client';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm.component';
import { FunctionService } from '../../../../helper/function.service';
import { environment as env} from 'environments/environment';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { ViewReceiptDialogComponent } from './view/component'; 
import { PrintInvoiceComponent } from './print-invoice/component';
const moment = _moment;
const datepipe: DatePipe = new DatePipe('en-US')
@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    public from:any;
    public to:any;
    public name:string          = '';
    public status:number        = 0; 
    public data:any[]           = [];
    public total:number         = 10;
    public limit:number         = 10;
    public page:number          = 1;
    public dataPrint:any;
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
        if(this.from){
          params.from = datepipe.transform(this.from, 'yyyy-MM-dd') ;
        }
        if(this.to){
          params.to = datepipe.transform(this.to, 'yyy-MM-dd') ;
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
    //=========================================================================================>> Function printing report
    printForm():void {
      const dialogRef = this._dialog.open(PrintInvoiceComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.listing(); 
        }
      });

    }
    printingInvoice(){

      let params:any={}      
      if (this.from && this.to) {
        params.from = datepipe.transform(this.from, 'yyyy-MM-dd'),
        params.to = datepipe.transform(this.to, 'yyyy-MM-dd')
      }
      else {
        params.from = '',
        params.to = ''
      };
  
      this._service.printingInvoice(params).subscribe(res => {
        this.dataPrint = res;   
        jsreport["serverUrl"] = 'http://127.0.0.1:5488';
        jsreport.headers['Authorization'] = "Basic " + btoa('admin:123456');
        let request:any = {
  
          "data":JSON.stringify(this.dataPrint),
          "template": { "name":"invoice-main" }
        }
        
        jsreport.render(request).then(function(res) {
  
        // open output in the new window
          res.openInWindow();
          //res.download('myreport.pdf');
        }).catch(error => console.log(error));  
      
      })
    }
   

  
  

}

