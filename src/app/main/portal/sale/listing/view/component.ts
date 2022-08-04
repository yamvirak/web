import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatDialog } from '@angular/material';

// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../../service';
import jsreport from '@jsreport/browser-client';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: 'template.html',
})

export class ViewReceiptDialogComponent implements OnInit{

        public dataPrint:any;
        public isSaving:boolean = false;
        public dataHasChanged:boolean = false; 

  constructor(
        private _dialog: MatDialog,
        private _service: Service,
        public _dialogRef: MatDialogRef<ViewReceiptDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
   //console.log(data); 
  }
  
  ngOnInit(){
    
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
