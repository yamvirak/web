import { Component, OnInit, Input, ViewEncapsulation, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import jsreport from '@jsreport/browser-client';
import { Service } from '../../service';
@Component({
    selector     : 'admin-sale-view-dialog',
    templateUrl  : './view.dialog.component.html',
    styleUrls    : ['./view.dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ViewDialogComponent implements OnInit, AfterViewInit
{

        public dataPrint:any;
        public isSaving: boolean = false;
    constructor(

        private _service: Service,
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
    printingInvoice(){
    

        this._service.printingInvoice(this.data.id).subscribe(res => {
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